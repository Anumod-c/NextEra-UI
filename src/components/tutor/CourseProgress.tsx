import { FaCheckCircle } from "react-icons/fa";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const renderCheckpoints = () => {
    const checkpoints = [];
    for (let i = 1; i <= totalSteps; i++) {
      const position = ((i - 1) / (totalSteps - 1)) * 100;
      checkpoints.push(
        <div
          key={i}
          className={`absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center 
            ${i <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"}
            rounded-full shadow-md transition-all duration-300`}
          style={{
            left: `${position}%`,
            width: "30px",
            height: "30px",
            border: "2px solid white",
          }}
        >
          {i <= currentStep ? <FaCheckCircle size={16} /> : i}
        </div>
      );
    }
    return checkpoints;
  };

  return (
    <div className="relative w-full">
      <div className="absolute w-full h-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-100 shadow-inner"></div>
      <div
        className="absolute h-2  rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-md transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <div className="relative w-full">{renderCheckpoints()}</div>
    </div>
  );
};

export default ProgressBar;
