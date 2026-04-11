import { useState, useEffect } from "react";
import CustomSwal, { useSwal } from "../utils/CustomSwal";
import Loader from "../utils/proxy/Loader";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.71a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const BottleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6"/>
  </svg>
);
const DepositIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const CreditCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const PayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// ─── Dummy data ───────────────────────────────────────────────────────────────

const DUMMY_CUSTOMERS = [
  { id: "c1", name: "Rahul Sharma",  email: "rahul@gmail.com",  phone: "+91 98765 43210", address: "Andheri East, Mumbai",  totalOrders: 24, bottlesHeld: 3, depositPaid: 720,  creditAmount: 480,  status: "ACTIVE"  },
  { id: "c2", name: "Priya Mehta",   email: "priya@gmail.com",  phone: "+91 91234 56789", address: "Bandra West, Mumbai",   totalOrders: 11, bottlesHeld: 1, depositPaid: 240,  creditAmount: 0,    status: "ACTIVE"  },
  { id: "c3", name: "Amit Joshi",    email: "amit@gmail.com",   phone: "+91 99887 76655", address: "Powai, Mumbai",         totalOrders: 38, bottlesHeld: 5, depositPaid: 1200, creditAmount: 1360, status: "ACTIVE"  },
  { id: "c4", name: "Sneha Patil",   email: "sneha@gmail.com",  phone: "+91 88776 65544", address: "Thane West",            totalOrders: 7,  bottlesHeld: 2, depositPaid: 480,  creditAmount: 240,  status: "STOPPED" },
  { id: "c5", name: "Vikram Nair",   email: "vikram@gmail.com", phone: "+91 77665 54433", address: "Malad West, Mumbai",    totalOrders: 19, bottlesHeld: 0, depositPaid: 0,    creditAmount: 0,    status: "ACTIVE"  },
  { id: "c6", name: "Kavita Singh",  email: "kavita@gmail.com", phone: "+91 66554 43322", address: "Borivali East, Mumbai", totalOrders: 52, bottlesHeld: 4, depositPaid: 960,  creditAmount: 720,  status: "ACTIVE"  },
  { id: "c7", name: "Deepak Verma",  email: "deepak@gmail.com", phone: "+91 55443 32211", address: "Goregaon West, Mumbai", totalOrders: 3,  bottlesHeld: 1, depositPaid: 240,  creditAmount: 160,  status: "STOPPED" },
  { id: "c8", name: "Anita Desai",   email: "anita@gmail.com",  phone: "+91 44332 21100", address: "Jogeshwari, Mumbai",    totalOrders: 15, bottlesHeld: 2, depositPaid: 480,  creditAmount: 0,    status: "ACTIVE"  },
];

const FILTERS = ["ALL", "ACTIVE", "STOPPED", "PENDING DUES"];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
      status === "ACTIVE"  ? "bg-green-100 text-green-700" :
      status === "STOPPED" ? "bg-red-100 text-red-600" :
      "bg-gray-100 text-gray-500"}`}>
      {status === "ACTIVE" ? "● Active" : "■ Stopped"}
    </span>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({ checked, onChange, onClick }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick?.(e); onChange?.(!checked); }}
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0
        ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-blue-200 hover:border-blue-400"}`}
    >
      {checked && <CheckIcon />}
    </button>
  );
}

// ─── Customer Detail Sheet (fixed mobile scroll) ──────────────────────────────

