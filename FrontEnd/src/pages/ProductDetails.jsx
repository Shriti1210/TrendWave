import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import RelatedProduct from "../components/RelatedProducts.jsx";
import Loading from "../components/Loadig.jsx";

function RatingStars({ value = 0, size = 18 }) {
  // value can be decimal like 4.5
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400 drop-shadow-sm" style={{ width: size, height: size }} />);
    } else if (value + 0.5 >= i) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 drop-shadow-sm" style={{ width: size, height: size }} />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-300/60" style={{ width: size, height: size }} />);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
}

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart, loading } = useContext(shopDataContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");

  // Find product from context when products or productId change
  useEffect(() => {
    if (!products || !productId) return;
    const p = products.find((it) => it._id === productId);
    if (p) {
      setProductData(p);
      // set main image to first available image (safe checks)
      setMainImage(p.image1 || p.image || p.image2 || p.image3 || "");
      // reset size selection
      setSize("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [products, productId]);

  if (!productData) {
    // show a simple placeholder if not loaded
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-l from-[#190221] to-[#091c45]">
        <Loading />
      </div>
    );
  }

  // safely handle rating (fallback to 4.2 for display if none provided)
  const ratingValue = Number(productData.rating ?? 4.2);

  // images array helper (keeps order and filters falsy)
  const images = [productData.image1, productData.image2, productData.image3, productData.image4].filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#190221] to-[#091c45] text-white pt-[90px] pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* GRID: left images + right info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: images */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* thumbnails column (on large screens vertical) */}
            <div className="flex lg:flex-col gap-4 items-center lg:items-start">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(src)}
                  className={`p-1 rounded-md border ${
                    mainImage === src ? "border-[#46d1f7] ring-2 ring-[#46d1f7]/30" : "border-transparent"
                  } bg-white/5 transition-all duration-150`}
                >
                  <img
                    src={src}
                    alt={`${productData.name} thumbnail ${idx + 1}`}
                    className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md"
                    draggable={false}
                  />
                </button>
              ))}
            </div>

            {/* main image */}
            <div className="flex-1 bg-[#0b0b0b]/10 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
              <img
                src={mainImage}
                alt={productData.name}
                className="w-full max-h-[70vh] object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* RIGHT: product info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[aliceblue]">{productData.name}</h1>

            <div className="flex items-center justify-between md:items-center gap-4">
              <div className="flex items-center gap-3">
                <RatingStars value={ratingValue} size={18} />
                <span className="text-sm text-white/80">({productData.reviewsCount ?? 124})</span>
              </div>

              <div className="text-2xl md:text-3xl font-bold text-white">{currency}
                <span className="ml-1">{productData.price}</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-white/90 leading-relaxed break-words">
              {productData.shortDescription ?? productData.description ?? "High quality product from TrendWave."}
            </p>

            {/* features / highlights */}
            {productData.features && productData.features.length > 0 ? (
              <ul className="text-sm text-white/80 list-disc list-inside mt-2 space-y-1">
                {productData.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            ) : (
              <div className="text-sm text-white/80 mt-2">
                <p>Comfortable, breathable fabric — modern fit and easy care.</p>
              </div>
            )}

            {/* Size selection */}
            <div className="mt-4">
              <p className="font-semibold mb-2">Select size</p>
              <div className="flex flex-wrap gap-3">
                {(productData.sizes?.length ? productData.sizes : ["S","M","L","XL"]).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-md border transition-all duration-150
                      ${size === s ? "bg-[#46d1f7] text-black border-[#46d1f7]" : "bg-white/5 text-white/90 border-white/10"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* add to cart */}
            <div className="mt-6 flex gap-3 items-center">
              <button
                onClick={() => addtoCart(productData._id, size)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#2e6ecf]
                 to-[#46d1f7] text-white font-semibold shadow-lg hover:brightness-105 transition"
              >
                {loading ? <Loading /> : "Add to Cart"}
              </button>

              
            </div>

            {/* policy bullets */}
            <div className="mt-6 w-full border-t border-white/10 pt-4 text-sm text-white/80 space-y-1">
              <p>✅ 100% Original Products</p>
              <p>✅ Cash on delivery available</p>
              <p>✅ Easy returns & exchange within 7 days</p>
            </div>
          </div>
        </div>

        {/* tabs: description & reviews */}
        <div className="mt-10">
          <div className="flex gap-4 border-b border-white/10">
            <button className="px-4 py-2 text-sm text-white/90 border-b-2 border-transparent hover:border-[#46d1f7] transition">Description</button>
            <button className="px-4 py-2 text-sm text-white/60">Reviews ({productData.reviewsCount ?? 124})</button>
          </div>

          <div className="mt-6 w-full bg-[#3336397c] border border-white/8 rounded-md p-6 text-white text-sm md:text-base">
            <p className="leading-relaxed">
              {productData.longDescription ??
                "Upgrade your wardrobe with this stylish slim-fit cotton shirt. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting — a must-have essential for those who value both fashion and function."}
            </p>
          </div>
        </div>

        {/* related products */}
        <div className="mt-10">
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
