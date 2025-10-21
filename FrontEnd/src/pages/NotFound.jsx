import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      
      {/* Subtle animated background glow */}
      <div className='absolute inset-0 bg-[#0c2025] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#0b0b0b] before:via-[#141414] before:to-[#0b0b0b] before:opacity-30 before:animate-glow'></div>

      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center gap-6'>
        {/* Static Icon */}
        <FaRocket className='text-[#afe2f2] text-[50px] md:text-[70px]' />

        {/* 404 Text */}
        <h1 className='text-[#afe2f2] text-[60px] md:text-[90px] font-bold tracking-wider animate-fadeIn'>
          404
        </h1>

        {/* Subtitle */}
        <p className='text-[#dcfafd] md:text-[24px] text-[18px] font-medium animate-fadeIn delay-150'>
          Oops! Page Not Found
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/login')}
          className='mt-4 bg-[#030e11] border border-[#afe2f2] text-[#afe2f2] px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#afe2f2]'
        >
          Go Back to Login
        </button>
      </div>

      {/* Animations */}
      <style>
        {`
          /* Fade-in animation */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s forwards; }
          .delay-150 { animation-delay: 0.15s; }

          /* Subtle background glow */
          @keyframes glow {
            0% { transform: scale(1) translateY(0); opacity: 0.3; }
            50% { transform: scale(1.05) translateY(-10px); opacity: 0.5; }
            100% { transform: scale(1) translateY(0); opacity: 0.3; }
          }
          .before\\:animate-glow::before { animation: glow 6s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}

export default NotFound;
