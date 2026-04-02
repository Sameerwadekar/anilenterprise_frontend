// // // // import { useEffect, useState } from "react";

// // // // export default function AdminOrder() {
// // // //   const [orders, setOrders] = useState([]);
// // // //   const [selectedOrder, setSelectedOrder] = useState(null);

// // // //   // Fetch Orders
// // // //   useEffect(() => {
// // // //     fetch("http://localhost:8080/order/all")
// // // //       .then(res => res.json())
// // // //       .then(data => {
// // // //         setOrders(data.data || []);
// // // //       })
// // // //       .catch(err => console.error(err));
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       <h1 className="text-2xl font-semibold mb-4">All Orders</h1>

// // // //       {/* TABLE */}
// // // //       <div className="overflow-x-auto bg-neutral-primary-soft shadow rounded border border-default">
// // // //         <table className="w-full text-sm text-left">
// // // //           <thead className="bg-neutral-secondary-medium border-b">
// // // //             <tr>
// // // //               <th className="px-4 py-3">Order ID</th>
// // // //               <th className="px-4 py-3">Customer</th>
// // // //               <th className="px-4 py-3">Amount</th>
// // // //               <th className="px-4 py-3">Status</th>
// // // //               <th className="px-4 py-3">Action</th>
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody>
// // // //             {orders.map(order => (
// // // //               <tr key={order.id} className="border-b hover:bg-neutral-secondary-medium">
                
// // // //                 <td className="px-4 py-3">
// // // //                   {order.id.slice(0, 8)}...
// // // //                 </td>

// // // //                 <td className="px-4 py-3">
// // // //                   {order.customerId}
// // // //                 </td>

// // // //                 <td className="px-4 py-3">
// // // //                   ₹{order.totalAmount}
// // // //                 </td>

// // // //                 <td className="px-4 py-3">
// // // //                   {order.orderStatus}
// // // //                 </td>

// // // //                 <td className="px-4 py-3">
// // // //                   <button
// // // //                     onClick={() => setSelectedOrder(order)}
// // // //                     className="text-blue-500 underline"
// // // //                   >
// // // //                     View
// // // //                   </button>
// // // //                 </td>

// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

// // // //       {/* MODAL */}
// // // //       {selectedOrder && (
// // // //         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
// // // //           <div className="bg-white p-6 rounded w-full max-w-2xl">

// // // //             <div className="flex justify-between mb-4">
// // // //               <h2 className="text-lg font-semibold">Order Details</h2>
// // // //               <button onClick={() => setSelectedOrder(null)}>X</button>
// // // //             </div>

// // // //             <div className="space-y-2 text-sm">
// // // //               <p><b>Order ID:</b> {selectedOrder.id}</p>
// // // //               <p><b>Customer:</b> {selectedOrder.customerId}</p>
// // // //               <p><b>Address:</b> {selectedOrder.deliveryAddress}</p>
// // // //               <p><b>Total:</b> ₹{selectedOrder.totalAmount}</p>
// // // //               <p><b>Deposit:</b> ₹{selectedOrder.depositAmount}</p>
// // // //               <p><b>Status:</b> {selectedOrder.orderStatus}</p>
// // // //               <p><b>Payment:</b> {selectedOrder.paymentMethod}</p>
// // // //               <p><b>Notes:</b> {selectedOrder.notes}</p>
// // // //             </div>

// // // //             {/* ITEMS */}
// // // //             <h3 className="mt-4 font-semibold">Items</h3>
// // // //             <div className="mt-2 space-y-2">
// // // //               {selectedOrder.orderItems.map(item => (
// // // //                 <div key={item.id} className="border p-2 rounded">
// // // //                   <p>{item.productName} ({item.productBrand})</p>
// // // //                   <p>Qty: {item.quantity}</p>
// // // //                   <p>Price: ₹{item.totalPrice}</p>
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // import { useEffect, useState } from "react";
// // // import { FaUserCircle } from "react-icons/fa";

// // // export default function AdminOrder() {
// // //   const [orders, setOrders] = useState([]);
// // //   const [selectedOrder, setSelectedOrder] = useState(null);
// // //   const [returnQty, setReturnQty] = useState(0);

// // //   // Fetch Orders
// // //   useEffect(() => {
// // //     fetch("http://localhost:8080/order/all")
// // //       .then((res) => res.json())
// // //       .then((data) => {
// // //         setOrders(data.data || []);
// // //       })
// // //       .catch((err) => console.error(err));
// // //   }, []);

