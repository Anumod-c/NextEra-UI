import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";


interface AddCourseProps{
    onNext:()=>void;
    
}
const AddCourse2: React.FC<AddCourseProps>= ({onNext}) => {
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const addPrerequisite = () => {
    setPrerequisites([...prerequisites, ""]);
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    setBenefits(updatedBenefits);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index] = value;
    setPrerequisites(updatedPrerequisites);
  };

  const removeBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const removePrerequisite = (index: number) => {
    const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(updatedPrerequisites);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full bg-white shadow-lg rounded-lg px-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Course Details</h2>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Prerequisites Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-gray-700">Prerequisites</h3>
            {prerequisites.map((prerequisite, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a prerequisite..."
                  value={prerequisite}
                  onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                />
                <button
                  className="p-2 text-red-600 hover:text-red-800"
                  onClick={() => removePrerequisite(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={addPrerequisite}
            >
              <FaPlus className="mr-2" /> Add Prerequisite
            </button>
          </div>

          {/* Benefits Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-gray-700">Benefits</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a benefit..."
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                />
                <button
                  className="p-2 text-red-600 hover:text-red-800"
                  onClick={() => removeBenefit(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={addBenefit}
            >
              <FaPlus className="mr-2" /> Add Benefit
            </button>
          </div>
        </section>

        <div className="w-full flex justify-end mt-6">
          <button
            className="py-2 px-8 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse2;
