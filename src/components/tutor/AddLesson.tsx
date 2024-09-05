import React, { useRef, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import { toast } from "sonner";

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
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
  // Handle file change and preview
  const handleFileChange =
    (
      sectionIndex: number,
      lessonIndex: number,
      setFieldValue: (field: string, value: File | null) => void
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0] ?? null;
      if (file) {
        setFieldValue(
          `sections.${sectionIndex}.lessons.${lessonIndex}.video`,
          file
        );
        const url = URL.createObjectURL(file);
        setPreviewUrls((prevUrls) => ({
          ...prevUrls,
          [`${sectionIndex}-${lessonIndex}`]: url,
        }));
      }
    };

  // Handle the video upload to S3
  const handleUploadClick = async (
    sectionIndex: number,
    lessonIndex: number,
    video: File | null
  ) => {
    if (!video) {
      alert("Please select a video first!");
      return;
    }

    try {
      console.log(":Button clicked")
      // Request a pre-signed URL from the API Gateway
      const response = await axios.get(tutorEndpoints.getPresignedUrl , {
        params: {
          filename: video.name,
        },
      });
      const { url } = response.data;
      console.log("Presigned URL:", url);
      if (!url) {
        throw new Error('Presigned URL is not provided');
      }
      // Upload the file directly to S3 using the presigned URL
      await axios.put(url, video, {
        headers: {
          'Content-Type': video.type,
        },
      });




      toast.success(`Lesson ${lessonIndex + 1} in section ${sectionIndex + 1} uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video.');
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
          onNext(values.sections);
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
                      <div className="flex flex-col mb-4">
                        <label
                          className="text-gray-700 font-medium mb-1"
                          htmlFor={`sections.${sectionIndex}.title`}
                        >
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
                      <FieldArray name={`sections.${sectionIndex}.lessons`}>
                        {({ remove: removeLesson, push: pushLesson }) => (
                          <div className="space-y-6">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                              >
                                <div className="flex flex-col mb-4">
                                  <label
                                    className="text-gray-700 font-medium mb-1"
                                    htmlFor={`sections.${sectionIndex}.lessons.${lessonIndex}.title`}
                                  >
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
                                <div className="flex flex-col mb-4">
                                  <label
                                    className="text-gray-700 font-medium mb-1"
                                    htmlFor={`sections.${sectionIndex}.lessons.${lessonIndex}.description`}
                                  >
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
                                <div className="flex flex-col mb-4">
                                  <label className="text-gray-700 font-medium mb-1">
                                    Lesson Video
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      fileInputRefs.current[
                                        `${sectionIndex}-${lessonIndex}`
                                      ]?.click()
                                    }
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                  >
                                    Upload Video
                                  </button>
                                  <input
                                    type="file"
                                    ref={(el) =>
                                      (fileInputRefs.current[
                                        `${sectionIndex}-${lessonIndex}`
                                      ] = el)
                                    }
                                    className="hidden"
                                    onChange={handleFileChange(
                                      sectionIndex,
                                      lessonIndex,
                                      setFieldValue
                                    )}
                                  />
                                  {previewUrls[
                                    `${sectionIndex}-${lessonIndex}`
                                  ] && (
                                    <video
                                      src={
                                        previewUrls[
                                          `${sectionIndex}-${lessonIndex}`
                                        ]
                                      }
                                      controls
                                      className="mt-2 w-full h-48 object-cover"
                                    />
                                  )}
                                  <ErrorMessage
                                    name={`sections.${sectionIndex}.lessons.${lessonIndex}.video`}
                                    component="div"
                                    className="text-red-500 mt-1"
                                  />
                                </div>
                                <div className="flex justify-evenly gap-4">
                                  <button
                                    type="button"
                                    onClick={() => removeLesson(lessonIndex)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                                  >
                                    Remove Lesson
                                  </button>
                                  {/* Submit Button for each lesson */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleUploadClick(
                                        sectionIndex,
                                        lessonIndex,
                                        lesson.video
                                      )
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                                  >
                                    Submit Lesson
                                  </button>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                pushLesson({
                                  title: "",
                                  video: null,
                                  description: "",
                                })
                              }
                              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
                            >
                              Add Another Lesson
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <div className="flex gap-4 mt-6">
                        <button
                          type="button"
                          onClick={() => remove(sectionIndex)}
                          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Remove Section
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              title: "",
                              lessons: [{ title: "", video: null, description: "" }],
                            })
                          }
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Add Section
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save All
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddLesson;
