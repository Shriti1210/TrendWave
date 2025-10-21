import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title.jsx'
import { shopDataContext } from '../context/ShopContext.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import { FaCalendarAlt, FaCreditCard, FaClock } from 'react-icons/fa'

function Order() {
  let [orderData, setOrderData] = useState([])
  let { currency } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  const statusColor = (status) => {
    if (!status) return 'bg-gray-500 text-white'
    const s = status.toLowerCase()
    if (s.includes('delivered')) return 'bg-emerald-600 text-white'
    if (s.includes('shipped') || s.includes('out')) return 'bg-sky-600 text-white'
    if (s.includes('packing')) return 'bg-indigo-600 text-white'
    return 'bg-amber-500 text-black'
  }

  return (
    <div className="w-full min-h-screen p-4 pb-40 bg-gradient-to-l from-[#190221] to-[#091c45]">
      <div className="max-w-6xl mx-auto">
        <div className="pt-24 text-center">
          <Title text1={'MY'} text2={'ORDER'} />
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {orderData.length === 0 && (
            <div className="py-12 rounded-2xl bg-slate-800/60 border border-slate-700 text-center text-slate-200">
              You have not placed any orders yet.
            </div>
          )}

          {orderData.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-700/40 border border-slate-700 p-4 md:p-5 shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-md shadow-sm"
                  />
                </div>

                {/* Middle: product & meta */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-[#e0fbff]">{item.name}</h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-slate-300">{currency} {item.price}</span>
                    <span className="text-xs md:text-sm bg-slate-800/60 px-2 py-1 rounded-md text-[#bff6ff]">Qty: {item.quantity}</span>
                    <span className="text-xs md:text-sm bg-slate-800/60 px-2 py-1 rounded-md text-[#bff6ff]">Size: {item.size}</span>
                  </div>

                  <div className="mt-3 text-sm text-slate-300 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-300" />
                      <span className="text-xs md:text-sm">{new Date(item.date).toDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCreditCard className="text-slate-300" />
                      <span className="text-xs md:text-sm">Payment: <span className="text-white ml-1">{item.paymentMethod}</span></span>
                    </div>
                  </div>
                </div>

                {/* Right: status, amount, action */}
                <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-3 mt-3 md:mt-0">
                  <div className="text-sm text-slate-300">
                    <div className="text-2xl md:text-2xl font-bold text-white">{currency} {item.price * item.quantity}</div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(item.status)}`}>
                    {item.status || 'Unknown'}
                  </div>

                  <button
                    onClick={loadOrderData}
                    className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0f1724] to-[#16202b] border border-slate-600 text-white text-sm hover:brightness-110 transition"
                  >
                    <FaClock /> Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
