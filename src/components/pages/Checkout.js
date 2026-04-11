import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../utils/proxy/orderProxy";
import CustomSwal, { useSwal } from "../utils/CustomSwal";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const CashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M6 12h.01M18 12h.01"/>
  </svg>
);
const CardPayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const UPIIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const CreditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const NoteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

// ─── Dummy order data (in real app pass via route state or context) ────────────

const DUMMY_ITEMS = [
  { id: "p1", name: "20L Aqua Jar",   brand: "AquaPure",  liter: 20, price: 80,  deposit: 200, qty: 2 },
  { id: "p2", name: "10L Mini Jar",   brand: "AquaPure",  liter: 10, price: 50,  deposit: 120, qty: 1 },
  { id: "p3", name: "5L Bottle Pack", brand: "ClearDrop", liter: 5,  price: 30,  deposit: 80,  qty: 3 },
];

const CUSTOMER_ID = "83c2bde7-61f5-4e29-915f-3c3bdcdea11f"; // 🔥 replace with auth user

// ─── Payment methods ──────────────────────────────────────────────────────────

const PAYMENT_METHODS = [
  { id: "COD",    label: "Cash on Delivery", sub: "Pay when delivered",      Icon: CashIcon    },
  { id: "CARD",   label: "Add to Card",      sub: "Admin adds to your bill", Icon: CreditIcon  },
  { id: "UPI",    label: "UPI",              sub: "Pay via UPI app",         Icon: UPIIcon     },
  { id: "ONLINE", label: "Card / Net Banking",sub: "Debit or credit card",   Icon: CardPayIcon },
];

// ─── Saved addresses ──────────────────────────────────────────────────────────

