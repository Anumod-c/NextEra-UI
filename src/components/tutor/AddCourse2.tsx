import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveAddCourse2 } from "../../redux/courseSlice"; // Adjust the path as needed
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface AddCourse2Props {
  onNext: () => void;
  onBack:()=>void
}

const validationSchema = Yup.object({
  prerequisites: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "At least one prerequisite is required"),
  benefits: Yup.array()
    .of(Yup.string().required("Required"))
    .min(1, "At least one benefit is required"),
});

const AddCourse2: React.FC<AddCourse2Props> = ({ onNext,onBack }) => {
  const dispatch = useDispatch();
  const formData2= useSelector((state:RootState)=>state.course.addCourse2)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Course Details
        </h2>

        <Formik
          initialValues={formData2||{
            prerequisites: [""],
            benefits: [""],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(saveAddCourse2(values));
            onNext();
          }}
        >
          {({ values }) => (
            <Form>
              <section className="flex flex-col gap-8">
                <div className="flex flex-col gap-8 w-full">
                  {/* Prerequisites Section */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium text-gray-700">
                      Prerequisites
                    </h3>
                    <FieldArray name="prerequisites">
                      {({ remove, push }) => (
                        <>
                          {values.prerequisites.map((prerequisite, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Field
                                name={`prerequisites.${index}`}
                                className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a prerequisite..."
                              />
                              <button
                                type="button"
                                className="p-2 text-red-600 hover:text-red-800"
                                onClick={() => remove(index)}
                              >
                                <FaTrash />
                              </button>
                              <ErrorMessage
                                name={`prerequisites.${index}`}
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                            onClick={() => push("")}
                          >
                            <FaPlus className="mr-2" /> Add Prerequisite
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  {/* Benefits Section */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium text-gray-700">
                      Benefits
                    </h3>
                    <FieldArray name="benefits">
                      {({ remove, push }) => (
                        <>
                          {values.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Field
                                name={`benefits.${index}`}
                                className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a benefit..."
                              />
                              <button
                                type="button"
                                className="p-2 text-red-600 hover:text-red-800"
                                onClick={() => remove(index)}
                              >
                                <FaTrash />
                              </button>
                              <ErrorMessage
                                name={`benefits.${index}`}
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                            onClick={() => push("")}
                          >
                            <FaPlus className="mr-2" /> Add Benefit
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="w-full flex justify-end mt-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="py-2 mb-4 px-8 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition"
                >
                  Back
                </button>
                  <button
                    type="submit"
                    className="py-2 px-8 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
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

export default AddCourse2;