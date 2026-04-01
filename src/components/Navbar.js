// import React, { useState } from "react";
// import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
// import { AiFillHome } from "react-icons/ai";
// import { MdContactPhone } from "react-icons/md";
// import { Link, useLocation } from "react-router-dom";
// import { MdFlashOn } from "react-icons/md";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <>
//       {/* Desktop Navbar */}
//       <nav className="bg-blue-50 shadow-md px-6 py-3 hidden md:flex items-center justify-between">
//         {/* LEFT - LOGO + CART */}
//         <div className="flex items-center gap-4">
//           <img
//             src="/anilenterpriselogo.png"
//             alt="logo"
//             className="h-10 w-auto object-contain"
//           />
//           <Link to="/cart" className="relative text-blue-600 hover:text-blue-800">
//             <FaShoppingCart size={24} />
//             <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
//               3
//             </span>
//           </Link>
//         </div>

//         {/* CENTER - LINKS */}
//         <div className="flex gap-8 font-medium">
//           <Link to="/oco">OCO</Link>
//           <Link
//             to="/"
//             className={`transition ${location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//               }`}
//           >
//             Home
//           </Link>
//           <Link
//             to="/contact"
//             className={`transition ${location.pathname === "/contact" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
//               }`}
//           >
//             Contact Us
//           </Link>
//         </div>

//         {/* RIGHT - PROFILE + CART (mobile user focus) */}
//         <div className="relative flex items-center gap-4">
//           <FaUserCircle
//             className={`text-2xl cursor-pointer ${location.pathname === "/profile" ? "text-blue-600" : "text-gray-700"
//               }`}
//             onClick={() => setOpen(!open)}
//           />

//           {open && (
//             <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-lg">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
//               >
//                 Profile
//               </Link>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-blue-50 text-red-500"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* MOBILE TOP BAR with logo + cart */}
//       <div className="md:hidden bg-blue-50 shadow-md p-4 flex justify-between items-center">
//         <img
//           src="/anilenterpriselogo.png"
//           alt="logo"
//           className="h-8 w-auto object-contain"
//         />
//         <Link to="/cart" className="relative text-blue-600 hover:text-blue-800">
//           <FaShoppingCart size={26} />
//           <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
//             3
//           </span>
//         </Link>
//       </div>

//       {/* MOBILE BOTTOM TAB BAR */}
//       <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around py-2">
//         <Link to="/" className={`flex flex-col items-center ${location.pathname === "/" ? "text-blue-600" : "text-gray-600"
//           }`}>
//           <MdFlashOn size={22} />
//           <span className="text-xs">OCO</span>
//         </Link>
//         <Link
//           to="/home"
//           className={`flex flex-col items-center ${location.pathname === "/home" ? "text-blue-600" : "text-gray-600"
//             }`}
//         >
//           <AiFillHome size={22} />
//           <span className="text-xs">Home</span>
//         </Link>

//         <Link
//           to="/contact"
//           className={`flex flex-col items-center ${location.pathname === "/contact" ? "text-blue-600" : "text-gray-600"
//             }`}
//         >
//           <MdContactPhone size={22} />
//           <span className="text-xs">Contact</span>
//         </Link>

//         <Link
//           to="/profile"
//           className={`flex flex-col items-center ${location.pathname === "/profile" ? "text-blue-600" : "text-gray-600"
//             }`}
//         >
//           <FaUserCircle size={22} />
//           <span className="text-xs">Profile</span>
//         </Link>
//       </div>
//     </>
//   );
// }

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── SVG Icons (no external lib needed) ──────────────────────────────────────

const HomeIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);

const FlashIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ContactIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.71a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
  </svg>
);

const ProfileIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

// ─── Bottom tab config ────────────────────────────────────────────────────────

const TABS = [
  { to: "/oco",     label: "OCO",     Icon: FlashIcon   },
  { to: "/home",    label: "Home",    Icon: HomeIcon    },
  { to: "/contact", label: "Contact", Icon: ContactIcon },
  { to: "/profile", label: "Profile", Icon: ProfileIcon },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ══════════════ DESKTOP NAVBAR ══════════════ */}
      <nav className="hidden md:flex bg-white border-b border-blue-100 shadow-sm px-6 py-3 items-center justify-between sticky top-0 z-50">

        {/* LEFT — Logo + Cart */}
        <div className="flex items-center gap-5">
          <img
            src="/anilenterpriselogo.png"
            alt="Anil Enterprises"
            className="h-10 w-auto object-contain"
          />
          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all active:scale-95"
          >
            <CartIcon />
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full shadow">
              3
            </span>
          </Link>
        </div>

        {/* CENTER — Links */}
        <div className="flex items-center gap-1">
          {[
            { to: "/oco",     label: "OCO"        },
            { to: "/",        label: "Home"        },
            { to: "/contact", label: "Contact Us"  },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`
                px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${isActive(to)
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                }
              `}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* RIGHT — Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(o => !o)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-sm font-semibold
              ${open || isActive("/profile")
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white text-gray-700 border-blue-100 hover:border-blue-300 hover:bg-blue-50"
              }
            `}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${open || isActive("/profile") ? "bg-white text-blue-600" : "bg-blue-100 text-blue-700"}`}>
              A
            </div>
            <span>Account</span>
            <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
              <ChevronDown />
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-blue-100 rounded-2xl shadow-xl shadow-blue-100/50 overflow-hidden z-50 animate-fade-in">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
              >
                <ProfileIcon />
                Profile
              </Link>
              <div className="mx-3 h-px bg-blue-50"/>
              <button
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-medium transition-colors"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ══════════════ MOBILE TOP BAR ══════════════ */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm px-4 py-3 flex justify-between items-center">
        <img
          src="/anilenterpriselogo.png"
          alt="Anil Enterprises"
          className="h-8 w-auto object-contain"
        />
        <Link
          to="/cart"
          className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 active:scale-95 transition-all"
        >
          <CartIcon />
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full shadow">
            3
          </span>
        </Link>
      </div>

      {/* ══════════════ MOBILE BOTTOM TAB BAR ══════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-blue-100 shadow-[0_-4px_20px_rgba(59,130,246,0.08)]">
        <div className="flex justify-around items-center px-2 py-1.5">
          {TABS.map(({ to, label, Icon }) => {
            const active = location.pathname === to || (to === "/oco" && location.pathname === "/");
            return (
              <Link
                key={to}
                to={to}
                className={`
                  relative flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200
                  ${active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}
                `}
              >
                {/* Active pill background */}
                {active && (
                  <span className="absolute inset-0 bg-blue-50 rounded-2xl"/>
                )}

                {/* Active top indicator dot */}
                {active && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"/>
                )}

                <span className="relative z-10">
                  <Icon filled={active} />
                </span>
                <span className={`relative z-10 text-[10px] font-bold tracking-wide ${active ? "text-blue-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Safe area spacer for phones with home indicator */}
        <div className="h-safe-bottom" style={{ height: "env(safe-area-inset-bottom)" }}/>
      </div>
    </>
  );
}

export default Navbar;