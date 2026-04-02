import React, { useEffect, useRef } from "react";
import {
    Chart,
    LineElement,
    BarElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    Tooltip,
    Legend,
    Filler,
    LineController,
    BarController,
    DoughnutController
} from "chart.js";

Chart.register(
    LineController,
    BarController,
    DoughnutController,
    LineElement,
    BarElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    Tooltip,
    Legend,
    Filler
);
// ─── SVG Icons ────────────────────────────────────────────────────────────────

const OrderIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
);

const RevenueIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const CustomerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const BottleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8" />
        <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
    </svg>
);

const TrendUpIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const TrendDownIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const WEEKLY_ORDERS = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [12, 19, 14, 25, 22, 30, 18],
};

const MONTHLY_REVENUE = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [18400, 22100, 19800, 25600, 28300, 31200, 27900, 33400, 29800, 35100, 38700, 41200],
};

const ORDER_STATUS_DATA = {
    labels: ["Delivered", "Pending", "Confirmed", "Cancelled"],
    data: [142, 38, 21, 9],
    colors: ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444"],
};

const RECENT_ORDERS = [
    { id: "a3f1b2c4", customer: "Rahul Sharma", amount: 480, status: "DELIVERED", time: "2 min ago" },
    { id: "d9e2f3a1", customer: "Priya Mehta", amount: 240, status: "PENDING", time: "15 min ago" },
    { id: "b7c8d9e0", customer: "Amit Joshi", amount: 720, status: "CONFIRMED", time: "32 min ago" },
    { id: "e1f2a3b4", customer: "Sneha Patil", amount: 360, status: "DELIVERED", time: "1 hr ago" },
    { id: "f5a6b7c8", customer: "Vikram Nair", amount: 960, status: "PENDING", time: "2 hr ago" },
];

const TOP_PRODUCTS = [
    { name: "20L Aqua Jar", orders: 312, revenue: 74880, pct: 100 },
    { name: "10L Mini Jar", orders: 187, revenue: 28050, pct: 60 },
    { name: "5L Bottle Pack", orders: 94, revenue: 9400, pct: 30 },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, trend, trendUp, color }) {
    return (
        <div className={`bg-white rounded-2xl border border-blue-50 shadow-sm p-4 flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon />
                </div>
                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                    {trendUp ? <TrendUpIcon /> : <TrendDownIcon />}
                    {trend}
                </span>
            </div>
            <div>
                <p className="text-2xl font-black text-gray-900 leading-none">{value}</p>
                <p className="text-xs text-gray-400 font-medium mt-1">{label}</p>
            </div>
            <p className="text-xs text-blue-500 font-semibold">{sub}</p>
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
    const s = {
        DELIVERED: "bg-green-100 text-green-700",
        PENDING: "bg-amber-100 text-amber-700",
        CONFIRMED: "bg-blue-100 text-blue-700",
        CANCELLED: "bg-red-100 text-red-500",
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s[status] || "bg-gray-100 text-gray-500"}`}>
            {status}
        </span>
    );
}

// ─── Line Chart ───────────────────────────────────────────────────────────────

function WeeklyOrdersChart() {
    const ref = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
        const ctx = ref.current.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(59,130,246,0.3)");
        gradient.addColorStop(1, "rgba(59,130,246,0)");

        chartRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: WEEKLY_ORDERS.labels,
                datasets: [{
                    data: WEEKLY_ORDERS.data,
                    borderColor: "#2563eb",
                    backgroundColor: gradient,
                    borderWidth: 2.5,
                    pointBackgroundColor: "#2563eb",
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: true,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ${c.raw} orders` } } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 11 } } },
                    y: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8", font: { size: 11 } }, beginAtZero: true },
                },
            },
        });
        return () => chartRef.current?.destroy();
    }, []);

    return <canvas ref={ref} />;
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function MonthlyRevenueChart() {
    const ref = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) chartRef.current.destroy();
        chartRef.current = new Chart(ref.current.getContext("2d"), {
            type: "bar",
            data: {
                labels: MONTHLY_REVENUE.labels,
                datasets: [{
                    data: MONTHLY_REVENUE.data,
                    backgroundColor: MONTHLY_REVENUE.data.map((_, i) =>
                        i === MONTHLY_REVENUE.data.length - 1 ? "#2563eb" : "#bfdbfe"
                    ),
                    borderRadius: 8,
                    borderSkipped: false,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ₹${c.raw.toLocaleString()}` } } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10 } } },
                    y: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8", font: { size: 10 }, callback: (v) => `₹${(v / 1000).toFixed(0)}k` }, beginAtZero: true },
                },
            },
        });
        return () => chartRef.current?.destroy();
    }, []);

    return <canvas ref={ref} />;
}

// ─── Doughnut Chart ───────────────────────────────────────────────────────────

