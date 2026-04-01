// import React, { useState } from "react";
// import { MdCall, MdEmail, MdLocationOn } from "react-icons/md";

// export default function Contact() {
//   const [message, setMessage] = useState("");

//   return (
//     <div className="p-4 bg-blue-50 min-h-screen pb-20">
//       <h1 className="text-xl font-bold text-blue-900 mb-4">Contact Us</h1>

//       {/* CONTACT INFO */}
//       <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
//         <div className="flex items-center gap-3">
//           <MdCall className="text-blue-600 text-xl" />
//           <span className="text-gray-700">+91 98765 43210</span>
//         </div>

//         <div className="flex items-center gap-3">
//           <MdEmail className="text-blue-600 text-xl" />
//           <span className="text-gray-700">support@waterapp.com</span>
//         </div>

//         <div className="flex items-center gap-3">
//           <MdLocationOn className="text-blue-600 text-xl" />
//           <span className="text-gray-700">
//             Mumbai, Maharashtra, India
//           </span>
//         </div>
//       </div>

//       {/* MESSAGE BOX */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mt-5">
//         <h2 className="font-semibold text-blue-900 mb-2">
//           Send us a message
//         </h2>

//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Write your issue..."
//           className="w-full border rounded-lg p-2 h-24 outline-blue-500"
//         />

//         <button
//           onClick={() => {
//             alert("Message sent!");
//             setMessage("");
//           }}
//           className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const CallIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.71a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SendIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ─── Contact Info Row ─────────────────────────────────────────────────────────

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3.5 group">
      <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 transition-colors">
        <Icon />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">{content}</a>
  ) : (
    <div>{content}</div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [message, setMessage]   = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    alert("Message sent!");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-32">

      {/* ── HEADER ── */}
      <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-600 rounded-full opacity-50"/>
        <div className="absolute top-6 right-0 w-14 h-14 bg-blue-500 rounded-full opacity-40"/>
        <p className="relative z-10 text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Support</p>
        <h1 className="relative z-10 text-white text-2xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="relative z-10 text-blue-200 text-sm mt-1">We're here to help you</p>
      </div>

      <div className="px-4 -mt-10 relative z-10 space-y-3">

        {/* ── CONTACT INFO CARD ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5 space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Get in touch</p>

          <ContactRow
            icon={CallIcon}
            label="Phone"
            value="+91 98765 43210"
            href="tel:+919876543210"
          />

          <div className="h-px bg-blue-50"/>

          <ContactRow
            icon={EmailIcon}
            label="Email"
            value="support@waterapp.com"
            href="mailto:support@waterapp.com"
          />

          <div className="h-px bg-blue-50"/>

          <ContactRow
            icon={LocationIcon}
            label="Address"
            value="Mumbai, Maharashtra, India"
          />
        </div>

        {/* ── MESSAGE CARD ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500"><ChatIcon /></span>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Send a Message</p>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your issue or question here…"
            rows={4}
            className="w-full border border-blue-100 bg-blue-50/40 rounded-xl p-3.5 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />

          <p className="text-right text-xs text-gray-300 mt-1 mb-3">{message.length} chars</p>

          <button
            onClick={handleSubmit}
            disabled={!message.trim() || submitted}
            className={`
              w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all
              ${submitted
                ? "bg-green-500 text-white"
                : message.trim()
                  ? "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm shadow-blue-200"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }
            `}
          >
            {submitted ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Message Sent!
              </>
            ) : (
              <>
                <SendIcon />
                Submit
              </>
            )}
          </button>
        </div>

        {/* ── HOURS CARD ── */}
        <div className="bg-blue-700 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Business Hours</p>
            <p className="text-blue-200 text-xs mt-0.5">Mon – Sat · 9 AM to 7 PM</p>
            <p className="text-blue-200 text-xs">Sunday closed</p>
          </div>
        </div>

      </div>
    </div>
  );
}