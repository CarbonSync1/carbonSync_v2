'use client';
import React, { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Clock,
  Send,
  Search,
  Filter,
  CheckCircle2,
  GraduationCap,
  Globe2,
  Leaf,
  Zap,
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  
} from "lucide-react";
const heroVisual = "/career-assets/careers_hero_visual.png";
const mandateVisual = "/career-assets/climate_accounting_mandate.webp";
const campusBuilding = "/career-assets/team_culture.webp";

const JOBS = [
  { title: "Senior Backend Engineer", dept: "Engineering", loc: "Remote", badge: "Remote", type: "Full-time", cat: "engineering", desc: "Architect and scale high-throughput pipeline infrastructure parsing real-time emissions data across 38 jurisdictions." },
  { title: "Climate Data Scientist", dept: "Climate Science", loc: "Amsterdam or Remote", badge: "Hybrid", type: "Full-time", cat: "science", desc: "Refine mathematical models using peer-reviewed methodology and remote sensing inputs for Scope 3 estimation." },
  { title: "ML Engineer — Emissions Modelling", dept: "Engineering", loc: "Remote", badge: "Remote", type: "Full-time", cat: "engineering", desc: "Deploy advanced ML methodologies to predict, map, and attribute supply chain carbon intensities." },
  { title: "Product Manager — Reporting Suite", dept: "Product", loc: "Remote", badge: "Remote", type: "Full-time", cat: "product", desc: "Lead CSRD, GHG Protocol, and SEC disclosure platform workflows from conception to launch." },
  { title: "Carbon Policy Advisor", dept: "Policy", loc: "Brussels or Remote", badge: "Hybrid", type: "Contract", cat: "policy", desc: "Synthesize global regulatory mandates into actionable carbon intelligence product features." },
  { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Remote", badge: "Remote", type: "Full-time", cat: "engineering", desc: "Craft highly immersive, performant React dashboards and interactive data visualizations for enterprise clients." },
  { title: "Enterprise Account Executive", dept: "Go-to-Market", loc: "North America", badge: "Remote", type: "Full-time", cat: "gtm", desc: "Drive strategic engagement with Fortune 500 sustainability executives to accelerate carbon management." },
  { title: "Life Cycle Assessment Specialist", dept: "Climate Science", loc: "Singapore or Remote", badge: "Hybrid", type: "Full-time", cat: "science", desc: "Perform high-fidelity LCAs and integrate real-world datasets into the platform database model." },
  { title: "Head of Regulatory Affairs", dept: "Policy", loc: "Brussels", badge: "On-site", type: "Full-time", cat: "policy", desc: "Lead CarbonSynq's engagement with international standards-setting bodies and policy groups." },
  { title: "UX Researcher", dept: "Product", loc: "Remote", badge: "Remote", type: "Full-time", cat: "product", desc: "Direct qualitative and quantitative user research mapping corporate sustainability workflows." },
];

const VALUES = [
  { icon: Leaf, title: "Science Above All", text: "Every product decision is grounded in peer-reviewed scientific methodology. We do not compromise integrity for commercial ease." },
  { icon: Zap, title: "Radical Transparency", text: "Open source datasets, public models, and published salary bands. We invite critique to elevate standards across the industry." },
  { icon: ShieldCheck, title: "Generational Vision", text: "Climate change is a multi-decade challenge. We optimize our plans for generational impact, rewarding mastery and patience." },
  { icon: Award, title: "Equitably Structured", text: "Solutions must champion vulnerable populations. We consciously design with global climate equity at the center." },
  { icon: Globe2, title: "Urgency Without Chaos", text: "We move with intense purpose but complete poise, preserving sustainable work cultures that allow builders to flourish." },
  { icon: CheckCircle2, title: "Owner Mindsets", text: "We hire leaders, not managers. Every team member has absolute autonomy, responsibility, and substantial equity." },
];

const BENEFITS = [
  { num: "01", name: "Radford Top 10%", val: "Executive Salary", desc: "Benchmarked annually. Totally transparent salary bands. No negotiation penalties." },
  { num: "02", name: "Comprehensive Equity", val: "0.01% – 0.5%", desc: "Meaningful options with early exercise flexibility and a standard vesting model." },
  { num: "03", name: "True Paid Leave", val: "30 Days Annually", desc: "Plus public holidays. We actively encourage a block of two weeks of quiet rest." },
  { num: "04", name: "Universal Parental Leave", val: "20 Weeks Paid", desc: "Available to all new parents immediately, with transition support back to work." },
  { num: "05", name: "Self-Directed Growth", val: "$2,500 Learning", desc: "Protected time quarterly. Spend on courses, conferences, mentors, or resources." },
  { num: "06", name: "Wellbeing Stipend", val: "$100 / Month", desc: "No receipts needed for the first $50. Use for health apps, gym, or equipment." },
  { num: "07", name: "Direct Climate Action", val: "5 Days Leave", desc: "Fully compensated time to volunteer directly with any environmental nonprofit." },
  { num: "08", name: "Platinum Healthcare", val: "100% Covered", desc: "Complete medical, dental, and vision support for you and all dependents." },
];

const VOICES = [
  { quote: "What sets CarbonSynq apart isn't just the scale of our ambition, it's the operational rigor we apply to get there. We are building the foundational infrastructure for global carbon markets, and every decision we make here has a tangible impact.", name: "Ayush Chaudhary", role: "Chief Operation Officer", tenure: "Joined 1 year ago" },
  { quote: "Our vision was never to build just another compliance tool. We set out to engineer an absolute source of truth for carbon accountability. The depth of scientific integrity our team brings to the table every single day is what makes this mission possible.", name: "Pushkar Singh Raghuvanshi", role: "Chief Executive Officer", tenure: "Joined 1 year ago" },
  { quote: "Translating complex, high-density climate data into intuitive, lightning-fast dashboards is an incredible engineering challenge. The autonomy here is real—you aren't just writing UI code; you are architecting the lens through which enterprises view their impact.", name: "Sarwang Agarwal", role: "Full Stack Developer", tenure: "Joined 8 months ago" },
  { quote: "The sheer volume of real-time emissions data we process requires backend architecture that is both relentlessly resilient and highly scalable. It's a rare opportunity to tackle complex distributed systems problems while directly contributing to global climate action.", name: "Priyanshu Barai", role: "Backend Engineer", tenure: "Joined 8 months ago" },
];

const FILTERS = ["All", "Engineering", "Climate Science", "Product", "Policy", "Go-to-Market"];
const CAT_MAP: Record<string, string> = { All: "all", Engineering: "engineering", "Climate Science": "science", Product: "product", Policy: "policy", "Go-to-Market": "gtm" };

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-emerald-200/60 bg-gradient-to-b from-emerald-50 to-emerald-100/50 px-3.5 py-1.5 text-[10px] font-bold text-emerald-700 tracking-widest uppercase">
      {children}
    </span>
  );
}

