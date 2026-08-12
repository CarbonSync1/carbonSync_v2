"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  TrendingDown,
  Cpu,
  BarChart3,
  ShieldCheck,
  Globe2,
  Settings,
  Users,
  ChevronRight,
  Check,
  AlertTriangle,
  Building2,
  Truck,
  Hammer,
  Zap,
  ShoppingBag,
  Laptop,
  Sparkles,
  ChevronLeft,
  Calendar,
  Layers,
  ArrowUpRight,
  Database,
  Activity,
  ChevronDown,
  Award,
  FileCheck,
  CheckCircle,
  RefreshCcw,
  X,
} from "lucide-react";
import CalendlyWidget from "./CalendlyWidget";
const ScopesSection = dynamic(
  () => import("@/components/net-zero/ScopesSection"),
  { ssr: false },
);

export default function App() {
  const [activeDashboardTab, setActiveDashboardTab] = useState("overview");
  const [selectedIndustry, setSelectedIndustry] = useState("manufacturing");
  const [reductionScore, setReductionScore] = useState(38);
  const [aiActionsApplied, setAiActionsApplied] = useState({
    action1: false,
    action2: false,
  });
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [activeChallengeTab, setActiveChallengeTab] = useState("efficiency");
  const [activeProductTab, setActiveProductTab] = useState<
    "measure" | "analyze" | "reduce" | "achieve"
  >("measure");
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [expandedImpact, setExpandedImpact] = useState<number | null>(null);
  const [expandedOutcome, setExpandedOutcome] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setFormStatus("success");
        form.reset();
        setTimeout(() => {
          setIsModalOpen(false);
          setFormStatus("");
        }, 2000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  const challengeData = {
    efficiency: {
      label: "Efficiency",
      challenge:
        "Collecting scope 3 activity data is a time-consuming and cumbersome exercise requiring extensive collaboration between multiple stakeholders.",
      benefit:
        "CarbonSynq streamlines & centralizes your scope 3 activity data collection, allowing stakeholders to upload relevant data seamlessly through bulk uploads & API integrations.",
    },
    customization: {
      label: "Customization",
      challenge:
        "Scope 3 calculation methodologies vary significantly and require modifications to account for improvements in data collection capabilities.",
      benefit:
        "CarbonSynq allows for customizable calculation methodologies, which can be tailored to suit your specific data collection capabilities, and updated to align with improvements.",
    },
    automation: {
      label: "Automation",
      challenge:
        "Conducting manual scope 3 emission calculations every year demands considerable time and effort from your sustainability team.",
      benefit:
        "CarbonSynq reduces your sustainability team's annual burden by maximising repeatability of data collection & calculation configurations, automatically applied year on year.",
    },
    clarity: {
      label: "Clarity",
      challenge:
        "Charting a long-term path to reach your CarbonSynq Zero goals is a daunting task with no clear visibility on progress or deviations.",
      benefit:
        "CarbonSynq breaks down your long-term decarbonization goals into manageable annual targets, allowing you to gauge progress regularly and identify deviations.",
    },
    support: {
      label: "Support",
      challenge:
        "Even after planning CarbonSynq Zero pathways, companies often struggle to navigate implementation complexities due to a lack of specialised expertise.",
      benefit:
        "CarbonSynq provides a curated network of vendors to help implement your CarbonSynq Zero strategy, covering decarbonization implementation, carbon offsetting & green financing.",
    },
  };

  const productFeatures = {
    measure: {
      label: "Measure",
      desc: "Seamlessly upload your scope 3 activity data through API integrations & bulk uploads, customise calculation methodologies to suit your data collection capabilities, and automate your scope 3 calculations for maximum repeatability.",
      icon: "BarChart3",
      image: "/netzero/measure.webp",
      highlights: [
        {
          title: "API Integration",
          desc: "Sync ERP, utility APIs, and supplier invoices.",
        },
        {
          title: "Custom Methodologies",
          desc: "Tailor your emission calculations by category.",
        },
        {
          title: "Automated Repeatability",
          desc: "Re-run calculations year-on-year seamlessly.",
        },
      ],
    },
    analyze: {
      label: "Analyze",
      desc: "Understand the nature of your emissions profile at a granular level through dynamic dashboards to visualise, identify & act on hotspots across emission sources & locations.",
      icon: "Activity",
      image: "/netzero/analyze.webp",
      highlights: [
        {
          title: "Interactive Heatmaps",
          desc: "View hotspots across geographic regions and suppliers.",
        },
        {
          title: "Scope Breakdown",
          desc: "Compare Scope 1, 2, and 3 profiles side-by-side.",
        },
        {
          title: "Granular Dashboards",
          desc: "Drill down to individual facilities or product lines.",
        },
      ],
    },
    reduce: {
      label: "Reduce",
      desc: "Set emission reduction targets in line with the latest climate science, access curated decarbonization strategies based on your emissions profile & simulate the impact of decarbonization strategies.",
      icon: "Calendar",
      image: "/netzero/reduce.webp",
      highlights: [
        {
          title: "Science-Aligned Targets",
          desc: "Set reduction goals in line with SBTi guidelines.",
        },
        {
          title: "Decarbonization Scenarios",
          desc: "Model the impact of supply chain shifts.",
        },
        {
          title: "PPA & Renewables ROI",
          desc: "Calculate cost and abatement curves for green energy.",
        },
      ],
    },
    achieve: {
      label: "Achieve",
      desc: "Access our curated marketplace of vendors that provide implementation services across decarbonization, carbon offsets, & carbon finance to turn your CarbonSynq Zero ambitions into reality.",
      icon: "Leaf",
      image: "/netzero/achieve.webp",
      highlights: [
        {
          title: "Marketplace of Vendors",
          desc: "Connect directly to vetted decarbonization vendors.",
        },
        {
          title: "Certified Carbon Offsets",
          desc: "Buy gold standard offsets with automatic retirement.",
        },
        {
          title: "Green Finance",
          desc: "Access specialized green financing options.",
        },
      ],
    },
  };

  const platformCapabilities = [
    {
      label: "Data Fabric",
      title: "Connect every emissions source",
      icon: <Database className="w-5 h-5" />,
      intro:
        "Unifies ERP, utility, travel, procurement, supplier, and facility data into one governed carbon data layer.",
      bullets: [
        "API and bulk uploads for activity data",
        "Invoice and document parsing queues",
        "Data ownership, approvals, and validation rules",
      ],
      outputs: [
        "Live source coverage",
        "Data quality score",
        "Missing evidence queue",
      ],
    },
    {
      label: "Accounting Engine",
      title: "Calculate Scope 1, 2, and 3 with traceability",
      icon: <BarChart3 className="w-5 h-5" />,
      intro:
        "Maps activity data to emission factors, supports market and location-based Scope 2, and classifies Scope 3 across GHG Protocol categories.",
      bullets: [
        "Versioned emission-factor libraries",
        "Custom calculation methodologies by business unit",
        "Reusable calculation templates for annual reporting cycles",
      ],
      outputs: ["tCO2e by scope", "Factor lineage", "Methodology register"],
    },
    {
      label: "Supplier Network",
      title: "Move Scope 3 from estimates to primary data",
      icon: <Users className="w-5 h-5" />,
      intro:
        "Gives procurement teams structured supplier requests, evidence collection, reminders, and tier-level coverage tracking.",
      bullets: [
        "Supplier portals and request campaigns",
        "Spend-based fallback estimates where data is missing",
        "Supplier scorecards by risk, category, and response quality",
      ],
      outputs: [
        "Supplier completion rate",
        "Category 1-15 coverage",
        "Primary data ratio",
      ],
    },
    {
      label: "Insights Layer",
      title: "Find hotspots and simulate reduction paths",
      icon: <Activity className="w-5 h-5" />,
      intro:
        "Turns carbon inventory into operational decisions with hotspot detection, variance alerts, and scenario modeling.",
      bullets: [
        "Facility, region, product, and vendor drilldowns",
        "Abnormal movement detection between periods",
        "Reduction scenarios for energy, logistics, and supplier switches",
      ],
      outputs: ["Hotspot map", "Forecast variance", "Abatement ROI"],
    },
    {
      label: "Compliance Desk",
      title: "Generate audit-ready disclosure packages",
      icon: <FileCheck className="w-5 h-5" />,
      intro:
        "Packages metrics, evidence, comments, and sign-offs for CSRD/ESRS, SEC climate reporting, TCFD, and internal board reporting.",
      bullets: [
        "Framework mapping and disclosure checklists",
        "Evidence links behind every number",
        "Reviewer workflow with change history",
      ],
      outputs: ["Disclosure pack", "Assurance trail", "Board-ready exports"],
    },
    {
      label: "Action Control",
      title: "Track decarbonization work after reporting",
      icon: <TrendingDown className="w-5 h-5" />,
      intro:
        "Connects targets to initiatives so teams can monitor reductions, spend, owners, offsets, and progress toward net-zero pathways.",
      bullets: [
        "Science-aligned target tracking",
        "Initiative ownership and milestone management",
        "Verified offset and renewable certificate tracking",
      ],
      outputs: ["Reduction pipeline", "Target progress", "Offset registry"],
    },
  ];

  const activeCapabilityData = platformCapabilities[activeCapability];

  const handleApplyAiAction = (
    id: "action1" | "action2",
    reduction: number,
  ) => {
    if (!aiActionsApplied[id]) {
      setAiActionsApplied((prev) => ({ ...prev, [id]: true }));
      setReductionScore((prev) => prev + reduction);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black relative font-sans overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center pt-12 pb-16 px-6 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 20, 15, 0.75), rgba(15, 30, 20, 0.85)), url('/netzero/hero.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#4ade80] mb-6">
              <img
                src="/carbonsync.webp"
                alt="CarbonSynq Logo"
                className="w-10 h-10 object-contain"
              />
              <span>Version 2.4 Enterprise Platform Now Live</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-6">
              Accelerate Your <br />
              Net Zero Journey <br />
              with <span className="text-eco-green">CarbonSynq Zero</span>
            </h1>

            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
              AI-powered ESG, carbon accounting, compliance, and sustainability
              intelligence platform for modern enterprises.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  window.location.href = "/book-demo";
                }}
                className="btn-primary bg-white/10 text-white border border-white/20 hover:bg-white/20 text-center text-sm md:text-base min-h-[52px] w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Book Demo
              </button>
              <a
                href="#features"
                className="btn-primary flex items-center justify-center gap-2 text-sm md:text-base min-h-[52px] w-full sm:w-auto"
              >
                Explore Platform <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Metrics Tag */}
            <div className="grid grid-cols-2 min-[380px]:grid-cols-3 gap-4 md:gap-6 mt-12 pt-8 border-t border-white/10 w-full">
              <div className="text-center min-w-0 overflow-hidden">
                <p className="text-3xl md:text-5xl font-bold text-white">40%</p>
                <p className="text-xs md:text-sm text-white/80 uppercase tracking-wider leading-tight break-words max-w-full">
                  Faster ESG Audit
                </p>
              </div>
              <div className="text-center min-w-0 overflow-hidden">
                <p className="text-3xl md:text-5xl font-bold text-white">90%</p>
                <p className="text-xs md:text-sm text-white/80 uppercase tracking-wider leading-tight break-words max-w-full">
                  Automated Scope 1-3
                </p>
              </div>
              <div className="col-span-2 min-[380px]:col-span-1 text-center min-w-0 overflow-hidden">
                <p className="text-3xl md:text-5xl font-bold text-white">
                  100+
                </p>
                <p className="text-xs md:text-sm text-white/80 uppercase tracking-wider leading-tight break-words max-w-full">
                  Metric Certifications
                </p>
              </div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <div className="lg:col-span-6 relative h-[480px] lg:h-[550px] w-full flex items-center justify-center">
            {/* Premium Badge */}
            <div className="absolute -top-2 left-4 lg:left-0 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                Live Dashboard
              </span>
            </div>

            {/* Main ESG Dashboard Mockup */}
            <div className="w-full max-w-[600px] relative z-10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(52,211,153,0.15)] hover:shadow-[0_0_60px_rgba(52,211,153,0.25)] transition-all duration-700 ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none z-10" />
              <img
                src="/netzero/dashboard-light.webp"
                alt="Global Manufacturing Analytics Dashboard"
                className="w-full h-auto object-contain relative"
              />
            </div>

            {/* Floating Card 1: AI Insight */}
            <div className="absolute top-8 right-0 lg:-right-6 bg-[#0f1f16]/80 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl w-[220px] z-20 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 text-[#4ade80]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/80">
                    AI Decarbonization Suggestion
                  </p>
                  <p className="text-[11px] font-bold text-white truncate">
                    Optimize Scope 3 logistics route
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Carbon Credits / ESG Score */}
            <div className="absolute bottom-6 left-0 lg:-left-8 bg-[#0f1f16]/80 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl w-[200px] z-20 pointer-events-none">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-white/80">Sustain Score</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-[#4ade80] text-[9px] font-bold">
                  AAA Rating
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-white flex items-baseline gap-1">
                98.4
                <span className="text-[10px] text-white/80 font-normal">
                  /100
                </span>
              </div>
              <div className="mt-2 w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] h-full w-[94%]" />
              </div>
            </div>

            {/* Subtle static glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#4ade80]/10 rounded-full blur-[80px] pointer-events-none z-0" />
          </div>
        </div>
      </section>

      {/* 1.5 STRATEGIC OVERVIEW */}
      <section className="py-20 bg-white border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              Strategic Overview
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Command Your{" "}
              <span className="text-emerald-600">Carbon Lifecycle</span>
            </h3>
            <p className="text-slate-500 text-sm">
              Select a strategic pillar below to explore how CarbonSynq
              transforms your raw data into actionable enterprise value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "visibility",
                title: "Emissions Visibility",
                icon: <Activity className="w-6 h-6" />,
                summary:
                  "Comprehensive tracking across all scopes and supply chain tiers.",
                details:
                  "Instantly ingest telemetry from ERPs, utility APIs, and supplier invoices. CarbonSynq maps 100% of your footprint in real-time.",
                bullets: [
                  "Scope 1, 2, 3 auto-classification",
                  "Supplier API integrations",
                  "Real-time hotspot detection",
                ],
              },
              {
                id: "reduction",
                title: "Data-Driven Strategies",
                icon: <TrendingDown className="w-6 h-6" />,
                summary:
                  "Actionable insights to optimize reduction and accelerate impact.",
                details:
                  "Run AI-powered decarbonization scenarios. See the exact ROI and carbon impact before committing capital to green initiatives.",
                bullets: [
                  "Predictive reduction modeling",
                  "Renewable PPA ROI calculators",
                  "Supply chain switch simulations",
                ],
              },
              {
                id: "reporting",
                title: "Automated Reporting",
                icon: <FileCheck className="w-6 h-6" />,
                summary:
                  "Seamless, audit-ready compliance for CSRD, SEC, and global standards.",
                details:
                  "Generate investor-grade ESG reports with a single click. Every data point is tethered to a verifiable audit trail.",
                bullets: [
                  "One-click CSRD & SEC exports",
                  "Automated anomaly detection",
                  "Direct auditor portal access",
                ],
              },
            ].map((strategy) => (
              <div
                key={strategy.id}
                onClick={() =>
                  setActiveStrategy(
                    activeStrategy === strategy.id ? null : strategy.id,
                  )
                }
                className={`cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                  activeStrategy === strategy.id
                    ? "bg-emerald-50/50 border-emerald-300 shadow-lg shadow-emerald-100"
                    : "bg-white border-slate-200 hover:border-emerald-200 hover:shadow-md"
                }`}
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-300 ${
                      activeStrategy === strategy.id
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 scale-110"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    }`}
                  >
                    {strategy.icon}
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">
                    {strategy.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {strategy.summary}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    {activeStrategy === strategy.id
                      ? "Close Details"
                      : "Explore Pillar"}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeStrategy === strategy.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {activeStrategy === strategy.id && (
                  <div className="px-8 pb-8 pt-2 text-left border-t border-emerald-100/50">
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      {strategy.details}
                    </p>
                    <ul className="space-y-3">
                      {strategy.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. COMPLIANCE & STANDARDS SECTION */}
      <section
        id="standards"
        className="py-16 bg-slate-50 border-b border-slate-200/80 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
            Built on Global Climate Standards & Frameworks
          </p>

          <div className="marquee-container w-full">
            <div className="marquee-track">
              {/* First set */}
              {[
                "GHG Protocol",
                "SBTi",
                "ISO 14064",
                "CSRD",
                "TCFD",
                "CDP",
                "SEC Climate",
                "ISSB",
              ].map((orgName) => (
                <div
                  key={orgName}
                  className="flex items-center gap-2.5 mx-4 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all duration-300 cursor-default select-none shrink-0 shadow-sm font-mono tracking-tight"
                >
                  <span className="text-sm font-bold whitespace-nowrap">
                    {orgName}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                "GHG Protocol",
                "SBTi",
                "ISO 14064",
                "CSRD",
                "TCFD",
                "CDP",
                "SEC Climate",
                "ISSB",
              ].map((orgName) => (
                <div
                  key={orgName + "-dup"}
                  className="flex items-center gap-2.5 mx-4 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all duration-300 cursor-default select-none shrink-0 shadow-sm font-mono tracking-tight"
                >
                  <span className="text-sm font-bold whitespace-nowrap">
                    {orgName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2b. WHAT IS CARBONSYNEARTH? INTRO BANNER SECTION */}
      <section className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 mb-6 uppercase tracking-widest">
              <img
                src="/carbonsync.webp"
                alt="CarbonSynq Logo"
                className="w-10 h-10 object-contain"
              />{" "}
              About the Platform
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              What is <span className="text-emerald-600">CarbonSynq</span>?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
              Demystify CarbonSynq Zero! Wherever you are in your CarbonSynq
              Zero journey, CarbonSynq empowers you to{" "}
              <strong className="text-slate-800">
                measure & report scope 3 emissions
              </strong>{" "}
              in accordance with the GHG protocol, strategize & implement your
              path to CarbonSynq Zero — all in one platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
              {[
                {
                  icon: <BarChart3 className="w-5 h-5" />,
                  label: "GHG Protocol Compliant",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5" />,
                  label: "Enterprise-grade Security",
                },
                {
                  icon: <Globe2 className="w-5 h-5" />,
                  label: "Global Standards",
                },
                {
                  icon: <Cpu className="w-5 h-5" />,
                  label: "AI-powered Insights",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm font-semibold text-emerald-700"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    {item.icon}
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-[500px] bg-gray-100 animate-pulse rounded-xl" />
        }
      >
        <ScopesSection />
      </Suspense>

      {/* 3. FEATURES SECTION (WIND TURBINES IN OCEAN IMAGE + DARK OVERLAY + WHITE TEXT) */}
      <section
        id="features"
        className="py-24 px-6 relative overflow-hidden bg-white"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 mb-4">
              SMART ESG PLATFORM
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Built For <span className="text-emerald-600">Real-World</span>{" "}
              Impact
            </h3>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Eliminate data silos and streamline your sustainability workflow
              with our comprehensive suite of tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-2xl bg-white border border-slate-200 p-8 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="shrink-0 p-3 rounded-[14px] bg-emerald-50 border border-emerald-100 w-14 h-14 flex items-center justify-center text-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {feature.icon}
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h4>

                  <p className="text-slate-500 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3b. CHALLENGES & SOLUTIONS — CLEAN SAAS GRID */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/30 text-xs font-bold text-green-400 mb-4 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Pain → Solution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-slate-900">Every</span>{" "}
              <span className="text-emerald-600">pain point</span>
              <span className="text-slate-900">, solved</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              From data collection to CarbonSynq Zero planning — we've addressed
              every challenge across the emissions lifecycle.
            </p>
          </div>

          {/* Challenges grid */}
          <div className="mb-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">
              The Challenges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Object.entries(challengeData).map(([key, val]) => (
                <div
                  key={key}
                  className="rounded-2xl p-6 border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">
                    {val.label}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {val.challenge}
                  </p>
                </div>
              ))}
              {/* CTA card */}
              <div className="rounded-2xl p-6 border-2 border-dashed border-emerald-300 bg-emerald-50/50 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                  Ready to solve yours?
                </h3>
                <p className="text-slate-500 text-sm mb-5">
                  See how CarbonSynq handles your specific use case.
                </p>
                <button
                  onClick={() => {
                    window.location.href = "/book-demo";
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-slate-900 text-sm font-bold hover:bg-emerald-700 transition-colors shadow-md"
                >
                  Book a Demo <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Solutions grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-6 text-center">
              The CarbonSynq Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Object.entries(challengeData).map(([key, val]) => (
                <div
                  key={key}
                  className="rounded-2xl p-6 border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {val.label}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {val.benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3c. PRODUCT FEATURES TABS (MEASURE → ANALYZE → PLAN → DECARBONIZE) */}
      <section className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-sm md:text-base font-bold text-emerald-700 mb-6 uppercase tracking-wider font-sans shadow-sm">
              <Layers className="w-4 h-4 text-emerald-600" /> CarbonSynq Zero
              Framework
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Your complete{" "}
              <span className="text-emerald-600">CarbonSynq Zero</span> journey
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto mb-6">
              From data collection to real-world implementation — every step is
              covered.
            </p>
          </div>

          {/* Feature Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.entries(productFeatures).map(([key, val]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveProductTab(
                    key as "measure" | "analyze" | "reduce" | "achieve",
                  )
                }
                className={`px-8 py-3 rounded-full text-base font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeProductTab === key
                    ? "bg-emerald-600 text-slate-900 shadow-lg shadow-emerald-200/80 scale-105"
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:border-emerald-200 hover:text-emerald-700"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>

          {/* Feature Tab Content */}

          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Text and Highlights Column */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight font-sans">
                  {productFeatures[activeProductTab].label} Phase
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  {productFeatures[activeProductTab].desc}
                </p>

                <div className="space-y-4">
                  {productFeatures[activeProductTab].highlights.map(
                    (item, i) => (
                      <div
                        key={i}
                        className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-100 transition-all duration-300"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Image Illustration Column */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="flex flex-col w-full max-w-[400px] rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-2xl hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:border-emerald-300 transition-all duration-500 group">
                  {/* Mock Browser Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200/60 select-none">
                    {/* Window Controls */}
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                      <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    </div>
                    {/* URL / Brand Address Bar */}
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                      <img
                        src="/carbonsync.webp"
                        alt="CarbonSynq Logo"
                        className="w-10 h-10 object-contain"
                      />
                      <span className="tracking-tight text-slate-700">
                        app.carbonsynqearth.com
                      </span>
                    </div>
                    <div className="w-10" /> {/* Spacer to center URL bar */}
                  </div>

                  {/* Image Area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                    <img
                      src={productFeatures[activeProductTab].image}
                      alt={`${productFeatures[activeProductTab].label} Illustration`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CarbonSynq Zero SECTION (LIGHT BG + DARK TEXT) */}
      <section
        id="netzero"
        className="py-24 px-6 bg-slate-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Content & Timeline */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4ade80] mb-3">
              From Emissions to Impact
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
              Track Your{" "}
              <span className="text-emerald-600">
                Decarbonization Milestones
              </span>{" "}
              Step-by-Step
            </h3>

            <p className="text-black mb-8 leading-relaxed">
              Achieving CarbonSynq Zero requires a structured, audit-ready
              framework. Our platform guides your teams through continuous
              mapping and dynamic auditing.
            </p>

            {/* Interactive Timeline */}
            <div className="relative border-l border-slate-200 pl-6 space-y-8">
              {roadmapSteps.map((step, i) => (
                <div
                  key={i}
                  className="relative group cursor-pointer"
                  onClick={() => setActiveTimelineStep(i)}
                >
                  {/* Timeline bullet */}
                  <div
                    className={`absolute -left-[31px] top-1 w-[11px] h-[11px] rounded-full border-2 transition-colors duration-300 ${
                      activeTimelineStep === i
                        ? "bg-secondary border-secondary shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                        : "bg-white border-slate-400 group-hover:border-green-500"
                    }`}
                  />

                  <h4
                    className={`text-md font-bold transition-colors duration-200 ${
                      activeTimelineStep === i
                        ? "text-[#4ade80]"
                        : "text-black group-hover:text-black"
                    }`}
                  >
                    {step.title}
                  </h4>

                  {activeTimelineStep === i && (
                    <p className="text-sm text-black mt-2 leading-relaxed">
                      {step.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats Panel */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />

              <h4 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                <img
                  src="/carbonsync.webp"
                  alt="CarbonSynq Logo"
                  className="w-12 h-12 object-contain"
                />{" "}
                Dynamic Decarbonization Pipeline
              </h4>

              {/* Progress Targets */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-black">
                      2026 Target: Baseline Optimization
                    </span>
                    <span className="text-sm font-bold text-black">
                      40% Reduced
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-[1px] border border-slate-200">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-black">
                      2030 Target: Scope 3 Supplier Alignment
                    </span>
                    <span className="text-sm font-bold text-black">
                      65% Reduced
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-[1px] border border-slate-200">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-black">
                      2040 Target: Complete CarbonSynq Zero Integration
                    </span>
                    <span className="text-sm font-bold text-black">
                      100% CarbonSynq Zero
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-[1px] border border-slate-200">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* Circular carbon reduction infographic mockup */}
              <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-2 gap-6 items-center">
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      className="stroke-slate-100 fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      className="stroke-emerald-500 fill-none"
                      strokeWidth="8"
                      strokeDasharray="314"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-bold font-mono text-black">
                      76%
                    </span>
                    <p className="text-[9px] text-black uppercase tracking-widest">
                      Offset Index
                    </p>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-black mb-2">
                    Audited Carbon Offsets
                  </h5>
                  <p className="text-xs text-black leading-relaxed">
                    Verified through gold standard registry integrations. All
                    offsets mapped dynamically to Scope 1 & 2 balances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 PLATFORM CAPABILITIES */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
              Enterprise Suite
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Platform <span className="text-emerald-600">Capabilities</span>
            </h3>
            <p className="text-slate-500 max-w-3xl mx-auto">
              A carbon operating system for measurement, supplier engagement,
              compliance, and real reduction work.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-x-6 top-20 bottom-6 w-px bg-gradient-to-b from-emerald-200 via-slate-200 to-emerald-100 pointer-events-none hidden sm:block" />
              <div className="px-3 py-2 mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Capability Map
                </p>
                <h4 className="text-lg font-extrabold text-slate-900 mt-1">
                  Click a layer
                </h4>
              </div>

              <div className="space-y-2">
                {platformCapabilities.map((capability, i) => (
                  <button
                    key={capability.label}
                    onClick={() => setActiveCapability(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 relative group ${
                      activeCapability === i
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900 shadow-[0_14px_35px_rgba(16,185,129,0.13)]"
                        : "bg-white border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-slate-50 hover:shadow-md"
                    }`}
                  >
                    {activeCapability === i && (
                      <span className="absolute inset-0 rounded-xl border border-emerald-300 pointer-events-none" />
                    )}
                    <span
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        activeCapability === i
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {capability.icon}
                    </span>
                    <span>
                      <span className="block text-sm font-bold">
                        {capability.label}
                      </span>
                      <span className="block text-[11px] text-slate-500 mt-0.5">
                        {capability.outputs[0]}
                      </span>
                    </span>
                    <ChevronRight
                      className={`ml-auto w-4 h-4 transition-all duration-300 ${
                        activeCapability === i
                          ? "text-emerald-600 translate-x-1"
                          : "text-slate-300 group-hover:text-emerald-500"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-emerald-100/70 transition-transform duration-500 group-hover:scale-125" />
              <div
                className="absolute left-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-sky-400 transition-all duration-500"
                style={{
                  width: `${
                    ((activeCapability + 1) / platformCapabilities.length) * 100
                  }%`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-4">
                      {activeCapabilityData.icon}
                      {activeCapabilityData.label}
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-900 leading-tight">
                      {activeCapabilityData.title}
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    0{activeCapability + 1}/06
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-8">
                  {activeCapabilityData.intro}
                </p>

                <div className="space-y-3">
                  {activeCapabilityData.bullets.map((bullet, i) => (
                    <div
                      key={bullet}
                      className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40 hover:translate-x-1 transition-all duration-200"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-700">{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    <span>Operational maturity</span>
                    <span>{70 + activeCapability * 4}%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300 mb-4">
                  Live Outputs
                </p>

                <div className="relative space-y-4">
                  {activeCapabilityData.outputs.map((output, i) => (
                    <div
                      key={output}
                      className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="text-sm text-slate-200">{output}</span>
                      <span className="text-[10px] font-mono text-emerald-300">
                        ACTIVE 0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Audit Packet
                </p>
                <div className="space-y-3">
                  {[
                    "Source file",
                    "Calculation method",
                    "Reviewer sign-off",
                    "Disclosure mapping",
                  ].map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <span className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: "Frameworks",
                value: "GHG Protocol, CSRD/ESRS, SEC, TCFD",
              },
              {
                label: "Scope 3 depth",
                value: "15 categories with supplier evidence workflows",
              },
              {
                label: "Decision layer",
                value: "Hotspots, forecasts, ROI, and target variance",
              },
              {
                label: "Governance",
                value: "Version history, approvals, evidence, and exports",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white border border-slate-200 rounded-xl p-5"
              >
                <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-2">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.6 DATA GOVERNANCE LAYER */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden border-y border-slate-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
                Data Governance Layer
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                Before the <span className="text-emerald-600">dashboard</span>,
                make the carbon data{" "}
                <span className="text-emerald-600">defensible</span>
              </h3>
              <p className="text-slate-600 leading-relaxed mb-7">
                Serious GHG programs need more than calculations. EPA inventory
                guidance and GHG Protocol quality principles point to
                boundaries, methodologies, data management, base-year controls,
                roles, reviews, and verification as core parts of a high-quality
                inventory.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Traceability", value: "source to report" },
                  { label: "Controls", value: "review and approval" },
                  { label: "Versioning", value: "factors and methods" },
                  { label: "Assurance", value: "audit-ready evidence" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-lg overflow-hidden">
                <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-emerald-300 via-slate-200 to-emerald-300 hidden md:block" />

                <div className="space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Define boundaries",
                      desc: "Lock organizational and operational boundaries so Scope 1, 2, and 3 reporting starts from a consistent inventory perimeter.",
                      icon: <Globe2 className="w-5 h-5" />,
                    },
                    {
                      step: "02",
                      title: "Document methods",
                      desc: "Attach calculation logic, emission-factor versions, assumptions, and methodology changes to every reporting cycle.",
                      icon: <FileCheck className="w-5 h-5" />,
                    },
                    {
                      step: "03",
                      title: "Validate incoming data",
                      desc: "Route invoices, utility data, supplier files, and activity uploads through quality checks before they become reportable numbers.",
                      icon: <Database className="w-5 h-5" />,
                    },
                    {
                      step: "04",
                      title: "Control base-year changes",
                      desc: "Track structural changes, acquisitions, divestments, and methodology updates without losing the original baseline story.",
                      icon: <RefreshCcw className="w-5 h-5" />,
                    },
                    {
                      step: "05",
                      title: "Prepare for verification",
                      desc: "Give reviewers the evidence chain: source, owner, calculation, approval, disclosure mapping, and corrective action history.",
                      icon: <ShieldCheck className="w-5 h-5" />,
                    },
                  ].map((item, i) => (
                    <div
                      key={item.step}
                      className="relative rounded-xl border border-slate-200 bg-slate-50/70 p-4 md:pl-16 hover:bg-emerald-50/60 hover:border-emerald-200 transition-all duration-300"
                    >
                      <div className="md:absolute md:left-4 md:top-4 w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-700 flex items-center justify-center mb-3 md:mb-0 shadow-sm">
                        {item.icon}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-start gap-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {item.step}
                        </span>
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* COMPACT CTA SECTION IN THE MIDDLE */}
      <section
        id="cta-compact"
        className="py-12 px-6 bg-slate-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="flex-1 text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-400 mb-4 uppercase tracking-widest">
                <img
                  src="/carbonsync.webp"
                  alt="CarbonSynq Logo"
                  className="w-10 h-10 object-contain"
                />
                Join 100+ Enterprise Pacesetters
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
                Drive measurable climate impact with CarbonSynq
              </h3>
              <p className="text-sm text-slate-400 max-w-xl mx-auto lg:mx-0">
                Start mapping Scope 1, 2, and 3 emissions, generating compliant
                audit reports, and optimizing your logistics telemetry in days.
              </p>
            </div>

            <div className="shrink-0 relative z-10 w-full lg:w-auto"></div>
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES SECTION (LIGHT BG + DARK TEXT) */}
      <section
        id="industries"
        className="py-24 px-6 bg-slate-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4ade80] mb-3">
              Tailored Industry Workflows
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
              Decarbonizing{" "}
              <span className="text-emerald-600">Core Sectors</span> Globally
            </h3>
            <p className="text-black">
              Each sector has distinct reporting requirements and operational
              pipelines. Select an industry to review target dashboards and
              metrics.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {industryCards.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all duration-300 group/ind ${
                  selectedIndustry === industry.id
                    ? "border-secondary bg-secondary/10 shadow-glass-green text-black scale-[1.03]"
                    : "border-slate-200 bg-white text-black hover:text-black hover:border-[#4ade80]/40 hover:shadow-[0_4px_20px_rgba(34,197,94,0.08)] hover:-translate-y-1"
                }`}
              >
                <div
                  className={`p-3 rounded-lg mb-3 transition-transform duration-300 group-hover/ind:scale-110 ${
                    selectedIndustry === industry.id
                      ? "text-[#4ade80]"
                      : "text-slate-600"
                  }`}
                >
                  {industry.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {industry.name}
                </span>
              </button>
            ))}
          </div>

          {/* Details Panel for Selected Industry */}

          <div className="rounded-2xl glass-panel border-slate-200 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg bg-white/70">
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xl font-bold text-black flex items-center gap-2">
                <span className="p-2 rounded bg-secondary/10 text-[#4ade80]">
                  {
                    industryCards.find((ind) => ind.id === selectedIndustry)
                      ?.icon
                  }
                </span>
                {industryCards.find((ind) => ind.id === selectedIndustry)?.name}{" "}
                Decarbonization Pipeline
              </h4>

              <p className="text-black leading-relaxed text-sm">
                {
                  industryCards.find((ind) => ind.id === selectedIndustry)
                    ?.details
                }
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/50">
                  <span className="text-[10px] text-black uppercase tracking-wider">
                    Average Carbon Footprint
                  </span>
                  <p className="text-lg font-bold font-mono text-black mt-1">
                    {
                      industryCards.find((ind) => ind.id === selectedIndustry)
                        ?.carbonFootprint
                    }
                  </p>
                </div>
                <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/50">
                  <span className="text-[10px] text-black uppercase tracking-wider">
                    AI Offset Target
                  </span>
                  <p className="text-lg font-bold font-mono text-black mt-1">
                    {
                      industryCards.find((ind) => ind.id === selectedIndustry)
                        ?.targetSavings
                    }
                  </p>
                </div>
                <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/50 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-black uppercase tracking-wider">
                    Audit Timeframe
                  </span>
                  <p className="text-lg font-bold font-mono text-black mt-1">
                    {
                      industryCards.find((ind) => ind.id === selectedIndustry)
                        ?.auditTime
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Graphical visualizer mockup */}
            <div className="lg:col-span-5 relative bg-slate-100/30 p-6 rounded-xl border border-slate-200/60 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-black">
                  Platform Calibration Matrix
                </span>
                <span className="text-[9px] text-[#4ade80] bg-secondary/10 px-1.5 py-0.5 rounded font-mono font-bold">
                  READY
                </span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-black">
                    <span>Dynamic Scope 3 Coverage</span>
                    <span className="font-mono">94%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-[1px]">
                    <div className="bg-secondary h-full rounded-full w-[94%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-black">
                    <span>Real-time API Ingestion Rate</span>
                    <span className="font-mono">99.8%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-[1px]">
                    <div className="bg-green-500 h-full rounded-full w-[99.8%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-black">
                    <span>Audit Verification Trail</span>
                    <span className="font-mono">100% Secure</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-[1px]">
                    <div className="bg-emerald-500 h-full rounded-full w-[100%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CARBONSYNEARTH SECTION (MOUNTAIN FOREST IMAGE + DARK OVERLAY + WHITE TEXT) */}
      <section
        id="comparison"
        className="py-24 px-6 relative overflow-hidden bg-white"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#4ade80] mb-3">
              Enterprise Efficiency Mapping
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              CarbonSynq vs Traditional{" "}
              <span className="text-emerald-600">ESG</span> Methods
            </h3>
            <p className="text-slate-600">
              Traditional spreadsheets and ad-hoc consultancy audits introduce
              latency, data leakage, and compliance risk. Meet the machine
              alternative.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Traditional ESG */}
            <div className="rounded-2xl bg-white backdrop-blur-md border border-slate-200 p-8 shadow-xl relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-full blur-2xl" />

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                <img
                  src="/carbonsync.webp"
                  alt="CarbonSynq Logo"
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Traditional ESG Management
                  </h4>
                  <p className="text-xs text-slate-600">
                    Fragmented spreadsheets & custom consultants
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {traditionalDrawbacks.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start group/item hover:bg-white/[0.03] rounded-lg p-2 -m-2 transition-colors duration-200"
                  >
                    <div className="p-1 rounded-full bg-red-500/10 text-red-400 mt-0.5 shrink-0 group-hover/item:bg-red-500/20 transition-colors duration-200">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 mb-0.5">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CarbonSynq */}
            <div className="rounded-2xl bg-white backdrop-blur-md border border-green-500/30 p-8 shadow-2xl relative overflow-hidden shadow-glass-glow transition-all duration-500 hover:border-[#4ade80]/60 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src="/carbonsync.webp"
                    alt="CarbonSynq Logo"
                    className="w-14 h-14 object-contain"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      CarbonSynq AI Platform
                    </h4>
                    <p className="text-xs text-slate-600">
                      Continuous telemetry & AI-led decarbonization
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-bold text-[#4ade80]">
                  RECOMMENDED
                </span>
              </div>

              <div className="space-y-6">
                {carbonsynqearthBenefits.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start group/item hover:bg-[#4ade80]/[0.04] rounded-lg p-2 -m-2 transition-colors duration-200"
                  >
                    <div className="p-1 rounded-full bg-emerald-500/15 text-[#4ade80] mt-0.5 shrink-0 group-hover/item:bg-[#4ade80]/25 group-hover/item:scale-110 transition-all duration-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 mb-0.5">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7.4 SUCCESS OUTCOMES */}
      <section className="py-20 px-6 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
                Success Outcomes
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                Results that{" "}
                <span className="text-emerald-600">leadership</span> can
                actually <span className="text-emerald-600">track</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Benchmarked from emissions-reduction ranges and ESG automation
                claims, then framed as practical platform outcomes.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  value: "15%",
                  title: "Emission Reduction",
                  icon: <TrendingDown className="w-6 h-6" />,
                  summary:
                    "A practical target range for organizations that convert measurement into energy, logistics, supplier, and process interventions.",
                  more: "Analysis: broad carbon-policy evidence shows reductions commonly landing in the 5-21% range, with corrected estimates closer to 4-15%. For a platform-led enterprise program, 15% is a strong but realistic target when hotspots are actively turned into reduction projects.",
                  chips: [
                    "Hotspot detection",
                    "Reduction scenarios",
                    "Target tracking",
                  ],
                },
                {
                  value: "90%",
                  title: "Reporting Efficiency Improvement",
                  icon: <FileCheck className="w-6 h-6" />,
                  summary:
                    "A high-efficiency benchmark for replacing manual data chasing, spreadsheet consolidation, and report assembly with automated workflows.",
                  more: "Analysis: ESG reporting automation vendors frequently position AI-assisted reporting as up to 90% faster or 90% time saved. The gain comes from automated ingestion, evidence mapping, validation, framework alignment, and reusable reporting cycles.",
                  chips: [
                    "Auto ingestion",
                    "Evidence mapping",
                    "Framework exports",
                  ],
                },
              ].map((outcome, i) => (
                <div
                  key={outcome.title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        {outcome.icon}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        OUTCOME 0{i + 1}
                      </span>
                    </div>

                    <div className="flex items-end gap-3 mb-3">
                      <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-mono">
                        {outcome.value}
                      </span>
                      <span className="pb-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                        Impact
                      </span>
                    </div>

                    <h4 className="text-xl font-extrabold text-slate-900 mb-2">
                      {outcome.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {outcome.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {outcome.chips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedOutcome(expandedOutcome === i ? null : i)
                      }
                      className="ml-auto flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                      aria-expanded={expandedOutcome === i}
                    >
                      {expandedOutcome === i
                        ? "Hide analysis"
                        : "Show analysis"}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          expandedOutcome === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedOutcome === i && (
                      <div className="overflow-hidden">
                        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {outcome.more}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7.5 BUSINESS IMPACT */}
      <section className="py-20 px-6 bg-white relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-4 rounded-2xl bg-slate-900 p-8 text-white flex flex-col justify-between overflow-hidden relative">
              <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-emerald-400/10" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-4">
                  Value Creation
                </p>
                <h3 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">
                  Business Impact
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  CarbonSynq turns ESG operations into a tighter business
                  system: faster data cycles, sharper cost decisions, and
                  audit-ready reporting from the same source of truth.
                </p>
              </div>

              <div className="relative mt-8 grid grid-cols-3 gap-2">
                {["Time", "Spend", "Risk"].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                      {item}
                    </p>
                    <p className="text-sm font-bold text-emerald-300 mt-1">
                      Lower
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 gap-4">
              {[
                {
                  title: "Operational Efficiency",
                  icon: <Zap className="w-5 h-5" />,
                  signal: "Less manual collection. Faster ESG cycles.",
                  detail:
                    "Automated ingestion, validation queues, and anomaly detection reduce spreadsheet-heavy work while keeping sustainability teams focused on decisions instead of chasing files.",
                  more: "Use this when your ESG team is collecting utility bills, supplier files, travel logs, and facility data from many owners. CarbonSynq creates repeatable intake workflows, flags missing or unusual data, and keeps every reporting period easier than the last.",
                  proof: [
                    "Auto data capture",
                    "Validation workflows",
                    "Fewer reporting bottlenecks",
                  ],
                  outcome: "Faster close",
                },
                {
                  title: "Cost Optimization",
                  icon: <TrendingDown className="w-5 h-5" />,
                  signal: "Find spend-linked emissions hotspots.",
                  detail:
                    "Energy, freight, supplier, and product-level analysis helps teams prioritize reductions where carbon and operating cost move together.",
                  more: "The platform helps compare reduction paths before capital is committed: renewable energy shifts, freight route changes, supplier substitutions, packaging changes, and energy-efficiency projects can be ranked by carbon impact and expected business return.",
                  proof: [
                    "Energy efficiency signals",
                    "Supplier switching scenarios",
                    "Abatement ROI views",
                  ],
                  outcome: "Lower waste",
                },
                {
                  title: "Regulatory Readiness",
                  icon: <ShieldCheck className="w-5 h-5" />,
                  signal: "Audit-ready from day one.",
                  detail:
                    "Framework mapping, evidence links, version history, approvals, and disclosure exports help teams prepare for CSRD/ESRS, SEC climate reporting, TCFD, and assurance reviews.",
                  more: "Every number needs context: source file, calculation method, factor version, reviewer, approval date, and disclosure mapping. CarbonSynq keeps that chain intact so reporting teams are not rebuilding evidence trails during audit season.",
                  proof: [
                    "Evidence trail",
                    "Framework mapping",
                    "Reviewer sign-off",
                  ],
                  outcome: "Lower compliance risk",
                },
              ].map((impact, i) => (
                <div
                  key={impact.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-4 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        {impact.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-400 mb-1">
                          0{i + 1}
                        </p>
                        <h4 className="text-lg font-extrabold text-slate-900">
                          {impact.title}
                        </h4>
                        <p className="text-xs font-semibold text-emerald-600 mt-1">
                          {impact.signal}
                        </p>
                      </div>
                    </div>

                    <p className="md:col-span-5 text-sm text-slate-600 leading-relaxed">
                      {impact.detail}
                    </p>

                    <div className="md:col-span-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {impact.proof.map((point) => (
                          <span
                            key={point}
                            className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600"
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-900">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        {impact.outcome}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setExpandedImpact(expandedImpact === i ? null : i)
                    }
                    className="mt-4 ml-auto flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    aria-expanded={expandedImpact === i}
                  >
                    {expandedImpact === i ? "Show less" : "More info"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedImpact === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedImpact === i && (
                    <div className="overflow-hidden">
                      <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {impact.more}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7.6 INDUSTRIAL APPLICATIONS */}
      <section className="py-24 px-6 bg-white relative overflow-hidden border-y border-slate-200">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-14">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
                Industrial Applications
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Carbon{" "}
                <span className="text-emerald-600">intelligence tuned</span> for
                how each sector actually{" "}
                <span className="text-emerald-600">operates</span>
              </h3>
            </div>
            <p className="lg:col-span-5 text-slate-600 leading-relaxed">
              CarbonSynq adapts the same measurement, supplier, compliance, and
              reduction engine to different operational realities: factories,
              logistics networks, retail estates, and digital infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                name: "Manufacturing",
                icon: <Building2 className="w-6 h-6" />,
                signal: "Plant-level emissions control",
                metric: "Energy, process heat, materials",
                applications: [
                  "Machine and line-level energy mapping",
                  "Material input emission-factor matching",
                  "Abatement plans for boilers, HVAC, and waste",
                ],
                flows: ["ERP", "MES", "Utility meters"],
              },
              {
                name: "Supply Chain",
                icon: <Truck className="w-6 h-6" />,
                signal: "Scope 3 network visibility",
                metric: "Freight, suppliers, warehousing",
                applications: [
                  "Supplier evidence campaigns",
                  "Lane-level freight emission models",
                  "Tier-risk scoring and procurement dashboards",
                ],
                flows: ["TMS", "Supplier portal", "Invoices"],
              },
              {
                name: "Retail",
                icon: <ShoppingBag className="w-6 h-6" />,
                signal: "Store and product footprinting",
                metric: "Stores, SKUs, packaging",
                applications: [
                  "Store energy benchmarking",
                  "Product category footprint analysis",
                  "Packaging and reverse-logistics reduction tracking",
                ],
                flows: ["POS", "Facilities", "Procurement"],
              },
              {
                name: "Technology",
                icon: <Laptop className="w-6 h-6" />,
                signal: "Digital carbon operations",
                metric: "Cloud, devices, offices",
                applications: [
                  "Cloud workload carbon allocation",
                  "Device lifecycle and procurement accounting",
                  "Data-center power and renewable matching",
                ],
                flows: ["Cloud APIs", "Asset tools", "HRIS"],
              },
            ].map((industry, i) => (
              <div
                key={industry.name}
                className="group relative min-h-[430px] rounded-2xl border border-slate-200 bg-white p-6 overflow-hidden cursor-default shadow-sm hover:shadow-lg hover:border-emerald-200 transition-shadow duration-300"
              >
                <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-emerald-50 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors duration-300">
                      {industry.icon}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-600 transition-colors">
                      SECTOR 0{i + 1}
                    </span>
                  </div>

                  <h4 className="text-2xl font-extrabold text-slate-900 mb-2">
                    {industry.name}
                  </h4>
                  <p className="text-sm font-semibold text-emerald-600 mb-1">
                    {industry.signal}
                  </p>
                  <p className="text-xs text-slate-500 mb-6">
                    {industry.metric}
                  </p>

                  <div className="space-y-3 mb-6">
                    {industry.applications.map((item) => (
                      <div
                        key={item}
                        className="flex gap-2.5 items-start text-sm text-slate-600 group-hover:text-slate-800 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-5 border-t border-slate-200">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">
                      Connected data streams
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {industry.flows.map((flow) => (
                        <span
                          key={flow}
                          className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600 group-hover:border-emerald-300/60 group-hover:text-emerald-700 transition-colors"
                        >
                          {flow}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">
                One platform, sector-specific workflows
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Shared carbon data model with different operational lenses for
                each team.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Measure", "Verify", "Report", "Reduce"].map((step) => (
                <span
                  key={step}
                  className="px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-bold text-emerald-700"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10b. AS EASY AS 1-2-3 STEPS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 mb-4 uppercase tracking-widest">
              <CheckCircle className="w-3.5 h-3.5" /> Getting Started
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              As easy as <span className="text-emerald-600">1-2-3</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Getting started with CarbonSynq takes minutes, not months.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 z-0" />

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  step: "1",
                  title: "Identify & Connect",
                  desc: "Identify the ESG metrics that apply to your business. Connect your data sources via API or bulk upload to get your baseline emissions profile.",
                },
                {
                  step: "2",
                  title: "Analyze & Plan",
                  desc: "Generate enterprise-grade emissions reports smarter and faster. Set science-based targets and simulate decarbonization strategies tailored to your sector.",
                },
                {
                  step: "3",
                  title: "Track & Decarbonize",
                  desc: "Track and manage all your environmental, social and governance data in one platform. Execute reduction actions and verify offsets in real time.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Number */}
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#10B981] shadow-lg shadow-[#34D399] flex items-center justify-center mb-6 group-hover:bg-[#059669] group-hover:border-[#059669] transition-all duration-300">
                    <span className="text-2xl font-extrabold text-[#10B981] group-hover:text-slate-900 transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14"></div>
        </div>
      </section>

      {/* 10c. FAQ SECTION */}
      <section className="py-28 px-6 bg-white relative overflow-hidden border-y border-slate-100/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        {/* Subtle premium glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-12 pr-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-[10px] font-bold text-emerald-600 mb-6 uppercase tracking-[0.2em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Frequently Asked Questions
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6">
                Clear <span className="text-emerald-600">answers</span> for your
                journey.
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed">
                Everything you need to know about preparing for your first
                carbon audit, managing suppliers, and tracking targets. Hover
                over a question to reveal the answer.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  question:
                    "Can we move from messy ESG files to one reliable carbon baseline?",
                  answer:
                    "Yes. CarbonSynq pulls activity data from files, APIs, invoices, meters, and supplier inputs, then turns it into a governed baseline with validation queues and source evidence.",
                  icon: <Sparkles className="w-5 h-5" />,
                },
                {
                  question:
                    "Will every emissions number be traceable during assurance?",
                  answer:
                    "Each figure can be linked to source files, factor versions, calculation logic, reviewers, and approval history, so audit teams can follow the trail without rebuilding spreadsheets.",
                  icon: <ShieldCheck className="w-5 h-5" />,
                },
                {
                  question:
                    "How does the platform handle both headquarters and site-level teams?",
                  answer:
                    "Central teams get governance, framework mapping, and portfolio views. Site teams get focused tasks for utility data, facility activity, supplier requests, and local evidence uploads.",
                  icon: <Building2 className="w-5 h-5" />,
                },
                {
                  question:
                    "Can consultants, auditors, and suppliers work in the same flow?",
                  answer:
                    "Partners can support onboarding, methodology review, supplier data campaigns, assurance preparation, and reduction planning without breaking the customer evidence trail.",
                  icon: <Users className="w-5 h-5" />,
                },
                {
                  question:
                    "Where do people-focused roles fit inside CarbonSynq?",
                  answer:
                    "The platform supports sustainability leads, finance teams, procurement owners, consultants, and implementation teams. It is designed around accountable collaboration, not just dashboards.",
                  icon: <Laptop className="w-5 h-5" />,
                },
                {
                  question:
                    "Can CarbonSynq handle Scope 3 supplier data without slowing procurement?",
                  answer:
                    "Supplier requests can be structured by category, region, spend, and risk level. Procurement teams can track response quality, missing evidence, and fallback estimates without running everything through email.",
                  icon: <Truck className="w-5 h-5" />,
                },
                {
                  question:
                    "How quickly can a company create its first emissions baseline?",
                  answer:
                    "Teams can start with bulk uploads and core integrations, then improve accuracy over time. The first baseline focuses on coverage, data quality, and clear gaps rather than waiting for perfect data.",
                  icon: <Calendar className="w-5 h-5" />,
                },
                {
                  question:
                    "Does the platform only report emissions or also help reduce them?",
                  answer:
                    "CarbonSynq connects reporting to action. Hotspot analysis, reduction scenarios, initiative owners, and target tracking help teams decide which operational changes should happen next.",
                  icon: <TrendingDown className="w-5 h-5" />,
                },
                {
                  question:
                    "Can finance teams trust the numbers behind sustainability reports?",
                  answer:
                    "Finance teams can review source evidence, calculation logic, approval status, and period-over-period changes. That makes carbon data easier to reconcile with invoices, spend, assets, and business units.",
                  icon: <FileCheck className="w-5 h-5" />,
                },
                {
                  question:
                    "What happens when regulations or emission factors change?",
                  answer:
                    "CarbonSynq keeps methodologies and factor versions traceable, so teams can update calculations without losing the historical record behind previously reported numbers.",
                  icon: <RefreshCcw className="w-5 h-5" />,
                },
                {
                  question:
                    "Can teams compare different decarbonization scenarios before committing budget?",
                  answer:
                    "Yes. Teams can model energy shifts, logistics changes, supplier substitutions, renewable procurement, and offset strategies to compare carbon impact, cost tradeoffs, and implementation priority.",
                  icon: <Layers className="w-5 h-5" />,
                },
              ].map((faq, i) => (
                <div
                  key={faq.question}
                  tabIndex={0}
                  className={`group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-xl hover:border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 overflow-hidden min-h-[210px] transition-all duration-300 ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 group-focus:bg-emerald-600 group-focus:text-white transition-colors">
                        {faq.icon}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        FAQ 0{i + 1}
                      </span>
                    </div>

                    <h4 className="mt-5 text-base font-bold text-slate-700 leading-snug pr-2">
                      {faq.question}
                    </h4>

                    <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      Answer slides up
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 group-focus:rotate-180" />
                    </div>

                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] transition-all duration-300">
                      <div className="overflow-hidden">
                        <div className="mt-4 pt-4 border-t border-emerald-200 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 transition-all duration-300">
                          <p className="text-base text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-lg w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <img
                src="/carbonsync.webp"
                alt="CarbonSynq Logo"
                className="w-16 h-16 object-contain mb-4"
              />
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                Start Your Journey
              </h3>
              <p className="text-slate-500 text-sm">
                Join enterprise leaders driving measurable climate impact with
                CarbonSynq.
              </p>
            </div>

            <form
              action="https://formspree.io/f/xojyggok"
              method="POST"
              onSubmit={handleFormSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors bg-slate-50 focus:bg-white text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-slate-700 mb-1"
                >
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors bg-slate-50 focus:bg-white text-sm"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-bold text-slate-700 mb-1"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors bg-slate-50 focus:bg-white text-sm"
                  placeholder="Acme Corp"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full mt-6 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting" ? (
                  "Submitting..."
                ) : formStatus === "success" ? (
                  "Message Sent!"
                ) : (
                  <>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              {formStatus === "error" && (
                <p className="text-red-500 text-xs text-center mt-2">
                  Oops! There was a problem submitting your form.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {isCalendlyOpen && (
        <CalendlyWidget onClose={() => setIsCalendlyOpen(false)} />
      )}
    </div>
  );
}

// FEATURES ARRAY
const features = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "Single Source of Truth",
    description:
      "Centralize all ESG metrics across departments into one secure, audit-ready database.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Multi-Framework Support",
    description:
      "Generate reports aligned with GRI, CSRD, BRSR, and custom framework requirements effortlessly.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Supplier Assessment",
    description:
      "Engage and assess your supply chain emissions with automated vendor surveys and data collection.",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Materiality Matrix",
    description:
      "Define and visualize key environmental and social issues that matter most to your stakeholders.",
  },
];

// ROADMAP STEPS
const roadmapSteps = [
  {
    title: "Phase 1: Continuous Data Mapping",
    details:
      "Establish live API integrations with electric utilities, cloud servers, shipping pipelines, and corporate ledgers to establish an audited carbon emission baseline.",
  },
  {
    title: "Phase 2: Algorithmic Calibration",
    details:
      "Deploy machine learning modules to review supply chain invoice paths, discovering low-efficiency transport segments and supplier carbon variances.",
  },
  {
    title: "Phase 3: Targeted Decarbonization Actions",
    details:
      "Execute automated recommendations such as shifting Munich facilities to green energy PPAs and moving freight logistics to rail links.",
  },
  {
    title: "Phase 4: Verified Offsets & Compliance",
    details:
      "Coordinate verified carbon credits from top registers to offset remaining balances. Package reports in audit-ready formats for SEC & EU regulatory verification.",
  },
];

// MOCK SUPPLIERS
const suppliers = [
  { name: "Atlas Logistics SA", emissions: "2,420", rating: "B-", id: "sup1" },
  {
    name: "Apex Fabricators Corp",
    emissions: "1,190",
    rating: "A+",
    id: "sup2",
  },
  { name: "Hansa Smelting GmbH", emissions: "3,820", rating: "D", id: "sup3" },
  { name: "Zenith Cloud Hosting", emissions: "458", rating: "A+", id: "sup4" },
];

// INDUSTRIES DETAILS
const industryCards = [
  {
    id: "manufacturing",
    icon: <Building2 className="w-5 h-5" />,
    name: "Manufacturing",
    details:
      "Ingest fuel registers, chemical processes, and raw material inputs. Mapped to GHG Protocols for high-precision reporting.",
    carbonFootprint: "24,800t avg",
    targetSavings: "-32% Scope 1",
    auditTime: "4 business days",
  },
  {
    id: "supply-chain",
    icon: <Truck className="w-5 h-5" />,
    name: "Supply Chain",
    details:
      "Automatic odometer, freight invoice, and aviation fuel parsing. Optimizes route efficiencies and measures fleet updates.",
    carbonFootprint: "42,100t avg",
    targetSavings: "-24% Scope 3",
    auditTime: "5 business days",
  },
  {
    id: "construction",
    icon: <Hammer className="w-5 h-5" />,
    name: "Construction",
    details:
      "Track material transport, site energy loads, and concrete-related emissions. Custom Scope 3 metrics for project builders.",
    carbonFootprint: "88,200t avg",
    targetSavings: "-18% project-wide",
    auditTime: "7 business days",
  },
  {
    id: "energy",
    icon: <Zap className="w-5 h-5" />,
    name: "Energy",
    details:
      "Manage grid transmission losses, combustion parameters, and storage leakages. Complies with international energy rules.",
    carbonFootprint: "115,000t avg",
    targetSavings: "-40% Scope 1",
    auditTime: "3 business days",
  },
  {
    id: "retail",
    icon: <ShoppingBag className="w-5 h-5" />,
    name: "Retail",
    details:
      "Ingest merchant SKU logs, package lifecycle paths, and global cargo shipping data. Standardizes Scope 3 supplier ratings.",
    carbonFootprint: "12,400t avg",
    targetSavings: "-15% value-chain",
    auditTime: "6 business days",
  },
  {
    id: "tech",
    icon: <Laptop className="w-5 h-5" />,
    name: "Technology",
    details:
      "Auto-parse cloud computing workloads, corporate office usage, and hardware lifecycle pipelines. Ready for CarbonSynq Zero carbon pledges.",
    carbonFootprint: "1,240t avg",
    targetSavings: "-90% cloud energy",
    auditTime: "2 business days",
  },
];

// COMPARISONS
const traditionalDrawbacks = [
  {
    title: "Manual Invoice Auditing",
    desc: "Billing entries are hand-matched against carbon conversion tables once per year, causing massive delay and transcription errors.",
  },
  {
    title: "Consulting Overhead & High Fees",
    desc: "Retainers are paid to boutique ESG advisory agencies to generate static, non-interactive PDF reports that are out of date instantly.",
  },
  {
    title: "Scope 3 Supply Chain Blindspots",
    desc: "Supplier emissions are estimated using crude industry averages rather than actual vendor invoice telemetry.",
  },
  {
    title: "High Risk of Compliance Failure",
    desc: "Underprepared for upcoming strict SEC rules and EU CSRD directives, leading to potential audit rejections.",
  },
];

const carbonsynqearthBenefits = [
  {
    title: "Continuous Telemetry",
    desc: "Automated APIs collect data in real-time directly from electric meters, cloud servers, and transport databases.",
  },
  {
    title: "AI-Led Recommendations",
    desc: "Our machine engine simulates optimal adjustments (e.g. shift to rail freight, purchase local PPAs) and calculates ROI.",
  },
  {
    title: "Deep Supplier Mapping",
    desc: "Request direct invoice tracking via automated vendor portals, delivering true Scope 3 reporting accuracy.",
  },
  {
    title: "Audit-Ready Export Formats",
    desc: "One-click generation of fully compliant SEC & EU CSRD reporting packets with complete trace logs.",
  },
];
