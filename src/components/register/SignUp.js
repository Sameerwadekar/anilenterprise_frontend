
import React, { useState, useEffect, useRef } from "react";
import { CreateAccountProxy, sendEmailOtp, verifyEmailOtp } from "../utils/proxy/AuthProxy";
import CustomSwal, { useSwal } from "../utils/CustomSwal";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.71a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// const WaterDropIcon = () => (
//   <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-2.21.9-4.21 2.35-5.65L12 18.01l5.65-11.66C19.1 7.79 20 9.79 20 12c0 4.41-3.59 8-8 8z" />
//   </svg>
// );

// ─── Toast (auto-dismiss) ─────────────────────────────────────────────────────

function Toast({ message, type, visible }) {
  if (!visible) return null;
  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold transition-all duration-300
      ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
    >
      {type === "success" ? <CheckCircleIcon /> : null}
      {message}
    </div>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────

function InputField({ icon: Icon, label, error, right, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
          <Icon />
        </span>
        <input
          {...props}
          className={`w-full pl-10 ${right ? "pr-20" : "pr-4"} py-3 bg-blue-50/50 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all
            ${error ? "border-red-300 bg-red-50/30" : "border-blue-100 focus:bg-white"}`}
        />
        {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────

function OtpInput({ value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return; // Only allow digits
    const arr = value.split("");
    arr[i] = val;
    onChange(arr.join("").slice(0, 6)); // Allow up to 6 digits
    if (val && i < 5) inputs.current[i + 1]?.focus(); // Move focus to next input if there is a value
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) inputs.current[i - 1]?.focus(); // Move focus on backspace
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6); // Allow up to 6 digits
    onChange(pasted);
    inputs.current[Math.min(pasted.length, 5)]?.focus(); // Move focus to the next available input
    e.preventDefault();
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-12 h-14 text-center text-xl font-black rounded-2xl border-2 bg-blue-50/50 text-blue-700 focus:outline-none transition-all
            ${value[i] ? "border-blue-600 bg-white shadow-sm shadow-blue-100" : "border-blue-100 focus:border-blue-400"}`}
        />
      ))}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = ["Details", "Verify Email", "Create Account"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all
              ${i < current ? "bg-green-500 text-white" : i === current ? "bg-blue-600 text-white shadow-sm shadow-blue-200" : "bg-blue-100 text-blue-400"}`}>
              {i < current ? <CheckCircleIcon /> : i + 1}
            </div>
            <span className={`text-[10px] font-bold hidden sm:block ${i === current ? "text-blue-700" : i < current ? "text-green-600" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-0.5 rounded-full ${i < current ? "bg-green-400" : "bg-blue-100"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SignUp() {
  const [step, setStep] = useState(0); // 0=details, 1=otp, 2=create account
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const { swalProps, showSwal } = useSwal();

  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: "", confirmPassword: "", otp: "",
  });
  const [errors, setErrors] = useState({});

  // ── Toast helper ──
  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // ── Resend countdown ──
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm(f => ({ ...f, [name]: cleaned }));
    setErrors(e => ({ ...e, [name]: "" }));
  };

  // ── Step 0 validation ──
  const validateDetails = () => {
    const errs = {};
    if (!form.name.trim() || form.name.length < 3)
      errs.name = "Name must be at least 3 characters";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      errs.phone = "Enter a valid 10-digit Indian mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Step 2 validation ──
  const validatePassword = () => {
    const errs = {};
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(form.password))
      errs.password = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special char";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Send OTP ──
  const handleSendOtp = async () => {
    if (!validateDetails()) return;

    try {
      setOtpSending(true);
      const response = await sendEmailOtp(form.email);
      console.log(response)
      if (response?.success) {
        setStep(1);
        setResendTimer(30);
        showToast("OTP sent to your email! 📧", "success");
      } else {
        throw new Error(response?.message || "Failed to send OTP");
      }

    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send OTP";

      showToast(msg, "error");
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (form.otp.length !== 6) {
      setErrors((e) => ({ ...e, otp: "Enter the 6-digit OTP" }));
      return;
    }

    try {
      setOtpVerifying(true);
      const res = await verifyEmailOtp(form.email, form.otp);

      if (res?.success) {
        showToast("Email verified successfully ✅", "success");
        setTimeout(() => setStep(2), 1200);
      } else {
        setErrors((e) => ({ ...e, otp: res?.message || "Invalid OTP" }));
      }

    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Verification failed";

      setErrors((e) => ({ ...e, otp: msg }));
    } finally {
      setOtpVerifying(false);
    }
  };

  // ── Create Account ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    try {
      setIsSubmitting(true);
      const res = await CreateAccountProxy(form.name, form.phone, form.password, form.email);
      if (res) {
        showSwal({
          type: "success",
          title: "Account Created! 🎉",
          message: `Welcome to AquaApp, ${form.name}! Your account is ready.`,
          confirmText: "Let's Go!",
          onConfirm: () => { /* navigate to login */ },
        });
      }
    } catch {
      showSwal({ type: "error", title: "Something went wrong", message: "Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── UI ──

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background decorative circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-500 rounded-full opacity-30" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-800 rounded-full opacity-40" />
      <div className="absolute top-1/2 left-8 w-20 h-20 bg-blue-400 rounded-full opacity-20" />

      {/* Toast */}
      <Toast {...toast} />

      {/* Card */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-3xl shadow-2xl shadow-blue-900/30 overflow-hidden">

        {/* Top blue strip with logo */}
        <div className="bg-blue-700 px-6 pt-7 pb-8 text-center relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-full opacity-50" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-800 rounded-full opacity-40" />

          {/* Logo */}
          <div className="relative z-10 flex justify-center mb-3">
            <img
              src="/anilenterpriselogo.png"
              alt="Anil Enterprises"
              className="h-12 object-contain"
              onError={(e) => {
                // Fallback if logo not found
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* SVG fallback logo */}
            <div className="hidden w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-md">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#2563eb">
                <path d="M12 2C10 7 5 10 5 15a7 7 0 0 0 14 0c0-5-5-8-7-13z" />
              </svg>
            </div>
          </div>

          <h1 className="relative z-10 text-white text-xl font-extrabold tracking-tight">Create Account</h1>
          <p className="relative z-10 text-blue-200 text-xs mt-1">Join AquaApp — water delivered fast</p>
        </div>

        <div className="px-6 py-6">
          <StepIndicator current={step} />

          {/* ── STEP 0: Details ── */}
          {step === 0 && (
            <div className="space-y-4">
              <InputField
                icon={UserIcon}
                label="Full Name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                error={errors.name}
              />
              <InputField
                icon={PhoneIcon}
                label="Phone Number"
                name="phone"
                type="text"
                inputMode="numeric"
                value={form.phone}
                onChange={handleChange}
                placeholder="98765 43210"
                error={errors.phone}
              />
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400"><EmailIcon /></span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-28 py-3 bg-blue-50/50 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all
                      ${errors.email ? "border-red-300 bg-red-50/30" : "border-blue-100"}`}
                  />
                  {/* Send OTP inline button */}
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSending}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-all active:scale-95 disabled:opacity-50"
                  >
                    <SendIcon />
                    {otpSending ? "Sending…" : "Send OTP"}
                  </button>
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpSending}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-2xl transition-all shadow-md shadow-blue-200 disabled:opacity-50 text-sm mt-2"
              >
                {otpSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending OTP…
                  </span>
                ) : "Send OTP & Continue →"}
              </button>
            </div>
          )}

          {/* ── STEP 1: OTP Verification ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <EmailIcon />
                </div>
                <p className="text-sm text-gray-600">We sent a 6-digit OTP to</p>
                <p className="text-sm font-extrabold text-blue-700 mt-0.5">{form.email}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 text-center">Enter OTP</label>
                <OtpInput
                  value={form.otp}
                  onChange={(val) => { setForm(f => ({ ...f, otp: val })); setErrors(e => ({ ...e, otp: "" })); }}
                />
                {errors.otp && <p className="text-red-500 text-xs mt-2 text-center font-medium">{errors.otp}</p>}
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpVerifying || form.otp.length !== 6}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-2xl transition-all shadow-md shadow-blue-200 disabled:opacity-50 text-sm"
              >
                {otpVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Verifying…
                  </span>
                ) : "Verify OTP"}
              </button>

              {/* Resend */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-xs text-gray-400">Resend OTP in <span className="font-bold text-blue-600">{resendTimer}s</span></p>
                ) : (
                  <button
                    type="button"
                    onClick={() => { handleSendOtp(); setForm(f => ({ ...f, otp: "" })); }}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full text-xs text-gray-400 hover:text-gray-600 font-medium text-center"
              >
                ← Change email
              </button>
            </div>
          )}

          {/* ── STEP 2: Set Password ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 flex items-center gap-2.5">
                <span className="text-green-600"><CheckCircleIcon /></span>
                <div>
                  <p className="text-xs font-bold text-green-700">Email Verified</p>
                  <p className="text-[11px] text-green-500">{form.email}</p>
                </div>
              </div>

              <InputField
                icon={LockIcon}
                label="Password"
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Min 8 chars, 1 uppercase…"
                error={errors.password}
                right={
                  <button type="button" onClick={() => setShowPass(s => !s)} className="text-gray-400 hover:text-blue-600 transition-colors">
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                }
              />

              <InputField
                icon={LockIcon}
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                right={
                  <button type="button" onClick={() => setShowConfirm(s => !s)} className="text-gray-400 hover:text-blue-600 transition-colors">
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                }
              />

              {/* Password strength hint */}
              <div className="bg-blue-50 rounded-xl px-3 py-2.5 text-xs text-blue-600 space-y-1">
                {[
                  [/.{8,}/, "At least 8 characters"],
                  [/[A-Z]/, "One uppercase letter"],
                  [/[a-z]/, "One lowercase letter"],
                  [/\d/, "One number"],
                  [/[@$!%*?&]/, "One special character (@$!%*?&)"],
                ].map(([regex, hint]) => (
                  <div key={hint} className={`flex items-center gap-1.5 ${regex.test(form.password) ? "text-green-600" : "text-blue-300"}`}>
                    <span>{regex.test(form.password) ? "✓" : "○"}</span>
                    <span className="font-medium">{hint}</span>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold rounded-2xl transition-all shadow-md shadow-blue-200 disabled:opacity-50 text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating Account…
                  </span>
                ) : "Create Account 🚀"}
              </button>
            </form>
          )}

          <p className="text-center text-xs text-gray-400 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-bold hover:underline">Sign In</a>
          </p>
        </div>
      </div>

      <p className="relative z-10 text-blue-200/60 text-xs mt-6 text-center">
        AquaApp · Mumbai 💧
      </p>

      <CustomSwal {...swalProps} />
    </div>
  );
}