// // //   // Handle Delivery Confirmation
// // //   const handleConfirmDelivery = (orderId) => {
// // //     fetch(`http://localhost:8080/orders/${orderId}/status`, {
// // //       method: "PUT",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({ status: "DELIVERED", returnedQty: returnQty }),
// // //     })
// // //       .then((res) => res.json())
// // //       .then((data) => {
// // //         alert("Delivery Confirmed!");
// // //         setSelectedOrder(null);
// // //         // Refresh orders
// // //         fetch("http://localhost:8080/order/all")
// // //           .then((res) => res.json())
// // //           .then((data) => setOrders(data.data || []));
// // //       });
// // //   };

// // //   return (
// // //     <div className="p-6 bg-blue-50 min-h-screen">
// // //       <h1 className="text-3xl font-semibold mb-6 text-blue-700">All Orders</h1>

// // //       {/* TABLE */}
// // //       <div className="overflow-x-auto shadow-md rounded border border-blue-200 bg-white">
// // //         <table className="w-full text-sm text-left">
// // //           <thead className="bg-blue-100 border-b">
// // //             <tr>
// // //               <th className="px-4 py-3">Order ID</th>
// // //               <th className="px-4 py-3">Customer</th>
// // //               <th className="px-4 py-3">Amount</th>
// // //               <th className="px-4 py-3">Status</th>
// // //               <th className="px-4 py-3">Pending Bottles</th>
// // //               <th className="px-4 py-3">Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {orders.map((order) => (
// // //               <tr
// // //                 key={order.id}
// // //                 className="border-b hover:bg-blue-50 transition-colors"
// // //               >
// // //                 <td className="px-4 py-3 font-mono text-gray-700">
// // //                   {order.id.slice(0, 8)}...
// // //                 </td>

// // //                 <td className="px-4 py-3 text-gray-700">{order.customerId}</td>

// // //                 <td className="px-4 py-3 text-gray-700">₹{order.totalAmount}</td>

// // //                 <td className="px-4 py-3 font-medium text-blue-600">
// // //                   {order.orderStatus}
// // //                 </td>

// // //                 <td className="px-4 py-3 text-red-500 font-semibold">
// // //                   {order.pendingBottleCount || 0}
// // //                 </td>

// // //                 <td className="px-4 py-3">
// // //                   <button
// // //                     onClick={() => {
// // //                       setSelectedOrder(order);
// // //                       setReturnQty(0);
// // //                     }}
// // //                     className="text-blue-500 underline hover:text-blue-700 transition"
// // //                   >
// // //                     View & Deliver
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* MODAL */}
// // //       {selectedOrder && (
// // //         <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 pt-10">
// // //           <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 animate-slide-down">
// // //             {/* HEADER */}
// // //             <div className="flex justify-between items-center mb-4">
// // //               <div className="flex items-center gap-3">
// // //                 <img
// // //                   src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// // //                   alt="Profile"
// // //                   className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
// // //                 />
// // //                 <h2 className="text-xl font-semibold text-blue-700">
// // //                   Order Details
// // //                 </h2>
// // //               </div>
// // //               <button
// // //                 onClick={() => setSelectedOrder(null)}
// // //                 className="text-gray-500 hover:text-gray-800 font-bold text-lg"
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             {/* ORDER INFO */}
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
// // //               <p>
// // //                 <b>Order ID:</b> {selectedOrder.id}
// // //               </p>
// // //               <p>
// // //                 <b>Customer:</b> {selectedOrder.customerId}
// // //               </p>
// // //               <p>
// // //                 <b>Address:</b> {selectedOrder.deliveryAddress}
// // //               </p>
// // //               <p>
// // //                 <b>Total:</b> ₹{selectedOrder.totalAmount}
// // //               </p>
// // //               <p>
// // //                 <b>Deposit:</b> ₹{selectedOrder.depositAmount}
// // //               </p>
// // //               <p>
// // //                 <b>Status:</b> {selectedOrder.orderStatus}
// // //               </p>
// // //               <p>
// // //                 <b>Payment:</b> {selectedOrder.paymentMethod}
// // //               </p>
// // //               <p>
// // //                 <b>Notes:</b> {selectedOrder.notes || "-"}
// // //               </p>
// // //             </div>

