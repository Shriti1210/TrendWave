import React, { useState ,useContext} from "react";
import Logo from '../E-commerce MERN Assets/Trendwavelogo.png'
import {useNavigate} from 'react-router-dom'
import  google from "../E-commerce MERN Assets/googlelogo.png"
import  microsoft from "../E-commerce MERN Assets/microsoft.png"
import { FaRegEye } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import axios from 'axios'
import { signInWithPopup, fetchSignInMethodsForEmail, 
  linkWithCredential ,EmailAuthProvider} from "firebase/auth";
import {auth, googleProvider, microsoftProvider } from "../../utils/firebase";
import { userDataContext } from "../context/userContext";



export default function Registration(){
    let navigate=useNavigate();
    const[showPass,setShowPass]=useState(false);
    let {serverUrl}=useContext(authDataContext);
    let [username,setUsername]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let {userdata,getCurrentUser}=useContext(userDataContext)

    const handleSignup=async(e)=>{
        e.preventDefault();
        try {
            const result=await axios.post(serverUrl + '/api/auth/registration',
            {username,email,password}, {withCredentials:true} )
            getCurrentUser()
            console.log(result.data);
            navigate("/");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    
    //google signup
    const googleSignUp=async()=>{
        try {
            const response=await signInWithPopup(auth,googleProvider) ;
            let user=response.user;
            let username=user.displayName;
            let email=user.email;

            const result=await axios.post(serverUrl+ "/api/auth/googlelogin",
                {username,email}, {withCredentials:true}
            )
            console.log(result.data);
            getCurrentUser()
            navigate("/")
        } catch (error) {
            console.error("Google signup error:", error);
        }
    }

    // Microsoft Sigup
    const microsoftSignup = async () => {
          try {
              const response = await signInWithPopup(auth, microsoftProvider);
              console.log(response.user);
              let user = response.user;
              let username = user.displayName;
              let email = user.email;

              const result = await axios.post(serverUrl + "/api/auth/microsoftlogin",
               { username, email },
               { withCredentials: true }
               );
              console.log("Microsoft signup success:", result.data);
              getCurrentUser()
              navigate("/")

          } catch (error) {
               if (error.code === "auth/account-exists-with-different-credential") {
                  const pendingCred = error.credential;
                  const email = (error.customData?.email || "").toLowerCase().trim();

                  // Get the existing provider for that email
                  const methods = await fetchSignInMethodsForEmail(auth, email);
                  console.log("Existing methods for this email:", methods);

                  if (methods.includes("google.com")) {
                     // User must sign in with Google first
                     const googleResult = await signInWithPopup(auth, googleProvider);

                     // Link Microsoft credentials to that Google user
                     await linkWithCredential(googleResult.user, pendingCred);

                     console.log("✅ Linked Microsoft to existing Google account!");
                  }

                }else {
                console.error("Microsoft Signup Error:", error);
                }
         } 
            
        }     
 
    return (
        <div className="w-full min-h-screen bg-gradient-to-l from-[#190221] to-[#091c45] text-[white]
        flex flex-col items-center justify-start">
            <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px]
            cursor-pointer" onClick={()=>navigate("/")}>
               <img className="w-[40px]" src={Logo} alt=""/>
               <h1 className="text-[22px] font-[Merriweather]">TrendWave</h1>
            </div>
            <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
                    <span className="text-[25px]">Registartion Page</span>
                    <span className="text-[16px] mb-[10px]">Welcome to <b>TrendWave</b> , Move with the <b>Trend</b></span>
            </div>
            <div className='max-w-[600px] w-[90%] h-auto bg-[#00000025] border-[1px] 
            border-[#96969635]  backdrop-blur-2xl rounded-lg shadow-lg flex items-center 
            justify-center '>

                <form action="" onSubmit={handleSignup} className='w-[90%] flex flex-col items-center justify-start gap-[20px] pt-[40px]'>
                   <div className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center
                   justify-center gap-[10px]  cursor-pointer' onClick={googleSignUp}>
                      <img src={google} alt="Google Logo" className='w-[30px]'/> Registration with Google
                   </div> 
                   <div className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center
                   justify-center gap-[10px] cursor-pointer' onClick={microsoftSignup}>
                      <img src={microsoft} alt="Microfsoft Logo" className='w-[30px]'/> Registration with Microsoft
                   </div> 
                   <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
                        <div className="w-[40%] h-[1px] bg-[#96969635]"></div><span>OR</span>
                        <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
                   </div>
                   <div className="w-[90%] h-auto flex flex-col items-center justify-center
                   gap-[15px] relative">
                        <input type="text" className=" w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px]
                        font-semibold focus:outline-none focus:border-[#5555f6]" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)} value={username}/>

                        <input type="text" className=" w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px]
                        font-semibold focus:outline-none focus:border-[#5555f6]" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>

                        <input type={showPass?"text":"password"} className=" w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px]
                        font-semibold focus:outline-none focus:border-[#5555f6]"
                        placeholder="Password" 
                        required 
                        onChange={(e)=>setPassword(e.target.value)} value={password}/>

                        { !showPass && <FaRegEye className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] " onClick={()=>setShowPass(prev=> !prev)}/>}
                        { showPass && <FaEye className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] "  onClick={()=>setShowPass(prev=> !prev)}/>}

                        <button className="w-[100%] h-[50px] bg-[#4545ea] rounded-lg font-semibold flex items-center 
                        justify-center mt-[20px] text-[18px]">
                            Create Account</button>
                        <p className="flex gap-[10px]">Already have an Account?
                            <span className="text-[#5555f6cf] font-semibold  text-[17px] cursor-pointer" onClick={()=>navigate("/login")}>Login</span></p>
                   </div>
                </form>
            </div>
        </div>
    )
}