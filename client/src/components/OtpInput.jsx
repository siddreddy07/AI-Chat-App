import { axiosInstance } from '@/lib/axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OtpInput = ({email, onOtpVerified }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()
  // Handle input changes (typing digits)
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numeric input
    if (value.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if it's not the last one
      if (index < 5 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle backspace keydown (move focus to previous input if empty)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        // Move focus to previous input if current input is empty
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      } else {
        // If current input has value, clear the input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Simulate OTP verification (Replace with actual API call)
  const verifyOtp = async () => {
    setIsLoading(true);
    setError('');

    const otpString = otp.join(''); // Join OTP array into a string

    // Simulate an API call for OTP verification
    try {
      // Replace with your actual API request here:
      const response = await axiosInstance.post('/auth/verify-email',{ email:email,otp: otpString })
        console.log(response)
      
      if (response.status==200) {
        const {data} = response 
        // If the OTP is verified successfully, pass the result to the parent
        onOtpVerified(data); // Send the response to the parent component
        toast.success('Verified successfully')    
    }

    } catch (err) {
      toast.error('Error verifying OTP, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-zinc-900 items-center gap-6 p-6 rounded-lg  max-w-sm mx-auto">
      <h1 className="text-xl font-bold text-white">One Time Password* Verification</h1>

      <div className="flex justify-center gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => e.target.select()} // Automatically select content when focused
            className="w-12 h-12 text-xl text-center border border-zinc-300 rounded-md focus:border-zinc-400"
          />
        ))}
      </div>

      <button
        onClick={verifyOtp}
        disabled={isLoading || otp.includes('')}
        className="mt-4 px-6 py-2 disabled:bg-zinc-900 shadow-inherit border border-zinc-900 text-zinc-300 font-semibold bg-zinc-950 rounded-lg disabled:text-zinc-800 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}
      <p className="text-base text-gray-300 mt-2">Enter the 6-digit OTP sent to your email address</p>
    </div>
  );
};

export default OtpInput;
