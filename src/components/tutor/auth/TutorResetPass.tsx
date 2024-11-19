import { motion } from 'framer-motion'; 
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { toast } from "sonner";
import * as Yup from "yup";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { tutorEndpoints } from '../../../constraints/endpoints/tutorEndpoints';

const intitalValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Password must match")
    .required("Confirm passoword is required"),
});


const TutorResetPass: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { email } = location.state || { email: '' };
  const handleSubmit = async (
    values: typeof intitalValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await axios.post(tutorEndpoints.resetPassword, { email, password: values.password });
      if (response.data.success) {
        navigate("/tutor");
        toast.success("Password reset successful! You can now log in with your new password.");
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.log("Reset password error");
      toast.error("An error occurred while resetting your password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
    <div className="flex-1 bg-[#6227c2] flex justify-center items-center animate-fadeIn">
      <motion.div
        className="flex-1 bg-[#6227c2] flex justify-center items-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: -10, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
      >
        <Player
          autoplay
          loop
          src="https://lottie.host/7100dd4f-826b-421f-801b-752477ccd826/vBS1LriaZx.json"
          style={{ height: "80%", width: "80%" }}
        />
      </motion.div>
    </div>
      <div className="flex-1   flex flex-col justify-center items-center p-6">
      <motion.div
        className="flex-1 flex flex-col justify-center items-center p-6"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
      >
        <h2 className="text-2xl font-bold mb-2">User Reset Passowrd</h2>
        <p className="text-gray-600 mb-4">Kindly Reset your Password</p>
        <Formik
          initialValues={intitalValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm">
              <Field
                type="password"
                name="password"
                placeholder="New Password"
                className="w-full p-3 m-4 border shadow-lg  rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mx-2 px-2  text-xs"
              />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="w-full p-3 m-4 border shadow-lg rounded"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 mx-2 px-2  text-xs"
              />
              <button type="submit" className="w-full p-3 m-4 bg-[#000000]  text-white rounded-2xl hover:bg-[#44237a] ">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              {isSubmitting && (
                <div className="flex justify-center">
                  <span>Loading...</span>
                </div>
              )}
            </Form>
          )}
        </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorResetPass
