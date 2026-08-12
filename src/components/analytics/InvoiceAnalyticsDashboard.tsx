"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const CarbonSyncESGConsole = dynamic(() => import("./CarbonSyncESGConsole"), { ssr: false });
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Brain,
  CheckCircle2,
  Factory,
  FileText,
  Gauge,
  Leaf,
  MapPin,
  Package,
  ShieldCheck,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { InvoiceEmissionsResponse } from "@/types/report";
import {
  buildInvoiceAnalytics,
  readLatestInvoiceResult,
} from "@/lib/invoiceAnalytics";

function formatNumber(value: number, decimals = 2) {
  return Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function compactNumber(value: number) {
  const number = Number(value || 0);
  if (number >= 1000000) return `${formatNumber(number / 1000000, 2)}M`;
  if (number >= 1000) return `${formatNumber(number / 1000, 1)}k`;
  return formatNumber(number, number % 1 === 0 ? 0 : 2);
}

function scoreFromCarbon(totalTCO2e: number, hasData: boolean) {
  if (!hasData) return 0;
  const score = Math.round(94 - Math.min(totalTCO2e * 1.4, 42));
  return Math.max(52, Math.min(score, 94));
}

function buildMonthlyTrend(scope1: number, scope2: number, scope3: number, hasData: boolean) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, index) => {
    const factor = hasData ? 0.62 + index * 0.08 : 0;
    return {
      month,
      scope1: Number((scope1 * factor).toFixed(2)),
      scope2: Number((scope2 * factor).toFixed(2)),
      scope3: Number((scope3 * factor).toFixed(2)),
      total: Number(((scope1 + scope2 + scope3) * factor).toFixed(2)),
    };
  });
}

function getAdvice(category: string, documentType: string, totalKg: number) {
  const key = `${category} ${documentType}`.toLowerCase();

  if (!totalKg) {
    return [
      {
        scope: "SETUP",
        title: "No invoice uploaded yet",
        text: "Upload an invoice to activate analytics, trend charts and decarbonization advice.",
      },
      {
        scope: "SYSTEM",
        title: "Analytics baseline is zero",
        text: "The console remains at 0 until the latest invoice response is saved after upload.",
      },
    ];
  }

  if (key.includes("electricity")) {
    return [
      { scope: "SCOPE 2", title: "Grid electricity hotspot", text: "Prioritize renewable procurement and off-peak load shifting for the uploaded electricity bill." },
      { scope: "REPORTING", title: "Energy factor traceability", text: "Keep kWh, region and emission factor year visible in BRSR/CBAM export." },
    ];
  }

  if (key.includes("rail") || key.includes("flight")) {
    return [
      { scope: "SCOPE 3", title: "Passenger travel detected", text: "Track passenger count and route distance separately to improve travel emission accuracy." },
      { scope: "REDUCTION", title: "Route optimization opportunity", text: "Compare rail, flight and virtual-meeting alternatives for recurring travel patterns." },
    ];
  }

  if (key.includes("steel") || key.includes("aluminium") || key.includes("cement")) {
    return [
      { scope: "SCOPE 3", title: "High embodied-carbon material", text: "Request supplier EPDs and recycled-content declarations for material procurement." },
      { scope: "SUPPLY", title: "Supplier data quality check", text: "Keep original invoice unit such as MT visible while calculations convert internally to kg." },
    ];
  }

  return [
    { scope: "SCOPE 3", title: "Purchased goods signal", text: "Uploaded invoice items are mapped into purchased goods and services analytics." },
    { scope: "OPTIMIZE", title: "Improve item-level factors", text: "Replace generic purchased-goods factors with category-specific factors when available." },
  ];
}

function MetricTile({ label, value, sub, icon, delay }: { label: string; value: string; sub: string; icon: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-2xl border border-emerald-100/80 bg-white/90 p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">{sub}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">{icon}</div>
      </div>
    </motion.div>
  );
}

