import React from 'react'
import Logo from '../E-commerce MERN Assets/Trendwavelogo.png'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useState,useContext } from 'react';
import { userDataContext } from '../context/userContext.jsx';
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext.jsx';
import { MdHome } from "react-icons/md";
import { BiCollection } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";
import axios from 'axios';
import { shopDataContext } from '../context/ShopContext';

function Navbar() {
  let {getCurrentUser,userData}=useContext(userDataContext);
  let {serverUrl}=useContext(authDataContext)
  let {showSearch, setShowSearch,search,setSearch,getCartCount}=useContext(shopDataContext);
  let [showProfile, setShowProfile]=useState(false);
  let navigate=useNavigate();

  const handleLogOut=async()=>{
    try {
        let result= await axios.get(serverUrl+"/api/auth/logout",
            {withCredentials:true}
        )
        console.log(result.data);
        getCurrentUser()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
   <div className="w-[100vw] h-[70px] fixed top-0 z-10 flex items-center justify-between px-[30px]
    bg-gradient-to-r from-[#190221]/80 to-[#091c45]/80 backdrop-blur-md shadow-md shadow-[#141214b9]">
        {/*Logo section*/}
        <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[5px]'>
            <img src={Logo} alt='Trendwave logo' className='w-[30px]'/>
            <h1 className='text-[20px] text-[#ffffffd5] font-[Merriweather]'>TrendWave</h1>
        </div>

        {/*Navigation Links*/ }
         <div className='w-[50%] lg:w-[40%] hidden md:flex'>

            <ul className='flex items-center justify-center gap-[18px] text-[#ffffffd5] text-[13px]'>
                <li className='px-4 py-2 rounded-full bg-white/10 text-[#d7d2e6]  transition-all duration-300 
                  hover:bg-slate-500 cursor-pointer hover:text-white' onClick={()=>{navigate("/")}}>HOME</li>
                <li className='px-4 py-2 rounded-full bg-white/10 text-[#d7d2e6]  transition-all duration-300 
                  hover:bg-slate-500 cursor-pointer hover:text-white' onClick={()=>{navigate("/collection")}}>COLLECTIONS</li>
                <li className='px-4 py-2 rounded-full bg-white/10 text-[#d7d2e6]  transition-all duration-300 
                  hover:bg-slate-500 hover:text-white cursor-pointer ' onClick={()=>{navigate("/about")}}>ABOUT</li>
                <li className='px-4 py-2 rounded-full bg-white/10 text-[#d7d2e6]  transition-all duration-300 
                  hover:bg-slate-500 hover:text-white cursor-pointer ' onClick={()=>{navigate("/contact")}}>CONTACT</li>
            </ul>
         </div>

         <div className=' w-auto  md:w-[10%] flex items-center justify-end gap-[10px]'>
            {/*Search Bar */}
             {!showSearch && <FaSearch className=' w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer' 
             onClick={()=>{setShowSearch(true);navigate("/collection")}}/>}

             { showSearch && <IoSearchCircle className=' w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer' 
             onClick={()=>setShowSearch(false)}/>}

             {!userData && <FaUserCircle className='w-[25px] h-[25px] sm:w-[32px] sm:h-[32px] text-white cursor-pointer' 
             onClick={()=>{setShowProfile(prev=>!prev)} }/>}

             {userData && (
                 <div className='w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] bg-white text-black rounded-full
                  flex items-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md
                  justify-center font-semibold cursor-pointer' onClick={()=>{setShowProfile(prev=>!prev)} }>
                 {userData?.username ? userData.username.slice(0, 1).toUpperCase() : "U"}
                 </div>
              )}
            
             {/*Cart Icon */}
             <FaShoppingCart className='w-[25px] h-[25px] text-white cursor-pointer hidden
              md:block' onClick={()=>{navigate("/cart")}}/>
             <p className='absolute w-[17px] h-[18px] items-center justify-center
             bg-amber-50 px-[6px] py-[6px] text-black rounded-full
             text-[9px] top-[10px] right-[23px] hidden md:block'>
               {getCartCount()}</p>
         </div>

         { showSearch && <div className='w-[100%] h-[60px] bg-[#7679bedd] absolute 
         top-[100%] left-0 right-0 flex items-center justify-center'>
            <input type='text' className='lg:w-[50%] w-[80%] h-[60%] bg-[#261a51]
            rounded-[30px] px-[50px]
            placeholder:text-white text-white text-[16px]' placeholder='Search here' 
            onChange={(e)=>{setSearch(e.target.value)}} value={search}/>
         </div>}
 
          {/*Login  */}
         { showProfile && <div className='absolute w-[220px] h-[185px] bg-[#02051dd7]
         top-[110%] right-[4%] border-[1px] border-[#aaa9a9] 
         rounded-[10px] z-10 flex flex-col justify-between py-[10px] overflow-hidden'>
             <ul className=' text-[white] w-full h-full
             justify-around flex flex-col text-[16px]'>
                {!userData &&<li className=' hover:bg-[#28284a] px-[15px] py-[10px] cursor-pointer
                 rounded-[10px] transition-all duration-200'onClick={()=>{
                    navigate("/login")
                    setShowProfile(false)
                }} >Login</li>}

                {/*Logout Nav link */}
                {userData && <li className='hover:bg-[#28284a] px-[15px] py-[10px] cursor-pointer
                 rounded-[10px] transition-all duration-200' 
                 onClick={()=>
                 {
                    handleLogOut(); setShowProfile(false)
                 }}>
                    LogOut
                </li>}

                <li className='hover:bg-[#28284a] px-[15px] py-[10px] cursor-pointer
                 rounded-[10px] transition-all duration-200'  onClick={()=>
                 {
                    navigate("/order"); setShowProfile(false)
                 }}>Orders</li>
                <li className='hover:bg-[#28284a] px-[15px] py-[10px] cursor-pointer
                 rounded-[10px] transition-all duration-200' onClick={()=>
                 {
                   ()=>navigate("/about") ; setShowProfile(false)
                 }}>About</li>
             </ul>
         </div>}
    </div>

    {/*Bottom Navbar */}
    <div className='w-[100vw] h-[90px] flex items-center
      justify-between px-[20px] fixed bottom-0 left-0 bg-[#040223] md:hidden text-[12px] z-[120]'>
      <button className='text-white flex items-center justify-center flex-col gap-[2px]'
      onClick={()=>{navigate("/")}}>
        <MdHome className='w-[28px] h-[28px] text-white'/>
        Home
      </button>
      <button className='text-white flex items-center justify-center flex-col gap-[2px]'
      onClick={()=>{navigate("/collection")}}>
        <BiCollection className='w-[28px] h-[28px] text-white'/>
        Collections
      </button>
      <button className='text-white flex items-center justify-center flex-col gap-[2px]'
      onClick={()=>{navigate("/contact")}}>
        <IoMdContact className='w-[28px] h-[28px] text-white'/>
        Contact
      </button>
      <button className='text-white flex items-center justify-center flex-col gap-[2px]' 
      onClick={()=>{navigate("/cart")}}>
        <FaShoppingCart className='w-[28px] h-[28px] text-white'/>
        Cart
      </button>
      <p className='absolute w-[18px] h-[18px] items-center justify-center
      bg-amber-50 px-[4px] py-[3px] text-black rounded-full
      text-[9px] top-[10px] right-[23px] '>{getCartCount()}</p>
  </div>

    </>
  )
}

export default Navbar
