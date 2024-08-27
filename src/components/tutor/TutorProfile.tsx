import React, { useState } from "react";
import TutorNavbar from "./TutorNavbar";
// import { useNavigate } from 'react-router-dom';

const TutorProfile: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
        null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <TutorNavbar />
            <div className="max-w-lg mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-5">Tutor Profile</h2>
                <div className="flex flex-col items-center mb-5">
                    {profileImage ? (
                        <img
                            src={profileImage as string}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover mb-3"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                    <label className="text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        Upload Image
                    </label>
                </div>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={"Anumod"}
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={22}
                            // onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={2323232323}
                            // onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={"anumodc2001@gmail.com"}
                            // onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded mt-5 hover:bg-blue-600"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TutorProfile;
