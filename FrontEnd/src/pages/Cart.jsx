import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title.jsx";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import CartTotal from "../components/CartTotal.jsx";

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Build an array of items: {_id, size, quantity}
    const tempData = [];
    for (const prodId in cartItem) {
      for (const sizeKey in cartItem[prodId]) {
        const qty = cartItem[prodId][sizeKey];
        if (qty > 0) {
          tempData.push({
            _id: prodId,
            size: sizeKey,
            quantity: qty,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#190221] to-[#091c45] text-white pt-[90px] pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list - left / center (spans 2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.length === 0 ? (
              <div className="p-8 bg-white/5 rounded-2xl border border-white/6 text-center">
                <p className="text-lg">Your cart is empty.</p>
                <button
                  onClick={() => navigate("/collection")}
                  className="mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r from-[#2e6ecf] to-[#46d1f7] text-black font-semibold"
                >
                  Browse Collections
                </button>
              </div>
            ) : (
              cartData.map((item, index) => {
                const productData = products.find((p) => p._id === item._id);
                if (!productData) return null; // skip if product not found

                return (
                  <div
                    key={`${item._id}-${item.size}-${index}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/6"
                  >
                    {/* Thumbnail */}
                    <div className="w-[110px] h-[110px] flex-shrink-0 rounded-md overflow-hidden bg-white/5 border border-white/8">
                      <img
                        src={productData.image1}
                        alt={productData.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-white/95">{productData.name}</p>
                      <p className="text-sm text-white/70 mt-1">{productData.brand ?? productData.category}</p>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="px-3 py-1 rounded-md bg-white/6 text-sm">
                          <span className="font-medium">Size:</span>{" "}
                          <span className="ml-1 font-semibold">{item.size}</span>
                        </div>

                        <div className="px-3 py-1 rounded-md bg-white/6 text-sm">
                          <span className="font-medium">Price:</span>{" "}
                          <span className="ml-1 font-semibold">{currency} {productData.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-end gap-3">
                      {/* quantity control */}
                      <div className="flex items-center gap-2 bg-white/6 rounded-md px-2 py-1">
                        <button
                          onClick={() => {
                            const newQty = Math.max(1, item.quantity - 1);
                            updateQuantity(item._id, item.size, newQty);
                          }}
                          className="p-2 rounded-md hover:bg-white/10 transition"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="text-sm" />
                        </button>

                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            if (!Number.isNaN(v) && v >= 1) updateQuantity(item._id, item.size, v);
                          }}
                          className="w-16 text-center bg-transparent outline-none text-white font-semibold"
                        />

                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="p-2 rounded-md hover:bg-white/10 transition"
                          aria-label="Increase quantity"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>

                      {/* delete */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/6 transition"
                          aria-label="Remove item"
                        >
                          <RiDeleteBin6Line size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Totals & Checkout - right column */}
          <aside className="w-full">
            <div className="sticky top-24">
              <CartTotal />

              <button
                onClick={() => {
                  if (cartData.length > 0) navigate("/placeorder");
                  else navigate("/collection");
                }}
                className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-[#2e6ecf] to-[#46d1f7]
                 text-black font-semibold shadow-lg mb-[25px]"
              >
                {cartData.length > 0 ? "Proceed to Checkout" : "Start Shopping"}
              </button>

              
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Cart;
