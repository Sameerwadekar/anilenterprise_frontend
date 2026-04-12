// import React, { useState, useEffect } from "react";
// import { getAllProducts } from "../utils/proxy/productProxy";

// function SkeletonCard() {
//   return (
//     <div className="animate-pulse bg-white rounded-lg p-4 shadow-sm flex flex-col items-center gap-2">
//       <div className="bg-gray-300 h-24 w-24 rounded"></div>
//       <div className="bg-gray-300 h-4 w-20 rounded"></div>
//       <div className="bg-gray-300 h-4 w-10 rounded"></div>
//       <div className="bg-gray-300 h-8 w-full rounded mt-2"></div>
//     </div>
//   );
// }

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);

//       const res = await getAllProducts();

//       // 🔥 IMPORTANT: adjust based on your API response
//       const data = res?.data || res || [];

//       setProducts(data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-blue-50 min-h-screen">
      
//       {error && (
//         <p className="text-red-500 text-center mb-3">{error}</p>
//       )}

//       <div className="grid grid-cols-2 gap-4 mt-3">
//         {loading
//           ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
//           : products.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center gap-2"
//               >
//                 <img
//                   src={`http://localhost:8080/product/${product.id}/image`}
//                   alt={product.name}
//                   className="w-24 h-24 object-contain"
//                 />

//                 <h3 className="font-semibold text-blue-900 text-center">
//                   {product.name}
//                 </h3>

//                 <p className="text-blue-600 font-semibold">
//                   ₹{product.price}
//                 </p>

//                 <div className="flex gap-2 mt-2">
//                   <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
//                     -
//                   </button>

//                   <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded">
//                     1
//                   </span>

//                   <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
//                     +
//                   </button>
//                 </div>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { getAllProducts } from "../utils/proxy/productProxy";

// // ─── SVG Icons ────────────────────────────────────────────────────────────────

// const MinusIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
//     <line x1="5" y1="12" x2="19" y2="12"/>
//   </svg>
// );

// const PlusIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
//     <line x1="12" y1="5" x2="12" y2="19"/>
//     <line x1="5" y1="12" x2="19" y2="12"/>
//   </svg>
// );

// const RefreshIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="23 4 23 10 17 10"/>
//     <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
//   </svg>
// );

// const CartIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
//     <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
//   </svg>
// );

// const SparkleIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // ─── Skeleton ─────────────────────────────────────────────────────────────────

// function SkeletonCard() {
//   return (
//     <div className="animate-pulse bg-white rounded-2xl p-4 shadow-sm border border-blue-50 flex flex-col items-center gap-3">
//       <div className="w-24 h-24 bg-blue-100 rounded-xl"/>
//       <div className="h-3.5 w-20 bg-blue-100 rounded-full"/>
//       <div className="h-5 w-14 bg-blue-100 rounded-full"/>
//       <div className="h-9 w-full bg-blue-100 rounded-xl mt-1"/>
//     </div>
//   );
// }

// // ─── Product Card ─────────────────────────────────────────────────────────────

// function ProductCard({ product, qty, onInc, onDec }) {
//   const hasQty = qty > 0;

//   return (
//     <div className={`
//       bg-white rounded-2xl shadow-sm border transition-all duration-200 flex flex-col items-center p-4 gap-2
//       ${hasQty ? "border-blue-300 shadow-blue-100 shadow-md" : "border-blue-50"}
//     `}>
//       {/* Badge when item is in cart */}
//       <div className="w-full flex justify-end h-4">
//         {hasQty && (
//           <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
//             <SparkleIcon /> In cart
//           </span>
//         )}
//       </div>

//       {/* Image */}
//       <div className="w-24 h-24 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden">
//         <img
//           src={`http://localhost:8080/product/${product.id}/image`}
//           alt={product.name}
//           className="w-20 h-20 object-contain"
//         />
//       </div>

//       {/* Info */}
//       <h3 className="text-sm font-bold text-gray-800 text-center leading-tight line-clamp-2 min-h-[2.5rem]">
//         {product.name}
//       </h3>
//       <p className="text-blue-700 font-black text-lg leading-none">₹{product.price}</p>

//       {/* Qty control */}
//       {hasQty ? (
//         <div className="w-full flex items-center justify-between bg-blue-50 rounded-xl px-1 py-1 mt-1">
//           <button
//             onClick={onDec}
//             className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-blue-600 hover:bg-blue-100 active:scale-90 transition-all shadow-sm font-bold"
//           >
//             <MinusIcon />
//           </button>
//           <span className="text-blue-700 font-black text-base tabular-nums">{qty}</span>
//           <button
//             onClick={onInc}
//             className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-90 transition-all shadow-sm"
//           >
//             <PlusIcon />
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={onInc}
//           className="w-full mt-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold transition-all shadow-sm shadow-blue-200"
//         >
//           Add
//         </button>
//       )}
//     </div>
//   );
// }

