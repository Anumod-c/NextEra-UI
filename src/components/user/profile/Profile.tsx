import { FaBookOpen, FaUserGraduate } from "react-icons/fa"
import profileImage from '../../../assets/profile.png'
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import userAxios from "../../../constraints/axios/userAxios";
import { userEndpoints } from "../../../constraints/endpoints/userEndPoints";
import { toast } from "sonner";
import { updateProfilePicture } from "../../../redux/userSlice";
import CryptoJS from "crypto-js";
import axios from "axios";

// Utility function to generate a random image name
const randomImageName = (): string => CryptoJS.SHA256(Date.now().toString()).toString(CryptoJS.enc.Hex);

interface IProfile {
    id:string;
    name: string;
    coursesEnrolled: string[];
    profilePicture: string;
}

const Profile: React.FC<IProfile> = ({ id,name, coursesEnrolled, profilePicture }) => {

    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview
    const navigate = useNavigate();
    const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
    const region = import.meta.env.VITE_AWS_REGION;

    // Function to trigger file input on image click
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Get presigned URL for S3 upload
    const getPresignedUrlForUpload = async (fileName: string, fileType: string) => {
        try {
            const response = await userAxios.get(userEndpoints.getPresignedUrlForUpload, {
                params: {
                    fileName,
                    fileType,
                },
            });
            console.log(response.data.url,'urlll')
            return response.data.url;
        } catch (error) {
            console.error("Error fetching presigned URL", error);
            toast.error("Error fetching upload URL");
            return null;
        }
    };

    // Function to handle image selection and upload
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);

            const fileName = `${randomImageName()}_${file.name}`;
            const fileType = file.type.startsWith('image') ? 'image' : 'application/octet-stream';
            console.log(fileName,fileType,'k')

            const uploadUrl = await getPresignedUrlForUpload(fileName, fileType);

            if (uploadUrl) {
                try {
                    // Upload the image to S3 using the presigned URL
                    await axios.put(uploadUrl, file, {
                        headers: {
                            'Content-Type': file.type,
                        },
                    });

                    // Generate the viewable URL for the uploaded image
                    const viewUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
                    console.log(viewUrl)
                    setPreviewImage(viewUrl)
                    
                    // Save the viewable URL in the database
                    const response = await userAxios.put(userEndpoints.updateProfilePicture, {
                        profilePicture: viewUrl,
                        userId:id // Wrap the viewUrl in an object
                    });
                    console.log(response.data, "Profile picture updated");
                // Update Redux or perform any other action based on the response
                dispatch(updateProfilePicture(viewUrl));
                toast.success("Profile picture updated successfully!");

                    // Update Redux with the new profile picture
                    
                    // toast.success("Profile picture updated successfully!");
                } catch (error) {
                    toast.error("Error uploading the profile picture");
                }
            }
        }
    };    
    return (
        <div className="flex flex-wrap bg-gradient-to-b from-gray-100 to-white shadow-md justify-center items-center md:justify-normal md:items-normal p-4">
            {/* Profile Image */}
            <div className="flex-shrink-0 ml-4 pl-4 flex justify-center">
                <img
                    className="w-[180px] h-[180px] rounded-full object-cover cursor-pointer"
                    src={previewImage || profilePicture || profileImage}
                    alt="Profile"
                    onClick={handleImageClick}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
            </div>

            {/* User Info */}
            <div className="flex-grow flex flex-col justify-between ml-4">
                <div className="hidden pl-2 sm:block font-bold text-3xl">{name}</div>
                <div className="flex flex-col sm:flex-row justify-evenly items-center m-4 space-y-4 sm:space-y-0">
                    <ul className="flex space-x-12 text-lg">
                        <li className="flex items-center">
                            <FaUserGraduate className="text-green-500 mr-2" /> {coursesEnrolled.length || 0} Enrolled Courses
                        </li>
                        <li className="flex items-center">
                            <FaBookOpen className="text-orange-500 mr-2" /> 0 Completed Courses
                        </li>
                    </ul>
                    <button
                        onClick={() => navigate('/editProfile')}
                        className="disabled sm:rounded-lg p-2 sm:bg-green-500 text-white"
                    >
                        Edit Profile
                    </button>
                    <button className="block sm:hidden rounded-lg p-2 bg-green-500 text-white">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;