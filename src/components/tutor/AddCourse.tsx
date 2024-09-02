import { useRef } from "react";

interface AddCourseProps {
  onNext: () => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ onNext }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    onNext();
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Course</h2>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex-1 flex flex-col gap-4">
              <label className="text-lg font-medium text-gray-700">Course Name</label>
              <input
                className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Course Name"
                type="text"
              />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <label className="text-lg font-medium text-gray-700">Course Price</label>
              <input
                className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Course Price"
                type="text"
              />
            </div>
          </div>


          <div className="flex flex-col gap-4 w-full">
            <label className="text-lg font-medium text-gray-700">Course Description</label>
            <textarea
              className="w-full h-24 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Write something here..."
              rows={4}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex-1 flex flex-col gap-4">
              <label className="text-lg font-medium text-gray-700">Course Category</label>
              <select className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                <option value="">NodeJS</option>
                <option value="">React</option>
                <option value="">JavaScript</option>
                <option value="">MongoDB</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <label className="text-lg font-medium text-gray-700">Course Level</label>
              <select className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
              <label className="text-lg font-medium text-gray-700">Demo URL</label>
              <input
                className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter URL"
                type="text"
              />
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
                }
              }}
            />
          </div>

          <div className="w-full flex justify-end">
            <button
              className="py-2 mb-4 px-8 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={handleClick}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCourse;
