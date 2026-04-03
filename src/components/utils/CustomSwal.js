import { useEffect, useState, useCallback } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const WarnIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

// ─── Type config ──────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  success: {
    icon:       <CheckIcon />,
    iconBg:     "bg-green-100",
    iconColor:  "text-green-600",
    confirmBg:  "bg-green-600 hover:bg-green-700 shadow-green-200",
  },
  error: {
    icon:       <ErrorIcon />,
    iconBg:     "bg-red-100",
    iconColor:  "text-red-600",
    confirmBg:  "bg-red-600 hover:bg-red-700 shadow-red-200",
  },
  warning: {
    icon:       <WarnIcon />,
    iconBg:     "bg-amber-100",
    iconColor:  "text-amber-600",
    confirmBg:  "bg-amber-500 hover:bg-amber-600 shadow-amber-200",
  },
  info: {
    icon:       <InfoIcon />,
    iconBg:     "bg-blue-100",
    iconColor:  "text-blue-600",
    confirmBg:  "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
  },
  confirm: {
    icon:       <QuestionIcon />,
    iconBg:     "bg-blue-100",
    iconColor:  "text-blue-600",
    confirmBg:  "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
  },
};

// ─── SwalModal Component ──────────────────────────────────────────────────────
//
// Props:
//   open          boolean          — show/hide
//   type          "success" | "error" | "warning" | "info" | "confirm"
//   title         string
//   message       string
//   confirmText   string           — default "OK"
//   cancelText    string           — default "Cancel" (only shown for confirm type)
//   onConfirm     () => void
//   onCancel      () => void       — also fires on backdrop click
//   showLogo      boolean          — shows /anilenterpriselogo.png at top
//
// Usage:
//   <SwalModal
//     open={swal.open}
//     type={swal.type}
//     title={swal.title}
//     message={swal.message}
//     onConfirm={() => setSwal({ open: false })}
//     onCancel={() => setSwal({ open: false })}
//   />
//
// Helper hook:  useSwal()  — see bottom of file

export default function CustomSwal({
  open,
  type        = "info",
  title       = "",
  message     = "",
  confirmText = "OK",
  cancelText  = "Cancel",
  onConfirm,
  onCancel,
  showLogo    = true,
}) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.info;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onCancel?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel?.(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm"/>

      {/* Card */}
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl shadow-blue-100 overflow-hidden animate-scale-in">

        {/* Top accent bar */}
        <div className={`h-1 w-full ${
          type === "success" ? "bg-green-500" :
          type === "error"   ? "bg-red-500"   :
          type === "warning" ? "bg-amber-500" :
          "bg-blue-600"
        }`}/>

        <div className="px-6 pt-6 pb-7 flex flex-col items-center text-center gap-4">

          {/* Logo */}
          {showLogo && (
            <img
              src="/anilenterpriselogo.png"
              alt="Logo"
              className="h-8 object-contain opacity-80"
            />
          )}

          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${cfg.iconBg} ${cfg.iconColor}`}>
            {cfg.icon}
          </div>

          {/* Text */}
          <div>
            <h3 className="text-base font-extrabold text-gray-900">{title}</h3>
            {message && <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{message}</p>}
          </div>

          {/* Buttons */}
          <div className={`w-full flex gap-3 ${type === "confirm" ? "flex-row" : "flex-col"}`}>
            <button
              onClick={onConfirm}
              className={`flex-1 py-3 rounded-2xl text-white font-bold text-sm shadow-md transition-all active:scale-95 ${cfg.confirmBg}`}
            >
              {confirmText}
            </button>
            {type === "confirm" && (
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm transition-all active:scale-95"
              >
                {cancelText}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .animate-scale-in { animation: scale-in 0.2s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>
    </div>
  );
}

// ─── useSwal hook ─────────────────────────────────────────────────────────────
//
// Drop-in replacement for window.alert / window.confirm across all pages.
//
// Usage:
//   const { swalProps, showSwal } = useSwal();
//
//   // Simple alert:
//   showSwal({ type: "success", title: "Done!", message: "Order placed." });
//
//   // Confirmation:
//   showSwal({
//     type: "confirm",
//     title: "Are you sure?",
//     message: "This cannot be undone.",
//     confirmText: "Yes, delete",
//     onConfirm: () => doDelete(),
//   });
//
//   return <SwalModal {...swalProps} />;


export function useSwal() {
  const [state, setState] = useState({ open: false });

  const close = useCallback(() => setState({ open: false }), []);

  const showSwal = useCallback(({
    type        = "info",
    title       = "",
    message     = "",
    confirmText = "OK",
    cancelText  = "Cancel",
    showLogo    = true,
    onConfirm,
    onCancel,
  }) => {
    setState({
      open: true,
      type,
      title,
      message,
      confirmText,
      cancelText,
      showLogo,
      onConfirm: () => { onConfirm?.(); close(); },
      onCancel:  () => { onCancel?.();  close(); },
    });
  }, [close]);

  return { swalProps: state, showSwal };
}