export default function CarbonSynqCareerPage() {
  const [filter, setFilter] = useState("All");
  const [show404, setShow404] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false); // new modal for form
  const [search, setSearch] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");

  const filteredJobs = JOBS.filter(j => {
    const text = `${j.title} ${j.dept} ${j.loc}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchFilter = filter === "All" || j.cat === CAT_MAP[filter];
    return matchSearch && matchFilter;
  });

  if (show404) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden selection:bg-emerald-500/20">
        {/* Background decorations */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div
          className="relative text-center max-w-2xl"
        >
          {/* 404 Number */}
          <div
            className="relative"
          >
            <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter bg-gradient-to-b from-slate-200 to-slate-100 bg-clip-text text-transparent select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent opacity-10 blur-sm select-none">
                404
              </h1>
            </div>
          </div>

          {/* Error badge */}
          <div
            className="-mt-10 mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[11px] font-bold text-red-600 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Page Not Found
            </span>
          </div>

          {/* Message */}
          <div
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              This page doesn't exist
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed font-light max-w-md mx-auto">
              The application portal you're looking for has either been moved, is under construction, or the URL is incorrect.
            </p>
          </div>

          {/* Back button */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setShow404(false)}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-600 hover:to-teal-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]"
            >
              <ArrowRight size={16} className="rotate-180" />
              Back to Careers
            </button>
            <span className="text-xs text-slate-400 font-medium">Error Code: 404 — NOT_FOUND</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-600 relative pb-20 selection:bg-emerald-500/20 selection:text-emerald-900">

      {/* Structural Architectural Line Top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* HERO SECTION */}
      <section className="relative px-6 py-20 md:px-12 lg:px-20 lg:py-28 max-w-7xl mx-auto">
        <div className="premium-grid-bg" />
        <div className="absolute left-1/3 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl glow-effect" />

        <div className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-700 tracking-wide uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              Careers at CarbonSynq Earth
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-7xl leading-[1.05]">
              Decisive work<br />
              <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                At global scale
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 font-normal">
              We are defining the standard for global carbon accountability—engineering the verified infrastructure that will support every major climate decision this decade.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#open-roles" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-600 hover:to-teal-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]">
                Explore Open Positions
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
              </a>
              <a href="#mission" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-md">
                Our Mandate
              </a>
            </div>
          </div>

          {/* Premium Glass Dashboard Visual with Inside Content */}
          <div className="relative plus-corner plus-top-left plus-top-right plus-bottom-left plus-bottom-right">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/5 to-transparent blur-xl" />
            <div className="relative rounded-3xl border border-slate-200 bg-slate-900 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-2xl group border border-slate-700/50">
                {/* Background Image with Dark/Green Overlay */}
                <img src="/career-assets/hero-office.png" alt="CarbonSynq Realistic Corporate Office" className="w-full h-[280px] md:h-[340px] object-cover opacity-50 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#061214] via-[#061214]/90 to-emerald-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />

                {/* Text and Logo Embedded INSIDE the Image */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center">
                  {/* Embedded Logo Moved Above JOIN */}
                  <img src="/carbonsync.webp" alt="CarbonSynq Logo" className="h-8 md:h-10 w-auto object-contain brightness-0 invert drop-shadow-lg mb-4 self-start" />

                  <p className="text-white font-medium tracking-widest text-sm uppercase mb-1 drop-shadow-md">Join Our</p>
                  
                  <h2 className="text-white text-5xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg leading-[0.9] mb-1">
                    Mission
                  </h2>
                  
                  <h2 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tight drop-shadow-lg leading-none mb-6">
                    CarbonSynq
                  </h2>

                  <p className="text-slate-300 text-[11px] md:text-xs max-w-[220px] font-light leading-relaxed border-l-2 border-emerald-500 pl-3">
                    Building a Sustainable Future. Apply Now.<br/>
                    Your Career in Climate Innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      

      {/* MEDIA RECOGNITION SECTION */}
      <section className="px-6 py-16 md:px-12 lg:px-20 max-w-7xl mx-auto cursor-pointer" onClick={() => window.open('https://youtu.be/ZyGjc9gFT4w', '_blank')}>
        <div
          className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[480px] md:min-h-[560px] flex items-end border border-slate-200"
        >
          {/* Zooming background image */}
          <img src="/career-assets/r_bharat_conclave.jpg" alt="Republic Bharat Conclave" className="absolute inset-0 w-full h-full object-cover object-[center_15%] transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-emerald-900/30" />

          {/* Cinematic overlay - lighter to show image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay" />

          {/* Glowing luxury border highlight */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-slate-200 pointer-events-none group-hover:border-emerald-500/30 transition-colors duration-500" />

          {/* "Featured on Republic Bharat" — desktop only (absolute), hidden on mobile */}
          <div className="hidden md:flex absolute top-8 left-8 items-center gap-2.5 rounded-full bg-red-600/90 hover:bg-red-600 px-5 py-2 text-[10px] font-black text-white uppercase tracking-[0.15em] shadow-xl backdrop-blur-md transition-all duration-300 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Featured on Republic Bharat
          </div>

          {/* Content overlaid at the bottom */}
          <div className="relative z-10 p-8 md:p-14 w-full">
            {/* Mobile badge row — hidden on md+ */}
            <div className="flex md:hidden flex-row items-center gap-2 mb-4 overflow-hidden">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-[9px] font-black text-white uppercase tracking-wider shadow-xl border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping shrink-0" />
                <span className="truncate">Featured on Republic Bharat</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 text-[9px] font-bold text-emerald-300 uppercase tracking-widest">
                <Award className="h-3 w-3 shrink-0" />
                <span className="truncate">Education Conclave Keynote</span>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_auto] items-end">
              <div>
                {/* Conclave badge — hidden on mobile, visible on desktop */}
                <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
                  <Award className="h-3.5 w-3.5" />
                  R. Education Conclave Keynote
                </div>
                <h2 className="mt-4 text-3xl font-extrabold text-white md:text-5xl leading-[1.15] tracking-tight">
                  Pioneering the Carbon Space <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">
                    on National Television.
                  </span>
                </h2>
                <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                  CarbonSynq was recognized at the prestigious <strong className="text-white font-semibold">R. Education Conclave</strong> hosted by Republic Bharat — validation of our mission to drive enterprise-wide net-zero intelligence.
                </p>
              </div>

              {/* Ultra-premium glassmorphic campus video card */}
              <div className="group/btn relative rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl flex items-center gap-4 min-w-[280px] hover:bg-white/15 hover:border-emerald-500/30 transition-all duration-500 shadow-md overflow-hidden">
                {/* Sweep animation effect */}
                <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] -translate-x-[150%] group-hover/btn:animate-[shimmer_1.5s_infinite]" />

                <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-lg">
                  <img src={campusBuilding} alt="Campus" className="w-full h-full object-cover group-hover/btn:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 text-xs shadow-xl transition-all duration-300 group-hover/btn:bg-emerald-400 group-hover/btn:text-white group-hover/btn:scale-105">
                      ▶
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Video Tour</p>
                  <p className="text-xs font-bold text-white mt-0.5 tracking-wide">Our Headquarters</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Explore net-zero building</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION MANDATE */}
      <section id="mission" className="px-6 py-20 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          <div>
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase">The Mandate</span>
              <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl leading-tight">
                We cannot improve what we cannot verifiably measure
              </h2>
              <p className="mt-6 text-slate-500 leading-relaxed font-normal">
                Corporations and regulatory jurisdictions must align with rigorous, high-fidelity metrics. CarbonSynq bridges this delta—providing science-grade, programmatic ledger platforms that make absolute accountability standard practice across all corporate supply chains.
              </p>
              <div className="mt-8 flex justify-around gap-6 pt-6 border-t border-slate-200">
                {[["2026", "Founded"], ["100%", "Scientific Bias"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="text-xl font-bold text-slate-900">{val}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            <img src={mandateVisual} alt="Climate Accounting Mandate" className="w-full h-[320px] md:h-[400px] object-cover" />
            <div className="p-8 md:p-10 bg-white border-t border-slate-200 flex flex-col md:flex-row gap-6 items-center">
              <blockquote className="flex-1 text-lg md:text-xl font-medium italic leading-relaxed text-slate-700 pl-6 border-l-4 border-emerald-600">
                "We believe robust methodologies matter far more than corporate check-boxing."
              </blockquote>
              <p className="flex-1 text-sm text-slate-500 leading-relaxed font-light">
                We build peer-reviewed, open-source models verified by third-party science panels. We do not participate in visual corporate greenwashing.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* DAY IN THE LIFE SECTION */}
      <section className="px-6 py-20 md:px-12 lg:px-20 max-w-7xl mx-auto border-b border-white/5 bg-white">
        <div>
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase">Workspace Culture</span>
            <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl leading-tight">
              Day in the life
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed font-normal text-sm md:text-base">
              We design our environments for uninterrupted, high-bandwidth building. Our research and development offices feature modern height-adjustable desks, dual premium 4K screens, top-tier developer machinery, and custom quiet zones designed to respect your deep-focus hours.
            </p>
          </div>

          {/* Gorgeous 3-Image Gallery Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Left Photo — Focus Lab */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img src="/career-assets/focus_lab.png" alt="Developer focus desk" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Focus Lab</span>
                <p className="text-xs font-bold mt-0.5">Ergonomic Developer Hub</p>
              </div>
            </div>

            {/* Right Photo — Synergy Hub */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img src="/career-assets/synergy_hub.png" alt="High-performance collaboration desk" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Synergy Hub</span>
                <p className="text-xs font-bold mt-0.5">Quiet Workspace Areas</p>
              </div>
            </div>

            {/* Third — Workspace Collaboration */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-md sm:col-span-2 lg:col-span-1 group">
              <img src="/career-assets/workspace_collaboration.png" alt="CarbonSynq Team Collaboration" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Team Culture</span>
                <p className="text-xs font-bold mt-0.5">Asynchronous Engineering</p>
              </div>
            </div>

          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Deep Work Friendly</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Quiet workspaces, asynchronous updates, and minimum required meetings.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Ergonomic Priority</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Fully motorized sit-to-stand desks, premium ergonomic chairs, and 4K displays.</p>
            </div>
          </div>
        </div>
      </section>



      {/* OPEN ROLES & JOB SEARCH */}
      <section id="open-roles" className="px-6 py-20 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-slate-200 pb-8">
          <div>
            <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase">Opportunities</span>
            <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">Join the Mandate</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row items-stretch sm:items-center">
            <div className="group flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm hover:border-emerald-500/30 focus-within:border-emerald-500 transition-all duration-300">
              <Search size={16} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search position name..."
                className="bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-900 w-full sm:w-64 font-medium"
              />
            </div>

            <div className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm hover:border-emerald-500/30 transition-all duration-300">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="bg-transparent text-sm outline-none text-slate-900 font-medium cursor-pointer w-full pr-4"
              >
                {FILTERS.map(f => <option key={f} className="bg-white text-slate-600">{f}</option>)}
              </select>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {filteredJobs.length} Live Openings
        </p>

        <div className="mt-6 grid gap-5">
          {filteredJobs.map(job => (
            <div
              key={job.title}
              className="group relative rounded-3xl border border-slate-200/60 bg-white p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between hover:shadow-[0_12px_48px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Premium corner accent */}
              <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-5">
                  <Badge>{job.type}</Badge>
                  <Badge>{job.dept}</Badge>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors duration-300">{job.title}</h3>
                <p className="mt-2.5 max-w-3xl text-sm md:text-[15px] leading-relaxed text-slate-500 font-light">{job.desc}</p>
                <div className="mt-5 flex flex-wrap gap-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-emerald-500" /> {job.loc}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-emerald-500" /> {job.badge}</span>
                </div>
              </div>

              <button
                onClick={() => setShow404(true)}
                className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.97] whitespace-nowrap self-start lg:self-auto cursor-pointer"
              >
                Apply Now <ArrowRight size={14} />
              </button>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center text-slate-500 text-sm">
              No matching live roles found in this division.
            </div>
          )}
        </div>
      </section>

      {/* INTERNSHIP PROGRAM SECTION */}
      <section className="px-6 py-24 md:px-12 lg:px-20 border-t border-b border-slate-800 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
              <GraduationCap className="h-3.5 w-3.5" />
              Future Climate Leaders
            </div>
            <h2 className="mt-4 text-4xl font-extrabold text-white md:text-5xl tracking-tight">
              Meet Our Current Interns
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed text-sm md:text-base font-light">
              At CarbonSynq, we are proud to empower the next generation of innovators. Our current cohort of exceptional interns is actively working alongside our engineering and climate science teams, tackling real-world challenges and driving our mission of global carbon accountability forward.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Abhijeet */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors shadow-xl flex flex-col">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5">
                <img src="/career-assets/interns/abhijeet.jpg" alt="Abhijeet" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60"></div>
                <a href="https://www.linkedin.com/in/iabhiijeet?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 bg-black/50 hover:bg-emerald-600 backdrop-blur-md p-2 rounded-full text-white transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
              <h3 className="text-white font-bold text-lg tracking-tight">Abhijeet Rao</h3>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mt-1">Backend Engineer</p>
            </div>

            {/* Prateek */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors shadow-xl flex flex-col">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5">
                <img src="/career-assets/interns/prateek.jpg" alt="Prateek" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60"></div>
                <a href="https://www.linkedin.com/in/itsprateek4510?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 bg-black/50 hover:bg-emerald-600 backdrop-blur-md p-2 rounded-full text-white transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
              <h3 className="text-white font-bold text-lg tracking-tight">Prateek Kushwaha</h3>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mt-1">Backend Engineer</p>
            </div>

            {/* Ata Waris */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors shadow-xl flex flex-col">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5">
                <img src="/career-assets/interns/atawaris.jpg" alt="Ata Waris" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60"></div>
                <a href="https://www.linkedin.com/in/atawaris?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 bg-black/50 hover:bg-emerald-600 backdrop-blur-md p-2 rounded-full text-white transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
              <h3 className="text-white font-bold text-lg tracking-tight leading-tight">Ata Waris</h3>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mt-1.5 leading-snug">Creative Head & Frontend Sys Eng.</p>
            </div>

            {/* Divi Tyagi */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors shadow-xl flex flex-col">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5">
                <img src="/career-assets/interns/divi.jpg" alt="Divi Tyagi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-60"></div>
                <a href="https://www.linkedin.com/in/divi-tyagi-86449b205?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 bg-black/50 hover:bg-emerald-600 backdrop-blur-md p-2 rounded-full text-white transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
              <h3 className="text-white font-bold text-lg tracking-tight">Divi Tyagi</h3>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mt-1">Brand Designer Head</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="bg-slate-50/50 px-6 py-24 md:px-12 lg:px-20 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5" />
              Operating Values
            </div>
            <h2 className="mt-4 text-4xl font-extrabold text-slate-900 md:text-5xl tracking-tight">Highly opinionated culture</h2>
            <p className="mt-4 text-slate-500 leading-relaxed text-sm md:text-base font-light">
              We select candidates for high intellectual curiosity and ownership. These principles guide our day-to-day work, engineering roadmap, and commercial choices.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="inline-flex rounded-xl bg-emerald-500/20 p-3 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-slate-900 transition-all duration-300"><v.icon size={20} /></div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 tracking-tight">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 font-light">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-20 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            Internal Voice
          </div>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 md:text-5xl tracking-tight">Built by practitioners</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VOICES.map((v, i) => (
            <div
              key={v.name}
              className="group relative rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-xl flex flex-col justify-between overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div>
                <span className="text-5xl font-serif bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent leading-none">&quot;</span>
                <p className="text-sm leading-relaxed text-slate-300 mt-2 font-light">
                  {v.quote}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="font-bold text-white text-sm">{v.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{v.role}</p>
                <span className="mt-3 inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  {v.tenure}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