// // ─── Main ─────────────────────────────────────────────────────────────────────

// export default function Home() {
//   const [loading, setLoading]   = useState(true);
//   const [products, setProducts] = useState([]);
//   const [error, setError]       = useState("");
//   const [quantities, setQuantities] = useState({}); // { [productId]: number }

//   useEffect(() => { fetchProducts(); }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res  = await getAllProducts();
//       const data = res?.data || res || [];
//       setProducts(data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inc = (id) => setQuantities(q => ({ ...q, [id]: (q[id] || 0) + 1 }));
//   const dec = (id) => setQuantities(q => {
//     const next = (q[id] || 0) - 1;
//     if (next <= 0) { const { [id]: _, ...rest } = q; return rest; }
//     return { ...q, [id]: next };
//   });

//   const totalCartItems = Object.values(quantities).reduce((s, v) => s + v, 0);
//   const totalCartValue = products.reduce((s, p) => s + (quantities[p.id] || 0) * p.price, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-36">

//       {/* ── HEADER ── */}
//       <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
//         <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
//         <div className="absolute top-6 -right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>
//         <p className="relative z-10 text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Browse</p>
//         <h1 className="relative z-10 text-white text-2xl font-extrabold tracking-tight">Our Products</h1>
//         <p className="relative z-10 text-blue-200 text-sm mt-1">{products.length > 0 ? `${products.length} items available` : "Loading…"}</p>
//       </div>

//       {/* ── CONTENT ── */}
//       <div className="px-4 -mt-10 relative z-10 space-y-4">

//         {/* Error */}
//         {error && (
//           <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-4 flex flex-col items-center gap-3 text-center">
//             <div className="text-3xl">⚠️</div>
//             <p className="text-gray-600 font-semibold text-sm">{error}</p>
//             <button
//               onClick={fetchProducts}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
//             >
//               <RefreshIcon /> Try Again
//             </button>
//           </div>
//         )}

//         {/* Grid */}
//         {!error && (
//           <div className="grid grid-cols-2 gap-3">
//             {loading
//               ? [...Array(4)].map((_, i) => <SkeletonCard key={i}/>)
//               : products.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     qty={quantities[product.id] || 0}
//                     onInc={() => inc(product.id)}
//                     onDec={() => dec(product.id)}
//                   />
//                 ))
//             }
//           </div>
//         )}
//       </div>

//       {/* ── FLOATING CART BAR (shows when items added) ── */}
//       {totalCartItems > 0 && (
//         <div className="fixed bottom-20 left-4 right-4 z-40">
//           <div className="bg-blue-700 rounded-2xl shadow-xl shadow-blue-300/40 px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
//                 <CartIcon />
//               </div>
//               <div>
//                 <p className="text-white font-black text-sm leading-tight">{totalCartItems} item{totalCartItems > 1 ? "s" : ""}</p>
//                 <p className="text-blue-200 text-xs">in your cart</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-white font-black text-base">₹{totalCartValue}</p>
//               <p className="text-blue-200 text-xs">total</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const DropIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C10 7 5 10 5 15a7 7 0 0 0 14 0c0-5-5-8-7-13z"/>
  </svg>
);

