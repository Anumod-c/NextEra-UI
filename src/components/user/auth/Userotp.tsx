import React, { useRef, useState, useEffect } from 'react';
import tutorLoginImage from '../../../assets/tutorlogin.png';
import axios from 'axios';
// import { userAxios } from '../../../constraints/axios/userAxios';
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
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            navigate('/')
        }
    }, [navigate]);
    const location = useLocation();
    const { forgotPass, email } = location.state || { forgotPass: false, email: '' };
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const [countdown, setCountdown] = useState(60);

    const [showResendButton, setShowResendButton] = useState(false);
    const formik = useFormik<FormValues>({
        initialValues: {
            otp: Array(6).fill(''),
        },
        onSubmit: async (values) => {
            try {
                console.log('otp response')
                const otp = values.otp.join('');

                const response = await axios.post(userEndpoints.otp, { otp, forgotPass });
                console.log('otp response', response)
                if (response.data.success) {
                    if (response.data.forgotPass) {
                        navigate('/resetPassword', { state: { email } })
                    } else {
                        navigate('/login');
                    }
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error, 'Error in sending the OTP from client');
                toast.error('Something went wrong. Please try again.');
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^\d*$/.test(value)) {
            formik.setFieldValue(`otp[${index}]`, value);

            if (value && index < inputRef.current.length - 1) {
                inputRef.current[index + 1]?.focus();
            }
        }
    };

    return (
        <div className="flex h-screen">
            {/* Image Section */}
            <div className="flex-1 bg-[#6227c2] flex justify-center items-center">
                <img src={tutorLoginImage} alt="otp-img" className="w-4/5 max-w-lg" />
            </div>
            {/* OTP Section */}
            <div className="flex-1 flex flex-col justify-center items-center p-6">
                <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
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
                    onClick={() => formik.handleSubmit()}  // Corrected typing
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
            </div>
        </div>
    );
}

export default UserOtp;
