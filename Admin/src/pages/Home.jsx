import React, { useState, useEffect, useContext } from 'react';
import { FaBox, FaShoppingCart } from 'react-icons/fa';
import Nav from '../component/Nav.jsx';
import Sidebar from '../component/Sidebar.jsx';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setTotalProducts(products.data.length);

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true });
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#190221] to-[#091c45] relative'>
      <Nav />
      <Sidebar />
      <div className='w-[70vw] h-[100vh] absolute left-[25%] flex flex-col gap-[40px] py-[100px]'>
        <h1 className='text-[35px] text-[#afe2f2] font-bold'>Trendwave Admin Panel</h1>

        <div className='flex items-center justify-start gap-[50px] flex-col md:flex-row'>
          {/* Products Card */}
          <div className='group text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex flex-col items-center justify-center gap-[20px] rounded-lg shadow-lg backdrop-blur-lg border-[1px] border-[#969595] transition-transform duration-300 hover:scale-105 hover:shadow-xl opacity-0 animate-fadeIn'>
            <FaBox className='text-[#7df1f9] text-5xl' />
            <span className='md:text-[25px] text-[20px] font-semibold'>Total Products</span>
            <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595] text-[20px] font-bold'>
              {totalProducts}
            </span>
          </div>

          {/* Orders Card */}
          <div className='group text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex flex-col items-center justify-center gap-[20px] rounded-lg shadow-lg backdrop-blur-lg border-[1px] border-[#969595] transition-transform duration-300 hover:scale-105 hover:shadow-xl opacity-0 animate-fadeIn delay-200'>
            <FaShoppingCart className='text-[#7df1f9] text-5xl' />
            <span className='md:text-[25px] text-[20px] font-semibold'>Total Orders</span>
            <span className='px-[20px] py-[10px] bg-[#030e11] rounded-lg flex items-center justify-center border-[1px] border-[#969595] text-[20px] font-bold'>
              {totalOrders}
            </span>
          </div>
        </div>
      </div>

      {/* Tailwind custom animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
        `}
      </style>
    </div>
  );
}

export default Home;