// // //             {/* ITEMS */}
// // //             <h3 className="mt-6 mb-2 text-blue-700 font-semibold">
// // //               Ordered Items
// // //             </h3>
// // //             <div className="space-y-2">
// // //               {selectedOrder.orderItems.map((item) => (
// // //                 <div
// // //                   key={item.id}
// // //                   className="border rounded p-3 bg-blue-50 text-gray-700"
// // //                 >
// // //                   <p className="font-medium">
// // //                     {item.productName} ({item.productBrand})
// // //                   </p>
// // //                   <p>Qty: {item.quantity}</p>
// // //                   <p>Price: ₹{item.totalPrice}</p>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* DELIVERY CONFIRM */}
// // //             {selectedOrder.orderStatus !== "DELIVERED" && (
// // //               <div className="mt-6">
// // //                 <label className="block mb-2 text-gray-700 font-medium">
// // //                   Bottles Returned:
// // //                 </label>
// // //                 <input
// // //                   type="number"
// // //                   min={0}
// // //                   value={returnQty}
// // //                   onChange={(e) => setReturnQty(parseInt(e.target.value))}
// // //                   className="w-24 px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
// // //                 />
// // //                 <button
// // //                   onClick={() => handleConfirmDelivery(selectedOrder.id)}
// // //                   className="ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
// // //                 >
// // //                   Confirm Delivery
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";

// // // ─── SVG Icons ────────────────────────────────────────────────────────────────

// // const EyeIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
// //     <circle cx="12" cy="12" r="3"/>
// //   </svg>
// // );

// // const TruckIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <rect x="1" y="3" width="15" height="13" rx="1"/>
// //     <path d="M16 8h4l3 4v4h-7V8z"/>
// //     <circle cx="5.5" cy="18.5" r="2.5"/>
// //     <circle cx="18.5" cy="18.5" r="2.5"/>
// //   </svg>
// // );

// // const CloseIcon = () => (
// //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
// //     <line x1="18" y1="6" x2="6" y2="18"/>
// //     <line x1="6" y1="6" x2="18" y2="18"/>
// //   </svg>
// // );

// // const CheckCircleIcon = () => (
// //   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
// //     <polyline points="22 4 12 14.01 9 11.01"/>
// //   </svg>
// // );

// // const BottleIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <path d="M8 2h8"/>
// //     <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
// //   </svg>
// // );

// // const FilterIcon = () => (
// //   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
// //   </svg>
// // );

// // const PackageIcon = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
// //     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
// //     <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
// //     <line x1="12" y1="22.08" x2="12" y2="12"/>
// //   </svg>
// // );

// // const ChevronDown = () => (
// //   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
// //     <polyline points="6 9 12 15 18 9"/>
// //   </svg>
// // );

// // // ─── Status Badge ──────────────────────────────────────────────────────────────

// // function StatusBadge({ status }) {
// //   const styles = {
// //     DELIVERED: "bg-green-100 text-green-700 border border-green-200",
// //     PENDING:   "bg-amber-100 text-amber-700 border border-amber-200",
// //     CONFIRMED: "bg-blue-100 text-blue-700 border border-blue-200",
// //     CANCELLED: "bg-red-100 text-red-700 border border-red-200",
// //   };
// //   return (
// //     <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
// //       {status}
// //     </span>
// //   );
// // }

// // // ─── Mobile Order Card ────────────────────────────────────────────────────────

// // function OrderCard({ order, onView }) {
// //   return (
// //     <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 flex flex-col gap-3">
// //       <div className="flex justify-between items-start">
// //         <div>
// //           <p className="text-xs text-gray-400 font-mono"># {order.id.slice(0, 8)}…</p>
// //           <p className="text-sm font-semibold text-gray-800 mt-0.5">{order.customerId.slice(0, 14)}…</p>
// //         </div>
// //         <StatusBadge status={order.orderStatus} />
// //       </div>

// //       <div className="flex justify-between text-sm text-gray-600">
// //         <span>Total</span>
// //         <span className="font-bold text-blue-700">₹{order.totalAmount}</span>
// //       </div>

// //       {order.pendingBottleCount > 0 && (
// //         <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold bg-red-50 rounded-lg px-2 py-1.5">
// //           <BottleIcon />
// //           {order.pendingBottleCount} bottle(s) pending return
// //         </div>
// //       )}

