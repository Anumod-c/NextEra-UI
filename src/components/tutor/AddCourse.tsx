import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { saveAddCourse } from "../../redux/courseSlice";

interface AddCourseProps {
  onNext: () => void;
}

const validationSchema = Yup.object({
    courseTitle: Yup.string().required("Course name is required"),
    coursePrice: Yup.string().required("Course price is required"),
  courseDesc: Yup.string().required("Course description is required"),
  courseCategory: Yup.string().required("Course category is required"),
  courseLevel: Yup.string().required("Course level is required"),
  demoURL: Yup.string().url("Invalid URL").required("Demo URL is required"),
  thumbnail: Yup.string().required("Thumbnail is required"), 
});

const AddCourse: React.FC<AddCourseProps> = ({ onNext }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Course</h2>

        <Formik
          initialValues={{
            courseTitle: "",
            coursePrice: "",
            courseDesc: "",
            courseCategory: "",
            courseLevel: "",
            demoURL: "",
            thumbnail:'',

          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(saveAddCourse(values));
            onNext();
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <section className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Course Name</label>
                    <Field
                      name="courseTitle"
                      type="text"
                      className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Course Name"
                    />
                    <ErrorMessage name="courseTitle" component="div" className="text-red-600" />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Course Price</label>
                    <Field
                      name="coursePrice"
                      type="text"
                      className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Course Price"
                    />
                    <ErrorMessage name="coursePrice" component="div" className="text-red-600" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <label className="text-lg font-medium text-gray-700">Course Description</label>
                  <Field
                    as="textarea"
                    name="courseDesc"
                    rows={4}
                    className="w-full h-24 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Write something here..."
                  />
                  <ErrorMessage name="courseDesc" component="div" className="text-red-600" />
                </div>

                <div className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Course Category</label>
                    <Field as="select" name="courseCategory" className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Category</option>
                      <option value="NodeJS">NodeJS</option>
                      <option value="React">React</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="MongoDB">MongoDB</option>
                    </Field>
                    <ErrorMessage name="courseCategory" component="div" className="text-red-600" />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Course Level</label>
                    <Field as="select" name="courseLevel" className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </Field>
                    <ErrorMessage name="courseLevel" component="div" className="text-red-600" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-lg font-medium text-gray-700">Demo URL</label>
                  <Field
                    name="demoURL"
                    type="text"
                    className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter URL"
                  />
                  <ErrorMessage name="demoURL" component="div" className="text-red-600" />
                </div>

                <div className="flex flex-col items-center justify-center">
                  <label className="text-lg font-medium text-gray-700 mb-2">
                    Drag and Drop Thumbnail or click here
                  </label>
                  <div
                    className="w-full h-40 rounded-md bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-200 cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    <span className="text-gray-500">Upload Image</span>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log(`Selected file: ${file.name}`);
                        setFieldValue('thumbnail', file.name);
                      }
                    }}
                  />
                </div>

                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className="py-2 mb-4 px-8 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCourse;