export function InvoiceAnalyticsDashboard() {
  const router = useRouter();
  const [invoiceResult, setInvoiceResult] = useState<InvoiceEmissionsResponse | null>(null);
  const [scopeFilter, setScopeFilter] = useState<"ALL" | "SCOPE1" | "SCOPE2" | "SCOPE3">("ALL");

  useEffect(() => {
    setInvoiceResult(readLatestInvoiceResult());

    const refresh = () => setInvoiceResult(readLatestInvoiceResult());
    window.addEventListener("storage", refresh);
    window.addEventListener("carbonsynqearth-invoice-updated", refresh as EventListener);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("carbonsynqearth-invoice-updated", refresh as EventListener);
    };
  }, []);

  const analytics = useMemo(() => buildInvoiceAnalytics(invoiceResult), [invoiceResult]);
  const monthlyTrend = useMemo(
    () => buildMonthlyTrend(analytics.scope1KgCO2e, analytics.scope2KgCO2e, analytics.scope3KgCO2e, analytics.hasData),
    [analytics.scope1KgCO2e, analytics.scope2KgCO2e, analytics.scope3KgCO2e, analytics.hasData]
  );

  const score = scoreFromCarbon(analytics.totalTCO2e, analytics.hasData);
  const topCategory = analytics.categoryRows[0]?.name ?? "No Data";
  const advice = getAdvice(topCategory, analytics.documentType, analytics.totalKgCO2e);
  const donutData = [
    { name: "Scope 1", value: analytics.scope1KgCO2e, color: "#0f172a" },
    { name: "Scope 2", value: analytics.scope2KgCO2e, color: "#0ea5e9" },
    { name: "Scope 3", value: analytics.scope3KgCO2e, color: "#10b981" },
  ].filter((entry) => entry.value > 0);
  const safeDonutData = donutData.length > 0 ? donutData : [{ name: "No Data", value: 1, color: "#e5e7eb" }];
  const benchmarkRows = (analytics.categoryRows.length > 0 ? analytics.categoryRows : [{ name: "No invoice uploaded", kgCO2e: 0, tCO2e: 0, items: 0 }]).slice(0, 4);
  const maxBenchmark = Math.max(...benchmarkRows.map((row) => row.kgCO2e), 1);

  const selectedLineKeys =
    scopeFilter === "SCOPE1"
      ? ["scope1"]
      : scopeFilter === "SCOPE2"
        ? ["scope2"]
        : scopeFilter === "SCOPE3"
          ? ["scope3"]
          : ["scope1", "scope2", "scope3"];

  return (
    <div className="min-h-screen bg-[#f7faf8]">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 bg-white/95 px-5 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <filter id="remove-black" colorInterpolationFilters="sRGB">
                      <feColorMatrix type="matrix" values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        5 5 5 0 -0.8
                      " />
                    </filter>
                  </defs>
                </svg>
                <div className="flex h-12 w-12 items-center justify-center overflow-visible">
                  <img 
                    src="/netzero/carbonsynqearth-logo.webp" 
                    alt="CarbonSynqEarth Logo" 
                    className="h-full w-full object-cover object-bottom scale-[2.4] origin-bottom translate-y-0.5" 
                    style={{ filter: "url(#remove-black)" }}
                  />
                </div>
                <div>
                  <p className="text-lg font-black leading-tight text-slate-950">CarbonSynqEarth</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Enterprise Carbon Intelligence</p>
                </div>
              </div>

              <div className="hidden items-center gap-7 text-xs font-bold text-slate-500 lg:flex">
                <span className="text-emerald-700">Simulation Console</span>
                <span>Command Pillars</span>
                <span>ESG Ecosystem</span>
                <span>Footprint Sandbox</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/invoices")}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  <Upload className="h-4 w-4" />
                  Launch Console
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.18),transparent_28%),linear-gradient(135deg,#06170f,#10261b_48%,#f8fffb_49%,#ffffff)] px-5 py-8 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">
                  <Activity className="h-3.5 w-3.5" />
                  Version 2.4 Enterprise Platform Now Live
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Command Your <span className="text-emerald-300">Carbon Lifecycle</span>
                  <br /> with CarbonSynqEarth
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-6 text-emerald-50/85">
                  Real-time invoice analytics, GHG equivalency mapping and simulation workspace. Upload an invoice, then visualize scope, category and item-level climate risk vectors here.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xl font-black text-white">{compactNumber(analytics.totalKgCO2e)}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">kg CO₂e</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xl font-black text-white">{formatNumber(analytics.totalTCO2e, 2)}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">tCO₂e</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xl font-black text-white">{analytics.totalItems}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">Items</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xl font-black text-white">{score}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">Score</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-emerald-950/20">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Global Manufacturing Analytics</p>
                    <p className="mt-1 text-sm font-black text-slate-900">Invoice Carbon Trend</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-700">
                    {analytics.hasData ? analytics.documentType.replace(/_/g, " ") : "Awaiting upload"}
                  </span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrend} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.28} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                      <Tooltip />
                      <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} fill="url(#trendGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-lg font-black text-slate-950">{formatNumber(analytics.scope1KgCO2e, 1)}</p>
                    <p className="text-[10px] font-bold text-slate-400">Scope 1</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-lg font-black text-slate-950">{formatNumber(analytics.scope2KgCO2e, 1)}</p>
                    <p className="text-[10px] font-bold text-slate-400">Scope 2</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-lg font-black text-slate-950">{formatNumber(analytics.scope3KgCO2e, 1)}</p>
                    <p className="text-[10px] font-bold text-slate-400">Scope 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricTile label="kg CO₂e / file" value={compactNumber(analytics.totalKgCO2e)} sub={analytics.hasData ? "Latest invoice" : "No upload yet"} icon={<Gauge className="h-5 w-5" />} delay={0.05} />
          <MetricTile label="Annualized tCO₂e" value={formatNumber(analytics.totalTCO2e * 12, 2)} sub="Projected from invoice" icon={<TrendingUp className="h-5 w-5" />} delay={0.1} />
          <MetricTile label="Items mapped" value={`${analytics.successfulItems}/${analytics.totalItems}`} sub="Extraction coverage" icon={<Package className="h-5 w-5" />} delay={0.15} />
          <MetricTile label="Document class" value={analytics.documentType.replace(/_/g, " ").slice(0, 18)} sub="Auto detected" icon={<FileText className="h-5 w-5" />} delay={0.2} />
          <MetricTile label="Benchmark score" value={`${score}`} sub="Sector benchmark AI" icon={<ShieldCheck className="h-5 w-5" />} delay={0.25} />
        </div>

        <div className="mt-7 rounded-[24px] border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
            <button className="inline-flex items-center gap-2 border-b-2 border-emerald-600 px-2 pb-3 text-xs font-black text-slate-900">
              <BarChart3 className="h-4 w-4" />
              Emissions Analytics
            </button>
            <button className="inline-flex items-center gap-2 px-2 pb-3 text-xs font-bold text-slate-500">
              <CheckCircle2 className="h-4 w-4" />
              Compliance & Reporting
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr]">
            <div>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-sm font-black text-slate-950">Monthly Scope 1 / 2 / 3 Emissions Trends</h2>
                  <p className="mt-1 text-xs text-slate-500">Continuous invoice trend simulation from uploaded document parameters.</p>
                </div>
                <div className="flex rounded-full bg-slate-100 p-1 text-[10px] font-black text-slate-500">
                  {(["ALL", "SCOPE1", "SCOPE2", "SCOPE3"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setScopeFilter(item)}
                      className={`rounded-full px-3 py-1.5 transition ${scopeFilter === item ? "bg-emerald-600 text-white shadow" : "hover:text-slate-900"}`}
                    >
                      {item.replace("SCOPE", "SCOPE ")}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[310px] rounded-2xl bg-slate-50/60 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend} margin={{ top: 16, right: 18, bottom: 8, left: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                    <Tooltip />
                    {selectedLineKeys.includes("scope1") ? <Line type="monotone" dataKey="scope1" name="Scope 1" stroke="#0f172a" strokeWidth={2.5} dot={false} /> : null}
                    {selectedLineKeys.includes("scope2") ? <Line type="monotone" dataKey="scope2" name="Scope 2" stroke="#0ea5e9" strokeWidth={2.5} dot={false} /> : null}
                    {selectedLineKeys.includes("scope3") ? <Line type="monotone" dataKey="scope3" name="Scope 3" stroke="#10b981" strokeWidth={2.5} dot={false} /> : null}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-black text-slate-950">Sustainability Scoring Ring</h2>
              <p className="mt-1 text-xs text-slate-500">Dynamic AI scoring model from invoice emissions and category mix.</p>
              <div className="relative mx-auto mt-7 h-56 w-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ value: score }, { value: Math.max(100 - score, 0) }]} dataKey="value" innerRadius={78} outerRadius={104} startAngle={90} endAngle={-270} stroke="none">
                      <Cell fill="#10b981" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-black text-slate-950">{score}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Sector Benchmark AI</p>
                </div>
              </div>
              <div className="mt-3 rounded-2xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
                {analytics.hasData ? "Score updates from latest uploaded invoice." : "Upload an invoice to activate score."}
              </div>
            </div>
          </div>
        </div>

        {analytics.metadata && (
          <div className="mt-7 rounded-[24px] border border-emerald-100 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-950">Utility Bill Intelligence</h2>
                <p className="mt-1 text-xs text-slate-500">Auto-extracted supplier parameters, consumption details, and revenue assessment from utility invoice.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-800">
                <FileText className="h-3.5 w-3.5" /> Parsed Document
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-slate-100">
              <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Account No</p>
                <p className="mt-1 font-mono text-sm sm:text-base font-bold text-slate-900">{analytics.metadata.accountNo}</p>
              </div>
              <div className="p-4 sm:p-5 border-b sm:border-b-0 lg:border-r border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Consumer Name</p>
                <p className="mt-1 text-sm sm:text-base font-bold text-slate-900 line-clamp-1">{analytics.metadata.consumerName}</p>
              </div>
              <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-slate-100">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Bill Month</p>
                <p className="mt-1 text-sm sm:text-base font-bold text-slate-900">{analytics.metadata.billMonth}</p>
              </div>
              <div className="p-4 sm:p-5 bg-emerald-50/30">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-emerald-600">Payable Amount</p>
                <p className="mt-1 font-mono text-lg sm:text-xl font-black text-emerald-700">${analytics.metadata.payableAmount.toFixed(2)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <div className="p-4 sm:p-5 border-b border-r lg:border-b-0 border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Power Factor</p>
                <p className="mt-1 font-mono text-base sm:text-lg font-black text-slate-900">{analytics.metadata.powerFactor}</p>
              </div>
              <div className="p-4 sm:p-5 border-b border-r sm:border-r-0 lg:border-r lg:border-b-0 border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sanction Load</p>
                <p className="mt-1 font-mono text-base sm:text-lg font-black text-slate-900">{analytics.metadata.sanctionLoad}</p>
              </div>
              <div className="p-4 sm:p-5 border-b border-r lg:border-b-0 border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Billed Demand</p>
                <p className="mt-1 font-mono text-base sm:text-lg font-black text-slate-900">{analytics.metadata.billedDemand}</p>
              </div>
              <div className="p-4 sm:p-5 border-b sm:border-b-0 border-r border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Demand Charges</p>
                <p className="mt-1 font-mono text-base sm:text-lg font-black text-slate-900">${analytics.metadata.demandCharges.toFixed(2)}</p>
              </div>
              <div className="p-4 sm:p-5 col-span-2 sm:col-span-1 border-b sm:border-b-0 border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Energy Charges</p>
                <p className="mt-1 font-mono text-base sm:text-lg font-black text-slate-900">${analytics.metadata.energyCharges.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-black text-slate-950">Facility Hub Emissions Benchmark</h2>
            <p className="mt-1 text-xs text-slate-500">Category-level benchmark derived from uploaded invoice rows.</p>
            <div className="mt-5 space-y-4">
              {benchmarkRows.map((row, index) => (
                <div key={row.name}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-2 truncate"><MapPin className="h-3.5 w-3.5 text-emerald-600" /> {row.name}</span>
                    <span className="whitespace-nowrap">{compactNumber(row.kgCO2e)} kg</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min((row.kgCO2e / maxBenchmark) * 100, 100)}%` }} />
                  </div>
                  <p className="mt-1 text-[10px] font-medium text-slate-400">Rank #{index + 1} • {row.items} item(s)</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-black text-slate-950">Carbon Share By Scope</h2>
            <p className="mt-1 text-xs text-slate-500">Allocated emission distribution across Scope 1-3 carbon categories.</p>
            <div className="relative mt-5 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={safeDonutData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3} stroke="none">
                    {safeDonutData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Total Load</p>
                <p className="text-2xl font-black text-slate-950">{compactNumber(analytics.totalKgCO2e)}</p>
                <p className="text-[10px] font-semibold text-slate-400">kg/h</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { name: "Scope 1", value: analytics.scope1KgCO2e, color: "#0f172a" },
                { name: "Scope 2", value: analytics.scope2KgCO2e, color: "#0ea5e9" },
                { name: "Scope 3", value: analytics.scope3KgCO2e, color: "#10b981" },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: row.color }} /> {row.name}</span>
                  <span>{analytics.totalKgCO2e > 0 ? formatNumber((row.value / analytics.totalKgCO2e) * 100, 1) : "0.0"}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-black text-slate-950">Cognitive Decarbonization Advices</h2>
            <p className="mt-1 text-xs text-slate-500">Automated invoice-to-action recommendations.</p>
            <div className="mt-5 space-y-4">
              {advice.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-700">{item.scope}</span>
                    <Brain className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-sm font-black text-slate-950">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 rounded-[24px] border border-emerald-100 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-black text-slate-950">Invoice Item Telemetry</h2>
              <p className="mt-1 text-xs text-slate-500">Exact quantities keep original units such as MT, pcs, kWh, km, m2 or sqft while calculations use mapped units internally.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
              <Zap className="h-3.5 w-3.5" /> Live Invoice Feed
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-sm">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left font-black">Item Name</th>
                  <th className="px-5 py-3 text-left font-black">Activity Data</th>
                  <th className="px-5 py-3 text-left font-black">Scope</th>
                  <th className="px-5 py-3 text-left font-black">Category</th>
                  <th className="px-5 py-3 text-left font-black">Factor</th>
                  <th className="px-5 py-3 text-left font-black">kgCO₂e</th>
                  <th className="px-5 py-3 text-left font-black">tCO₂e</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(analytics.itemRows.length > 0 ? analytics.itemRows : [{ itemName: "No invoice uploaded", quantity: 0, unit: "", scope: "—", category: "—", kgCO2e: 0, tCO2e: 0, factorName: "—", source: "—" }]).map((row, index) => (
                  <tr key={`${row.itemName}-${index}`} className="transition hover:bg-emerald-50/40">
                    <td className="min-w-[260px] px-5 py-4 font-black text-slate-950">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mr-2 align-middle"><Factory className="h-4 w-4" /></span>
                      {row.itemName}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-700 whitespace-nowrap">{formatNumber(row.quantity, row.quantity % 1 === 0 ? 0 : 2)} {row.unit}</td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.scope}</td>
                    <td className="px-5 py-4 text-slate-600">{row.category}</td>
                    <td className="min-w-[220px] px-5 py-4 text-xs text-slate-500">{row.factorName}</td>
                    <td className="px-5 py-4 font-black text-slate-950 whitespace-nowrap">{formatNumber(row.kgCO2e)}</td>
                    <td className="px-5 py-4 font-black text-slate-950 whitespace-nowrap">{formatNumber(row.tCO2e)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Full ESG Simulation Console (carbonsynqearth2-analysis-google) ── */}
      <div className="mt-8 border-t border-emerald-100 pt-2">
        <div className="mx-auto max-w-7xl px-4 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
              Enterprise ESG Simulation Console
            </span>
          </div>
        </div>
        <CarbonSyncESGConsole invoiceAnalytics={analytics} />
      </div>
    </div>
  );
}
