// import React, { useEffect, useState } from "react";
// import { getProductById } from "../utils/proxy/productProxy";
// import { createOrder } from "../utils/proxy/orderProxy";

// const PRODUCT_ID = "2f102f8c-f1c8-4424-ac34-063d70fdcfaf";

// function Skeleton() {
//     return (
//         <div className="animate-pulse p-4">
//             <div className="bg-gray-300 h-40 w-full rounded-lg mb-4"></div>
//             <div className="bg-gray-300 h-5 w-2/3 mb-2 rounded"></div>
//             <div className="bg-gray-300 h-5 w-1/3 mb-4 rounded"></div>
//             <div className="bg-gray-300 h-10 w-full rounded"></div>
//         </div>
//     );
// }

// export default function OCO() {
//     const [loading, setLoading] = useState(true);
//     const [product, setProduct] = useState(null);
//     const [qty, setQty] = useState(1);
//     const [error, setError] = useState("");
//     const [ordering, setOrdering] = useState(false);

//     useEffect(() => {
//         fetchProduct();
//     }, []);

//     const fetchProduct = async () => {
//         try {
//             setLoading(true);
//             const res = await getProductById(PRODUCT_ID);

//             // adjust based on API response
//             const data = res?.data || res;

//             setProduct(data);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to load product");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const total = qty * (product?.price || 0);

//     const handleOrder = async () => {
//         try {
//             setOrdering(true);

//             const orderPayload = {
//                 customerId: "83c2bde7-61f5-4e29-915f-3c3bdcdea11f", // 🔥 replace later with real user
//                 deliveryAddress: "Home - Mumbai, Maharashtra",
//                 totalAmount: total,
//                 depositAmount: 0,
//                 notes: "One Click Order",

//                 orderItems: [
//                     {
//                         productId: product.id,
//                         productName: product.name,

//                         // 🔥 REQUIRED FIELDS (ADD THESE)
//                         productBrand: "Generic",
//                         productLiter: 20,

//                         quantity: qty,
//                         pricePerUnit: product.price,

//                         depositPerUnit: 0,     // ✅ FIX
//                         totalDeposit: 0,       // ✅ FIX

//                         totalPrice: total,
//                     },
//                 ],
//             };

//             await createOrder(orderPayload);

//             alert("✅ Order placed successfully!");

//             setQty(1);
//         } catch (err) {
//             console.error(err);
//             alert("❌ Failed to place order");
//         } finally {
//             setOrdering(false);
//         }
//     };

//     // ---------------- UI STATES ----------------

//     if (loading) return <Skeleton />;

//     if (error) {
//         return (
//             <div className="p-4 text-center text-red-500">
//                 {error}
//                 <button onClick={fetchProduct} className="block mt-2 text-blue-600">
//                     Retry
//                 </button>
//             </div>
//         );
//     }

//     if (!product) return null;

//     // ---------------- MAIN UI ----------------

//     return (
//         <div className="p-4 bg-blue-50 min-h-screen pb-24">

//             {/* PRODUCT CARD */}
//             <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
//                 <img
//                     src={`http://localhost:8080/product/${product.id}/image`}
//                     alt={product.name}
//                     className="w-32 h-32 object-contain"
//                 />
//                 <h2 className="text-lg font-bold text-blue-900 mt-2">
//                     {product.name}
//                 </h2>
//                 <p className="text-blue-600 font-semibold text-lg">
//                     ₹{product.price}
//                 </p>
//             </div>

//             {/* QUICK SELECT */}
//             <div className="mt-4">
//                 <p className="text-sm text-gray-600 mb-2">Quick Select</p>
//                 <div className="flex gap-2">
//                     {[1, 2, 3, 5].map((num) => (
//                         <button
//                             key={num}
//                             onClick={() => setQty(num)}
//                             className={`px-3 py-1 rounded-full border ${qty === num
//                                     ? "bg-blue-600 text-white"
//                                     : "bg-white text-gray-700"
//                                 }`}
//                         >
//                             {num}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* QUANTITY CONTROL */}
//             <div className="flex justify-center items-center gap-4 mt-5">
//                 <button
//                     onClick={() => setQty((q) => Math.max(1, q - 1))}
//                     className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                     -
//                 </button>

//                 <span className="text-xl font-semibold">{qty}</span>

//                 <button
//                     onClick={() => setQty((q) => q + 1)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                     +
//                 </button>
//             </div>

//             {/* DELIVERY INFO */}
//             <div className="bg-white mt-5 p-4 rounded-xl shadow-sm">
//                 <p className="text-gray-700 font-medium">Deliver to:</p>
//                 <p className="text-sm text-gray-500">
//                     Home - Mumbai, Maharashtra
//                 </p>
//                 <p className="text-green-600 text-sm mt-1">
//                     Delivery by Today 6 PM
//                 </p>
//             </div>

//             {/* BILL SUMMARY */}
//             <div className="bg-white mt-4 p-4 rounded-xl shadow-sm">
//                 <div className="flex justify-between">
//                     <span>Price</span>
//                     <span>₹{product.price}</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span>Quantity</span>
//                     <span>{qty}</span>
//                 </div>
//                 <div className="flex justify-between font-bold mt-2 text-blue-700">
//                     <span>Total</span>
//                     <span>₹{total}</span>
//                 </div>
//             </div>

//             {/* ORDER BUTTON */}
//             <button
//                 disabled={ordering}
//                 onClick={handleOrder}
//                 className="fixed bottom-16 left-0 w-full bg-blue-600 text-white py-3 text-lg font-semibold shadow-lg hover:bg-blue-700 disabled:bg-gray-400"
//             >
//                 {ordering ? "Placing Order..." : "Order Now"}
//             </button>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { getProductById } from "../utils/proxy/productProxy";
import { createOrder } from "../utils/proxy/orderProxy";