// ─── Dummy Products ───────────────────────────────────────────────────────────
// These use public placeholder images — no backend needed for demo

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "20L Aqua Jar",
    brand: "AquaPure",
    liter: 20,
    price: 80,
    deposit: 200,
    tag: "Best Seller",
    emoji: "💧",
    color: "from-blue-500 to-blue-700",
    light: "bg-blue-50",
  },
  {
    id: "p2",
    name: "10L Mini Jar",
    brand: "AquaPure",
    liter: 10,
    price: 50,
    deposit: 120,
    tag: "Popular",
    emoji: "🫧",
    color: "from-cyan-500 to-cyan-700",
    light: "bg-cyan-50",
  },
  {
    id: "p3",
    name: "5L Bottle Pack",
    brand: "ClearDrop",
    liter: 5,
    price: 30,
    deposit: 80,
    tag: null,
    emoji: "🍶",
    color: "from-indigo-500 to-indigo-700",
    light: "bg-indigo-50",
  },
  {
    id: "p4",
    name: "25L Office Jar",
    brand: "HydroMax",
    liter: 25,
    price: 110,
    deposit: 300,
    tag: "Office Pack",
    emoji: "🏢",
    color: "from-blue-600 to-blue-900",
    light: "bg-blue-50",
  },
  {
    id: "p5",
    name: "2L Slim Bottle",
    brand: "ClearDrop",
    liter: 2,
    price: 20,
    deposit: 50,
    tag: "New",
    emoji: "✨",
    color: "from-sky-400 to-sky-600",
    light: "bg-sky-50",
  },
  {
    id: "p6",
    name: "50L Bulk Drum",
    brand: "HydroMax",
    liter: 50,
    price: 200,
    deposit: 500,
    tag: "Bulk",
    emoji: "🛢️",
    color: "from-slate-500 to-slate-700",
    light: "bg-slate-50",
  },
];

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, qty, onInc, onDec }) {
  const hasQty = qty > 0;

  return (
    <div className={`
      bg-white rounded-2xl shadow-sm border transition-all duration-200 flex flex-col items-center p-4 gap-2
      ${hasQty ? "border-blue-400 shadow-blue-100 shadow-md" : "border-blue-50"}
    `}>

      {/* Tag / In-cart badge row */}
      <div className="w-full flex justify-between items-center h-5">
        {product.tag ? (
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            {product.tag}
          </span>
        ) : <span/>}
        {hasQty && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full">
            <SparkleIcon /> {qty} in cart
          </span>
        )}
      </div>

      {/* Illustrated product image */}
      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-sm`}>
        <div className="text-center">
          <div className="text-3xl leading-none">{product.emoji}</div>
          <p className="text-white text-[10px] font-black mt-1 leading-none">{product.liter}L</p>
        </div>
      </div>

      {/* Info */}
      <h3 className="text-sm font-extrabold text-gray-800 text-center leading-tight line-clamp-2 min-h-[2.5rem]">
        {product.name}
      </h3>
      <div className="text-center">
        <p className="text-blue-700 font-black text-lg leading-none">₹{product.price}</p>
        {product.deposit > 0 && (
          <p className="text-[10px] text-gray-400 mt-0.5">+₹{product.deposit} deposit</p>
        )}
      </div>

      {/* Qty control / Add button */}
      {hasQty ? (
        <div className="w-full flex items-center justify-between bg-blue-50 rounded-xl px-1 py-1 mt-1">
          <button
            onClick={onDec}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-blue-600 hover:bg-blue-100 active:scale-90 transition-all shadow-sm"
          >
            <MinusIcon />
          </button>
          <span className="text-blue-700 font-black text-base tabular-nums">{qty}</span>
          <button
            onClick={onInc}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-90 transition-all shadow-sm"
          >
            <PlusIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={onInc}
          className="w-full mt-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold transition-all shadow-sm shadow-blue-200"
        >
          Add
        </button>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const inc = (id) => setQuantities(q => ({ ...q, [id]: (q[id] || 0) + 1 }));
  const dec = (id) => setQuantities(q => {
    const next = (q[id] || 0) - 1;
    if (next <= 0) { const { [id]: _, ...rest } = q; return rest; }
    return { ...q, [id]: next };
  });

  const totalCartItems = Object.values(quantities).reduce((s, v) => s + v, 0);
  const totalCartValue = DUMMY_PRODUCTS.reduce((s, p) => s + (quantities[p.id] || 0) * p.price, 0);
  const totalDeposit   = DUMMY_PRODUCTS.reduce((s, p) => s + (quantities[p.id] || 0) * p.deposit, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-40">

      {/* ── Header ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 -right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-blue-300"><DropIcon /></span>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Catalog</p>
            </div>
            <h1 className="text-white text-2xl font-extrabold tracking-tight">Our Products</h1>
            <p className="text-blue-200 text-sm mt-1">{DUMMY_PRODUCTS.length} items available</p>
          </div>

          {/* Cart icon top right */}
          <button
            onClick={() => navigate("/cart")}
            className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-all active:scale-95"
          >
            <CartIcon />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-black bg-red-500 text-white rounded-full shadow">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Product grid ── */}
      <div className="px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {DUMMY_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              qty={quantities[product.id] || 0}
              onInc={() => inc(product.id)}
              onDec={() => dec(product.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Floating cart bar ── */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-blue-700 rounded-2xl shadow-xl shadow-blue-300/40 px-4 py-3 flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <CartIcon />
              </div>
              <div className="text-left">
                <p className="text-white font-black text-sm leading-tight">
                  {totalCartItems} item{totalCartItems !== 1 ? "s" : ""} in cart
                </p>
                {totalDeposit > 0 && (
                  <p className="text-blue-200 text-xs">+₹{totalDeposit} deposit</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-white font-black text-base">₹{totalCartValue}</p>
                <p className="text-blue-200 text-xs">View Cart</p>
              </div>
              <div className="w-7 h-7 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <ArrowRightIcon />
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}