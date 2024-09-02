import React, { useRef } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { saveAddLessons } from '../../redux/courseSlice'; // Adjust the path as needed

interface AddLessonProps {
  onNext: () => void;
}

interface Lesson {
  title: string;
  video: File | null;
  description: string;
}

interface FormValues {
  lessons: Lesson[];
}

const validationSchema = Yup.object().shape({
  lessons: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      video: Yup.mixed().required('Video file is required'),
      description: Yup.string().required('Description is required'),
    })
  ).min(1, 'At least one lesson is required'),
});

const AddLesson: React.FC<AddLessonProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (index: number, setFieldValue: (field: string, value: unknown) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null; // Ensure `file` is either a `File` or `null`
    setFieldValue(`lessons.${index}.video`, file);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Lessons</h2>

        <Formik
          initialValues={{
            lessons: [{ title: '', video: null, description: '' }],
          } as FormValues}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
            dispatch(saveAddLessons(values));
            onNext();
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <FieldArray name="lessons">
                {({ remove, push }) => (
                  <>
                    {values.lessons.map((lesson, index) => (
                      <div key={index} className="mb-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-4">
                            <label className="text-lg font-medium text-gray-700">Lesson Title</label>
                            <Field
                              name={`lessons.${index}.title`}
                              type="text"
                              className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter Lesson Title"
                            />
                            <ErrorMessage name={`lessons.${index}.title`} component="div" className="text-red-600" />
                          </div>

                          <div className="flex flex-col gap-4">
                            <label className="text-lg font-medium text-gray-700">Lesson Description</label>
                            <Field
                              as="textarea"
                              name={`lessons.${index}.description`}
                              rows={4}
                              className="w-full h-24 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                              placeholder="Write lesson description here..."
                            />
                            <ErrorMessage name={`lessons.${index}.description`} component="div" className="text-red-600" />
                          </div>

                          <div className="flex flex-col items-center justify-center">
                            <label className="text-lg font-medium text-gray-700 mb-2">
                              Upload Lesson Video
                            </label>
                            <div
                              className="w-full h-40 rounded-md bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-200 cursor-pointer"
                              onClick={handleUploadClick}
                            >
                              <span className="text-gray-500">Upload Video</span>
                            </div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="video/*"
                              onChange={handleFileChange(index, setFieldValue)}
                            />
                            <ErrorMessage name={`lessons.${index}.video`} component="div" className="text-red-600" />
                          </div>

                          <button
                            type="button"
                            className="p-2 text-red-600 hover:text-red-800"
                            onClick={() => remove(index)}
                          >
                            Remove Lesson
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                      onClick={() => push({ title: '', video: null, description: '' })}
                    >
                      Add Another Lesson
                    </button>
                  </>
                )}
              </FieldArray>

              <div className="w-full flex justify-end mt-6">
                <button
                  type="submit"
                  className="py-2 px-8 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLesson;