const PRODUCT_ID = "2f102f8c-f1c8-4424-ac34-063d70fdcfaf";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const FlashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ReceiptIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
    <line x1="9" y1="17" x2="13" y2="17"/>
  </svg>
);

const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 pb-32">
      {/* Hero skeleton */}
      <div className="animate-pulse bg-white rounded-3xl shadow-sm border border-blue-100 p-6 flex flex-col items-center gap-3">
        <div className="w-36 h-36 bg-blue-100 rounded-2xl"/>
        <div className="h-5 w-40 bg-blue-100 rounded-full"/>
        <div className="h-7 w-24 bg-blue-100 rounded-full"/>
      </div>
      <div className="mt-4 space-y-3">
        <div className="animate-pulse h-14 bg-white rounded-2xl border border-blue-100"/>
        <div className="animate-pulse h-20 bg-white rounded-2xl border border-blue-100"/>
        <div className="animate-pulse h-28 bg-white rounded-2xl border border-blue-100"/>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OCO() {
  const [loading, setLoading]   = useState(true);
  const [product, setProduct]   = useState(null);
  const [qty, setQty]           = useState(1);
  const [error, setError]       = useState("");
  const [ordering, setOrdering] = useState(false);

  useEffect(() => { fetchProduct(); }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res  = await getProductById(PRODUCT_ID);
      const data = res?.data || res;
      setProduct(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const total = qty * (product?.price || 0);

  const handleOrder = async () => {
    try {
      setOrdering(true);
      const orderPayload = {
        customerId:      "83c2bde7-61f5-4e29-915f-3c3bdcdea11f",
        deliveryAddress: "Home - Mumbai, Maharashtra",
        totalAmount:     total,
        depositAmount:   0,
        notes:           "One Click Order",
        orderItems: [
          {
            productId:     product.id,
            productName:   product.name,
            productBrand:  "Generic",
            productLiter:  20,
            quantity:      qty,
            pricePerUnit:  product.price,
            depositPerUnit: 0,
            totalDeposit:   0,
            totalPrice:     total,
          },
        ],
      };
      await createOrder(orderPayload);
      alert("✅ Order placed successfully!");
      setQty(1);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  // ── UI States ──

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-400 text-3xl">⚠️</div>
        <p className="text-gray-600 font-semibold">{error}</p>
        <button
          onClick={fetchProduct}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow hover:bg-blue-700 active:scale-95 transition-all"
        >
          <RefreshIcon /> Try Again
        </button>
      </div>
    );
  }

  if (!product) return null;

  // ── Main UI ──

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-36">

      {/* ── HERO HEADER ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-8 -right-2 w-16 h-16 bg-blue-500 rounded-full opacity-40"/>

        <div className="relative z-10 flex items-center gap-2 mb-1">
          <span className="text-blue-200"><FlashIcon /></span>
          <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">One Click Order</span>
        </div>
        <h1 className="relative z-10 text-white text-2xl font-extrabold tracking-tight">Order Instantly</h1>
      </div>

      {/* ── PRODUCT CARD (overlapping header) ── */}
      <div className="px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-lg shadow-blue-100 border border-blue-50 p-5 flex items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={`http://localhost:8080/product/${product.id}/image`}
              alt={product.name}
              className="w-20 h-20 object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-0.5">Product</p>
            <h2 className="text-base font-extrabold text-gray-800 truncate">{product.name}</h2>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-blue-700">₹{product.price}</span>
              <span className="text-xs text-gray-400">/ unit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">

        {/* ── QUICK SELECT ── */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Select Qty</p>
          <div className="flex gap-2">
            {[1, 2, 3, 5].map((num) => (
              <button
                key={num}
                onClick={() => setQty(num)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all active:scale-95 ${
                  qty === num
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                    : "bg-white text-gray-500 border-gray-100 hover:border-blue-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* ── QUANTITY STEPPER ── */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quantity</p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 active:scale-90 transition-all font-bold disabled:opacity-40"
              disabled={qty <= 1}
            >
              <MinusIcon />
            </button>

            <div className="text-center">
              <span className="text-4xl font-black text-blue-700 tabular-nums">{qty}</span>
              <p className="text-xs text-gray-400 mt-0.5">units</p>
            </div>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-90 transition-all shadow-sm shadow-blue-200"
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        {/* ── DELIVERY INFO ── */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0">
              <LocationIcon />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivering to</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">Home — Mumbai, Maharashtra</p>
              <div className="flex items-center gap-1.5 mt-1.5 text-green-600">
                <ClockIcon />
                <span className="text-xs font-semibold">Delivery by Today 6 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BILL SUMMARY ── */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-500"><ReceiptIcon /></span>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bill Summary</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Price per unit</span>
              <span className="font-semibold text-gray-800">₹{product.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Quantity</span>
              <span className="font-semibold text-gray-800">× {qty}</span>
            </div>
            <div className="h-px bg-blue-50 my-1"/>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">Total</span>
              <span className="text-xl font-black text-blue-700">₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ORDER BUTTON (fixed) ── */}
      <div className="fixed bottom-16 left-0 w-full px-4 z-40">
        <button
          disabled={ordering}
          onClick={handleOrder}
          className={`
            w-full py-4 rounded-2xl text-base font-extrabold tracking-wide shadow-lg transition-all
            ${ordering
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-blue-300"
            }
          `}
        >
          {ordering ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Placing Order…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FlashIcon />
              Order Now — ₹{total}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}