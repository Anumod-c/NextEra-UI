import  { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import { toast } from "sonner";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import { saveLessons } from "../../redux/courseSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Option {
  text: string;
  isCorrect: boolean;
}
interface Quiz {
  question: string;
  options: Option[];
}
interface Lesson {
  title: string;
  video: string | null;
  description: string;
  quizzes: Quiz[];
}
interface Section {
  title: string;
  lessons: Lesson[];
}
const validationSchema = Yup.object().shape({
  sections: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Section title is required"),
        lessons: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required("Lesson title is required"),
              video: Yup.string()
                .url("Invalid URL")
                .required("Video URL is required"),
              description: Yup.string().required("Description is required"),
            })
          )
          .min(1, "At least one lesson is required"),
      })
    )
    .min(1, "At least one section is required"),
});

interface AddLessonProps {
  onNext: () => void;
  onBack: () => void;
}

const AddLesson: React.FC<AddLessonProps> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();
  const savedLessons = useSelector((state: RootState) => state.course.sections);
  console.log("savedddddddddddddddddddd", savedLessons);
  const generateUniqueFileName = (originalName: string): string => {
    const uniqueId = uuidv4();
    const extension = originalName.split(".").pop(); 
    return `${uniqueId}.${extension}`; 
  };
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
  const [expandedSections, setExpandedSections] = useState<number[]>([]); 
  const [expandedLessons, setExpandedLessons] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (savedLessons) {
      const savedPreviews: { [key: string]: string } = {};
      savedLessons.forEach((section, sectionIndex) => {
        section.lessons.forEach((lesson, lessonIndex) => {
          if (lesson.video) {
            savedPreviews[`${sectionIndex}-${lessonIndex}`] = lesson.video;
          }
        });
      });
      setPreviewUrls(savedPreviews);
    }
  }, [savedLessons]);

  const handleFileChange =
    (
      sectionIndex: number,
      lessonIndex: number,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFieldValue: (field: string, value: any) => void
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      if (file) {
        const uniqueFileName = generateUniqueFileName(file.name);
        setFieldValue(
          `sections.${sectionIndex}.lessons.${lessonIndex}.video`,
          uniqueFileName
        );
        const url = URL.createObjectURL(file);
        setPreviewUrls((prevUrls) => ({
          ...prevUrls,
          [`${sectionIndex}-${lessonIndex}`]: url,
        }));
      }
    };
  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const toggleLesson = (sectionIndex: number, lessonIndex: number) => {
    const key = `${sectionIndex}-${lessonIndex}`;
    setExpandedLessons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  // Handle the video upload to S3
  const handleUploadClick = async (
    sectionIndex: number,
    lessonIndex: number,
    videoName: string | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (!videoName) {
      alert("Please select a video first!");
      return;
    }

    try {
      const response = await axios.get(
        tutorEndpoints.getPresignedUrlForUpload,
        {
          params: {
            filename: videoName,
            fileType: "video/*", 
          },
        }
      );
      const { url } = response.data;
      if (!url) {
        throw new Error("Presigned URL is not provided");
      }
      const file =
        fileInputRefs.current[`${sectionIndex}-${lessonIndex}`]?.files?.[0];
      if (!file) {
        throw new Error("File object not found");
      }

      // Upload the file directly to S3 using the presigned URL
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type, // Use the actual file type
        },
      });
      const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
      const region = import.meta.env.VITE_AWS_REGION;
      const viewUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${videoName}`;
      console.log("viewewwwwwurl", viewUrl);
      setFieldValue(
        `sections.${sectionIndex}.lessons.${lessonIndex}.video`,
        viewUrl
      );

      toast.success(
        `Lesson ${lessonIndex + 1} in section ${
          sectionIndex + 1
        } uploaded successfully!`
      );
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video.");
    }
  };
  const VideoPreview = ({ url }: { url: string }) => {
    if (!url) return null;

    const isS3Url = url.includes("amazonaws.com");
    return (
      <div className="mt-4">
        <video
          controls
          src={url}
          className="rounded-lg"
          style={{ maxHeight: "250px" }}
        >
          Your browser does not support the video tag.
        </video>
        {!isS3Url && (
          <p className="text-sm text-gray-500 mt-1">
            *Preview only - click Upload Video to save
          </p>
        )}
      </div>
    );
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Lessons</h2>
      <Formik
        initialValues={{
          sections: savedLessons || [
            {
              title: "",
              lessons: [
                {
                  title: "",
                  video: null,
                  description: "",
                  quizzes: [
                    {
                      question: "",
                      options: [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const updatedSections: Section[] = values.sections.map((section) => ({
            ...section,
            lessons: section.lessons.map((lesson) => ({
              ...lesson,
              video: lesson.video,
              quizzes: lesson.quizzes.map((quiz) => ({
                ...quiz,
              })),
            })),
          }));
          console.log("dddddddddd", updatedSections);
          dispatch(saveLessons(updatedSections));
          onNext();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FieldArray name="sections">
              {({ remove, push }) => (
                <div className="space-y-6">
                  {values.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(sectionIndex)}
                      >
                        <h3 className="text-xl font-semibold">
                          Section {sectionIndex + 1}
                        </h3>
                        <div className=" flex justify-end items-center px-4 space-x-4">
                          <button type="button">
                            {expandedSections.includes(sectionIndex) ? (
                              <AiOutlineMinus size={20} />
                            ) : (
                              <AiOutlinePlus size={20} />
                            )}
                          </button>
                          <button
                            type="button"
                            className="p-2 text-red-600 hover:text-red-800"
                            onClick={() => remove(sectionIndex)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      {expandedSections.includes(sectionIndex) && (
                        <div className="mt-4 space-y-6">
                          {/* Section Title */}
                          <div className="flex flex-col mb-4">
                            <label className="text-gray-700 font-medium mb-1">
                              Section Title
                            </label>
                            <Field
                              name={`sections.${sectionIndex}.title`}
                              placeholder="Enter section title"
                              className="border border-gray-300 p-2 rounded-md"
                            />
                            <ErrorMessage
                              name={`sections.${sectionIndex}.title`}
                              component="div"
                              className="text-red-500 mt-1"
                            />
                          </div>
                          {/* Lessons */}
                          <FieldArray name={`sections.${sectionIndex}.lessons`}>
                            {({ remove, push: pushLesson }) => (
                              <div className="space-y-6">
                                {section.lessons.map((lesson, lessonIndex) => (
                                  <div
                                    key={lessonIndex}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                                  >
                                    {/* Lesson Header */}
                                    <div
                                      className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 cursor-pointer"
                                      onClick={() =>
                                        toggleLesson(sectionIndex, lessonIndex)
                                      }
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path
                                              fillRule="evenodd"
                                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                        <div>
                                          <h4 className="text-lg font-semibold text-gray-800">
                                            Lesson {lessonIndex + 1}
                                          </h4>
                                          <p className="text-sm text-gray-500">
                                            {lesson.title || "Untitled Lesson"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex justify-end items-center px-4 space-x-4">
                                        <button
                                          type="button"
                                          className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                                        >
                                          {expandedLessons[
                                            `${sectionIndex}-${lessonIndex}`
                                          ] ? (
                                            <AiOutlineMinus
                                              size={20}
                                              className="text-blue-600"
                                            />
                                          ) : (
                                            <AiOutlinePlus
                                              size={20}
                                              className="text-blue-600"
                                            />
                                          )}
                                        </button>
                                        <button
                                          type="button"
                                          className="p-2 text-red-600 hover:text-red-800"
                                          onClick={() => remove(sectionIndex)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </div>
                                    {/* Lesson Content */}
                                    {expandedLessons[
                                      `${sectionIndex}-${lessonIndex}`
                                    ] && (
                                      <div className="p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                          {/* Left Column - Details */}
                                          <div className="space-y-6">
                                            {/* Lesson Title */}
                                            <div className="space-y-2">
                                              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="h-5 w-5 text-gray-400"
                                                  viewBox="0 0 20 20"
                                                  fill="currentColor"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                                <span>Lesson Title</span>
                                              </label>
                                              <Field
                                                name={`sections.${sectionIndex}.lessons.${lessonIndex}.title`}
                                                placeholder="Enter an engaging title for your lesson"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                              />
                                              <ErrorMessage
                                                name={`sections.${sectionIndex}.lessons.${lessonIndex}.title`}
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                              />
                                            </div>
                                            {/* Lesson Description */}
                                            <div className="space-y-2">
                                              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="h-5 w-5 text-gray-400"
                                                  viewBox="0 0 20 20"
                                                  fill="currentColor"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4zm2 3a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                                <span>Lesson Description</span>
                                              </label>
                                              <Field
                                                as="textarea"
                                                name={`sections.${sectionIndex}.lessons.${lessonIndex}.description`}
                                                placeholder="Provide a detailed description of what students will learn"
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 h-36 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                              />
                                              <ErrorMessage
                                                name={`sections.${sectionIndex}.lessons.${lessonIndex}.description`}
                                                component="div"
                                                className="text-red-500   text-sm "
                                              />
                                            </div>
                                          </div>
                                          {/* Right Column - Video */}
                                          <div className="space-y-6 ">
                                            <div className="space-y-2">
                                              <div className="">
                                                <label className="flex items-center   space-x-2 text-gray-700 font-medium">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                  >
                                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                                  </svg>
                                                  <span>Lesson Video</span>
                                                </label>

                                                {/* Video Preview */}
                                                {previewUrls[
                                                  `${sectionIndex}-${lessonIndex}`
                                                ] || lesson.video ? (
                                                  <div className="">
                                                    <div className="relative flex justify-center rounded-lg overflow-hidden  aspect-video">
                                                      <VideoPreview
                                                        url={
                                                          previewUrls[
                                                            `${sectionIndex}-${lessonIndex}`
                                                          ] ||
                                                          lesson.video ||
                                                          ""
                                                        }
                                                      />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                      <p className="text-sm ml-14 text-gray-500">
                                                        {lesson.video &&
                                                          "Preview only - click Upload to save"}
                                                      </p>
                                                      <button
                                                        type="button"
                                                        className="text-red-500 mr-14 hover:text-red-600 text-sm font-medium"
                                                        onClick={() => {
                                                          setFieldValue(
                                                            `sections.${sectionIndex}.lessons.${lessonIndex}.video`,
                                                            null
                                                          );
                                                          const newPreviews = {
                                                            ...previewUrls,
                                                          };
                                                          delete newPreviews[
                                                            `${sectionIndex}-${lessonIndex}`
                                                          ];
                                                          setPreviewUrls(
                                                            newPreviews
                                                          );
                                                        }}
                                                      >
                                                        <span>
                                                          Remove Video
                                                        </span>
                                                      </button>
                                                    </div>
                                                  </div>
                                                ) : (
                                                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      className="mx-auto  h-12 w-12 text-gray-400"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                    >
                                                      <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                      />
                                                    </svg>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                      Upload your video here
                                                    </p>
                                                  </div>
                                                )}
                                                {/* Upload Controls */}
                                                <div className="space-y-3 mt-6">
                                                  <div className="flex items-center justify-center">
                                                    <label className="cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                                      <span className="text-sm  text-gray-600">
                                                        Choose video
                                                      </span>
                                                      <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="video/*"
                                                        ref={(ref) =>
                                                          (fileInputRefs.current[
                                                            `${sectionIndex}-${lessonIndex}`
                                                          ] = ref)
                                                        }
                                                        onChange={handleFileChange(
                                                          sectionIndex,
                                                          lessonIndex,
                                                          setFieldValue
                                                        )}
                                                      />
                                                    </label>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={() =>
                                                      handleUploadClick(
                                                        sectionIndex,
                                                        lessonIndex,
                                                        values.sections[
                                                          sectionIndex
                                                        ].lessons[lessonIndex]
                                                          .video,
                                                        setFieldValue
                                                      )
                                                    }
                                                    disabled={
                                                      !values.sections[
                                                        sectionIndex
                                                      ].lessons[lessonIndex]
                                                        .video
                                                    }
                                                  >
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      className="h-5 w-5"
                                                      viewBox="0 0 20 20"
                                                      fill="currentColor"
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                      />
                                                    </svg>
                                                    <span>Upload Video</span>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex flex-col gap-6">
                                          <h3 className="text-xl font-semibold text-gray-800">
                                            Quiz
                                          </h3>
                                          <FieldArray
                                            name={`sections.${sectionIndex}.lessons.${lessonIndex}.quizzes`}
                                          >
                                            {({ remove, push }) => (
                                              <>
                                                {section.lessons[lessonIndex]
                                                  .quizzes &&
                                                  section.lessons[
                                                    lessonIndex
                                                  ].quizzes.map(
                                                    (quiz, quizIndex) => (
                                                      <div
                                                        key={quizIndex}
                                                        className="quiz-container space-y-5 bg-gray-50 p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4"
                                                      >
                                                        {/* Question on the Left */}
                                                        <div className="question-container flex flex-col gap-2">
                                                          <label
                                                            className="font-medium text-gray-700"
                                                            htmlFor={`quiz-${quizIndex}`}
                                                          >
                                                            Quiz Question
                                                          </label>
                                                          <Field
                                                            as="textarea"
                                                            id={`quiz-${quizIndex}`}
                                                            name={`sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.question`}
                                                            placeholder="Enter quiz question"
                                                            className="input-field py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 md:h-36"
                                                          />
                                                        </div>
                                                        {/* Answer Options on the Right */}
                                                        <div className="options-container space-y-4">
                                                          <FieldArray
                                                            name={`sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.options`}
                                                          >
                                                            {({
                                                              remove:
                                                                removeOption,
                                                              push: pushOption,
                                                            }) => (
                                                              <>
                                                                {quiz.options.map(
                                                                  (
                                                                    _,
                                                                    optionIndex
                                                                  ) => (
                                                                    <div
                                                                      key={
                                                                        optionIndex
                                                                      }
                                                                      className="option-item flex items-center gap-4 bg-gradient-to-r from-blue-50 via-blue-100 to-white p-4 border border-blue-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                                                    >
                                                                      <div className="flex-grow">
                                                                        <Field
                                                                          name={`sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.options.${optionIndex}.text`}
                                                                          placeholder="Option text"
                                                                          className="input-field py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                                        />
                                                                      </div>
                                                                      <div className="flex items-center gap-2">
                                                                        <label className="flex items-center gap-1 text-sm text-gray-600">
                                                                          <Field
                                                                            type="checkbox"
                                                                            name={`sections.${sectionIndex}.lessons.${lessonIndex}.quizzes.${quizIndex}.options.${optionIndex}.isCorrect`}
                                                                          />
                                                                          Correct
                                                                        </label>
                                                                        <button
                                                                          type="button"
                                                                          onClick={() =>
                                                                            removeOption(
                                                                              optionIndex
                                                                            )
                                                                          }
                                                                          className="text-red-500 hover:text-red-600 focus:outline-none p-2 rounded-md hover:bg-red-100 transition-colors"
                                                                        >
                                                                          <AiOutlineMinus />
                                                                        </button>
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                )}
                                                                {/* Add Option Button */}
                                                                <button
                                                                  type="button"
                                                                  onClick={() =>
                                                                    pushOption({
                                                                      text: "",
                                                                      isCorrect:
                                                                        false,
                                                                    })
                                                                  }
                                                                  className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                                                                >
                                                                  Add Option
                                                                </button>
                                                              </>
                                                            )}
                                                          </FieldArray>
                                                        </div>

                                                        {/* Remove Quiz Button */}
                                                        <div className="w-full">
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              remove(quizIndex)
                                                            }
                                                            className="w-full text-red-600 hover:text-red-700 focus:outline-none"
                                                          >
                                                            Remove Quiz
                                                          </button>
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                {/* Add Quiz Button */}
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    push({
                                                      question: "",
                                                      options: [
                                                        {
                                                          text: "",
                                                          isCorrect: false,
                                                        },
                                                        {
                                                          text: "",
                                                          isCorrect: false,
                                                        },
                                                      ],
                                                    })
                                                  }
                                                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
                                                >
                                                  Add Quiz
                                                </button>
                                              </>
                                            )}
                                          </FieldArray>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                                {/* Add Lesson Button */}
                                <button
                                  type="button"
                                  className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 hover:text-blue-500 transition-colors group"
                                  onClick={() =>
                                    pushLesson({
                                      title: "",
                                      video: null,
                                      description: "",
                                      quizzes: [],
                                    })
                                  }
                                >
                                  <div className="flex items-center justify-center space-x-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-gray-400 group-hover:text-blue-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span className="font-medium">
                                      Add New Lesson
                                    </span>
                                  </div>
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={() =>
                      push({
                        title: "",
                        lessons: [
                          {
                            title: "",
                            video: null,
                            description: "",
                            quizzes: [],
                          },
                        ],
                      })
                    }
                  >
                    Add Section
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                onClick={onBack}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AddLesson;
