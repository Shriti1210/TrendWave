import React from 'react'
import back1 from "../E-commerce MERN Assets/Back1.png"
import back2 from "../E-commerce MERN Assets/Back2.png"
import back3 from "../E-commerce MERN Assets/Back3.png"
import back4 from "../E-commerce MERN Assets/Back4.png"
import back5 from "../E-commerce MERN Assets/Back5.png"

function Background({heroCount}) {
  
    if(heroCount===0){
        return <img src={back1} alt='back 1' className='w-[100%] h-[100%]
        float-left overflow-auto object-cover'/>   
    }else if(heroCount===1){
        return <img src={back2} alt='back 2' className='w-[100%] h-[100%]
        float-left overflow-auto object-cover'/>
    }else if(heroCount===2){
        return <img src={back3} alt='back 3' className='w-[100%] h-[100%]
        float-left overflow-auto object-cover'/>
    }else if(heroCount===3){
        return <img src={back4} alt='back 4' className='w-[100%] h-[100%]
        float-left overflow-auto object-cover'/>
    }else{ 
        return <img src={back5} alt='back 5' className='w-[100%] h-[100%]
        float-left overflow-auto object-cover'/>
    }
  
}

export default Background
