import { useState } from "react";
import CustomSwal, { useSwal } from "../utils/CustomSwal";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.71a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const BottleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8"/>
    <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const StopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <rect x="9" y="9" width="6" height="6"/>
  </svg>
);

const DepositIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DUMMY_CUSTOMERS = [
  { id: "c1", name: "Rahul Sharma",   phone: "+91 98765 43210", address: "Andheri East, Mumbai",    totalOrders: 24, bottlesHeld: 3, depositPaid: 720,  status: "ACTIVE"   },
  { id: "c2", name: "Priya Mehta",    phone: "+91 91234 56789", address: "Bandra West, Mumbai",     totalOrders: 11, bottlesHeld: 1, depositPaid: 240,  status: "ACTIVE"   },
  { id: "c3", name: "Amit Joshi",     phone: "+91 99887 76655", address: "Powai, Mumbai",           totalOrders: 38, bottlesHeld: 5, depositPaid: 1200, status: "ACTIVE"   },
  { id: "c4", name: "Sneha Patil",    phone: "+91 88776 65544", address: "Thane West",              totalOrders: 7,  bottlesHeld: 2, depositPaid: 480,  status: "STOPPED"  },
  { id: "c5", name: "Vikram Nair",    phone: "+91 77665 54433", address: "Malad West, Mumbai",      totalOrders: 19, bottlesHeld: 0, depositPaid: 0,    status: "ACTIVE"   },
  { id: "c6", name: "Kavita Singh",   phone: "+91 66554 43322", address: "Borivali East, Mumbai",   totalOrders: 52, bottlesHeld: 4, depositPaid: 960,  status: "ACTIVE"   },
  { id: "c7", name: "Deepak Verma",   phone: "+91 55443 32211", address: "Goregaon West, Mumbai",   totalOrders: 3,  bottlesHeld: 1, depositPaid: 240,  status: "STOPPED"  },
  { id: "c8", name: "Anita Desai",    phone: "+91 44332 21100", address: "Jogeshwari, Mumbai",      totalOrders: 15, bottlesHeld: 2, depositPaid: 480,  status: "ACTIVE"   },
];

