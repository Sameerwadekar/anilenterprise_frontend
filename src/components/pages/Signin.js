import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSwal, { useSwal } from "../utils/CustomSwal";
import { LoginProxy } from "../utils/proxy/AuthProxy";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.71a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
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

const WaveIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2C10 7 5 10 5 15a7 7 0 0 0 14 0c0-5-5-8-7-13z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

// ─── Input Field ──────────────────────────────────────────────────────────────

function InputField({ icon: Icon, label, error, right, ...props }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                {label}
            </label>
            <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400">
                    <Icon />
                </span>
                <input
                    {...props}
                    className={`w-full pl-10 ${right ? "pr-12" : "pr-4"} py-3 bg-blue-50/50 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white transition-all
            ${error ? "border-red-300 bg-red-50/30" : "border-blue-100"}`}
                />
                {right && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{right}</div>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>
            )}
        </div>
    );
}

// ─── Floating water bubbles ───────────────────────────────────────────────────

function Bubbles() {
    const bubbles = [
        { size: 60, left: "8%", delay: "0s", dur: "7s" },
        { size: 36, left: "20%", delay: "1.2s", dur: "9s" },
        { size: 80, left: "70%", delay: "0.5s", dur: "8s" },
        { size: 24, left: "85%", delay: "2s", dur: "6s" },
        { size: 48, left: "50%", delay: "3s", dur: "10s" },
        { size: 20, left: "35%", delay: "1.5s", dur: "7.5s" },
    ];
    return (
        <>
            <style>{`
        @keyframes bubble-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0.15; }
          50%  { opacity: 0.25; }
          100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
        }
      `}</style>
            {bubbles.map((b, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        bottom: "-60px",
                        left: b.left,
                        width: b.size,
                        height: b.size,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.3)",
                        animation: `bubble-rise ${b.dur} ease-in infinite`,
                        animationDelay: b.delay,
                        pointerEvents: "none",
                    }}
                />
            ))}
        </>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Signin() {
    const navigate = useNavigate();
    const { swalProps, showSwal } = useSwal();

    const [form, setForm] = useState({ login: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const cleaned = value;
        setForm(f => ({ ...f, [name]: cleaned }));
        setErrors(e => ({ ...e, [name]: "" }));
    };

    const validate = () => {
        const errs = {};
        const loginValue = form.login.trim();
        if (!loginValue) {
            errs.login = "Email or phone is required";
        } else if (
            !/^[6-9]\d{9}$/.test(loginValue) &&
            !/^\S+@\S+\.\S+$/.test(loginValue)
        ) {
            errs.login = "Enter valid email or phone";
        }
        if (!form.password) {
            errs.password = "Password is required";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setSubmitting(true);
            const res = await LoginProxy(form.login, form.password);
            if (res?.data) {
                showSwal({
                    type: "success",
                    title: "Welcome back! 👋",
                    message: "You have signed in successfully.",
                    confirmText: "Let's Go",
                    onConfirm: () => navigate("/"),
                });
            } else {
                throw new Error("Login failed");
            }
        } catch (err) {
            console.error(err);
            showSwal({
                type: "error",
                title: "Sign in failed",
                message: "Invalid email or phone or password.",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, #1e40af 0%, #2563eb 45%, #1d4ed8 100%)" }}
        >

            {/* Floating bubbles background */}
            <Bubbles />

            {/* Decorative blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500 rounded-full opacity-25 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-900 rounded-full opacity-30 pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-15 pointer-events-none" />

            {/* ── Card ── */}
            <div className="relative z-10 bg-white w-full max-w-md rounded-3xl shadow-2xl shadow-blue-900/30 overflow-hidden">

                {/* ── Blue header ── */}
                <div
                    className="relative overflow-hidden px-6 pt-8 pb-10 text-center"
                    style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }}
                >
                    {/* Inner deco circles */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />

                    {/* Logo */}
                    <div className="relative z-10 flex justify-center mb-4">
                        <div className="relative">
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm scale-110" />
                            <div className="relative bg-white rounded-2xl p-2.5 shadow-lg">
                                <img
                                    src="/anilenterpriselogo.png"
                                    alt="Anil Enterprises"
                                    className="h-10 w-auto object-contain"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display = "flex";
                                    }}
                                />
                                {/* Fallback */}
                                <div className="hidden w-10 h-10 items-center justify-center text-blue-600">
                                    <WaveIcon />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="relative z-10 text-white text-xl font-extrabold tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="relative z-10 text-blue-100 text-xs mt-1 font-medium">
                        Sign in to your AquaApp account
                    </p>

                    {/* Wave bottom edge */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: 28 }}>
                        <svg viewBox="0 0 400 28" preserveAspectRatio="none" className="w-full h-full" fill="white">
                            <path d="M0,28 L0,14 Q50,0 100,14 Q150,28 200,14 Q250,0 300,14 Q350,28 400,14 L400,28 Z" />
                        </svg>
                    </div>
                </div>

                {/* ── Form ── */}
                <div className="px-6 pt-2 pb-7">
                    <form onSubmit={handleSubmit} className="space-y-4 mt-3">

                        <InputField
                            icon={PhoneIcon}
                            label="Email or Phone"
                            name="login"
                            type="text"
                            value={form.login}
                            onChange={handleChange}
                            placeholder="Enter email or phone"
                            error={errors.login}
                        />

                        <InputField
                            icon={LockIcon}
                            label="Password"
                            name="password"
                            type={showPass ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            error={errors.password}
                            right={
                                <button
                                    type="button"
                                    onClick={() => setShowPass(s => !s)}
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            }
                        />

                        {/* Forgot password */}
                        <div className="flex justify-end -mt-1">
                            <button
                                type="button"
                                className="text-xs text-blue-600 font-bold hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-extrabold text-sm text-white transition-all active:scale-95 disabled:opacity-60 shadow-md shadow-blue-200"
                            style={{ background: submitting ? "#93c5fd" : "linear-gradient(135deg,#2563eb,#3b82f6)" }}
                        >
                            {submitting ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRightIcon />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-blue-100" />
                        <span className="text-xs text-gray-400 font-medium">New here?</span>
                        <div className="flex-1 h-px bg-blue-100" />
                    </div>

                    {/* Sign up link */}
                    <a
                        href="/signup"
                        className="w-full flex items-center justify-center py-3 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 text-blue-600 font-extrabold text-sm transition-all active:scale-95"
                    >
                        Create an Account
                    </a>
                </div>
            </div>

            {/* Footer */}
            <p className="relative z-10 text-blue-200/60 text-xs mt-6 text-center">
                AquaApp · Mumbai 💧
            </p>

            <CustomSwal {...swalProps} />
        </div>
    );
}