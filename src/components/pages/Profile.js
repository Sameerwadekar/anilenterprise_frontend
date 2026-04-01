// import React from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { MdLocationOn, MdHistory, MdLogout } from "react-icons/md";

// export default function Profile() {
//   const user = {
//     name: "Rahul Sharma",
//     phone: "+91 98765 43210",
//     address: "Andheri East, Mumbai",
//   };

//   return (
//     <div className="p-4 bg-blue-50 min-h-screen pb-20">
//       {/* USER INFO */}
//       <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
//         <FaUserCircle className="text-5xl text-blue-600" />
//         <div>
//           <h2 className="font-bold text-blue-900">{user.name}</h2>
//           <p className="text-gray-600 text-sm">{user.phone}</p>
//         </div>
//       </div>

//       {/* ADDRESS */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mt-4 flex items-center gap-3">
//         <MdLocationOn className="text-blue-600 text-xl" />
//         <div>
//           <p className="text-gray-700 font-medium">Delivery Address</p>
//           <p className="text-sm text-gray-500">{user.address}</p>
//         </div>
//       </div>

//       {/* ACTIONS */}
//       <div className="bg-white rounded-xl shadow-sm mt-4">
//         <button className="w-full flex items-center gap-3 px-4 py-3 border-b hover:bg-blue-50">
//           <MdHistory className="text-blue-600 text-xl" />
//           <span>Order History</span>
//         </button>

//         <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-red-500">
//           <MdLogout className="text-xl" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="12 8 12 12 14 14"/>
    <path d="M3.05 11a9 9 0 1 0 .5-4.5"/>
    <polyline points="3 3 3 7 7 7"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const NotifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const PrivacyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const BottleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2h8"/>
    <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ─── Action Row ───────────────────────────────────────────────────────────────

function ActionRow({ icon: Icon, label, sublabel, onClick, danger, last, rightEl }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3.5 px-4 py-3.5 transition-colors text-left
        ${!last ? "border-b border-blue-50" : ""}
        ${danger ? "hover:bg-red-50" : "hover:bg-blue-50"}
      `}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${danger ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-600"}`}>
        <Icon />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${danger ? "text-red-500" : "text-gray-800"}`}>{label}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
      {rightEl || <span className={danger ? "text-red-300" : "text-gray-300"}><ChevronRight /></span>}
    </button>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${on ? "bg-blue-600" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : ""}`}/>
    </button>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div className={`flex-1 ${color} rounded-2xl p-3.5 flex flex-col items-center gap-1`}>
      <Icon />
      <p className="text-lg font-black leading-none">{value}</p>
      <p className="text-[10px] font-semibold opacity-70 text-center">{label}</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Profile() {
  const [notifications, setNotifications] = useState(true);

  const user = {
    name:    "Rahul Sharma",
    phone:   "+91 98765 43210",
    address: "Andheri East, Mumbai",
    since:   "Member since Jan 2024",
    initials: "RS",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-32">

      {/* ── HEADER ── */}
      <div className="bg-blue-700 pt-6 pb-20 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>
        <p className="relative z-10 text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Account</p>
        <h1 className="relative z-10 text-white text-2xl font-extrabold tracking-tight">My Profile</h1>
      </div>

      <div className="px-4 -mt-14 relative z-10 space-y-3">

        {/* ── PROFILE CARD ── */}
        <div className="bg-white rounded-2xl shadow-md shadow-blue-100 border border-blue-50 p-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-200">
                <span className="text-white text-xl font-black">{user.initials}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"/>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-extrabold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{user.phone}</p>
              <p className="text-[11px] text-blue-400 font-semibold mt-1">{user.since}</p>
            </div>

            {/* Edit */}
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors active:scale-90">
              <EditIcon />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-2.5 mt-4">
            <StatCard icon={() => <HistoryIcon />}  value="12"  label="Orders"          color="bg-blue-50 text-blue-700"/>
            <StatCard icon={() => <BottleIcon />}   value="48"  label="Bottles Ordered" color="bg-indigo-50 text-indigo-700"/>
            <StatCard icon={() => <StarIcon />}      value="4.8" label="Avg Rating"      color="bg-amber-50 text-amber-600"/>
          </div>
        </div>

        {/* ── DELIVERY ADDRESS ── */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Delivery Address</p>
          </div>
          <ActionRow
            icon={LocationIcon}
            label={user.address}
            sublabel="Home · Default address"
            onClick={() => {}}
            last
          />
        </div>

        {/* ── ACCOUNT ACTIONS ── */}
        <div className="bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account</p>
          </div>

          <ActionRow
            icon={HistoryIcon}
            label="Order History"
            sublabel="View all your past orders"
            onClick={() => {}}
          />
          <ActionRow
            icon={NotifyIcon}
            label="Notifications"
            sublabel={notifications ? "Push alerts enabled" : "Push alerts disabled"}
            onClick={() => {}}
            rightEl={<Toggle on={notifications} onToggle={() => setNotifications(n => !n)} />}
          />
          <ActionRow
            icon={HelpIcon}
            label="Help & Support"
            sublabel="FAQs, chat with us"
            onClick={() => {}}
          />
          <ActionRow
            icon={PrivacyIcon}
            label="Privacy Policy"
            sublabel="How we use your data"
            onClick={() => {}}
            last
          />
        </div>

        {/* ── LOGOUT ── */}
        <div className="bg-white rounded-2xl border border-red-50 shadow-sm overflow-hidden">
          <ActionRow
            icon={LogoutIcon}
            label="Logout"
            sublabel="Sign out of your account"
            onClick={() => alert("Logged out!")}
            danger
            last
          />
        </div>

        {/* ── APP VERSION ── */}
        <p className="text-center text-xs text-gray-300 font-medium pb-2">
          AquaApp v1.0.0 · Made with 💧 in Mumbai
        </p>

      </div>
    </div>
  );
}