const SAVED_ADDRESSES = [
  { id: "a1", label: "Home",   address: "402 Sunrise Apts, Andheri East, Mumbai – 400069", default: true  },
  { id: "a2", label: "Office", address: "14th Floor, Bandra-Kurla Complex, Mumbai – 400051", default: false },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
        <span className="text-blue-500"><Icon /></span>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ─── Payment option ───────────────────────────────────────────────────────────

function PaymentOption({ method, selected, onSelect }) {
  const { Icon, label, sub } = method;
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all active:scale-[0.98] text-left
        ${selected ? "border-blue-600 bg-blue-50" : "border-blue-100 bg-white hover:border-blue-300"}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all
        ${selected ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500"}`}>
        <Icon />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${selected ? "text-blue-700" : "text-gray-800"}`}>{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
        ${selected ? "border-blue-600 bg-blue-600" : "border-gray-200"}`}>
        {selected && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Checkout() {
  const navigate = useNavigate();
  const { swalProps, showSwal } = useSwal();

  const items = DUMMY_ITEMS; // 🔥 replace with cart context / route state

  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id);
  const [customAddress, setCustomAddress]     = useState("");
  const [useCustom, setUseCustom]             = useState(false);
  const [paymentMethod, setPaymentMethod]     = useState("COD");
  const [notes, setNotes]                     = useState("");
  const [placing, setPlacing]                 = useState(false);

  const itemTotal    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const depositTotal = items.reduce((s, i) => s + i.deposit * i.qty, 0);
  const grandTotal   = itemTotal + depositTotal;

  const deliveryAddress = useCustom
    ? customAddress
    : SAVED_ADDRESSES.find(a => a.id === selectedAddress)?.address || "";

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      showSwal({ type: "warning", title: "Address required", message: "Please select or enter a delivery address." });
      return;
    }

    setPlacing(true);
    try {
      const payload = {
        customerId:      CUSTOMER_ID,
        deliveryAddress,
        totalAmount:     grandTotal,
        depositAmount:   depositTotal,
        paymentMethod,
        notes:           notes.trim() || "Order from cart",
        orderItems: items.map(i => ({
          productId:     i.id,
          productName:   i.name,
          productBrand:  i.brand,
          productLiter:  i.liter,
          quantity:      i.qty,
          pricePerUnit:  i.price,
          depositPerUnit: i.deposit,
          totalDeposit:  i.deposit * i.qty,
          totalPrice:    i.price * i.qty,
        })),
      };

      await createOrder(payload);

      showSwal({
        type:        "success",
        title:       "Order Placed! 🎉",
        message:     `Your order of ₹${grandTotal} has been placed. Delivery by 6 PM today.`,
        confirmText: "Track Order",
        onConfirm:   () => navigate("/"),
      });
    } catch (err) {
      console.error(err);
      showSwal({ type: "error", title: "Order failed", message: "Something went wrong. Please try again." });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-44">

      {/* ── Header ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>
        <div className="relative z-10 max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-blue-200 hover:text-white text-xs font-bold mb-3 transition-colors"
          >
            <BackIcon /> Back to Cart
          </button>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Almost there</p>
          <h1 className="text-white text-2xl font-extrabold tracking-tight">Checkout</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-10 relative z-10 space-y-3">

        {/* ── Order summary ── */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
            <span className="text-blue-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </span>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex-1">Order Summary</p>
            <button onClick={() => navigate(-1)} className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline">
              <EditIcon /> Edit
            </button>
          </div>
          <div className="px-4 py-3 space-y-2.5">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 overflow-hidden flex-shrink-0">
                  <img
                    src={`http://localhost:8080/product/${item.id}/image`}
                    alt={item.name}
                    className="w-full h-full object-contain p-0.5"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.brand} · Qty {item.qty}</p>
                </div>
                <p className="text-sm font-black text-blue-700 flex-shrink-0">₹{item.price * item.qty}</p>
              </div>
            ))}

            <div className="pt-2 mt-2 border-t border-blue-50 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Items total</span><span className="font-semibold text-gray-700">₹{itemTotal}</span>
              </div>
              {depositTotal > 0 && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Bottle deposit</span><span className="font-semibold text-gray-700">₹{depositTotal}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-blue-700 pt-1 border-t border-blue-100">
                <span>Total</span><span>₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Delivery address ── */}
        <Section title="Delivery Address" icon={LocationIcon}>
          <div className="space-y-2.5">
            {SAVED_ADDRESSES.map(addr => (
              <button
                key={addr.id}
                onClick={() => { setSelectedAddress(addr.id); setUseCustom(false); }}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left active:scale-[0.98]
                  ${!useCustom && selectedAddress === addr.id ? "border-blue-600 bg-blue-50" : "border-blue-100 hover:border-blue-300"}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                  ${!useCustom && selectedAddress === addr.id ? "border-blue-600 bg-blue-600" : "border-gray-200"}`}>
                  {!useCustom && selectedAddress === addr.id && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">{addr.label}</p>
                    {addr.default && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">Default</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{addr.address}</p>
                </div>
              </button>
            ))}

            {/* Custom address */}
            <button
              onClick={() => setUseCustom(true)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left active:scale-[0.98]
                ${useCustom ? "border-blue-600 bg-blue-50" : "border-dashed border-blue-200 hover:border-blue-400"}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${useCustom ? "border-blue-600 bg-blue-600" : "border-gray-200"}`}>
                {useCustom && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className="text-sm font-bold text-blue-600">+ Enter different address</p>
            </button>

            {useCustom && (
              <textarea
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="Type your full delivery address…"
                rows={3}
                className="w-full px-3.5 py-2.5 border border-blue-200 bg-blue-50/40 rounded-xl text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
              />
            )}
          </div>
        </Section>

        {/* ── Payment method ── */}
        <Section title="Payment Method" icon={CardPayIcon}>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(m => (
              <PaymentOption
                key={m.id}
                method={m}
                selected={paymentMethod === m.id}
                onSelect={() => setPaymentMethod(m.id)}
              />
            ))}
          </div>

          {paymentMethod === "CARD" && (
            <div className="mt-3 bg-orange-50 border border-orange-100 rounded-xl px-3.5 py-2.5">
              <p className="text-xs font-bold text-orange-700">Card / Pending Bill</p>
              <p className="text-[11px] text-orange-500 mt-0.5">Amount will be added to your account. Pay when admin requests.</p>
            </div>
          )}
        </Section>

        {/* ── Delivery notes ── */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-blue-50">
            <span className="text-blue-500"><NoteIcon /></span>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Delivery Notes</p>
            <span className="text-[10px] text-gray-300 ml-auto">Optional</span>
          </div>
          <div className="p-4">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Leave at door, call before delivery…"
              rows={2}
              className="w-full px-3.5 py-2.5 border border-blue-100 bg-blue-50/40 rounded-xl text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* ── Delivery time banner ── */}
        <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-green-700">Delivery by Today 6 PM</p>
            <p className="text-xs text-green-500">Order within the next few hours</p>
          </div>
          <span className="ml-auto">
            <CheckCircleIcon />
          </span>
        </div>
      </div>

      {/* ── Fixed place order bar ── */}
      <div className="fixed bottom-16 left-0 right-0 px-4 z-40">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-white font-extrabold text-base shadow-xl shadow-blue-300/40 active:scale-[0.98] transition-all disabled:opacity-60"
            style={{ background: placing ? "#93c5fd" : "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}
          >
            {placing ? (
              <span className="flex items-center gap-2 mx-auto">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Placing Order…
              </span>
            ) : (
              <>
                <span>Place Order</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black">₹{grandTotal}</span>
                  <ArrowRightIcon />
                </div>
              </>
            )}
          </button>
        </div>
      </div>

      <CustomSwal {...swalProps} />
    </div>
  );
}