import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../utils/proxy/orderProxy";

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 4v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const BottleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8" />
    <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const PackageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles = {
    DELIVERED: "bg-green-100 text-green-700 border border-green-200",
    PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
    CONFIRMED: "bg-blue-100 text-blue-700 border border-blue-200",
    CANCELLED: "bg-red-100 text-red-700 border border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
      {status}
    </span>
  );
}

// ─── Mobile Order Card ────────────────────────────────────────────────────────

function OrderCard({ order, onView }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-400 font-mono"># {order.id.slice(0, 8)}…</p>
          <p className="text-sm font-semibold text-gray-800 mt-0.5">{order.customerId.slice(0, 14)}…</p>
        </div>
        <StatusBadge status={order.orderStatus} />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Total</span>
        <span className="font-bold text-blue-700">₹{order.totalAmount}</span>
      </div>

      {order.pendingBottleCount > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold bg-red-50 rounded-lg px-2 py-1.5">
          <BottleIcon />
          {order.pendingBottleCount} bottle(s) pending return
        </div>
      )}

      <button
        onClick={() => onView(order)}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-semibold rounded-xl py-2.5"
      >
        <EyeIcon />
        View & Deliver
      </button>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-4 animate-pulse space-y-3">
      <div className="h-4 bg-blue-100 rounded w-1/2" />
      <div className="h-3 bg-blue-50 rounded w-2/3" />
      <div className="h-8 bg-blue-100 rounded-xl w-full" />
    </div>
  );
}

