import  { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { tutorEndpoints } from "../../../constraints/endpoints/tutorEndpoints";
import { setTutor } from "../../../redux/tutorSlice";
import { useDispatch } from "react-redux";

interface FormValues {
  otp: string[];
}

function TutorOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { forgotPass, email } = location.state || {
    forgotPass: false,
    email: "",
  };
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      otp: Array(6).fill(""),
    },
    onSubmit: async (values) => {
      try {
        console.log("otp response");
        const otp = values.otp.join("");
        const response = await axios.post(tutorEndpoints.otp, {
          otp,
          forgotPass,
        });
        console.log("otp response", response.data);
        if (response.data.success) {
          if (response.data.forgotPass) {
            console.log("xx");
            navigate("/tutor/resetPassword", { state: { email } });
          } else {
            const { _id, name, email, phone } = response.data.tutor;
            dispatch(setTutor({ id: _id, name, email, phone }));
            console.log("yy");
            navigate("/tutor/additionalInfo");
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error, "Error in sending the OTP from client");
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResendButton(true);
    }
  }, [countdown]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      formik.setFieldValue(`otp[${index}]`, value);
      if (value && index < inputRef.current.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
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
      {/* OTP Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 animate-fadeIn">
        <motion.div
          className="flex-1 flex flex-col justify-center items-center p-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
        >
          <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
          <p className="text-gray-600 mb-4">
            We've sent a code to your phone. Please enter it below.
          </p>
          <form onSubmit={formik.handleSubmit} className="flex space-x-4">
            {formik.values.otp.map((_, index) => (
              <input
                key={index}
                type="text"
                className="w-12 h-12 text-center text-2xl border shadow-lg rounded"
                maxLength={1}
                ref={(el) => (inputRef.current[index] = el)}
                value={formik.values.otp[index]}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </form>
          <button
            type="submit"
            onClick={() => formik.handleSubmit()} 
            className="mt-6 p-3 bg-[#000000] text-white rounded-2xl hover:bg-[#44237a]"
          >
            Verify OTP
          </button>
          {showResendButton ? (
            <button
              type="button"
              onClick={() => setCountdown(60)}
              className="mt-3 text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <p className="mt-3 text-gray-600">
              Resend OTP in {countdown} seconds
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
export default TutorOTP;
