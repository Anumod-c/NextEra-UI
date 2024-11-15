import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { saveAddCourse } from "../../redux/courseSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { toast } from "sonner";
import { tutorEndpoints } from "../../constraints/endpoints/tutorEndpoints";
import CryptoJS from "crypto-js";
import tutorAxios from "../../constraints/axios/tutorAxios";





interface AddCourseProps {
  onNext: () => void;
  onBack: () => void;
}
const randomImageName = (): string => CryptoJS.SHA256(Date.now().toString()).toString(CryptoJS.enc.Hex);
const validationSchema = Yup.object({
  courseTitle: Yup.string().required("Course name is required"),
  coursePrice: Yup.number().min(1, "Course price must be a positive number").required("Course price is required"),
  courseDiscountPrice: Yup.number().min(1, "Discount price must be a positive number").required("Discount price is required").test(
    "is-less-than-price",
    "Discount price should be less than the actual price",
    function (value) {
      return value < this.parent.coursePrice;
    }
  ),
  courseDesc: Yup.string().required("Course description is required"),
  courseCategory: Yup.string().required("Course category is required"),
  courseLevel: Yup.string().required("Course level is required"),
  demoURL: Yup.string().url("Invalid URL").required("Demo URL is required"),
  thumbnail: Yup.string().required("Thumbnail is required"),
});
const AddCourse: React.FC<AddCourseProps> = ({ onNext, onBack }) => {
  const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME
  const region = import.meta.env.VITE_AWS_REGION
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.course.addCourse);
  console.log('formdata',formData);
  
  const tutorId = useSelector((state:RootState)=>state.tutor.id);
  console.log('tutorId',tutorId);

  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null); // State for storing the presigned URL

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getPresignedUrlForUpload = async (fileName: string, fileType: string) => {
    try {
      const response = await tutorAxios.get(tutorEndpoints.getPresignedUrlForUpload, {
        params: {
          filename: fileName,
          fileType: fileType
        }
      });
      return response.data.url;
    } catch (error) {
      console.error("Error fetching presigned URL", error);
      toast.error("Error fetching upload URL");
      return null;
    }
  };

  const handleFileUpload = async (file: File) => {
    const fileName = `${randomImageName()}_${file.name.replace(/\s+/g, '')}`;
    const fileType = file.type.startsWith('video') ? 'video' : 'image';

    // Get upload URL
  const uploadUrl = await getPresignedUrlForUpload(fileName, fileType);
  if (uploadUrl) {
    try {
      // Upload the file
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        }
      });
      const viewUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`
      console.log('View URL:', viewUrl);
  
      // const viewUrl = await getPresignedUrlForDownload(fileName);
      
      setThumbnailUrl(viewUrl); // Set the URL used for viewing
        toast.success("Thumbnail uploaded successfully");
        console.log(typeof(viewUrl),'typeofff')
        console.log('thumbnail url which i will modify  now',viewUrl);
        
        setPreviewImage(viewUrl)
        return viewUrl
      } catch (error) {
        console.error("Error uploading file", error);
        toast.error("Error uploading thumbnail");
      }
      
    }
    
  };
  // const getPresignedUrlForDownload = async (filename: string) => {
  //   try {
  //     const response = await axios.get(tutorEndpoints.getPresignedUrlForDownload, {
  //       params: {
  //         filename: filename,
  //       }
  //     });
  //     return response.data.url;
  //   } catch (error) {
  //     console.error("Error fetching download URL", error);
  //     toast.error("Error fetching download URL");
  //     return null;
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] bg-white shadow-lg rounded-lg px-8 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Course
        </h2>
        <Formik
          initialValues={formData || {
            courseTitle: "",
            coursePrice: 0,
            courseDiscountPrice: 0,
            courseDesc: "",
            courseCategory: "",
            courseLevel: "",
            demoURL: "",
            thumbnail: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {

            const courseData ={tutorId,...values}
            console.log(thumbnailUrl,'thumbanuil url which i will modify now');          
            dispatch(saveAddCourse(courseData));            
              onNext();
           
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <section className="flex flex-col gap-8">
                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-lg font-medium text-gray-700">Course Name</label>
                  <Field
                    name="courseTitle"
                    type="text"
                    className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Course Name"
                  />
                  <ErrorMessage name="courseTitle" component="div" className="text-red-600" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Course Price</label>
                    <Field
                      name="coursePrice"
                      type="number"
                      className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Course Price"
                    />
                    <ErrorMessage name="coursePrice" component="div" className="text-red-600" />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Discount Price</label>
                    <Field
                      name="courseDiscountPrice"
                      type="number"
                      className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Discount Price"
                    />
                    <ErrorMessage name="courseDiscountPrice" component="div" className="text-red-600" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <label className="text-lg font-medium text-gray-700">Course Description</label>
                  <Field
                    as="textarea"
                    name="courseDesc"
                    rows={4}
                    className="w-full h-24 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Write something here..."
                  />
                  <ErrorMessage name="courseDesc" component="div" className="text-red-600" />
                </div>

                <div className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Course Category</label>
                    <Field as="select" name="courseCategory" className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Category</option>
                      <option value="DataScience">Data Science</option>
                      <option value="AI&ML">Artificial Intelligence</option>
                      <option value="NodeJS">NodeJS</option>
                      <option value="React">React</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="MongoDB">MongoDB</option>
                    </Field>
                    <ErrorMessage name="courseCategory" component="div" className="text-red-600" />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <label className="text-lg font-medium text-gray-700">Course Level</label>
                    <Field as="select" name="courseLevel" className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </Field>
                    <ErrorMessage name="courseLevel" component="div" className="text-red-600" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <label className="text-lg font-medium text-gray-700">Demo URL</label>
                  <Field
                    name="demoURL"
                    type="text"
                    className="w-full h-12 rounded-md bg-gray-100 px-4 py-2 text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter URL"
                  />
                  <ErrorMessage name="demoURL" component="div" className="text-red-600" />
                </div>

                <div className="flex flex-col items-center justify-center">
                  <label className="text-lg font-medium text-gray-700 mb-2">
                    Add Thumbnail 
                  </label>
                  <div
                    className="w-full sm:max-w-[400px] h-0 lg:pb-[14.25%] md:pb-[32.25%] pb-[55.25%] relative rounded-md bg-gray-100 border-2 border-dashed border-gray-300 hover:bg-gray-200 cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    {previewImage || formData.thumbnail ? (
                      <img
                        src={previewImage || formData.thumbnail}
                        alt="Thumbnail Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                        Upload Image
                      </span>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={async(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                       
                        const s3url = await handleFileUpload(file);
                      
                        setFieldValue('thumbnail', s3url || formData.thumbnail); // Setting file name as thumbnail
                      }
                    }}
                  />
                  
                </div>
                

                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    onClick={onBack}
                    className="py-2 mb-4 px-8 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="py-2 mb-4 px-8 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
                
               
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCourse;
