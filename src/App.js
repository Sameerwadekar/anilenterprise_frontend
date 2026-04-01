import { BrowserRouter, Routes, Route,Outlet,Link ,useLocation } from "react-router-dom";
import SignUp from "./components/register/SignUp";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import OCO from "./components/pages/OCO";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import AdminOrder from "./components/pages/AdminOrder";
import { useState, useEffect } from "react";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pb-16 md:pb-0"> 
        {/* padding bottom for mobile tab bar */}
        <Outlet />
      </div>
    </>
  );
}


const OrdersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const CustomersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ProductsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 4v4h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ─── Nav Items ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: DashboardIcon },
  { label: "Orders",    to: "/admin/orders",    icon: OrdersIcon    },
  { label: "Customers", to: "/admin/customers", icon: CustomersIcon },
  { label: "Products",  to: "/admin/products",  icon: ProductsIcon  },
  { label: "Settings",  to: "/admin/settings",  icon: SettingsIcon  },
];

// ─── NavLink Item ──────────────────────────────────────────────────────────────

function NavItem({ item, active, collapsed, onClick }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group
        ${active
          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
          : "text-blue-100 hover:bg-white/10 hover:text-white"
        }
        ${collapsed ? "justify-center px-0" : ""}
      `}
    >
      {/* Active indicator bar */}
      {active && !collapsed && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full -ml-3"/>
      )}

      <span className={`flex-shrink-0 ${active ? "text-white" : "text-blue-300 group-hover:text-white"} transition-colors`}>
        <Icon />
      </span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {active && <ChevronRight />}
        </>
      )}

      {/* Tooltip for collapsed mode */}
      {collapsed && (
        <span className="absolute left-full ml-3 px-2.5 py-1 bg-blue-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg">
          {item.label}
        </span>
      )}
    </Link>
  );
}

// ─── Layout ────────────────────────────────────────────────────────────────────

export  function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed]   = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const currentLabel = NAV_ITEMS.find(n => location.pathname.startsWith(n.to))?.label ?? "Admin";

  // ── Shared sidebar content ──
  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full">

      {/* Logo / Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed && !onClose ? "justify-center px-0" : ""}`}>
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-blue-700"><TruckIcon /></span>
        </div>
        {(!collapsed || onClose) && (
          <div>
            <p className="font-extrabold text-white text-base leading-tight tracking-tight">AquaAdmin</p>
            <p className="text-blue-300 text-xs">Management Panel</p>
          </div>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-4 space-y-1 ${collapsed && !onClose ? "px-2" : "px-3"}`}>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            active={location.pathname.startsWith(item.to)}
            collapsed={collapsed && !onClose}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* Collapse toggle — desktop only */}
      {!onClose && (
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => setCollapsed(c => !c)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-blue-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all ${collapsed ? "justify-center" : ""}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {collapsed
                ? <><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></>
                : <><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></>
              }
            </svg>
            {!collapsed && <span>{collapsed ? "Expand" : "Collapse"}</span>}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className={`
          hidden md:flex flex-col flex-shrink-0
          bg-gradient-to-b from-blue-700 to-blue-800
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-60"}
          shadow-xl shadow-blue-900/20
        `}
      >
        <SidebarContent />
      </aside>

      {/* ── MOBILE DRAWER BACKDROP ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-blue-950/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 md:hidden
          bg-gradient-to-b from-blue-700 to-blue-800
          w-72 shadow-2xl shadow-blue-900/40
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-blue-100 px-4 py-3 flex items-center gap-3 shadow-sm">
          {/* Hamburger — mobile */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm active:scale-95 transition-all"
          >
            <MenuIcon />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-gray-400 font-medium">Admin</span>
            <span className="text-gray-300">/</span>
            <span className="text-blue-700 font-bold">{currentLabel}</span>
          </div>

          {/* Right side — avatar / badge */}
          <div className="ml-auto flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
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
          <Route index element={<OCO/>}/>
          <Route path="home" element={<Home/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="profile" element={<Profile/>} />
        </Route>
         <Route path="/admin" element={<AdminLayout />}>
          <Route path="orders" element={<AdminOrder />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;