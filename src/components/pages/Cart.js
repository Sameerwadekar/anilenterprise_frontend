import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSwal, { useSwal } from "../utils/CustomSwal";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const CartEmptyIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const TagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const ShopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

// ─── Dummy cart items (in real app this comes from context/API) ───────────────

const INITIAL_ITEMS = [
  { id: "p1", name: "20L Aqua Jar",   brand: "AquaPure",  liter: 20, price: 80,  deposit: 200, qty: 2 },
  { id: "p2", name: "10L Mini Jar",   brand: "AquaPure",  liter: 10, price: 50,  deposit: 120, qty: 1 },
  { id: "p3", name: "5L Bottle Pack", brand: "ClearDrop", liter: 5,  price: 30,  deposit: 80,  qty: 3 },
];

// ─── Product image with fallback ─────────────────────────────────────────────

function ProductImg({ id, name }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200 text-2xl font-black">
        💧
      </div>
    );
  }
  return (
    <img
      src={`http://localhost:8080/product/${id}/image`}
      alt={name}
      className="w-full h-full object-contain p-1"
      onError={() => setErr(true)}
    />
  );
}

// ─── Cart Item Card ───────────────────────────────────────────────────────────

function CartItem({ item, onInc, onDec, onRemove }) {
  const subtotal = item.price * item.qty;

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-0">

        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0 bg-blue-50 m-3 rounded-xl overflow-hidden border border-blue-100">
          <ProductImg id={item.id} name={item.name} />
        </div>

        {/* Info */}
        <div className="flex-1 py-3 pr-3 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-gray-800 leading-tight">{item.name}</p>
              <p className="text-xs text-blue-500 font-semibold mt-0.5">{item.brand} · {item.liter}L</p>
              {item.deposit > 0 && (
                <p className="text-[10px] text-gray-400 mt-0.5">+₹{item.deposit} deposit/unit</p>
              )}
            </div>
            <button
              onClick={onRemove}
              className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-400 transition-all active:scale-90"
            >
              <TrashIcon />
            </button>
          </div>

          {/* Price + qty */}
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-1 py-1">
              <button
                onClick={onDec}
                disabled={item.qty <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-blue-600 hover:bg-blue-100 active:scale-90 transition-all shadow-sm disabled:opacity-30"
              >
                <MinusIcon />
              </button>
              <span className="text-blue-700 font-black text-sm min-w-[20px] text-center tabular-nums">{item.qty}</span>
              <button
                onClick={onInc}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-90 transition-all shadow-sm"
              >
                <PlusIcon />
              </button>
            </div>
            <div className="text-right">
              <p className="text-base font-black text-blue-700">₹{subtotal}</p>
              <p className="text-[10px] text-gray-400">₹{item.price} × {item.qty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Cart Page ───────────────────────────────────────────────────────────

export default function Cart() {
  const navigate = useNavigate();
  const { swalProps, showSwal } = useSwal();
  const [items, setItems] = useState(INITIAL_ITEMS);

  const inc    = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const dec    = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
  const remove = (id) => {
    const item = items.find(i => i.id === id);
    showSwal({
      type:        "confirm",
      title:       "Remove Item?",
      message:     `Remove "${item.name}" from your cart?`,
      confirmText: "Yes, Remove",
      cancelText:  "Keep It",
      onConfirm:   () => setItems(prev => prev.filter(i => i.id !== id)),
    });
  };
  const clearCart = () => {
    showSwal({
      type:        "confirm",
      title:       "Clear Cart?",
      message:     "Remove all items from your cart?",
      confirmText: "Yes, Clear",
      cancelText:  "Cancel",
      onConfirm:   () => setItems([]),
    });
  };

  const itemTotal   = items.reduce((s, i) => s + i.price * i.qty, 0);
  const depositTotal = items.reduce((s, i) => s + i.deposit * i.qty, 0);
  const grandTotal  = itemTotal + depositTotal;
  const totalItems  = items.reduce((s, i) => s + i.qty, 0);

  // ── Empty cart ──
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center px-6 pb-24">
        <div className="text-blue-200 mb-4"><CartEmptyIcon /></div>
        <h2 className="text-xl font-extrabold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-400 text-sm mt-2 text-center">Add some products from our catalog to get started</p>
        <button
          onClick={() => navigate("/home")}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-md shadow-blue-200 active:scale-95 transition-all text-sm"
        >
          <ShopIcon /> Browse Products
        </button>
        <CustomSwal {...swalProps} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-44">

      {/* ── Header ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>
        <div className="relative z-10 max-w-lg mx-auto flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Your Order</p>
            <h1 className="text-white text-2xl font-extrabold tracking-tight">Cart</h1>
            <p className="text-blue-200 text-sm mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl transition-all active:scale-95 border border-white/20"
          >
            <TrashIcon /> Clear
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-10 relative z-10 space-y-3">

        {/* Cart items */}
        <div className="space-y-3">
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onInc={() => inc(item.id)}
              onDec={() => dec(item.id)}
              onRemove={() => remove(item.id)}
            />
          ))}
        </div>

        {/* Delivery info */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0">
              <LocationIcon />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivering to</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">Home — Mumbai, Maharashtra</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 ml-12 text-green-600">
            <ClockIcon />
            <span className="text-xs font-semibold">Delivery by Today 6 PM</span>
          </div>
        </div>

        {/* Bill summary */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-500"><TagIcon /></span>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bill Summary</p>
          </div>

          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm text-gray-600">
              <span className="truncate pr-4">{item.name} × {item.qty}</span>
              <span className="font-semibold text-gray-800 flex-shrink-0">₹{item.price * item.qty}</span>
            </div>
          ))}

          {depositTotal > 0 && (
            <>
              <div className="h-px bg-blue-50"/>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Bottle Deposit (refundable)</span>
                <span className="font-semibold">₹{depositTotal}</span>
              </div>
            </>
          )}

          <div className="h-px bg-blue-100"/>

          <div className="flex justify-between items-center">
            <span className="font-extrabold text-gray-800">Total Payable</span>
            <span className="text-xl font-black text-blue-700">₹{grandTotal}</span>
          </div>

          {depositTotal > 0 && (
            <p className="text-[11px] text-gray-400 -mt-1">
              ₹{depositTotal} deposit is fully refundable when you return the bottles
            </p>
          )}
        </div>

        {/* Add more */}
        <button
          onClick={() => navigate("/home")}
          className="w-full py-3 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ShopIcon /> Add More Items
        </button>
      </div>

      {/* ── Fixed checkout bar ── */}
      <div className="fixed bottom-16 left-0 right-0 px-4 z-40">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-white font-extrabold text-base shadow-xl shadow-blue-300/40 active:scale-[0.98] transition-all"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}
          >
            <span>Proceed to Checkout</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black">₹{grandTotal}</span>
              <ArrowRightIcon />
            </div>
          </button>
        </div>
      </div>

      <CustomSwal {...swalProps} />
    </div>
  );
}