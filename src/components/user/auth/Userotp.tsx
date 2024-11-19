import  { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { Player } from "@lottiefiles/react-lottie-player";
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { userEndpoints } from '../../../constraints/endpoints/userEndPoints';
import { useLocation } from 'react-router-dom';

interface FormValues {
  otp: string[];
}

function UserOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { forgotPass, email, userId } = location.state || { forgotPass: false, email: '', userId: '' };
  console.log(location.state, 'location.state')
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const [countdown, setCountdown] = useState<number>(() => {
    const savedCountdown = localStorage.getItem('otpCountdown');
    return savedCountdown ? Number(savedCountdown) : 60;
  });

  const [showResendButton, setShowResendButton] = useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      otp: Array(6).fill(''),
    },
    onSubmit: async (values) => {
      try {
        const otp = values.otp.join('');
        const response = await axios.post(userEndpoints.otp, { otp, userId, forgotPass });
        console.log('ereeeeeee', response);
        localStorage.removeItem('otpCountdown')

        if (response.data.success) {
          if (response.data.forgotPass) {
            navigate('/resetPassword', { state: { email } });
          } else {
            navigate('/login');
          }
        } else {
          toast.error(response.data.message || 'Invalid OTP. Please try again.');
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  const resendOtp = async () => {
    try {
      const response = await axios.post(userEndpoints.resendOtp, { email, forgotPass });
      if (response.data.success) {
        toast.success('OTP resend successfully');
        setCountdown(60);
        setShowResendButton(false);
        localStorage.setItem('otpCountdown', '60');
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Failed to resenf OTP")
    }
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        const newCountdown = countdown - 1;
        setCountdown(newCountdown);
        localStorage.setItem('otpCountdown', newCountdown.toString());
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResendButton(true);
      localStorage.setItem('otpCountdown', '0')
    }
  }, [countdown]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      formik.setFieldValue(`otp[${index}]`, value);
      if (value && index < inputRef.current.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };
  const isOtpComplete = formik.values.otp.every((digit) => digit !== '');

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
      {/* OTP Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 animate-fadeIn">
        <motion.div
          className="flex-1 flex flex-col justify-center items-center p-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.68, -0.55, 0.27, 1.55] }}
        >        <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
          <p className="text-gray-600 mb-4">We've sent a code to your phone. Please enter it below.</p>
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
            disabled={!isOtpComplete || countdown === 0}  // Disabled if OTP is incomplete or countdown is zero
            className={`mt-6 p-3 text-white rounded-2xl ${isOtpComplete && countdown > 0 ? 'bg-[#000000] hover:bg-[#44237a]' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Verify OTP
          </button>
          {showResendButton ? (
            <button
              type="button"
              onClick={resendOtp}
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

export default UserOtp;
