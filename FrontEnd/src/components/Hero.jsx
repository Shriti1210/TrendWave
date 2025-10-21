import React from 'react'
import { FaCircle } from "react-icons/fa";


function Hero({heroCount,setHeroCount}) {
  return (
    <div className='w-[40%] h-[100%] relative'>
      <div className='absolute md:top-[400px] lg:top-[500px]
      top-[160px] left-[10%] flex items-center justify-center
      gap-[10px]'>
        <FaCircle className={`w-[14px] ${heroCount===0? "fill-orange-400":"fill-white"}`}
         onClick={()=>setHeroCount(0)}/>
         <FaCircle className={`w-[14px] ${heroCount===1? "fill-orange-400":"fill-white"}`}
         onClick={()=>setHeroCount(1)}/>
         <FaCircle className={`w-[14px] ${heroCount===2? "fill-orange-400":"fill-white"}`}
         onClick={()=>setHeroCount(2)} />
        <FaCircle className={`w-[14px] ${heroCount===3? "fill-orange-400":"fill-white"}`}
         onClick={()=>setHeroCount(3)} />
         <FaCircle className={`w-[14px] ${heroCount===4? "fill-orange-400":"fill-white"}`}
         onClick={()=>setHeroCount(4)} />
      </div>
    </div>
  )
}

export default Hero