function OrderModal({ order, onClose, onConfirm }) {
  const [returnQty, setReturnQty] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const isDelivered = order.orderStatus === "DELIVERED";
  const canConfirm = returnQty !== "" && parseInt(returnQty) >= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet — max-h-[85vh] so it sits above the ~60px tab bar */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">

        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-blue-200 rounded-full" />
        </div>

        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-blue-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <PackageIcon />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-mono"># {order.id.slice(0, 12)}…</p>
              <p className="font-bold text-blue-800 text-sm">Order Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
          >
            <CloseIcon />
          </button>
        </div>

        {/* pb-28 ensures content clears the mobile tab bar when scrolled to bottom */}
        <div className="px-5 py-4 space-y-4 pb-28 sm:pb-6">

          <div className="grid grid-cols-2 gap-3">
            {[
              ["Customer", order.customerId.slice(0, 16) + "…"],
              ["Address", order.deliveryAddress],
              ["Total", `₹${order.totalAmount}`],
              ["Deposit", `₹${order.depositAmount || 0}`],
              ["Status", order.orderStatus],
              ["Payment", order.paymentMethod || "—"],
            ].map(([label, val]) => (
              <div key={label} className="bg-blue-50/60 rounded-xl p-3">
                <p className="text-xs text-blue-400 font-medium mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-800 break-words">{val}</p>
              </div>
            ))}
          </div>

          {order.notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-sm text-amber-700">
              📝 {order.notes}
            </div>
          )}

          <div>
            <p className="text-sm font-bold text-blue-800 mb-2">Ordered Items</p>
            <div className="space-y-2">
              {order.orderItems?.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.productName}</p>
                    <p className="text-xs text-gray-400">{item.productBrand} · Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-blue-700">₹{item.totalPrice}</p>
                </div>
              ))}
            </div>
          </div>

          {!isDelivered && (
            <div className="bg-blue-50 rounded-2xl p-4 space-y-3 border border-blue-100">
              <p className="text-sm font-bold text-blue-800 flex items-center gap-1.5">
                <BottleIcon /> Confirm Delivery
              </p>

              {/* Payment method selector */}
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "COD", label: "COD", sub: "Pay on delivery" },
                    { value: "CART", label: "Credit", sub: "Add to account" },
                  ].map(({ value, label, sub }) => (
                    <button
                      key={value}
                      onClick={() => setPaymentMethod(value)}
                      className={`flex flex-col items-center py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${paymentMethod === value
                          ? "border-blue-500 bg-blue-600 text-white"
                          : "border-blue-100 bg-white text-gray-600 hover:border-blue-300"
                        }`}
                    >
                      {label}
                      <span className={`text-xs font-normal mt-0.5 ${paymentMethod === value ? "text-blue-100" : "text-gray-400"}`}>
                        {sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1.5">Bottles Returned</label>
                <input
                  type="number"
                  min={0}
                  placeholder="Enter count…"
                  value={returnQty}
                  onChange={(e) => setReturnQty(e.target.value)}
                  className="w-full px-3 py-2.5 border border-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">Enter 0 if no bottles were returned.</p>
              </div>

              <button
                disabled={!canConfirm}
                onClick={() => onConfirm(order.id, parseInt(returnQty), paymentMethod)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${canConfirm
                    ? "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-200"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <CheckCircleIcon />
                {canConfirm ? `Confirm · ${paymentMethod === "CART" ? "Credit" : "COD"}` : "Enter bottles returned to confirm"}
              </button>
            </div>
          )}

          {isDelivered && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-green-700 text-sm font-semibold">
              <CheckCircleIcon /> This order has been delivered.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// ─── Main Page ────────────────────────────────────────────────────────────────

const FILTERS = ["ALL", "PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"];

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      console.log("API response:", res); // 🔍 Check what is returned
      const data = res?.data || [];
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleConfirmDelivery = async (orderId, returnedQty, paymentMethod) => {
    try {
      await updateOrderStatus({
        orderId,
        status: "DELIVERED",
        returnedQty,
        paymentMethod, 
      });
      alert("✅ Delivery Confirmed!");
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to confirm delivery");
    }
  };

  const filtered = activeFilter === "ALL"
    ? orders
    : orders.filter((o) => o.orderStatus === activeFilter);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.orderStatus === "PENDING").length,
    delivered: orders.filter((o) => o.orderStatus === "DELIVERED").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

      {/* Header */}
      <div className="bg-blue-700 text-white px-5 pt-6 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <TruckIcon />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">Admin</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Order Management</h1>

          {/* Stats */}
          <div className="flex gap-3 mt-4">
            {[
              { label: "Total", val: stats.total, color: "bg-blue-600" },
              { label: "Pending", val: stats.pending, color: "bg-amber-400 text-amber-900" },
              { label: "Delivered", val: stats.delivered, color: "bg-green-400 text-green-900" },
            ].map(({ label, val, color }) => (
              <div key={label} className={`flex-1 ${color} rounded-2xl px-3 py-2 text-center`}>
                <p className="text-lg font-black leading-none">{val}</p>
                <p className="text-xs opacity-80 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">

        {/* Filter pills */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <FilterIcon /> Filter
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${activeFilter === f
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Order list */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((k) => <SkeletonCard key={k} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-2">📦</div>
            <p className="font-semibold">No orders found</p>
            <p className="text-sm mt-1">Try a different filter</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((order) => (
                <OrderCard key={order.id} order={order} onView={(o) => setSelectedOrder(o)} />
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-blue-50 border-b border-blue-100 text-blue-700 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Pending Bottles</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, i) => (
                    <tr
                      key={order.id}
                      className={`border-b border-blue-50 hover:bg-blue-50/60 transition-colors ${i % 2 === 0 ? "" : "bg-blue-50/20"}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">{order.id.slice(0, 8)}…</td>
                      <td className="px-4 py-3 text-gray-700 text-sm">{order.customerId.slice(0, 16)}…</td>
                      <td className="px-4 py-3 font-bold text-blue-700">₹{order.totalAmount}</td>
                      <td className="px-4 py-3"><StatusBadge status={order.orderStatus} /></td>
                      <td className="px-4 py-3">
                        {order.pendingBottleCount > 0 ? (
                          <span className="flex items-center gap-1 text-red-500 font-semibold text-xs">
                            <BottleIcon /> {order.pendingBottleCount}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
                        >
                          <EyeIcon /> View & Deliver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onConfirm={handleConfirmDelivery}
        />
      )}
    </div>
  );
}