// //       <button
// //         onClick={() => onView(order)}
// //         className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-semibold rounded-xl py-2.5"
// //       >
// //         <EyeIcon />
// //         View & Deliver
// //       </button>
// //     </div>
// //   );
// // }

// // // ─── Skeleton ─────────────────────────────────────────────────────────────────

// // function SkeletonCard() {
// //   return (
// //     <div className="bg-white rounded-2xl border border-blue-100 p-4 animate-pulse space-y-3">
// //       <div className="h-4 bg-blue-100 rounded w-1/2"/>
// //       <div className="h-3 bg-blue-50 rounded w-2/3"/>
// //       <div className="h-8 bg-blue-100 rounded-xl w-full"/>
// //     </div>
// //   );
// // }

// // // ─── Modal ────────────────────────────────────────────────────────────────────

// // function OrderModal({ order, onClose, onConfirm }) {
// //   const [returnQty, setReturnQty] = useState("");
// //   const isDelivered = order.orderStatus === "DELIVERED";
// //   const canConfirm = returnQty !== "" && parseInt(returnQty) >= 0;

// //   return (
// //     <div
// //       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
// //       onClick={(e) => e.target === e.currentTarget && onClose()}
// //     >
// //       {/* Backdrop */}
// //       <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose}/>

// //       {/* Sheet */}
// //       <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto">

// //         {/* Handle */}
// //         <div className="flex justify-center pt-3 pb-1 sm:hidden">
// //           <div className="w-10 h-1 bg-blue-200 rounded-full"/>
// //         </div>

// //         {/* Header */}
// //         <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-blue-50">
// //           <div className="flex items-center gap-2.5">
// //             <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white">
// //               <PackageIcon />
// //             </div>
// //             <div>
// //               <p className="text-xs text-gray-400 font-mono"># {order.id.slice(0, 12)}…</p>
// //               <p className="font-bold text-blue-800 text-sm">Order Details</p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
// //           >
// //             <CloseIcon />
// //           </button>
// //         </div>

// //         <div className="px-5 py-4 space-y-4">
// //           {/* Info Grid */}
// //           <div className="grid grid-cols-2 gap-3">
// //             {[
// //               ["Customer", order.customerId.slice(0, 16) + "…"],
// //               ["Address",  order.deliveryAddress],
// //               ["Total",    `₹${order.totalAmount}`],
// //               ["Deposit",  `₹${order.depositAmount || 0}`],
// //               ["Status",   order.orderStatus],
// //               ["Payment",  order.paymentMethod || "—"],
// //             ].map(([label, val]) => (
// //               <div key={label} className="bg-blue-50/60 rounded-xl p-3">
// //                 <p className="text-xs text-blue-400 font-medium mb-0.5">{label}</p>
// //                 <p className="text-sm font-semibold text-gray-800 break-words">{val}</p>
// //               </div>
// //             ))}
// //           </div>

// //           {order.notes && (
// //             <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-sm text-amber-700">
// //               📝 {order.notes}
// //             </div>
// //           )}

// //           {/* Items */}
// //           <div>
// //             <p className="text-sm font-bold text-blue-800 mb-2">Ordered Items</p>
// //             <div className="space-y-2">
// //               {order.orderItems?.map((item) => (
// //                 <div key={item.id} className="flex items-center justify-between bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
// //                   <div>
// //                     <p className="text-sm font-semibold text-gray-800">{item.productName}</p>
// //                     <p className="text-xs text-gray-400">{item.productBrand} · Qty: {item.quantity}</p>
// //                   </div>
// //                   <p className="text-sm font-bold text-blue-700">₹{item.totalPrice}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Delivery Confirm */}
// //           {!isDelivered && (
// //             <div className="bg-blue-50 rounded-2xl p-4 space-y-3 border border-blue-100">
// //               <p className="text-sm font-bold text-blue-800 flex items-center gap-1.5">
// //                 <BottleIcon /> Confirm Delivery
// //               </p>
// //               <div>
// //                 <label className="text-xs text-gray-500 font-medium block mb-1.5">Bottles Returned</label>
// //                 <input
// //                   type="number"
// //                   min={0}
// //                   placeholder="Enter count…"
// //                   value={returnQty}
// //                   onChange={(e) => setReturnQty(e.target.value)}
// //                   className="w-full px-3 py-2.5 border border-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
// //                 />
// //                 <p className="text-xs text-gray-400 mt-1">Enter 0 if no bottles were returned.</p>
// //               </div>
// //               <button
// //                 disabled={!canConfirm}
// //                 onClick={() => onConfirm(order.id, parseInt(returnQty))}
// //                 className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
// //                   canConfirm
// //                     ? "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-200"
// //                     : "bg-gray-200 text-gray-400 cursor-not-allowed"
// //                 }`}
// //               >
// //                 <CheckCircleIcon />
// //                 {canConfirm ? "Confirm Delivery" : "Enter bottles returned to confirm"}
// //               </button>
// //             </div>
// //           )}

