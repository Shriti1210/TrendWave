import React, { useEffect, useState } from 'react'
import Background from '../components/Background.jsx';
import Hero from '../components/Hero';
import Product from './Product.jsx';
import OurPolicy from '../components/OurPolicy.jsx';
import NewLetterBox from '../components/newLetterBox.jsx';
import Footer from '../components/Footer.jsx';


function Home() {
  

   let [heroCount,setHeroCount]=useState(0)

   useEffect(() => {
       const interval = setInterval(() => {
       setHeroCount( prevCount =>
         (prevCount === 4 ? 0 : prevCount + 1)
       );
       }, 3000);

       return () => clearInterval(interval);
    }, []);

    
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l
     from-[#190221] to-[#091c45]'>
       
    <div className="pt-[70px] pb-[90px] relative">
        <Background heroCount={heroCount}/>
        <Hero
           heroCount={heroCount}
           setHeroCount={setHeroCount}
        />
    </div>
    <Product/>
    <OurPolicy/>
    <NewLetterBox/>
    <Footer/>
    </div>
  )
}

export default  Home;
