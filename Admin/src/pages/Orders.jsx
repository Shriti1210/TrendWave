import React, { useState, useEffect, useContext } from 'react'
import Nav from '../component/Nav.jsx'
import Sidebar from '../component/Sidebar.jsx'
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import { SiEbox } from 'react-icons/si'
import { FaMapMarkerAlt, FaMoneyBillWave, FaTruck } from 'react-icons/fa'

function Orders() {
  const [orders, setOrders] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString()
    } catch (e) {
      return iso
    }
  }

  const formatCurrency = (num) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num)
    } catch (e) {
      return `₹ ${num}`
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#081326] to-[#04101a] text-white overflow-x-hidden">
      <Nav />

      <div className="flex w-full pt-20">
        <aside className="w-48 sm:w-56 md:w-64 lg:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-[#e6f9ff]">All Orders</h1>

            <div className="flex flex-col gap-6">
              {orders.length === 0 && (
                <div className="py-12 bg-slate-800 rounded-2xl shadow-md border border-slate-700 text-center">
                  No orders yet.
                </div>
              )}

              {orders.map((order) => (
                <article
                  key={order._id}
                  className="w-full rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-700/40 border border-slate-700 p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="md:grid md:grid-cols-[80px_1fr_240px] md:gap-6 items-center">
                    {/* Product Icon */}
                    <div className="flex items-center justify-center md:justify-start">
                      <div className="w-20 h-20 rounded-xl bg-white/95 flex items-center justify-center text-black shadow-md">
                        <SiEbox className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="mt-3 md:mt-0">
                      <h2 className="text-lg md:text-xl font-semibold text-[#bff6ff]">
                        {order.address.firstName} {order.address.lastName}
                      </h2>

                      {/* Items */}
                      <div className="mt-2 text-sm text-slate-200 flex flex-wrap gap-2">
                        {order.items.map((item, i) => (
                          <span
                            key={i}
                            className="text-xs sm:text-sm bg-slate-800/70 px-2 py-1 rounded-md border border-slate-600"
                          >
                            {item.name.toUpperCase()} ×{item.quantity}{' '}
                            {item.size ? `(${item.size})` : ''}
                          </span>
                        ))}
                      </div>

                      {/* Address */}
                      <div className="mt-3 text-slate-300 text-sm leading-relaxed flex flex-col">
                        <div className="flex items-center gap-2 text-[#9fe1ff]">
                          <FaMapMarkerAlt className="text-[#56dbfc]" />
                          <span>Shipping Address</span>
                        </div>
                        <p className="ml-6">{order.address.street}, {order.address.city}</p>
                        <p className="ml-6">{order.address.state}, {order.address.country} - {order.address.pinCode}</p>
                        <p className="ml-6 mt-1">{order.address.phone}</p>
                      </div>
                    </div>

                    {/* Right Info */}
                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-2">
                      <div className="text-sm text-slate-300 space-y-1">
                        <p>Items: <span className="font-medium text-white">{order.items.length}</span></p>
                        <p className="flex items-center gap-2"><FaMoneyBillWave className="text-green-400" /> Method: <span className="font-medium text-white">{order.paymentMethod}</span></p>
                        <p>Date: <span className="font-medium text-white">{formatDate(order.date)}</span></p>
                      </div>

                      <div className="mt-2 text-2xl font-bold text-white">{formatCurrency(order.amount)}</div>

                      <div className="flex flex-col items-stretch md:items-end gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => statusHandler(e, order._id)}
                          className="appearance-none px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-sm w-full md:w-44 focus:outline-none"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                        <p className="text-sm flex items-center gap-2">
                          <FaMoneyBillWave className="text-amber-400" />
                          Payment: <span className={`${order.payment ? 'text-emerald-300' : 'text-amber-300'} font-medium`}>{order.payment ? 'Done' : 'Pending'}</span>
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          <FaTruck className="text-blue-400" />
                          Status: <span className="text-blue-300 font-medium">{order.status}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Orders
