import { motion } from "framer-motion"; 
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userEndpoints } from "../../../constraints/endpoints/userEndPoints";
import * as Yup from "yup";
import { Form, Formik, ErrorMessage, Field } from "formik";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email must be a valid Gmail address"
    )
    .required("Email Required"),
});
const initialValues = {
  email: "",
};
const UserForgotPass: React.FC = () => {
  const otpCountdown = localStorage.getItem("otpCountdown");
  const navigate = useNavigate();
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      if (otpCountdown === "0") {
        localStorage.removeItem("otpCountdown");
      }
      console.log("llll", otpCountdown);
      const response = await axios.post(userEndpoints.forgotPasword, values);
      if (response.data.success) {
        console.log(response);
        navigate("/otp", { state: { forgotPass: true, email: values.email } });
      } else {
        toast.error("Email not exist");
      }
    } catch (error) {
      console.log("forgot password", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 bg-[#ecf5fb] flex justify-center items-center animate-fadeIn">
        <motion.div
          className="flex-1 bg-[#ecf5fb] flex justify-center items-center"
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
          <h2 className="text-2xl font-bold mb-2">Forgot Password? </h2>
          <p className="text-gray-600 mb-4">
            No worries , Please upload you registered email address
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full max-w-sm">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 m-4 border shadow-lg  rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mx-2 px-2  text-xs"
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full p-3 m-4 bg-[#000000]  text-white rounded-2xl hover:bg-[#44237a] "
                >
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

export default UserForgotPass;
