import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext.jsx";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);
  const subtotal = Number(getCartAmount() || 0);
  const delivery = Number(delivery_fee || 0);
  const total = subtotal === 0 ? 0 : subtotal + delivery;

  return (
    <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/8">
      <div className="mb-4">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-4 text-white/90">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">{currency} {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="font-semibold">{currency} {delivery.toFixed(2)}</span>
        </div>

        <div className="border-t border-white/10 mt-2 pt-3 flex justify-between text-lg">
          <strong>Total</strong>
          <strong>{currency} {total.toFixed(2)}</strong>
        </div>

        <p className="text-xs text-white/60 mt-3">
          Taxes calculated at checkout. Free returns within 7 days.
        </p>
      </div>
    </div>
  );
}

export default CartTotal;
