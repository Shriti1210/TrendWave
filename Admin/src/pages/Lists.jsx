import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Lists() {
  let[list,setList]=useState([]);
  let {serverUrl}=useContext(authDataContext)

  const fetchList=async()=>{
    try {
      let result=await axios.get(serverUrl+"/api/product/list" )
      setList(result.data);
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList=async(id)=>{
    try {
      let result=await axios.post(`${serverUrl}/api/product/remove/${id}`
        ,{},{withCredentials:true}
      )
      if(result.data){
        fetchList()
      }else{
        console.log("Failed to remove product")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
      fetchList()
  },[])

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l
     from-[#190221] to-[#091c45] text-[white] overflow-x-hidden
     relative' >
        <Nav/>
        <div className='w-[100%] h-[100%] flex items-center
        justify-start'>
          <Sidebar/>
          <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px]
          mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px]
          ml-[150px]'>
              <div className='w-[400px] h-[50px] text-[28px] md:text-[40px]
              mb-[20px] text-white'>All Listed Products</div>

              {
                list ?.length>0 ? (
                  list.map((item,index)=>(
                     <div className='w-[90%] h-[160px]
                     bg-slate-600 rounded-xl flex items-center justify-start
                     gap-[5px] md:gap-[30px] p-[10px] md:px-[30px] overflow-hidden'key={index}>
                         <img 
                         src={item.image1} 
                         alt={item.name|| 'Product'}
                         className='w-[30%] md:w-[120px]
                         h-[90%] rounded-lg'/>
                         <div className='w-[90%] h-[80%] flex flex-col items-start
                         justify-center gap-[2px]'>
                             <div className='w-[100%] md:text-[20px] text-[15px]
                             text-[#bef0f3]'>{item.name}</div>
                             <div className='md:text-[17px] text-[15px] text-[#bef0f3]'>
                                {item.category}
                             </div>
                             <div className='md:text-[17px] text-[15px] text-[#bef0f3] '>
                                ₹{item.price}
                             </div>
                         </div>
                         <div className='w-[10%] h-[100%] bg-transparent
                             flex items-center justify-center cursor-pointer'>
                                 <span className='w-[35px] h-[30%] flex items-center
                                 justify-center rounded-md hover:bg-red-500 md:hover:text-black
                                 hover:text-red-300 '
                                  onClick={()=>removeList(item._id)}>X</span>
                             </div>
                      </div>
                  ))
                )
                :(
                  <div className='text-white text-lg'>No Products Available.
                  </div>
                )
              }
          </div>
        </div>
      
    </div>
  )
}

export default Lists;