// //           {isDelivered && (
// //             <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-green-700 text-sm font-semibold">
// //               <CheckCircleIcon /> This order has been delivered.
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Main Component ───────────────────────────────────────────────────────────

// // const FILTERS = ["ALL", "PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"];

// // export default function AdminOrder() {
// //   const [orders, setOrders]           = useState([]);
// //   const [loading, setLoading]         = useState(true);
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [activeFilter, setActiveFilter]   = useState("ALL");

// //   const fetchOrders = () => {
// //     setLoading(true);
// //     fetch("http://localhost:8080/order/all")
// //       .then((r) => r.json())
// //       .then((d) => setOrders(d.data || []))
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   };

// //   useEffect(() => { fetchOrders(); }, []);

// //   const handleConfirmDelivery = (orderId, returnedQty) => {
// //     fetch(`http://localhost:8080/orders/${orderId}/status`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ status: "DELIVERED", returnedQty }),
// //     })
// //       .then(() => { alert("✅ Delivery Confirmed!"); setSelectedOrder(null); fetchOrders(); })
// //       .catch(() => alert("❌ Failed to confirm delivery"));
// //   };

// //   const filtered = activeFilter === "ALL"
// //     ? orders
// //     : orders.filter((o) => o.orderStatus === activeFilter);

// //   // ── Stats ──
// //   const stats = {
// //     total:     orders.length,
// //     pending:   orders.filter((o) => o.orderStatus === "PENDING").length,
// //     delivered: orders.filter((o) => o.orderStatus === "DELIVERED").length,
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-sans">

// //       {/* Top Header */}
// //       <div className="bg-blue-700 text-white px-5 pt-10 pb-6">
// //         <div className="max-w-3xl mx-auto">
// //           <div className="flex items-center gap-2 mb-1">
// //             <TruckIcon />
// //             <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">Admin</span>
// //           </div>
// //           <h1 className="text-2xl font-extrabold tracking-tight">Order Management</h1>

// //           {/* Stats Row */}
// //           <div className="flex gap-3 mt-4">
// //             {[
// //               { label: "Total",     val: stats.total,     color: "bg-blue-600" },
// //               { label: "Pending",   val: stats.pending,   color: "bg-amber-400 text-amber-900" },
// //               { label: "Delivered", val: stats.delivered, color: "bg-green-400 text-green-900" },
// //             ].map(({ label, val, color }) => (
// //               <div key={label} className={`flex-1 ${color} rounded-2xl px-3 py-2 text-center`}>
// //                 <p className="text-lg font-black leading-none">{val}</p>
// //                 <p className="text-xs opacity-80 mt-0.5">{label}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">

// //         {/* Filter Pills */}
// //         <div>
// //           <div className="flex items-center gap-1.5 mb-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
// //             <FilterIcon /> Filter
// //           </div>
// //           <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
// //             {FILTERS.map((f) => (
// //               <button
// //                 key={f}
// //                 onClick={() => setActiveFilter(f)}
// //                 className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
// //                   activeFilter === f
// //                     ? "bg-blue-600 text-white border-blue-600 shadow-sm"
// //                     : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
// //                 }`}
// //               >
// //                 {f}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Orders */}
// //         {loading ? (
// //           <div className="space-y-3">
// //             {[1,2,3].map((k) => <SkeletonCard key={k}/>)}
// //           </div>
// //         ) : filtered.length === 0 ? (
// //           <div className="text-center py-16 text-gray-400">
// //             <div className="text-4xl mb-2">📦</div>
// //             <p className="font-semibold">No orders found</p>
// //             <p className="text-sm mt-1">Try a different filter</p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Mobile cards (< md) */}
// //             <div className="md:hidden space-y-3">
// //               {filtered.map((order) => (
// //                 <OrderCard key={order.id} order={order} onView={(o) => setSelectedOrder(o)} />
// //               ))}
// //             </div>

