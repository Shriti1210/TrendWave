import React from 'react'
import Logo from "../E-commerce MERN Assets/Trendwavelogo.png"

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-l from-[#190221] to-[#091c45] text-[#aaf5fa]">
      <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand / About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="TrendWave logo" className="w-10 h-10" />
              <span className="text-[20px] font-semibold">TrendWave</span>
            </div>

            <p className="text-sm md:text-[15px] text-[#a5e8f7] opacity-85 leading-relaxed max-w-[420px]">
              TrendWave — handpicked styles & honest prices, all in one place. Discover tasteful collections,
               speedy delivery, simple returns, and customer care that actually listens — 
               shopping made effortless.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[16px] font-medium text-[#a5e8f7]">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#dbeffd]">
              <li className="cursor-pointer hover:underline">Home</li>
              <li className="cursor-pointer hover:underline">Collections</li>
              <li className="cursor-pointer hover:underline">About Us</li>
              <li className="cursor-pointer hover:underline">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[16px] font-medium text-[#a5e8f7]">Get in touch</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#dbeffd]">
              <li>India: +91-98765-43210</li>
              <li>Email: contact@trendwave.com</li>
              <li className="hidden md:block">US: +1-123-456-7890</li>
              <li className="hidden md:block">admin@trendwave.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 text-center text-sm text-[#dbeffd] opacity-90">
          © 2025 TrendWave — All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

export default Footer