function CustomerSheet({ customer, onClose, onStopService, onReturnDeposit, onMarkPaid }) {
  if (!customer) return null;
  const isStopped = customer.status === "STOPPED";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-blue-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet — fixed position, scrolls independently */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div
          className="
            relative bg-white w-full
            rounded-t-3xl sm:rounded-2xl
            shadow-2xl
            flex flex-col
            max-h-[88vh] sm:max-h-[90vh] sm:max-w-md sm:w-full
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
            <div className="w-10 h-1 bg-blue-200 rounded-full"/>
          </div>

          {/* Header — never scrolls */}
          <div className="flex items-center justify-between px-5 pt-3 pb-3 border-b border-blue-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-sm shadow-md flex-shrink-0">
                {customer.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-sm">{customer.name}</p>
                <StatusBadge status={customer.status}/>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition flex-shrink-0">
              <CloseIcon />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">

            {/* Credit amount highlight */}
            {customer.creditAmount > 0 && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Pending Bill (Card)</p>
                    <p className="text-3xl font-black mt-1">₹{customer.creditAmount}</p>
                    <p className="text-xs opacity-75 mt-0.5">Amount due from customer</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <CreditCardIcon />
                  </div>
                </div>
              </div>
            )}

            {customer.creditAmount === 0 && (
              <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                  <CheckIcon />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700">No Pending Bills</p>
                  <p className="text-xs text-green-500">All payments cleared</p>
                </div>
              </div>
            )}

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                ["Phone",        customer.phone],
                ["Address",      customer.address],
                ["Total Orders", customer.totalOrders],
                ["Bottles Held", `${customer.bottlesHeld} bottles`],
                ["Deposit Paid", `₹${customer.depositPaid}`],
                ["Status",       customer.status],
              ].map(([label, val]) => (
                <div key={label} className="bg-blue-50/60 rounded-xl p-3">
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 break-words">{val}</p>
                </div>
              ))}
            </div>

            {/* Bottle warning */}
            {customer.bottlesHeld > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-amber-500 flex-shrink-0"><BottleIcon /></span>
                <div>
                  <p className="text-xs font-bold text-amber-700">{customer.bottlesHeld} bottle(s) still with customer</p>
                  <p className="text-[11px] text-amber-600">Deposit ₹{customer.depositPaid} refunded on return</p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-2">

              {/* Mark as Paid */}
              {customer.creditAmount > 0 && (
                <button
                  onClick={onMarkPaid}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-orange-50 hover:bg-orange-100 border border-orange-100 rounded-2xl transition-all active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 flex-shrink-0">
                      <PayIcon />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-orange-700">Mark as Paid</p>
                      <p className="text-xs text-orange-400">Clear ₹{customer.creditAmount} pending bill</p>
                    </div>
                  </div>
                  <span className="text-orange-300"><ChevronRight /></span>
                </button>
              )}

              {/* Stop Service */}
              {!isStopped && (
                <button
                  onClick={onStopService}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-2xl transition-all active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
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
                    <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                      <DepositIcon />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-green-700">Return Deposit</p>
                      <p className="text-xs text-green-500">₹{customer.depositPaid} refund when bottles returned</p>
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

            {/* bottom breathing room for phones */}
            <div className="h-4"/>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Mobile Customer Card ─────────────────────────────────────────────────────

function CustomerCard({ customer, selected, onSelect, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-all
        ${selected ? "border-blue-400 shadow-blue-100 shadow-md" : "border-blue-100"}`}
    >
      {/* Checkbox */}
      <Checkbox
        checked={selected}
        onChange={() => {}}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
      />

      {/* Avatar */}
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-xs flex-shrink-0 shadow">
        {customer.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
      </div>

      {/* Info */}
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

      {/* Credit amount */}
      <div className="text-right flex-shrink-0">
        {customer.creditAmount > 0 ? (
          <>
            <p className="text-sm font-black text-orange-600">₹{customer.creditAmount}</p>
            <p className="text-[10px] text-orange-400 mt-0.5 font-semibold">pending</p>
          </>
        ) : (
          <>
            <p className="text-sm font-black text-green-600">₹0</p>
            <p className="text-[10px] text-green-400 mt-0.5 font-semibold">clear</p>
          </>
        )}
        <span className="text-gray-300 mt-1 block"><ChevronRight /></span>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-4 animate-pulse flex items-center gap-3">
      <div className="w-5 h-5 bg-blue-100 rounded-md flex-shrink-0"/>
      <div className="w-10 h-10 bg-blue-100 rounded-2xl flex-shrink-0"/>
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-blue-100 rounded w-1/2"/>
        <div className="h-3 bg-blue-50 rounded w-2/3"/>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminCustomers() {
  const [customers, setCustomers]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selected, setSelected]         = useState(null);   // detail sheet
  const [checked, setChecked]           = useState([]);     // multi-select IDs
  const [search, setSearch]             = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [emailSending, setEmailSending] = useState(false);

  const { swalProps, showSwal } = useSwal();

  // ── Load (simulate API) ──
  useEffect(() => {
    const t = setTimeout(() => {
      setCustomers(DUMMY_CUSTOMERS);
      setLoading(false);
    }, 1400);
    return () => clearTimeout(t);
    // Replace with: fetchAllCustomers().then(r => setCustomers(r?.data || r))
  }, []);

  // ── Stats ──
  const stats = {
    total:       customers.length,
    active:      customers.filter(c => c.status === "ACTIVE").length,
    totalCredit: customers.reduce((s, c) => s + c.creditAmount, 0),
    deposit:     customers.reduce((s, c) => s + c.depositPaid, 0),
  };

  // ── Filter + search ──
  const filtered = customers
    .filter(c => {
      if (activeFilter === "PENDING DUES") return c.creditAmount > 0;
      return activeFilter === "ALL" || c.status === activeFilter;
    })
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    );

  // ── Checkbox helpers ──
  const isAllChecked = filtered.length > 0 && filtered.every(c => checked.includes(c.id));
  const toggleAll    = () => setChecked(isAllChecked ? [] : filtered.map(c => c.id));
  const toggleOne    = (id) => setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // ── Send email to selected ──
  const handleSendEmail = () => {
    const targets = customers.filter(c => checked.includes(c.id) && c.creditAmount > 0);
    if (targets.length === 0) {
      showSwal({ type: "info", title: "No pending dues", message: "Selected customers have no pending bills to notify about." });
      return;
    }
    showSwal({
      type:        "confirm",
      title:       `Send Payment Reminder?`,
      message:     `Send email reminders to ${targets.length} customer(s) about their pending dues totalling ₹${targets.reduce((s, c) => s + c.creditAmount, 0).toLocaleString()}.`,
      confirmText: `Send to ${targets.length}`,
      cancelText:  "Cancel",
      onConfirm: async () => {
        setEmailSending(true);
        try {
          // 🔥 Wire: await sendPaymentReminderEmails(targets.map(c => c.id));
          await new Promise(r => setTimeout(r, 1000));
          setChecked([]);
          showSwal({ type: "success", title: "Emails Sent!", message: `Payment reminders sent to ${targets.length} customer(s).` });
        } catch {
          showSwal({ type: "error", title: "Failed to send", message: "Please try again." });
        } finally {
          setEmailSending(false);
        }
      },
    });
  };

  // ── Stop service ──
  const handleStopService = () => {
    const c = selected;
    setSelected(null);
    showSwal({
      type:        "confirm",
      title:       "Stop Service?",
      message:     `This will stop all deliveries for ${c.name}. Collect all bottles and process the deposit refund.`,
      confirmText: "Yes, Stop Service",
      cancelText:  "Not Yet",
      onConfirm: () => {
        // 🔥 Wire: stopCustomerService(c.id)
        setCustomers(prev => prev.map(x => x.id === c.id ? { ...x, status: "STOPPED" } : x));
        showSwal({ type: "success", title: "Service Stopped", message: `Deliveries for ${c.name} have been stopped.` });
      },
    });
  };

  // ── Return deposit ──
  const handleReturnDeposit = () => {
    const c = selected;
    setSelected(null);
    showSwal({
      type:        "confirm",
      title:       "Return Deposit?",
      message:     `Confirm returning ₹${c.depositPaid} deposit to ${c.name} after bottles are collected.`,
      confirmText: `Return ₹${c.depositPaid}`,
      cancelText:  "Cancel",
      onConfirm: () => {
        // 🔥 Wire: returnDeposit(c.id)
        setCustomers(prev => prev.map(x => x.id === c.id ? { ...x, depositPaid: 0, bottlesHeld: 0 } : x));
        showSwal({ type: "success", title: "Deposit Returned!", message: `₹${c.depositPaid} marked as refunded to ${c.name}.` });
      },
    });
  };

  // ── Mark as paid ──
  const handleMarkPaid = () => {
    const c = selected;
    setSelected(null);
    showSwal({
      type:        "confirm",
      title:       "Mark as Paid?",
      message:     `Confirm that ${c.name} has paid ₹${c.creditAmount} in cash or UPI. This will clear their pending bill.`,
      confirmText: `Yes, Mark Paid ₹${c.creditAmount}`,
      cancelText:  "Cancel",
      onConfirm: () => {
        // 🔥 Wire: markCreditPaid(c.id)
        setCustomers(prev => prev.map(x => x.id === c.id ? { ...x, creditAmount: 0 } : x));
        showSwal({ type: "success", title: "Payment Recorded!", message: `₹${c.creditAmount} cleared for ${c.name}.` });
      },
    });
  };

  // ── Full screen loader ──
  if (loading) return <Loader message="Loading customers" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-32">

      {/* ── Header ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Admin</p>
          <h1 className="text-white text-2xl font-extrabold tracking-tight">Customers</h1>
          <p className="text-blue-200 text-sm mt-1">{stats.active} active · ₹{stats.totalCredit.toLocaleString()} pending dues</p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { label: "Total",    val: stats.total,                              color: "bg-blue-600"              },
              { label: "Active",   val: stats.active,                             color: "bg-green-400 text-green-900" },
              { label: "Dues",     val: `₹${(stats.totalCredit/1000).toFixed(1)}k`, color: "bg-orange-400 text-orange-900" },
              { label: "Deposit",  val: `₹${(stats.deposit/1000).toFixed(1)}k`,  color: "bg-amber-400 text-amber-900" },
            ].map(({ label, val, color }) => (
              <div key={label} className={`${color} rounded-2xl px-2 py-2 text-center`}>
                <p className="text-sm font-black leading-none">{val}</p>
                <p className="text-[9px] opacity-80 mt-0.5 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-10 space-y-3">

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
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
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map(f => (
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

        {/* Multi-select toolbar */}
        {filtered.length > 0 && (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Checkbox
                checked={isAllChecked}
                onChange={toggleAll}
                onClick={() => toggleAll()}
              />
              <span className="text-xs font-bold text-gray-600">
                {checked.length > 0 ? `${checked.length} selected` : "Select all"}
              </span>
            </div>

            {checked.length > 0 && (
              <button
                onClick={handleSendEmail}
                disabled={emailSending}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all active:scale-95 disabled:opacity-60"
              >
                {emailSending ? (
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : <EmailIcon />}
                Send Reminder
              </button>
            )}
          </div>
        )}

        {/* Empty */}
        {filtered.length === 0 ? (
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
                <CustomerCard
                  key={c.id}
                  customer={c}
                  selected={checked.includes(c.id)}
                  onSelect={() => toggleOne(c.id)}
                  onClick={() => setSelected(c)}
                />
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-blue-50 border-b border-blue-100 text-blue-700 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">
                      <Checkbox checked={isAllChecked} onChange={toggleAll} onClick={() => toggleAll()}/>
                    </th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Bottles</th>
                    <th className="px-4 py-3">Pending Bill</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.id} className={`border-b border-blue-50 hover:bg-blue-50/60 transition-colors ${i % 2 ? "bg-blue-50/20" : ""} ${checked.includes(c.id) ? "bg-blue-50/40" : ""}`}>
                      <td className="px-4 py-3">
                        <Checkbox checked={checked.includes(c.id)} onChange={() => {}} onClick={() => toggleOne(c.id)}/>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                            {c.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{c.name}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1"><LocationIcon/> {c.address}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{c.phone}</td>
                      <td className="px-4 py-3 font-bold text-blue-700">{c.totalOrders}</td>
                      <td className="px-4 py-3">
                        {c.bottlesHeld > 0
                          ? <span className="flex items-center gap-1 text-amber-600 font-semibold text-xs"><BottleIcon/> {c.bottlesHeld}</span>
                          : <span className="text-gray-300 text-xs">—</span>
                        }
                      </td>
                      <td className="px-4 py-3">
                        {c.creditAmount > 0
                          ? <span className="font-black text-orange-600">₹{c.creditAmount}</span>
                          : <span className="text-xs font-bold text-green-600">Clear</span>
                        }
                      </td>
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
          onMarkPaid={handleMarkPaid}
        />
      )}

      <CustomSwal {...swalProps} />
    </div>
  );
}