// //             {/* Desktop table (≥ md) */}
// //             <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
// //               <table className="w-full text-sm text-left">
// //                 <thead>
// //                   <tr className="bg-blue-50 border-b border-blue-100 text-blue-700 text-xs uppercase tracking-wider">
// //                     <th className="px-4 py-3">Order ID</th>
// //                     <th className="px-4 py-3">Customer</th>
// //                     <th className="px-4 py-3">Amount</th>
// //                     <th className="px-4 py-3">Status</th>
// //                     <th className="px-4 py-3">Pending Bottles</th>
// //                     <th className="px-4 py-3">Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filtered.map((order, i) => (
// //                     <tr
// //                       key={order.id}
// //                       className={`border-b border-blue-50 hover:bg-blue-50/60 transition-colors ${i % 2 === 0 ? "" : "bg-blue-50/20"}`}
// //                     >
// //                       <td className="px-4 py-3 font-mono text-xs text-gray-400">{order.id.slice(0, 8)}…</td>
// //                       <td className="px-4 py-3 text-gray-700 text-sm">{order.customerId.slice(0, 16)}…</td>
// //                       <td className="px-4 py-3 font-bold text-blue-700">₹{order.totalAmount}</td>
// //                       <td className="px-4 py-3"><StatusBadge status={order.orderStatus}/></td>
// //                       <td className="px-4 py-3">
// //                         {order.pendingBottleCount > 0 ? (
// //                           <span className="flex items-center gap-1 text-red-500 font-semibold text-xs">
// //                             <BottleIcon/> {order.pendingBottleCount}
// //                           </span>
// //                         ) : (
// //                           <span className="text-gray-300 text-xs">—</span>
// //                         )}
// //                       </td>
// //                       <td className="px-4 py-3">
// //                         <button
// //                           onClick={() => setSelectedOrder(order)}
// //                           className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
// //                         >
// //                           <EyeIcon /> View & Deliver
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </>
// //         )}
// //       </div>

// //       {/* Modal */}
// //       {selectedOrder && (
// //         <OrderModal
// //           order={selectedOrder}
// //           onClose={() => setSelectedOrder(null)}
// //           onConfirm={handleConfirmDelivery}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";

// // ─── SVG Icons ────────────────────────────────────────────────────────────────

// const OrdersIcon = ({ filled }) => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
//     <rect x="9" y="3" width="6" height="4" rx="1"/>
//     <line x1="9" y1="12" x2="15" y2="12"/>
//     <line x1="9" y1="16" x2="13" y2="16"/>
//   </svg>
// );

// const DashboardIcon = ({ filled }) => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="3" y="3" width="7" height="7" rx="1"/>
//     <rect x="14" y="3" width="7" height="7" rx="1"/>
//     <rect x="3" y="14" width="7" height="7" rx="1"/>
//     <rect x="14" y="14" width="7" height="7" rx="1"/>
//   </svg>
// );

// const CustomersIcon = ({ filled }) => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
//     <circle cx="9" cy="7" r="4"/>
//     <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
//     <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//   </svg>
// );

// const ProductsIcon = ({ filled }) => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
//     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
//     <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
//     <line x1="12" y1="22.08" x2="12" y2="12"/>
//   </svg>
// );

// const SettingsIcon = ({ filled }) => (
//   <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="3"/>
//     <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
//   </svg>
// );

// const TruckIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="1" y="3" width="15" height="13" rx="1"/>
//     <path d="M16 8h4l3 4v4h-7V8z"/>
//     <circle cx="5.5" cy="18.5" r="2.5"/>
//     <circle cx="18.5" cy="18.5" r="2.5"/>
//   </svg>
// );

// const ChevronDown = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//     <polyline points="6 9 12 15 18 9"/>
//   </svg>
// );

// const LogoutIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//     <polyline points="16 17 21 12 16 7"/>
//     <line x1="21" y1="12" x2="9" y2="12"/>
//   </svg>
// );

// // ─── Nav config ───────────────────────────────────────────────────────────────

// const NAV_ITEMS = [
//   { label: "Dashboard", to: "/admin/dashboard", Icon: DashboardIcon },
//   { label: "Orders",    to: "/admin/orders",    Icon: OrdersIcon    },
//   { label: "Customers", to: "/admin/customers", Icon: CustomersIcon },
//   { label: "Products",  to: "/admin/products",  Icon: ProductsIcon  },
//   { label: "Settings",  to: "/admin/settings",  Icon: SettingsIcon  },
// ];

