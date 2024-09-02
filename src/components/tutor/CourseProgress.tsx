import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // You can use any icon from react-icons

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  // Function to render checkpoints
  const renderCheckpoints = () => {
    const checkpoints = [];
    for (let i = 1; i <= totalSteps; i++) {
      const position = ((i - 1) / (totalSteps - 1)) * 100;
      checkpoints.push(
        <div
          key={i}
          className={`absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center ${
            i <= currentStep ? 'text-blue-600' : 'text-gray-400'
          }`}
          style={{ left: `${position}%`, width: '24px', height: '24px' }}
        >
          <FaCheckCircle size={24} />
        </div>
      );
    }
    return checkpoints;
  };

  return (
    <div className="relative w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-600 h-full rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      {renderCheckpoints()}
    </div>
  );
};

export default ProgressBar;
