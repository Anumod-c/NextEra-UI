import React, { useRef, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import { toast } from "sonner";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // Icons for collapse/expand
import { saveLessons } from "../../redux/courseSlice";
import { useDispatch } from "react-redux";
// Define the type for a lesson
interface Lesson {
  title: string;
  video: File | null;
  description: string;
}

// Define the type for a section
interface Section {
  title: string;
  lessons: Lesson[];
}

// Define the validation schema
const validationSchema = Yup.object().shape({
  sections: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Section title is required"),
        lessons: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string().required("Lesson title is required"),
              video: Yup.mixed().required("Video is required"),
              description: Yup.string().required("Description is required"),
            })
          )
          .min(1, "At least one lesson is required"),
      })
    )
    .min(1, "At least one section is required"),
});

interface AddLessonProps {
  onNext: (data: Section[]) => void;
  onBack: () => void;
}

const AddLesson: React.FC<AddLessonProps> = ({ onNext, onBack }) => {
  const dispatch =useDispatch()

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
  const [expandedSections, setExpandedSections] = useState<number[]>([]); // Track expanded sections
  const [expandedLessons, setExpandedLessons] = useState<{ [key: string]: boolean }>({}); // Track expanded lessons

  // Handle file change and preview
  const handleFileChange =
  (
    sectionIndex: number,
    lessonIndex: number,
    setFieldValue: (field: string, value: any) => void
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue(
        `sections.${sectionIndex}.lessons.${lessonIndex}.video`,
        file // Store the file object
      );
      const url = URL.createObjectURL(file);
      setPreviewUrls((prevUrls) => ({
        ...prevUrls,
        [`${sectionIndex}-${lessonIndex}`]: url,
      }))
    }
  };


  // Toggle section expansion
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
    videoName: string | null
  ) => {
    if (!videoName) {
      alert("Please select a video first!");
      return;
    }
  
    try {
      // Request a pre-signed URL from the API Gateway
      const response = await axios.get(tutorEndpoints.getPresignedUrlForUpload, {
        params: {
          filename: videoName,
          fileType: "video/*", // Or the actual file type if known
        },
      });
      const { url } = response.data;
      if (!url) {
        throw new Error("Presigned URL is not provided");
      }
      // You need to ensure you have the file object to upload
      const file = fileInputRefs.current[`${sectionIndex}-${lessonIndex}`]?.files?.[0];
      if (!file) {
        throw new Error("File object not found");
      }
  
      // Upload the file directly to S3 using the presigned URL
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type, // Use the actual file type
        },
      });
  
      toast.success(
        `Lesson ${lessonIndex + 1} in section ${sectionIndex + 1} uploaded successfully!`
      );
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video.");
    }
  };
  
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Lessons</h2>
      <Formik
  initialValues={{
    sections: [
      {
        title: "",
        lessons: [{ title: "", video: null, description: "" }],
      },
    ],
  }}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    // Directly use the values since video remains as File or null
    const updatedSections: Section[] = values.sections.map((section) => ({
      ...section,
      lessons: section.lessons.map((lesson) => ({
        ...lesson,
        // Keep video as File or null, as expected
        video: lesson.video,
      })),
    }));

    // Dispatch the action to save the lessons
    dispatch(saveLessons(updatedSections));
    onNext(updatedSections);
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
                        <button type="button">
                          {expandedSections.includes(sectionIndex) ? (
                            <AiOutlineMinus size={20} />
                          ) : (
                            <AiOutlinePlus size={20} />
                          )}
                        </button>
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
                            {({ remove: removeLesson, push: pushLesson }) => (
                              <div className="space-y-4">
                                {section.lessons.map((lesson, lessonIndex) => (
                                  <div key={lessonIndex}>
                                    <div
                                      className="flex justify-between items-center cursor-pointer"
                                      onClick={() =>
                                        toggleLesson(sectionIndex, lessonIndex)
                                      }
                                    >
                                      <h4 className="text-lg font-medium">
                                        Lesson {lessonIndex + 1}
                                      </h4>
                                      <button type="button">
                                        {expandedLessons[
                                          `${sectionIndex}-${lessonIndex}`
                                        ] ? (
                                          <AiOutlineMinus size={20} />
                                        ) : (
                                          <AiOutlinePlus size={20} />
                                        )}
                                      </button>
                                    </div>

                                    {expandedLessons[
                                      `${sectionIndex}-${lessonIndex}`
                                    ] && (
                                      <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                                        <div>
                                          {/* Lesson Title */}
                                          <div className="flex flex-col mb-4">
                                            <label className="text-gray-700 font-medium mb-1">
                                              Lesson Title
                                            </label>
                                            <Field
                                              name={`sections.${sectionIndex}.lessons.${lessonIndex}.title`}
                                              placeholder="Enter lesson title"
                                              className="border border-gray-300 p-2 rounded-md"
                                            />
                                            <ErrorMessage
                                              name={`sections.${sectionIndex}.lessons.${lessonIndex}.title`}
                                              component="div"
                                              className="text-red-500 mt-1"
                                            />
                                          </div>

                                          {/* Lesson Description */}
                                          <div className="flex flex-col mb-4">
                                            <label className="text-gray-700 font-medium mb-1">
                                              Lesson Description
                                            </label>
                                            <Field
                                              as="textarea"
                                              name={`sections.${sectionIndex}.lessons.${lessonIndex}.description`}
                                              placeholder="Enter lesson description"
                                              className="border border-gray-300 p-2 rounded-md h-32 resize-none"
                                            />
                                            <ErrorMessage
                                              name={`sections.${sectionIndex}.lessons.${lessonIndex}.description`}
                                              component="div"
                                              className="text-red-500 mt-1"
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          {/* Lesson Video */}
                                          <div className="flex flex-col mb-4">
                                            <label className="text-gray-700 font-medium mb-1">
                                              Upload Video
                                            </label>
                                            <input
  ref={(ref) =>
    (fileInputRefs.current[
      `${sectionIndex}-${lessonIndex}`
    ] = ref)
  }
  type="file"
  accept="video/*"
  onChange={handleFileChange(
    sectionIndex,
    lessonIndex,
    setFieldValue
  )}
  className="border border-gray-300 p-2 rounded-md"
/>{previewUrls[
  `${sectionIndex}-${lessonIndex}`
] && (
  <video
    controls
    src={previewUrls[
      `${sectionIndex}-${lessonIndex}`
    ]}
    className="mt-2 border border-gray-300 rounded-md"
  />
)}
                                            <ErrorMessage
                                              name={`sections.${sectionIndex}.lessons.${lessonIndex}.video`}
                                              component="div"
                                              className="text-red-500 mt-1"
                                            />
                                          </div>

                                          {/* Video Preview */}
                                          {previewUrls[
                                            `${sectionIndex}-${lessonIndex}`
                                          ] && (
                                            <div className="mt-4">
                                              <label className="text-gray-700 font-medium mb-1">
                                                Video Preview
                                              </label>
                                              <video
                                                controls
                                                src={
                                                  previewUrls[
                                                    `${sectionIndex}-${lessonIndex}`
                                                  ]
                                                }
                                                className="rounded-md w-full"
                                              />
                                            </div>
                                          )}

                                          {/* Upload Button */}
                                          <button
                                            type="button"
                                            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600 transition"
                                            onClick={() =>
                                              handleUploadClick(
                                                sectionIndex,
                                                lessonIndex,
                                                lesson.video
                                              )
                                            }
                                          >
                                            Upload Video
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}

                                <button
                                  type="button"
                                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-4"
                                  onClick={() =>
                                    pushLesson({
                                      title: "",
                                      video: null,
                                      description: "",
                                    })
                                  }
                                >
                                  Add Lesson
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
                        lessons: [{ title: "", video: null, description: "" }],
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