// // ─── Layout ───────────────────────────────────────────────────────────────────

// export default function AdminLayout() {
//   const location   = useLocation();
//   const [open, setOpen] = useState(false);

//   // Close dropdown on route change
//   useEffect(() => { setOpen(false); }, [location.pathname]);

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (!e.target.closest("#admin-dropdown")) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const isActive     = (to) => location.pathname.startsWith(to);
//   const currentLabel = NAV_ITEMS.find(n => isActive(n.to))?.label ?? "Admin";

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

//       {/* ══════════════ DESKTOP TOP NAVBAR ══════════════ */}
//       <nav className="hidden md:flex bg-white border-b border-blue-100 shadow-sm px-6 py-3 items-center justify-between sticky top-0 z-50">

//         {/* LEFT — Brand */}
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow">
//             <TruckIcon />
//           </div>
//           <div>
//             <p className="font-extrabold text-blue-800 text-sm leading-tight tracking-tight">AquaAdmin</p>
//             <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider">Management Panel</p>
//           </div>
//         </div>

//         {/* CENTER — Nav links (same pill pattern as customer Navbar) */}
//         <div className="flex items-center gap-1">
//           {NAV_ITEMS.map(({ label, to, Icon }) => {
//             const active = isActive(to);
//             return (
//               <Link
//                 key={to}
//                 to={to}
//                 className={`
//                   flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all
//                   ${active
//                     ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
//                     : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
//                   }
//                 `}
//               >
//                 <span className={active ? "text-white" : "text-blue-400"}>
//                   <Icon filled={active} />
//                 </span>
//                 {label}
//               </Link>
//             );
//           })}
//         </div>

//         {/* RIGHT — Admin dropdown (mirrors customer profile dropdown) */}
//         <div className="relative" id="admin-dropdown">
//           <button
//             onClick={() => setOpen(o => !o)}
//             className={`
//               flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-sm font-semibold
//               ${open
//                 ? "bg-blue-600 text-white border-blue-600 shadow-sm"
//                 : "bg-white text-gray-700 border-blue-100 hover:border-blue-300 hover:bg-blue-50"
//               }
//             `}
//           >
//             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${open ? "bg-white text-blue-600" : "bg-blue-100 text-blue-700"}`}>
//               A
//             </div>
//             <span>Admin</span>
//             <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
//               <ChevronDown />
//             </span>
//           </button>

//           {open && (
//             <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-blue-100 rounded-2xl shadow-xl shadow-blue-100/50 overflow-hidden z-50">
//               <div className="px-4 py-3 border-b border-blue-50">
//                 <p className="text-xs font-bold text-gray-800">Admin User</p>
//                 <p className="text-[11px] text-gray-400 mt-0.5">admin@aquaapp.com</p>
//               </div>
//               <button
//                 onClick={() => alert("Logged out!")}
//                 className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
//               >
//                 <LogoutIcon /> Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* ══════════════ MOBILE TOP BAR ══════════════ */}
//       <div className="md:hidden sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2.5">
//           <div className="w-8 h-8 bg-blue-700 rounded-xl flex items-center justify-center text-white">
//             <TruckIcon />
//           </div>
//           <div>
//             <p className="font-extrabold text-blue-800 text-sm leading-tight">AquaAdmin</p>
//             <p className="text-blue-400 text-[10px] font-semibold">{currentLabel}</p>
//           </div>
//         </div>

//         {/* Logout pill */}
//         <button
//           onClick={() => alert("Logged out!")}
//           className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-500 text-xs font-bold border border-red-100 active:scale-95 transition-all"
//         >
//           <LogoutIcon /> Logout
//         </button>
//       </div>

//       {/* ══════════════ PAGE CONTENT ══════════════ */}
//       <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
//         <Outlet />
//       </main>

