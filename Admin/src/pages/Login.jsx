import React, {useContext, useState} from 'react'
import Logo from '../E-commerce MERN Assets/Trendwavelogo.png'
import { FaRegEye } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { authDataContext } from '../context/AuthContext.jsx';
import { adminDataContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import Loading from '../component/Loading.jsx';


function Login() {
   let [showPass,setShowPass]=useState(false);
   let [email,setEmail]=useState("");
   let [password,setPassword]=useState("");
   let {serverUrl}=useContext(authDataContext)
   let {adminData,getAdmin}=useContext(adminDataContext);
   const [loading,setLoading]=useState(false)
   let navigate=useNavigate()
    
   let AdminLogin=async(e)=>{
    setLoading(true);
    e.preventDefault();
    try {
        const result=await axios.post(serverUrl+ '/api/auth/adminlogin',
            {email,password}, 
            {withCredentials:true},
            
        )
        console.log(result.data);
        toast.success("admin Login success");
        setLoading(false);
        getAdmin(); 
        navigate("/")
    } catch (error) {
        console.log(error)
        toast.error("AdminLogin Error")
    }
   }

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#190221] to-[#091c45] text-[white]
        flex flex-col items-center justify-start">
            <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px]
            cursor-pointer">
               <img className="w-[40px]" src={Logo} alt=""/>
               <h1 className="text-[22px] font-[Merriweather]">TrendWave</h1>
            </div>
            <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
                    <span className="text-[25px]">Admin Login</span>
                    <span className="text-[16px] mb-[10px]">Welcome to <b>TrendWave</b> , Start creating <b>Trends</b></span>
            </div>
            <div className='max-w-[600px] w-[90%]  bg-[#00000025] border-[1px] 
            border-[#96969635]  backdrop-blur-2xl rounded-lg shadow-lg flex items-center 
            justify-center py-[30px] px-[20px]'>
                <form action="" onSubmit={AdminLogin} className='w-[90%] flex flex-col items-center justify-start gap-[20px] pt-[40px]'>

                   <div className="w-[90%] h-auto flex flex-col items-center justify-center
                   gap-[15px] relative">

                        <input type="text" 

                        className=" w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px]
                        font-semibold focus:outline-none focus:border-[#5555f6]"
                         placeholder="Email" 
                         required 

                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}/>

                        <input type={showPass?"text":"password"}
                         className=" w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg
                          bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold 
                          focus:outline-none focus:border-[#5555f6] pr-[45px]"
                          placeholder="Password" 
                          required
                          onChange={(e)=>setPassword(e.target.value)}
                          value={password}
                          />

                        { !showPass && <FaRegEye className="w-[22px] h-[22px] cursor-pointer absolute right-[15px] top-1/2 -translate-y-1/2" onClick={()=>setShowPass(prev=> !prev)}/>}

                        { showPass && <FaEye className="w-[20px] h-[20px] cursor-pointer absolute right-[15px] top-1/2 -translate-y-1/2 "  onClick={()=>setShowPass(prev=> !prev)}/>}

                        <button className="w-[100%] h-[50px] bg-[#4545ea] rounded-lg font-semibold flex items-center 
                        justify-center text-[18px] hover:bg-[#5a5af9] transition duration-200 mt-[10px] cursor-pointer">
                            {
                              loading ?
                              <Loading/>:
                              "Login"
                            }</button>
                        
                   </div>
                </form>
            </div>
        </div>
  )
}

export default Login