function OrderStatusChart() {
    const ref = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) chartRef.current.destroy();
        chartRef.current = new Chart(ref.current.getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ORDER_STATUS_DATA.labels,
                datasets: [{
                    data: ORDER_STATUS_DATA.data,
                    backgroundColor: ORDER_STATUS_DATA.colors,
                    borderWidth: 0,
                    hoverOffset: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "72%",
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: { color: "#64748b", font: { size: 11 }, padding: 12, usePointStyle: true, pointStyleWidth: 8 },
                    },
                },
            },
        });
        return () => chartRef.current?.destroy();
    }, []);

    return <canvas ref={ref} />;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-32">

            {/* ── Header ── */}
            <div className="bg-blue-700 pt-6 pb-16 px-5 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-600 rounded-full opacity-50" />
                <div className="absolute top-8 -right-0 w-16 h-16 bg-blue-500 rounded-full opacity-40" />
                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Overview</span>
                    </div>
                    <h1 className="text-white text-2xl font-extrabold tracking-tight">Dashboard</h1>
                    <div className="flex items-center gap-1.5 mt-1 text-blue-200 text-xs font-medium">
                        <CalendarIcon />
                        {today}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10 space-y-4">

                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <StatCard icon={OrderIcon} label="Total Orders Today" value="47" sub="+8 since yesterday" trend="12%" trendUp={true} color="bg-blue-50 text-blue-600" />
                    <StatCard icon={RevenueIcon} label="Revenue Today" value="₹11,280" sub="vs ₹9,840 yesterday" trend="14%" trendUp={true} color="bg-green-50 text-green-600" />
                    <StatCard icon={CustomerIcon} label="Active Customers" value="284" sub="6 new this week" trend="4%" trendUp={true} color="bg-indigo-50 text-indigo-600" />
                    <StatCard icon={BottleIcon} label="Pending Returns" value="31" sub="bottles unreturned" trend="3%" trendUp={false} color="bg-amber-50 text-amber-600" />
                </div>

                {/* ── Charts Row 1 ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Weekly Orders line chart */}
                    <div className="md:col-span-2 bg-white rounded-2xl border border-blue-50 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm font-extrabold text-gray-800">Weekly Orders</p>
                                <p className="text-xs text-gray-400 mt-0.5">Orders placed this week</p>
                            </div>
                            <span className="text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full">This Week</span>
                        </div>
                        <div className="h-48">
                            <WeeklyOrdersChart />
                        </div>
                    </div>

                    {/* Order status doughnut */}
                    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-5">
                        <div className="mb-3">
                            <p className="text-sm font-extrabold text-gray-800">Order Status</p>
                            <p className="text-xs text-gray-400 mt-0.5">All-time breakdown</p>
                        </div>
                        <div className="h-52">
                            <OrderStatusChart />
                        </div>
                    </div>
                </div>

                {/* ── Monthly Revenue bar chart ── */}
                <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-extrabold text-gray-800">Monthly Revenue</p>
                            <p className="text-xs text-gray-400 mt-0.5">₹ collected per month · 2024</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-black text-blue-700">₹3.79L</p>
                            <p className="text-xs text-green-600 font-semibold">↑ 18% vs last year</p>
                        </div>
                    </div>
                    <div className="h-48">
                        <MonthlyRevenueChart />
                    </div>
                </div>

                {/* ── Bottom Row ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Recent Orders */}
                    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-extrabold text-gray-800">Recent Orders</p>
                            <a href="/admin/orders" className="text-xs text-blue-600 font-bold hover:underline">View all →</a>
                        </div>
                        <div className="space-y-3">
                            {RECENT_ORDERS.map((o) => (
                                <div key={o.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xs font-black flex-shrink-0">
                                            {o.customer.split(" ").map(w => w[0]).join("").slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">{o.customer}</p>
                                            <p className="text-[10px] text-gray-400">{o.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-black text-blue-700">₹{o.amount}</span>
                                        <StatusBadge status={o.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-2xl border border-blue-50 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-extrabold text-gray-800">Top Products</p>
                            <span className="text-xs text-gray-400">by orders</span>
                        </div>
                        <div className="space-y-4">
                            {TOP_PRODUCTS.map((p, i) => (
                                <div key={p.name}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 ${i === 0 ? "bg-blue-600" : i === 1 ? "bg-blue-400" : "bg-blue-200 text-blue-700"}`}>
                                                {i + 1}
                                            </span>
                                            <p className="text-xs font-bold text-gray-800">{p.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-blue-700">₹{p.revenue.toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-400">{p.orders} orders</p>
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="h-1.5 bg-blue-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all duration-700"
                                            style={{ width: `${p.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick summary */}
                        <div className="mt-5 pt-4 border-t border-blue-50 grid grid-cols-2 gap-3">
                            <div className="bg-blue-50 rounded-xl p-3 text-center">
                                <p className="text-lg font-black text-blue-700">593</p>
                                <p className="text-[10px] text-gray-400 font-semibold">Total Units Sold</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 text-center">
                                <p className="text-lg font-black text-green-700">₹1.12L</p>
                                <p className="text-[10px] text-gray-400 font-semibold">Total Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}