//       {/* ══════════════ MOBILE BOTTOM TAB BAR ══════════════ */}
//       {/* Exact same structure as customer Navbar bottom tabs */}
//       <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-blue-100 shadow-[0_-4px_20px_rgba(59,130,246,0.08)]">
//         <div className="flex justify-around items-center px-2 py-1.5">
//           {NAV_ITEMS.map(({ label, to, Icon }) => {
//             const active = isActive(to);
//             return (
//               <Link
//                 key={to}
//                 to={to}
//                 className={`
//                   relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200
//                   ${active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}
//                 `}
//               >
//                 {/* Active pill background */}
//                 {active && (
//                   <span className="absolute inset-0 bg-blue-50 rounded-2xl"/>
//                 )}
//                 {/* Active top indicator line */}
//                 {active && (
//                   <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"/>
//                 )}

//                 <span className="relative z-10">
//                   <Icon filled={active} />
//                 </span>
//                 <span className={`relative z-10 text-[10px] font-bold tracking-wide ${active ? "text-blue-600" : "text-gray-400"}`}>
//                   {label}
//                 </span>
//               </Link>
//             );
//           })}
//         </div>
//         {/* iPhone safe area */}
//         <div style={{ height: "env(safe-area-inset-bottom)" }} />
//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../utils/proxy/orderProxy";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 4v4h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const BottleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8"/>
    <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles = {
    DELIVERED: "bg-green-100 text-green-700 border border-green-200",
    PENDING:   "bg-amber-100 text-amber-700 border border-amber-200",
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
      <div className="h-4 bg-blue-100 rounded w-1/2"/>
      <div className="h-3 bg-blue-50 rounded w-2/3"/>
      <div className="h-8 bg-blue-100 rounded-xl w-full"/>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function OrderModal({ order, onClose, onConfirm }) {
  const [returnQty, setReturnQty] = useState("");
  const isDelivered = order.orderStatus === "DELIVERED";
  const canConfirm  = returnQty !== "" && parseInt(returnQty) >= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose}/>

      {/* Sheet */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto">

        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-blue-200 rounded-full"/>
        </div>

        {/* Header */}
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

        <div className="px-5 py-4 space-y-4">

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Customer", order.customerId.slice(0, 16) + "…"],
              ["Address",  order.deliveryAddress],
              ["Total",    `₹${order.totalAmount}`],
              ["Deposit",  `₹${order.depositAmount || 0}`],
              ["Status",   order.orderStatus],
              ["Payment",  order.paymentMethod || "—"],
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

          {/* Order items */}
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

          {/* Confirm delivery */}
          {!isDelivered && (
            <div className="bg-blue-50 rounded-2xl p-4 space-y-3 border border-blue-100">
              <p className="text-sm font-bold text-blue-800 flex items-center gap-1.5">
                <BottleIcon /> Confirm Delivery
              </p>
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
                onClick={() => onConfirm(order.id, parseInt(returnQty))}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  canConfirm
                    ? "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-200"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <CheckCircleIcon />
                {canConfirm ? "Confirm Delivery" : "Enter bottles returned to confirm"}
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
  const [orders, setOrders]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter]   = useState("ALL");

  // const fetchOrders = async () => {
  //   setLoading(true);
  //   try {
  //     const res  = await getAllOrders();
  //     const data = res?.data || res;
  //     setOrders(data || []);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => { fetchOrders(); }, []);

  // const handleConfirmDelivery = async (orderId, returnedQty) => {
  //   try {
  //     await updateOrderStatus(orderId, { status: "DELIVERED", returnedQty });
  //     alert("✅ Delivery Confirmed!");
  //     setSelectedOrder(null);
  //     fetchOrders();
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Failed to confirm delivery");
  //   }
  // };

  const filtered = activeFilter === "ALL"
    ? orders
    : orders.filter((o) => o.orderStatus === activeFilter);

  const stats = {
    total:     orders.length,
    pending:   orders.filter((o) => o.orderStatus === "PENDING").length,
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
              { label: "Total",     val: stats.total,     color: "bg-blue-600" },
              { label: "Pending",   val: stats.pending,   color: "bg-amber-400 text-amber-900" },
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
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  activeFilter === f
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
            {[1, 2, 3].map((k) => <SkeletonCard key={k}/>)}
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
                      <td className="px-4 py-3"><StatusBadge status={order.orderStatus}/></td>
                      <td className="px-4 py-3">
                        {order.pendingBottleCount > 0 ? (
                          <span className="flex items-center gap-1 text-red-500 font-semibold text-xs">
                            <BottleIcon/> {order.pendingBottleCount}
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
          // onConfirm={handleConfirmDelivery}
        />
      )}
    </div>
  );
}