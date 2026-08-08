'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { 
  ArrowLeft, Shield, CheckCircle2, FileText, Globe, 
  Zap, Info, Lock, ChevronRight, Scale, Clock, Mail,
  Eye, ShieldCheck, Database, Server, Share2, AlertTriangle, UserCheck,
  History, UserPlus, HelpCircle, BookOpen, ExternalLink, Accessibility,
  Cpu, Award, MessageSquare, HeartHandshake, Fingerprint, Gavel, Settings,
  HardDrive, Users, Building2, BarChart3, Binary
} from 'lucide-react';

/* ---------------- Premium Section Component ---------------- */
const Section = ({ id, title, children, index }: { id: string, title: string, children: React.ReactNode, index: number }) => (
  <section
    id={id}
    className="mb-16 md:mb-32 relative"
  >
    <div className="flex items-start gap-4 md:gap-6 lg:gap-10 group">
      <div className="hidden md:flex flex-col items-center pt-2">
        <div className="w-12 h-12 rounded-[1.25rem] bg-white border border-gray-100 shadow-sm flex items-center justify-center text-green-600 font-bold group-hover:bg-green-600 group-hover:text-white transition-all duration-500 text-xs shadow-green-100/20">
          {index + 1}
        </div>
        <div className="w-[1px] h-32 lg:h-64 bg-gradient-to-b from-green-100 via-green-50 to-transparent mt-6" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <div className="h-[1px] w-8 bg-green-200 hidden md:block" />
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-4 tracking-tight">
            <span className="md:hidden text-green-600">0{index + 1}.</span>
            {title}
          </h2>
        </div>
        <div className="bg-white/40 backdrop-blur-md p-5 md:p-8 lg:p-12 rounded-[2rem] lg:rounded-[4rem] border border-gray-100 hover:border-green-300 hover:shadow-[0_32px_64px_-12px_rgba(0,100,0,0.08)] transition-all duration-700 relative overflow-hidden group/content">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full opacity-0 group-hover/content:opacity-100 transition-opacity duration-700" />
          {children}
        </div>
      </div>
    </div>
  </section>
);

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('mission');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSupportRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const sections = [
    { id: 'mission', title: 'Privacy Sovereignty' },
    { id: 'ai-governance', title: 'AI Governance' },
    { id: 'collection', title: 'Data Ingestion' },
    { id: 'biometrics', title: 'Biometric Protocol' },
    { id: 'usage', title: 'Processing Logic' },
    { id: 'supply-chain', title: 'Supply Chain Sync' },
    { id: 'cookies', title: 'Tracking Matrix' },
    { id: 'security', title: 'Zero-Trust Defenses' },
    { id: 'rights', title: 'Subject Rights' },
    { id: 'history', title: 'Version Nexus' },
    { id: 'legal', title: 'Arbitration' },
    { id: 'contact', title: 'DPO Access' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1a1a1a] scroll-smooth selection:bg-green-100">
      {/* High-End Animated Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-green-300/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-300/10 blur-[180px] rounded-full animate-pulse [animation-delay:4s]" />
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-emerald-200/5 blur-[140px] rounded-full" />
      </div>

      {/* Hero Section */}
      <header className="pt-24 md:pt-32 lg:pt-64 pb-16 md:pb-32 px-6 md:px-10 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-12 shadow-sm">
          <Shield size={14} className="text-green-500" />
          <span>Privacy Sovereignty v5.1.2</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-black tracking-tighter text-gray-900 mb-8 md:mb-12 leading-[0.9]">
          Privacy <span className="text-green-600">Policy.</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto font-bold leading-relaxed">
          Ensuring corporate data integrity and individual anonymity through state-of-the-art encryption and ethical AI governance.
        </p>
      </header>

      {/* Main Grid */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 pb-32 md:pb-64">
        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-20">
          
          {/* Ultimate Sidebar */}
          <aside className="hidden lg:block col-span-3 sticky top-32 h-fit">
            <div className="space-y-10">
              <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-green-900/5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-10 px-2 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Matrix Map
                </h4>
                <div className="space-y-3">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`flex items-center justify-between group py-4 px-6 rounded-2xl text-[13px] font-black tracking-tight transition-all duration-500 ${
                        activeSection === s.id 
                        ? 'bg-green-600 text-white shadow-2xl scale-[1.05] shadow-green-200' 
                        : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {s.title}
                      <ChevronRight size={14} className={`transition-transform duration-500 ${activeSection === s.id ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-10 rounded-[3rem] bg-gray-900 text-white shadow-2xl group/help">
                <h5 className="font-black text-xs uppercase tracking-widest mb-4 text-green-400">Encryption Alert</h5>
                <p className="text-xs text-gray-400 font-medium mb-8 leading-relaxed">Your connection to this policy is secured with 256-bit TLS protocol. No data is logged during this session.</p>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white" />
                </div>
              </div>
            </div>
          </aside>

          {/* Content Engine */}
          <div className="col-span-12 lg:col-span-9">
            
            <Section id="mission" title="Our Privacy Sovereignty" index={0}>
              <p className="text-lg text-gray-800 leading-relaxed font-black mb-8">
                Privacy is not a feature; it is our foundation. CarbonSynq operates on a "Zero-Trust" data model where we act as a secure vault for your ESG metrics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-12">
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] bg-gray-50 border border-gray-100 hover:border-green-200 transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-2xl bg-white flex items-center justify-center text-green-600 mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform"><ShieldCheck /></div>
                  <h4 className="text-base md:text-lg font-black mb-3">Data Sovereignty</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">You retain 100% ownership. We provide the infrastructure to process it without ever claiming rights to your raw intelligence.</p>
                </div>
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-2xl bg-white flex items-center justify-center text-blue-600 mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform"><Binary /></div>
                  <h4 className="text-base md:text-lg font-black mb-3">Mathematical Privacy</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">Using differential privacy algorithms, we ensure that industry benchmarks cannot be traced back to any specific user.</p>
                </div>
              </div>
            </Section>

            <Section id="ai-governance" title="AI Governance Framework" index={1}>
              <p className="text-gray-800 leading-relaxed font-black mb-10 text-lg">
                Our AI engine, CarbonPulse™, follows a strict "Isolationist" protocol:
              </p>
              <div className="space-y-6">
                {[
                  { t: 'Isolated Compute', d: 'Each calculation runs in a temporary container that is destroyed upon task completion.' },
                  { t: 'Human-Verified Logic', d: 'Every automated decarbonization strategy is reviewed by ESG specialists before publication.' },
                  { t: 'No-Recall Training', d: 'Our base models are never fine-tuned on user-specific data strings or supply chain identifies.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 p-5 md:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-xl transition-all">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0"><Cpu size={20} /></div>
                    <div>
                      <h5 className="font-black text-sm mb-2">{item.t}</h5>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="collection" title="Data Ingestion Vectors" index={2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                <div className="space-y-6">
                  <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">Primary Inputs</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-green-500" /> Direct Manual Entries</li>
                    <li className="flex items-center gap-4 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-green-500" /> IoT Telemetry Streams</li>
                    <li className="flex items-center gap-4 text-sm font-bold"><div className="w-2 h-2 rounded-full bg-green-500" /> Utility API Integration</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] border border-gray-100">
                  <h5 className="font-black text-xs mb-4 flex items-center gap-2"><HardDrive size={16} /> Data Siloing</h5>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">Unlike other SaaS platforms, we do not use a shared database for customer environmental records. Each enterprise has a dedicated encrypted partition.</p>
                </div>
              </div>
            </Section>

            <Section id="biometrics" title="Biometric Security Protocol" index={3}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
                <div className="w-full md:w-64 h-48 md:h-64 bg-gray-900 rounded-[1.5rem] lg:rounded-[3rem] flex flex-col items-center justify-center text-green-400 p-6 md:p-8 text-center border border-white/10 shadow-2xl">
                  <Fingerprint size={40} className="md:hidden mb-4 animate-pulse" />
                  <Fingerprint size={64} className="hidden md:block mb-6 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Biometric Vault</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed font-black mb-6">
                    When using biometric login (FaceID, Fingerprint), we never store your actual biometric data. Instead, we store a mathematical hash generated by your device's Secure Enclave.
                  </p>
                  <div className="p-6 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-start gap-4">
                    <AlertTriangle size={20} className="text-yellow-600 mt-1" />
                    <p className="text-xs font-bold text-yellow-800 leading-relaxed">We cannot recreate your biometrics from the hash stored in our database. Your identity remains entirely on your local hardware.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="usage" title="Core Processing Logic" index={4}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] bg-white border border-gray-100 shadow-sm relative group overflow-hidden">
                  <div className="mb-4 md:mb-6"><BarChart3 className="text-green-600 w-6 h-6 md:w-8 md:h-8" /></div>
                  <h4 className="font-black text-base md:text-lg mb-4">ESG Analytics</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">Conversion of raw energy data into CO2e equivalents using global warming potential (GWP) factors from the IPCC Fifth Assessment Report.</p>
                </div>
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] bg-white border border-gray-100 shadow-sm relative group overflow-hidden">
                  <div className="mb-4 md:mb-6"><Building2 className="text-blue-600 w-6 h-6 md:w-8 md:h-8" /></div>
                  <h4 className="font-black text-base md:text-lg mb-4">Internal Benchmarking</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">Comparing your different departments or locations to identify high-emission clusters and proposing efficiency upgrades.</p>
                </div>
              </div>
            </Section>

            <Section id="supply-chain" title="Supply Chain Sync & Transparency" index={5}>
              <p className="text-gray-800 leading-relaxed font-black mb-10 text-lg">Managing Scope 3 emissions without compromising supplier privacy:</p>
              <div className="bg-gray-50 p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] border border-gray-100 space-y-6 md:space-y-8">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white flex items-center justify-center text-gray-900 shadow-sm shrink-0"><Users size={20} /></div>
                  <div>
                    <h5 className="font-black text-sm mb-2">Vendor Anonymization</h5>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">When a vendor shares data with you, we strip all metadata that could identify their specific facilities or manufacturing secrets, providing only the carbon intensity scores.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white flex items-center justify-center text-gray-900 shadow-sm shrink-0"><Share2 size={20} /></div>
                  <div>
                    <h5 className="font-black text-sm mb-2">One-Way Data Handshakes</h5>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Vendors must explicitly approve each data request. There is no automated "pulling" of supplier data without verified digital consent.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="cookies" title="Digital Tracking Matrix" index={6}>
              <div className="overflow-x-auto rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-sm bg-white">
                <table className="w-full text-left min-w-[500px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Class</th>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Identifier</th>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Purpose</th>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Lifecycle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { c: 'Essential', id: 'CS_SEC_SID', p: 'Anti-DDoS Token', l: 'Persistent' },
                      { c: 'Functional', id: 'CS_LOC_LOCALE', p: 'Currency & Language', l: '1 Year' },
                      { c: 'Analytics', id: '_ga_SYNC', p: 'Engagement Metrics', l: '2 Years' },
                      { c: 'Marketing', id: 'N/A', p: 'WE DO NOT TRACK', l: 'ZERO' }
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 md:p-6 lg:p-8"><span className={`px-3 md:px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${row.c === 'Essential' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{row.c}</span></td>
                        <td className="p-4 md:p-6 lg:p-8 font-black text-xs text-gray-900">{row.id}</td>
                        <td className="p-4 md:p-6 lg:p-8 text-xs text-gray-500 font-medium">{row.p}</td>
                        <td className="p-4 md:p-6 lg:p-8 text-xs text-gray-500 font-bold">{row.l}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="security" title="Zero-Trust Defense Protocols" index={7}>
              <div className="bg-gray-900 rounded-[2rem] lg:rounded-[4rem] p-6 md:p-10 lg:p-16 text-white shadow-[0_48px_96px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-green-600 flex items-center justify-center shadow-2xl shadow-green-600/40"><Lock size={24} className="md:hidden" /><Lock size={32} className="hidden md:block" /></div>
                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">Active Hardening.</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                    <div>
                      <h5 className="text-green-400 font-black text-sm uppercase tracking-widest mb-6">Quantum-Ready Encryption</h5>
                      <p className="text-gray-400 text-sm font-medium leading-relaxed">We use Kyber-based post-quantum cryptography for our most sensitive key exchanges, ensuring your data remains secure even against future computational threats.</p>
                    </div>
                    <div>
                      <h5 className="text-green-400 font-black text-sm uppercase tracking-widest mb-6">Real-Time Threat Detection</h5>
                      <p className="text-gray-400 text-sm font-medium leading-relaxed">AI-driven anomaly detection monitors all API calls. Any credential reuse or suspicious IP rotation triggers an immediate MFA challenge.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="rights" title="Global Data Subject Rights" index={8}>
              <p className="text-gray-600 leading-relaxed font-bold mb-6 md:mb-10 text-base md:text-lg">Exercising your digital sovereignty across jurisdictions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] border border-gray-100 bg-white hover:border-green-200 transition-colors relative group">
                  <div className="absolute top-4 md:top-6 right-4 md:right-8 text-[10px] font-black uppercase text-gray-300">European Union</div>
                  <h5 className="font-black text-base mb-4 md:mb-6 text-gray-900">GDPR Rights</h5>
                  <ul className="space-y-3 md:space-y-4">
                    {['Right to Portability (JSON/CSV)', 'Right to Erasure (RTBF)', 'Right to Restricted Processing'].map((r, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-500"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> {r}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] border border-gray-100 bg-white hover:border-blue-200 transition-colors relative group">
                  <div className="absolute top-4 md:top-6 right-4 md:right-8 text-[10px] font-black uppercase text-gray-300">United States</div>
                  <h5 className="font-black text-base mb-4 md:mb-6 text-gray-900">CCPA / CPRA / VCDPA</h5>
                  <ul className="space-y-3 md:space-y-4">
                    {['Right to Opt-out of Sales', 'Right to Correction', 'Right to Limit Sensitive Use'].map((r, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="history" title="Version Nexus & History" index={9}>
              <div className="bg-white border border-gray-100 rounded-[1.5rem] lg:rounded-[3rem] overflow-hidden">
                <div className="p-5 md:p-6 lg:p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                  <h5 className="font-black text-sm uppercase tracking-widest text-gray-400">Recent Updates</h5>
                  <span className="text-[10px] font-black px-3 py-1 bg-green-100 text-green-700 rounded-full">ACTIVE: v5.1.2</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { v: 'v5.1.2', d: 'May 3, 2026', c: 'Enhanced Biometric Security Framework and Supply Chain Sync integration.' },
                    { v: 'v5.0.0', d: 'March 1, 2026', c: 'Complete platform overhaul for AI Ethics and DPDP compliance.' },
                    { v: 'v4.8.0', d: 'Dec 15, 2025', c: 'Added standard contractual clauses for international data nodes.' }
                  ].map((v, i) => (
                    <div key={i} className="p-5 md:p-6 lg:p-10 flex flex-col md:flex-row gap-3 md:gap-6 md:items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                        <span className="text-base md:text-lg font-black text-gray-900">{v.v}</span>
                        <div className="w-[1px] h-4 bg-gray-200 hidden md:block" />
                        <span className="text-xs text-gray-400 font-bold">{v.d}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium max-w-md">{v.c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="legal" title="Legal Arbitration & Governance" index={10}>
              <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3.5rem] bg-gray-50 border border-gray-100 relative group">
                <Gavel className="text-gray-200 absolute bottom-4 md:bottom-10 right-4 md:right-10 group-hover:rotate-12 transition-transform duration-700 w-16 h-16 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px]" size={120} />
                <div className="relative z-10 max-w-xl">
                  <h5 className="font-black text-base md:text-lg mb-4 md:mb-6 text-gray-900">Binding Arbitration Agreement</h5>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
                    Any disputes related to this policy that cannot be settled through direct consultation shall be referred to binding arbitration under the rules of the International Chamber of Commerce (ICC).
                  </p>
                  <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <div>
                      <p className="mb-2">Jurisdiction</p>
                      <p className="text-gray-900">Noida, Uttar Pradesh</p>
                    </div>
                    <div>
                      <p className="mb-2">Language</p>
                      <p className="text-gray-900">English / Hindi</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="contact" title="Direct DPO Access" index={11}>
              <div className="bg-gray-900 rounded-[2rem] lg:rounded-[4rem] p-6 md:p-10 lg:p-16 text-white shadow-[0_48px_96px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden group/final">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
                  <div>
                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-[1.5rem] lg:rounded-[2rem] bg-green-600 text-white flex items-center justify-center mb-6 md:mb-10 shadow-2xl group-hover/final:scale-110 transition-transform shadow-green-600/20"><Mail size={28} className="md:hidden" /><Mail size={40} className="hidden md:block" /></div>
                    <h4 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 md:mb-6">Let's talk <span className="text-green-500 opacity-50">privacy.</span></h4>
                    <p className="text-gray-200 text-base md:text-lg font-black leading-relaxed">Our Data Protection Officer is standing by to resolve any questions about your information sovereignty.</p>
                  </div>
                  <div className="space-y-6 md:space-y-10">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-green-400">Contact Repository</p>
                      <div className="space-y-2">
                        <p className="text-xl md:text-2xl font-bold">Pushkar Singh</p>
                        <p className="text-gray-400 font-medium text-sm md:text-base">contact@carbonsynqearth.com</p>
                        <p className="text-gray-400 font-medium text-sm md:text-base">+91 9911875613</p>
                      </div>
                    </div>
                    <form onSubmit={handleSupportRequest} className="space-y-4">
                      <input type="hidden" name="Subject" value="Privacy Policy Support Request" />
                      <input type="hidden" name="Source" value="Privacy Policy Page" />
                      {formStatus === 'success' ? (
                        <div className="bg-green-500/20 border border-green-400 text-white px-6 md:px-8 py-4 md:py-6 rounded-[1.5rem] lg:rounded-[2rem] flex items-center gap-4">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0" />
                          <div>
                            <h4 className="font-black text-sm md:text-base">Request Sent</h4>
                            <p className="text-xs font-medium">Our DPO office will contact you soon.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <input 
                            name="Client Email" 
                            type="email" 
                            placeholder="Your work email address" 
                            required 
                            className="w-full bg-white/10 border border-white/20 p-4 md:p-5 lg:p-6 rounded-2xl lg:rounded-3xl font-black text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all placeholder:text-gray-400 text-sm md:text-base"
                          />
                          <button 
                            disabled={formStatus === 'submitting'}
                            type="submit"
                            className="w-full text-center bg-green-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl lg:rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-green-700 transition-all shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {formStatus === 'submitting' ? 'Submitting...' : 'Initialize Support Request'}
                          </button>
                        </div>
                      )}
                      {formStatus === 'error' && (
                        <p className="text-sm font-black text-red-500 mt-2">Failed to send request. Please try again.</p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </main>

    </div>
  );
}
