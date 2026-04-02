import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import SignUp from "./components/register/SignUp";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import OCO from "./components/pages/OCO";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import AdminOrder from "./components/pages/AdminOrder";
import { useState, useEffect } from "react";
import AdminDashboard from "./components/pages/AdminDashboard";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pb-16 md:pb-0">
        <Outlet />
      </div>
    </>
  );
}

// const ChevronRight = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// );

const OrdersIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const DashboardIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CustomersIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ProductsIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const SettingsIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 4v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);


const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", Icon: DashboardIcon },
  { label: "Orders", to: "/admin/orders", Icon: OrdersIcon },
  { label: "Customers", to: "/admin/customers", Icon: CustomersIcon },
  { label: "Products", to: "/admin/products", Icon: ProductsIcon },
  { label: "Settings", to: "/admin/settings", Icon: SettingsIcon },
];


export function AdminLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#admin-dropdown")) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (to) => location.pathname.startsWith(to);
  const currentLabel = NAV_ITEMS.find(n => isActive(n.to))?.label ?? "Admin";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

      {/* ══════════ DESKTOP TOP NAVBAR ══════════ */}
      <nav className="hidden md:flex bg-white border-b border-blue-100 shadow-sm px-6 py-3 items-center justify-between sticky top-0 z-50">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center text-white shadow">
            <TruckIcon />
          </div>
          <div>
            <p className="font-extrabold text-blue-800 text-sm leading-tight tracking-tight">AquaAdmin</p>
            <p className="text-blue-400 text-[10px] font-semibold uppercase tracking-wider">Management Panel</p>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ label, to, Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all
                  ${active
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
              >
                <span className={active ? "text-white" : "text-blue-400"}>
                  <Icon filled={active} />
                </span>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Admin dropdown */}
        <div className="relative" id="admin-dropdown">
          <button
            onClick={() => setOpen(o => !o)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-sm font-semibold
              ${open
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-700 border-blue-100 hover:border-blue-300 hover:bg-blue-50"
              }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${open ? "bg-white text-blue-600" : "bg-blue-100 text-blue-700"}`}>
              A
            </div>
            <span>Admin</span>
            <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
              <ChevronDown />
            </span>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-blue-100 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-blue-50">
                <p className="text-xs font-bold text-gray-800">Admin User</p>
                <p className="text-[11px] text-gray-400 mt-0.5">admin@aquaapp.com</p>
              </div>
              <button
                onClick={() => alert("Logged out!")}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
              >
                <LogoutIcon /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ══════════ MOBILE TOP BAR ══════════ */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-700 rounded-xl flex items-center justify-center text-white">
            <TruckIcon />
          </div>
          <div>
            <p className="font-extrabold text-blue-800 text-sm leading-tight">AquaAdmin</p>
            <p className="text-blue-400 text-[10px] font-semibold">{currentLabel}</p>
          </div>
        </div>
        <button
          onClick={() => alert("Logged out!")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-500 text-xs font-bold border border-red-100 active:scale-95 transition-all"
        >
          <LogoutIcon /> Logout
        </button>
      </div>

      {/* ══════════ PAGE CONTENT ══════════ */}
      {/* AdminOrder, AdminDashboard, etc. render here via App.jsx routes */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <Outlet />
      </main>

      {/* ══════════ MOBILE BOTTOM TAB BAR ══════════ */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-blue-100 shadow-[0_-4px_20px_rgba(59,130,246,0.08)]">
        <div className="flex justify-around items-center px-2 py-1.5">
          {NAV_ITEMS.map(({ label, to, Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200
                  ${active ? "text-blue-600" : "text-gray-400"}`}
              >
                {active && <span className="absolute inset-0 bg-blue-50 rounded-2xl" />}
                {active && <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />}
                <span className="relative z-10"><Icon filled={active} /></span>
                <span className={`relative z-10 text-[10px] font-bold tracking-wide ${active ? "text-blue-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
        <div style={{ height: "env(safe-area-inset-bottom)" }} />
      </div>

    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public route (NO NAVBAR) */}
        <Route path="/signup" element={<SignUp />} />

        {/* Protected / Main Layout (WITH NAVBAR) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<OCO />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route  path="orders" element={<AdminOrder />} />
          <Route index path="dashboard" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;