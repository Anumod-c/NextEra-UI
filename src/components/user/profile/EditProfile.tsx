import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import UserNavbar from "../UserNavbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userEndpoints } from "../../../constraints/endpoints/userEndPoints";
import userAxios from "../../../constraints/axios/userAxios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";

// Initial values for the form
const initialValues = {
  name: "",
  email: "",
  phone: "",
  age: 0,
  bio: "",
  instagram: "",
  facebook: "",
  linkedin: "",
  twitter: "",
};

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  age: Yup.number()
    .min(1, "Age must be a positive number")
    .required("Age is required"),
  bio: Yup.string().required("Bio is required"),
  // instagram: Yup.string().url("Invalid Instagram URL"),
  // facebook: Yup.string().url("Invalid Facebook URL"),
  // linkedin: Yup.string().url("Invalid LinkedIn URL"),
  // twitter: Yup.string().url("Invalid Twitter URL"),
});

const EditProfile: React.FC = () => {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const { id,email, name, phone, bio, age,instagram,twitter,facebook,linkedin} = useSelector(
    (state: RootState) => state.user
  );

  const handleSubmit = async(values: typeof initialValues) => {
    const response = await userAxios.post(userEndpoints.editProfile,{...values,id});
    if(!response.data.success){
         toast.error("Couldnt save")

    }else
    dispatch(setUser({id,...values}))
    navigate('/profile')
   toast.success("Profile updated successfully")
  };

  return (
    <>
      <UserNavbar />
      <div className="max-w-4xl mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        <Formik
          initialValues={{
            name: name || "",
            email: email || "",
            phone: phone || "",
            age: age || 0,
            bio: bio || "",
            instagram:instagram|| "",
            facebook: facebook||"",
            linkedin:linkedin|| "",
            twitter:twitter|| "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Side - Basic Details */}
                <div className="w-full md:w-8/12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      <label className="block mb-1 font-medium">Age</label>
                      <Field
                        type="number"
                        name="age"
                        className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div >
                      <label className="block  mb-1 font-medium">Email</label>
                      <p className="border bg-gray-100  p-3 w-full rounded-md ">
                        
                        {email}
                        </p>
                      {/* <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      /> */}
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
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Bio</label>
                    <Field
                      as="textarea"
                      name="bio"
                      className="border p-3 w-full rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
                      rows={3}
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Right Side - Social Media Links */}
                <div className="w-full md:w-4/12">
                  <div className="flex flex-col gap-4">
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
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditProfile;
