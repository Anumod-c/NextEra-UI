import React, { useState, useRef } from "react";
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface AddLessonProps {
  onNext: () => void;
}

const AddLesson: React.FC<AddLessonProps> = ({ onNext }) => {
  const [lessons, setLessons] = useState<{ title: string; video: File | null; description: string }[]>([{ title: "", video: null, description: "" }]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addLesson = () => {
    setLessons([...lessons, { title: "", video: null, description: "" }]);
  };

  const handleLessonChange = (index: number, field: keyof typeof lessons[number], value: string | File | null) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = { ...updatedLessons[index], [field]: value };
    setLessons(updatedLessons);
  };

  const removeLesson = (index: number) => {
    const updatedLessons = lessons.filter((_, i) => i !== index);
    setLessons(updatedLessons);
    // Collapse the expanded view if the removed lesson was expanded
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleVideoUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleLessonChange(index, "video", file);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Course Lessons</h2>

        <section className="space-y-4">
          {lessons.map((lesson, index) => (
            <div key={index} className="border p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-700">Lesson {index + 1}</h3>
                <button
                  className="p-2 text-blue-600 hover:text-blue-800"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              
              {expandedIndex === index && (
                <div className="mt-4 space-y-4">
                  <div className="flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Lesson Title</label>
                    <input
                      className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Lesson Title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Video Upload</label>
                    <input
                      type="file"
                      accept="video/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => handleVideoUpload(index, e)}
                    />
                    <div
                      className="w-full h-40 rounded-md bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-200 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="text-gray-500">Upload Video</span>
                    </div>
                    {lesson.video && <p className="text-gray-700">Selected File: {lesson.video.name}</p>}
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Lesson Description</label>
                    <textarea
                      className="w-full h-24 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Lesson Description"
                      value={lesson.description}
                      onChange={(e) => handleLessonChange(index, "description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <button
                    className="p-2 text-red-600 hover:text-red-800"
                    onClick={() => removeLesson(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            onClick={addLesson}
          >
            <FaPlus className="mr-2" /> Add Lesson
          </button>
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

export default AddLesson;