const FILTERS = ["ALL", "ACTIVE", "STOPPED"];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
      status === "ACTIVE"  ? "bg-green-100 text-green-700" :
      status === "STOPPED" ? "bg-red-100 text-red-600"     :
      "bg-gray-100 text-gray-500"
    }`}>
      {status === "ACTIVE" ? "● Active" : "■ Stopped"}
    </span>
  );
}

// ─── Customer Detail Sheet ────────────────────────────────────────────────────

function CustomerSheet({ customer, onClose, onStopService, onReturnDeposit }) {
  if (!customer) return null;

  const isStopped = customer.status === "STOPPED";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose}/>

      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto">

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-blue-200 rounded-full"/>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-sm shadow-md">
              {customer.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-sm">{customer.name}</p>
              <StatusBadge status={customer.status}/>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition">
            <CloseIcon />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Phone",           customer.phone],
              ["Address",         customer.address],
              ["Total Orders",    customer.totalOrders],
              ["Bottles Held",    `${customer.bottlesHeld} bottles`],
              ["Deposit Paid",    `₹${customer.depositPaid}`],
              ["Status",          customer.status],
            ].map(([label, val]) => (
              <div key={label} className="bg-blue-50/60 rounded-xl p-3">
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-800 break-words">{val}</p>
              </div>
            ))}
          </div>

          {/* Bottle return summary */}
          {customer.bottlesHeld > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-amber-500"><BottleIcon /></span>
              <div>
                <p className="text-xs font-bold text-amber-700">{customer.bottlesHeld} bottle(s) still with customer</p>
                <p className="text-[11px] text-amber-600">Deposit: ₹{customer.depositPaid} to be refunded on return</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2 pt-1">

            {/* Stop Service */}
            {!isStopped && (
              <button
                onClick={onStopService}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-2xl transition-all active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                    <StopIcon />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-red-700">Stop Service</p>
                    <p className="text-xs text-red-400">Mark customer as stopped & collect bottles</p>
                  </div>
                </div>
                <span className="text-red-300"><ChevronRight /></span>
              </button>
            )}

            {/* Return Deposit */}
            {customer.depositPaid > 0 && (
              <button
                onClick={onReturnDeposit}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-green-50 hover:bg-green-100 border border-green-100 rounded-2xl transition-all active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    <DepositIcon />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-green-700">Return Deposit</p>
                    <p className="text-xs text-green-500">₹{customer.depositPaid} to refund when bottles returned</p>
                  </div>
                </div>
                <span className="text-green-300"><ChevronRight /></span>
              </button>
            )}

            {isStopped && customer.depositPaid === 0 && (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-center">
                <p className="text-sm text-gray-400 font-semibold">Service stopped · No deposit to return</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Customer Card ─────────────────────────────────────────────────────

function CustomerCard({ customer, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-all"
    >
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow">
        {customer.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate">{customer.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5 text-gray-400 text-xs">
          <PhoneIcon /> {customer.phone}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <StatusBadge status={customer.status}/>
          {customer.bottlesHeld > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
              <BottleIcon /> {customer.bottlesHeld}
            </span>
          )}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-black text-blue-700">₹{customer.depositPaid}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">deposit</p>
        <span className="text-gray-300 mt-1 block"><ChevronRight /></span>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-4 animate-pulse flex items-center gap-3">
      <div className="w-11 h-11 bg-blue-100 rounded-2xl flex-shrink-0"/>
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-blue-100 rounded w-1/2"/>
        <div className="h-3 bg-blue-50 rounded w-2/3"/>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminCustomer() {
  const [customers, setCustomers]         = useState(DUMMY_CUSTOMERS);
  const [selected, setSelected]           = useState(null);
  const [search, setSearch]               = useState("");
  const [activeFilter, setActiveFilter]   = useState("ALL");
  const [loading]                         = useState(false);

  const { swalProps, showSwal } = useSwal();

  // Stats
  const stats = {
    total:   customers.length,
    active:  customers.filter(c => c.status === "ACTIVE").length,
    stopped: customers.filter(c => c.status === "STOPPED").length,
    deposit: customers.reduce((s, c) => s + c.depositPaid, 0),
  };

  // Filter + search
  const filtered = customers
    .filter(c => activeFilter === "ALL" || c.status === activeFilter)
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    );

  // ── Handlers ──

  const handleStopService = () => {
    setSelected(null);
    showSwal({
      type:        "confirm",
      title:       "Stop Service?",
      message:     `This will stop all deliveries for ${selected.name}. Make sure you collect all bottles and process the deposit refund.`,
      confirmText: "Yes, Stop Service",
      cancelText:  "Not Yet",
      onConfirm: () => {
        // 🔥 Wire your API call here: stopCustomerService(selected.id)
        setCustomers(prev =>
          prev.map(c => c.id === selected.id ? { ...c, status: "STOPPED" } : c)
        );
        setSelected(null);
        showSwal({ type: "success", title: "Service Stopped", message: `Deliveries for ${selected.name} have been stopped.` });
      },
    });
  };

  const handleReturnDeposit = () => {
    setSelected(null);
    showSwal({
      type:        "confirm",
      title:       "Return Deposit?",
      message:     `Confirm returning ₹${selected.depositPaid} deposit to ${selected.name} after bottles are collected.`,
      confirmText: `Return ₹${selected.depositPaid}`,
      cancelText:  "Cancel",
      onConfirm: () => {
        // 🔥 Wire your API call here: returnDeposit(selected.id)
        setCustomers(prev =>
          prev.map(c => c.id === selected.id ? { ...c, depositPaid: 0, bottlesHeld: 0 } : c)
        );
        setSelected(null);
        showSwal({ type: "success", title: "Deposit Returned!", message: `₹${selected.depositPaid} marked as refunded to ${selected.name}.` });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-32">

      {/* ── Header ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-white text-2xl font-extrabold tracking-tight">Customers</h1>
          <p className="text-blue-200 text-sm mt-1">{stats.active} active · {stats.stopped} stopped</p>

          {/* Stats row */}
          <div className="flex gap-3 mt-4">
            {[
              { label: "Total",   val: stats.total,             color: "bg-blue-600" },
              { label: "Active",  val: stats.active,            color: "bg-green-400 text-green-900" },
              { label: "Deposit", val: `₹${stats.deposit.toLocaleString()}`, color: "bg-amber-400 text-amber-900" },
            ].map(({ label, val, color }) => (
              <div key={label} className={`flex-1 ${color} rounded-2xl px-3 py-2 text-center`}>
                <p className="text-base font-black leading-none">{val}</p>
                <p className="text-[10px] opacity-80 mt-0.5 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-10 space-y-3">

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-blue-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>

        {/* Filter pills */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
            <FilterIcon /> Filter
          </div>
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
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

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4].map(k => <SkeletonCard key={k}/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-2">👥</div>
            <p className="font-semibold">No customers found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map(c => (
                <CustomerCard key={c.id} customer={c} onClick={() => setSelected(c)}/>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-blue-50 border-b border-blue-100 text-blue-700 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Bottles Held</th>
                    <th className="px-4 py-3">Deposit</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.id} className={`border-b border-blue-50 hover:bg-blue-50/60 transition-colors ${i % 2 === 0 ? "" : "bg-blue-50/20"}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                            {c.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1"><LocationIcon/> {c.address}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{c.phone}</td>
                      <td className="px-4 py-3 font-bold text-blue-700">{c.totalOrders}</td>
                      <td className="px-4 py-3">
                        {c.bottlesHeld > 0
                          ? <span className="flex items-center gap-1 text-amber-600 font-semibold text-xs"><BottleIcon/> {c.bottlesHeld}</span>
                          : <span className="text-gray-300 text-xs">—</span>
                        }
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-800">₹{c.depositPaid}</td>
                      <td className="px-4 py-3"><StatusBadge status={c.status}/></td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(c)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
                        >
                          View
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

      {/* Detail Sheet */}
      {selected && (
        <CustomerSheet
          customer={selected}
          onClose={() => setSelected(null)}
          onStopService={handleStopService}
          onReturnDeposit={handleReturnDeposit}
        />
      )}

      {/* Global Swal */}
      <CustomSwal {...swalProps} />
    </div>
  );
}