import React, { useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import { Trash2, UploadCloud, File } from "lucide-react"; // Added File icon for certificate
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import { setTutor } from "../../redux/tutorSlice";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import TutorNavbar from "./TutorNavbar";
import TutorSidebar from "./TutorSidebar";
import tutorAxios from "../../constraints/axios/tutorAxios";

const EditProfile = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [certificateFileName, setCertificateFileName] = useState<string | null>(
    null
  ); // Added state for certificate name
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);
  const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
  const region = import.meta.env.VITE_AWS_REGION;

  const {
    id,
    email,
    phone,
    bio,
    expertise,
    cv,
    profilePicture,
    qualifications,
    linkedin,
    facebook,
    instagram,
    twitter,
    name,
  } = useSelector((state: RootState) => state.tutor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const randomFileName = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
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
    name: name || "",
    email: email || "",
    phone: phone || "",
    bio: bio || "",
    expertise: expertise || [""],
    qualifications: qualifications || [{ qualification: "", certificate: "" }],
    profilePicture: profilePicture || "",
    cv: cv || "",
    instagram: instagram || "",
    facebook: facebook || "",
    linkedin: linkedin || "",
    twitter: twitter || "",
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
      const response = await tutorAxios.post(
        tutorEndpoints.editProfile,
        { id, ...values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        throw new Error("Failed to submit form");
      }

      if (response) {
        console.log("response", response.data);

        const {
          _id,
          email,
          bio,
          cv,
          expertise,
          status,
          name,
          phone,
          instagram,
          facebook,
          linkedin,
          twitter,
          profilePicture,
          qualifications,
        } = response.data.result;

        dispatch(
          setTutor({
            id: _id,
            name,
            phone,
            facebook,
            instagram,
            linkedin,
            twitter,
            bio,
            cv,
            qualifications,
            profilePicture,
            expertise,
            status,
            email,
          })
        );

        navigate("/tutor/profile");
      }
    } catch (error) {
      console.error("Submit error:", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (<>
  <TutorNavbar/>
    <div className="flex h-screen">
        <TutorSidebar/>
      <div className="flex-1 m-4  rounded-md  max-h-screen px-6 py-10 lg:px-20">
        <h2 className="text-3xl mb-5 text-center font-bold">
          Edit profile
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Profile Picture */}
              <div className="flex"></div>
              <div className="flex ">
                <div className="flex flex-col items-center space-y-4 w-1/4">
                  <label className="text-lg font-medium">Profile Picture</label>
                  <div
                    className="h-48 w-48 bg-gray-100 border-2 border-dashed hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    {previewImage || profilePicture ? (
                      <img
                        src={previewImage || profilePicture}
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
                <div className="w-3/4  p-2">
                  <label className=" ml-3 text-lg font-medium">Bio</label>
                  <Field
                    as="textarea"
                    name="bio"
                    className="w-full h-52 p-4 border border-b rounded-2xl outline-none "
                    placeholder="Tell us about yourself..."
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {/* Expertise and Qualifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* name */}
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block  mb-1 font-medium">Email</label>
                  <p className="border bg-gray-100  p-3 w-full rounded-md ">
                    {email}
                  </p>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Phone</label>
                  <Field
                    type="tel"
                    name="phone"
                    className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Instagram</label>
                  <div className="flex items-center gap-2">
                    <FaInstagram className="text-pink-500" />
                    <Field
                      type="text"
                      name="instagram"
                      placeholder="Instagram Link"
                      className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <ErrorMessage
                      name="instagram"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Facebook</label>
                  <div className="flex items-center gap-2">
                    <FaFacebook className="text-blue-500" />
                    <Field
                      type="text"
                      name="facebook"
                      placeholder="Facebook Link"
                      className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="facebook"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">LinkedIn</label>
                  <div className="flex items-center gap-2">
                    <FaLinkedin className="text-blue-700" />
                    <Field
                      type="text"
                      name="linkedin"
                      placeholder="LinkedIn Link"
                      className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />
                    <ErrorMessage
                      name="linkedin"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Twitter</label>
                  <div className="flex items-center gap-2">
                    <FaTwitter className="text-blue-400" />
                    <Field
                      type="text"
                      name="twitter"
                      placeholder="Twitter Link"
                      className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="twitter"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Expertise Section */}
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

                {/* Qualifications Section */}
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
    </>

  );
};

export default EditProfile;
