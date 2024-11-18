import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import UserNavbar from "../UserNavbar";
import { Player } from "@lottiefiles/react-lottie-player";

const QuizPage: React.FC = () => {
  const { lessonTitle, quizzes } = useSelector((state: RootState) => state.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };
  if (!lessonTitle || !quizzes) {
    return <p>No quiz data available. Please select a valid quiz.</p>;
  }
  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next" && currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
    if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const currentQuiz = quizzes[currentQuestionIndex];

  return (
    <>
    <UserNavbar/>
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <header className="w-full max-w-3xl text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{lessonTitle} - Quiz</h1>
      </header>

      {!isSubmitted ? (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Question {currentQuestionIndex + 1}/{quizzes.length}
          </h2>
          <p className="mt-4 text-gray-600">{currentQuiz.question}</p>
          <div className="mt-6 space-y-4">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                className={`block w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                  userAnswers[currentQuestionIndex] === index
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 bg-gray-50"
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => handleNavigation("prev")}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex === quizzes.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => handleNavigation("next")}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 text-center">
  <h2 className="text-2xl font-semibold text-gray-800">Quiz Results</h2>
  <p className="mt-4 text-gray-600">
    You scored{" "}
    <span className="font-bold text-blue-600">
      {quizzes.filter((quiz, index) => quiz.options[userAnswers[index]]?.isCorrect).length}
    </span>{" "}
    out of {quizzes.length}.
  </p>

  {(() => {
    const scorePercentage = 
      (quizzes.filter((quiz, index) => quiz.options[userAnswers[index]]?.isCorrect).length / quizzes.length) * 100;

    if (scorePercentage === 100) {
      return (
        <>
                  <Player
            autoplay
            loop
            src="https://lottie.host/235070b0-53ef-4262-bf79-7e6c67780f09/pw3SEBxScD.json" style={{ height: "400px", width: "400px" }} // Adjusted size
          />
        <p className="mt-4 text-green-600 font-semibold">
          Amazing! 🎉 You nailed it with a perfect score! Keep up the excellent work!
        </p>
        </>
      );
    } else if (scorePercentage >= 80) {
      return (
        <>
        
        <Player
            autoplay
            loop
            src="https://lottie.host/27008ee4-ec6f-4e8c-9c55-e7e4b59c4acb/TrEAL2gr7Q.json" style={{ height: "400px", width: "400px" }} // Adjusted size
          />
        <p className="mt-4 text-green-500">
          Great job! 🌟 You're mastering this topic. Just a little more practice to perfect it!
        </p>
        </>
        // https://lottie.host/15959592-858f-451a-9514-fb534b4d0e37/xuHEtGNIFu.json
      );
    } else if (scorePercentage >= 60) {
      return (
        <>
        <Player
            autoplay
            loop
            src="https://lottie.host/15ad7e90-e0e0-42eb-8695-9aa9865d128b/97JVYhyDPg.json" style={{ height: "400px", width: "400px" }} // Adjusted size
          />
        <p className="mt-4 text-yellow-500">
          Good effort! 👍 You're on the right track. A bit more focus, and you'll achieve greatness!
        </p>
        </>
      );
    } else if (scorePercentage >= 50) {
      return (
        <>
        <Player
            autoplay
            loop
            src="https://lottie.host/91cfc469-9348-41c2-8cfe-a861335ea876/BrnoIQsPUa.json" style={{ height: "400px", width: "400px" }} // Adjusted size
          />
        <p className="mt-4 text-orange-500">
          Keep pushing! 💪 You're almost there. Consider revisiting the lessons to strengthen your understanding.
        </p>
        </>
      );
    } else if (scorePercentage >= 30) {
      return (
        <>
         <Player
            autoplay
            loop
            src="https://lottie.host/f0a86cf9-8276-4831-84ef-21a2d78e17a8/vDVqtnuw9k.json" style={{ height: "400px", width: "400px" }} // Adjusted size
          />
        <p className="mt-4 text-red-500">
          Don’t give up! 🚀 It’s a challenging topic, but with some review and determination, you'll improve. Rewatch the lessons and try again!
        </p>
        </>
      );
    } else {
      return (<>
      <Player
            autoplay
            loop
            src="https://lottie.host/7c95a873-d087-4529-a6fa-5ec294a7570d/j0pxjmrnj3.json" style={{ height: "400px", width: "400px" }} // Adjusted size
          />
        <p className="mt-4 text-red-600">
          It’s okay to stumble. 🌱 This is a chance to grow. Take your time to rewatch the lessons and come back stronger!
        </p>
        </>
      );
    }
  })()}

  {quizzes.filter((quiz, index) => quiz.options[userAnswers[index]]?.isCorrect).length < quizzes.length && (
    <button
      onClick={() => window.location.reload()}
      className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Retake Quiz
    </button>
  )}
</div>

      )}
    </div>
    </>

  );
};

export default QuizPage;
