import React from 'react'
import Title from '../components/Title.jsx'
import contact from "../E-commerce MERN Assets/contact.jpg"
import NewLetterBox from '../components/newLetterBox.jsx'
import contactImage from '../E-commerce MERN Assets/contact1.jpeg'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function Contact() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col 
      bg-gradient-to-l from-[#190221] to-[#091c45] gap-12 pt-28 pb-12 px-4'>
      
      <Title text1={'CONTACT'} text2={'US'} />

      <div className='w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0'>
        
        {/* Left Side: Image */}
        <div className='w-full lg:w-1/2 flex items-center justify-center lg:justify-end pr-0 lg:pr-10'>
          <img 
            src={contactImage} 
            alt="TrendWave Fashion" 
            className='w-[85%] md:w-[70%] lg:w-[80%] rounded-lg shadow-2xl shadow-black/50 object-cover'
          />
        </div>

        {/* Right Side: Form and Details */}
        <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start'>
          <form className='w-[85%] md:w-[70%] lg:w-full max-w-md text-white'>
            <div className='mb-5'>
              <label htmlFor="fullName" className='block mb-2 text-sm font-medium text-gray-300'>Full Name</label>
              <input 
                type="text" 
                id="fullName"
                className='bg-white/5 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3'
                placeholder='John Doe'
              />
            </div>
            <div className='mb-5'>
              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-300'>E-mail</label>
              <input 
                type="email" 
                id="email"
                className='bg-white/5 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3'
                placeholder='your.email@trendwave.com'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-300'>Message</label>
              <textarea 
                id="message" 
                rows="4"
                className='bg-white/5 border border-white/20 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3'
                placeholder='Let us know how we can help...'
              ></textarea>
            </div>
            <button 
              type="submit"
              className='w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-300'
            >
              Contact Us
            </button>
          </form>

          {/* Contact Info + Social Icons Section */}
<div className='w-[85%] md:w-[70%] lg:w-full max-w-md mt-12 flex flex-col items-center text-white text-center'>

  {/* Social Icons */}
  <div className='flex gap-6 items-center justify-center mb-5'>
    <a href="#" className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110'>
      <FaFacebookF size={24} />
    </a>
    <a href="#" className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110'>
      <FaInstagram size={24} />
    </a>
    <a href="#" className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110'>
      <FaTwitter size={24} />
    </a>
  </div>

  {/* Divider Line */}
  <div className='w-[60px] h-[2px] bg-gradient-to-r from-[#6a11cb] to-[#2575fc] mb-5'></div>

  {/* Contact Details */}
  <div className='space-y-3'>
    <div>
      <h3 className='font-semibold text-lg mb-1 text-[#c9d6ff]'>Contact</h3>
      <p className='text-sm text-gray-300'>admin@trendwave.com</p>
    </div>
    <div>
      <h3 className='font-semibold text-lg mb-1 text-[#c9d6ff]'>Based In</h3>
      <p className='text-sm text-gray-300'>
        Faridabad, Haryana<br />India
      </p>
    </div>
  </div>

</div>

        </div>
      </div>
      
      <div className="w-full mt-12">
        <NewLetterBox />
      </div>

    </div>
  );
}

export default Contact;