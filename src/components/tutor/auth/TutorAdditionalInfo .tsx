import React, { useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion"; // Import motion

import { Trash2, UploadCloud, File } from "lucide-react"; // Added File icon for certificate
import * as Yup from "yup";
import axios from "axios";
import { tutorEndpoints } from "../../../constraints/endpoints/tutorEndpoints";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTutor } from "../../../redux/tutorSlice";

const TutorAdditionalInfo = () => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [cvFileName, setCvFileName] = useState<string | null>(null);
    const [certificateFileName, setCertificateFileName] = useState<string | null>(null); // Added state for certificate name
    const imageInputRef = useRef<HTMLInputElement>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);
    const certificateInputRef = useRef<HTMLInputElement>(null);
    const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
    const region = import.meta.env.VITE_AWS_REGION;

    const tutorId = useSelector((state:RootState)=>state.tutor.id)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const randomFileName = () => {
        return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    };

    const validationSchema = Yup.object().shape({
        bio: Yup.string().required("Bio is required"),
        expertise: Yup.array().of(
            Yup.string().required("Expertise field cannot be empty")
        ),
        qualifications: Yup.array().of(
            Yup.object().shape({
                qualification: Yup.string().required("Qualification is required"),
                certificate: Yup.string(),
            })
        ),
        profilePicture: Yup.string().required("Profile picture is required"),
        cv: Yup.string().required("CV is required"),
    });

    const initialValues = {
        bio: "",
        expertise: [""],
        qualifications: [{ qualification: "", certificate: "" }],
        profilePicture: "",
        cv: "",
    };

    const getPresignedUrlForUpload = async (
        filename: string,
        fileType: string
    ) => {
        try {
            const response = await axios.get(
                tutorEndpoints.getPresignedUrlForUpload,
                {
                    params: {
                        filename: filename,
                        fileType: fileType,
                    },
                }
            );
            return response.data.url;
        } catch (error) {
            console.error("Error fetching presigned URL:", error);
            return null;
        }
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: string) => void,
        fieldName: string
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const fileUrl = URL.createObjectURL(file);
            if (fieldName === "profilePicture") setPreviewImage(fileUrl);
            if (fieldName === "certificate") {
                setCertificateFileName(file.name);
            }

            // Generate unique filename
            const fileName = `${randomFileName()}_${file.name}`;
            const fileType = file.type;

            // Get presigned URL
            const uploadUrl = await getPresignedUrlForUpload(fileName, fileType);
            if (!uploadUrl) {
                throw new Error("Failed to get upload URL");
            }

            // Upload to S3
            const uploadResponse = await axios.put(uploadUrl, file, {
                headers: { "Content-Type": fileType },
            });

            if (!uploadResponse) {
                throw new Error("Failed to upload file");
            }

            // Set the final URL
            const finalUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
            setFieldValue(fieldName, finalUrl);

            if (fieldName === "cv") {
                setCvFileName(file.name); 
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setFieldValue(fieldName, "");
        }
    };

    const handleSubmit = async (
        values: typeof initialValues,
        { setSubmitting }: FormikHelpers<typeof initialValues>
    ) => {
        try {
            const response = await axios.post(tutorEndpoints.additionalInfo, {tutorId,...values}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response) {
                throw new Error("Failed to submit form");
            }

           if(response){
            console.log('response',response.data)

            const {_id,email,bio,cv,expertise,status,name,phone,profilePicture,qualifications}= response.data.result;

            dispatch(setTutor({id:_id,name,phone,bio,cv,qualifications,profilePicture,expertise,status,email}))

            navigate('/tutor')
           }
        } catch (error) {
            console.error("Submit error:", error);
            throw error;
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Section: Hidden on small screens */}
            <div className="hidden lg:flex flex-1 bg-[#698eff] justify-center items-center animate-fadeIn">
                <motion.div
                    className="flex-1  flex justify-center items-center"
                    initial={{ x: -100, opacity: 0 }} // Start position
                    animate={{ x: 0, opacity: 1 }} // End position
                    exit={{ x: -100, opacity: 0 }} // Exit animation
                    transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }} // Smooth easing
                >
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/7100dd4f-826b-421f-801b-752477ccd826/vBS1LriaZx.json"
                        style={{ height: "80%", width: "80%" }}
                    />
                </motion.div>
            </div>

            {/* Right Section: Form */}
            <div className="flex-1 bg-[#FCF6FF] overflow-y-auto max-h-screen px-6 py-10 lg:px-20">
                <h2 className="text-3xl mb-5 text-center font-bold">
                    Complete your profile
                </h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, isSubmitting }) => (
                        <Form className="space-y-6">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center space-y-4">
                                <label className="text-lg font-medium">Profile Picture</label>
                                <div
                                    className="h-48 w-48 bg-gray-100 border-2 border-dashed hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
                                    onClick={() => imageInputRef.current?.click()}
                                >
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500">Upload Image</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={imageInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileUpload(e, setFieldValue, "profilePicture")
                                    }
                                />
                                <ErrorMessage
                                    name="profilePicture"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="text-lg font-medium">Bio</label>
                                <Field
                                    as="textarea"
                                    name="bio"
                                    className="w-full h-28 p-4 shadow-lg rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tell us about yourself..."
                                />
                                <ErrorMessage
                                    name="bio"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Expertise and Qualifications */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="text-lg font-medium block mb-2">
                                        Expertise
                                    </label>
                                    {values.expertise.map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 mb-2"
                                        >
                                            <Field
                                                name={`expertise.${index}`}
                                                className="flex-1 h-10 p-2 shadow-lg rounded-lg"
                                                placeholder={`Expertise ${index + 1}`}
                                            />
                                            {values.expertise.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newExpertise = values.expertise.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setFieldValue("expertise", newExpertise);
                                                    }}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="mt-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                                        onClick={() =>
                                            setFieldValue("expertise", [...values.expertise, ""])
                                        }
                                    >
                                        Add More
                                    </button>
                                </div>
                                <div>
                                    <label className="text-lg font-medium block mb-2">
                                        Qualifications
                                    </label>
                                    {values.qualifications.map((_, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="flex items-center space-x-2">
                                                <Field
                                                    name={`qualifications.${index}.qualification`}
                                                    className="flex-1 h-10 p-2 shadow-lg rounded-lg"
                                                    placeholder={`Qualification ${index + 1}`}
                                                />
                                                {values.qualifications.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newQualifications =
                                                                values.qualifications.filter(
                                                                    (_, i) => i !== index
                                                                );
                                                            setFieldValue(
                                                                "qualifications",
                                                                newQualifications
                                                            );
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </div>
                                            {/* Certificate Upload */}
                                            <div className="flex items-center space-x-2 mt-2">
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                    onClick={() => certificateInputRef.current?.click()} 
                                                >
                                                    <File className="h-5 w-5 text-blue-500 mr-2" /> Upload
                                                    Certificate
                                                </button>
                                                {certificateFileName && (
                                                    <span className="text-sm text-gray-600">
                                                        {certificateFileName}
                                                    </span>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                ref={certificateInputRef}
                                                className="hidden"
                                                accept="application/pdf"
                                                onChange={(e) =>
                                                    handleFileUpload(
                                                        e,
                                                        setFieldValue,
                                                        `qualifications.${index}.certificate`
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="mt-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                                        onClick={() =>
                                            setFieldValue("qualifications", [
                                                ...values.qualifications,
                                                { qualification: "", certificate: "" },
                                            ])
                                        }
                                    >
                                        Add More
                                    </button>
                                </div>
                            </div>

                            {/* CV Upload */}
                            <div className="flex flex-col items-center">
                                <label className="text-lg  font-medium block mb-2">
                                    Upload CV (PDF only)
                                </label>
                                <div
                                    className="flex flex-col items-center justify-center cursor-pointer"
                                    onClick={() => cvInputRef.current?.click()}
                                >
                                    {cvFileName ? (
                                        <>
                                            <UploadCloud className="h-20 w-20 text-blue-500 hover:text-blue-600" />
                                            <span className="text-gray-700 mt-2">{cvFileName}</span>
                                        </>
                                    ) : (
                                        <UploadCloud className="h-20 w-20 text-blue-500 hover:text-blue-600" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={cvInputRef}
                                    className="hidden"
                                    accept="application/pdf"
                                    onChange={(e) => handleFileUpload(e, setFieldValue, "cv")}
                                />
                                <ErrorMessage
                                    name="cv"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TutorAdditionalInfo;
