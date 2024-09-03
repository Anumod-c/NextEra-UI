import React, { useRef, useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the type for a lesson
interface Lesson {
  title: string;
  video: File | null;
  description: string;
}

// Define the validation schema
const validationSchema = Yup.object().shape({
  lessons: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      video: Yup.mixed().required('Video is required'),
      description: Yup.string().required('Description is required'),
    })
  ),
});

interface AddLessonProps {
  onNext: (data: Lesson[]) => void;
}

const AddLesson: React.FC<AddLessonProps> = ({ onNext }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Handle file change and preview
  const handleFileChange = (index: number, setFieldValue: (field: string, value: File | null) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    if (file) {
      setFieldValue(`lessons.${index}.video`, file);
      const url = URL.createObjectURL(file);
      setPreviewUrls(prevUrls => {
        const newUrls = [...prevUrls];
        newUrls[index] = url;
        return newUrls;
      });
    }
  };

  // Handle upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add Lessons</h2>
      <Formik
        initialValues={{ lessons: [{ title: '', video: null, description: '' }] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onNext(values.lessons);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <FieldArray name="lessons">
              {({ remove, push }) => (
                <>
                  {values.lessons.map((_, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex flex-col">
                        <Field name={`lessons.${index}.title`} placeholder="Lesson Title" className="border p-2 rounded-md" />
                        <ErrorMessage name={`lessons.${index}.title`} component="div" className="text-red-600" />
                      </div>
                      <div className="flex flex-col">
                        <Field as="textarea" name={`lessons.${index}.description`} placeholder="Lesson Description" className="border p-2 rounded-md" />
                        <ErrorMessage name={`lessons.${index}.description`} component="div" className="text-red-600" />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="text-lg font-medium text-gray-700">Lesson Video</label>
                        <button
                          type="button"
                          onClick={handleUploadClick}
                          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                          Upload Video
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange(index, setFieldValue)}
                        />
                        {previewUrls[index] && (
                          <video
                            src={previewUrls[index]}
                            controls
                            className="mt-2 w-full h-32 object-cover"
                          />
                        )}
                        <ErrorMessage name={`lessons.${index}.video`} component="div" className="text-red-600" />
                      </div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                          Remove Lesson
                        </button>
                        <button
                          type="button"
                          onClick={() => push({ title: '', video: null, description: '' })}
                          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
                        >
                          Add Another Lesson
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Next
                  </button>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddLesson;
