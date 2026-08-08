'use client';

import React, { useState, useEffect } from 'react';

import { 
  ArrowLeft, Shield, CheckCircle2, FileText, Globe, 
  Zap, Info, Lock, ChevronRight, Scale, Clock, Mail,
  Database, Server, ShieldCheck, UserCheck,
  Cpu, FileSignature, Landmark, Gavel, FileSearch, ShieldAlert, History, HelpCircle
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

export default function DataProcessingAgreement() {
  const [activeSection, setActiveSection] = useState('definitions');
  const [dateStr, setDateStr] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSignAgreement = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleRaiseTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTicketStatus('submitting');
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
        setTicketStatus('success');
        form.reset();
      } else {
        setTicketStatus('error');
      }
    } catch (error) {
      setTicketStatus('error');
    }
  };

  const sections = [
    { id: 'definitions', title: 'Definitions' },
    { id: 'roles', title: 'Roles of the Parties' },
    { id: 'purpose', title: 'Purpose of Processing' },
    { id: 'terms', title: 'Data Processing Terms' },
    { id: 'transfers', title: 'Restricted Transfers' },
    { id: 'precedence', title: 'Precedence' },
    { id: 'indemnity', title: 'Indemnity' },
    { id: 'severability', title: 'Severability' },
    { id: 'retention', title: 'Data Retention' },
    { id: 'rights', title: 'Data Subject Rights' },
    { id: 'miscellaneous', title: 'Miscellaneous' },
    { id: 'annex1', title: 'Annex 1: Activities' },
    { id: 'annex2', title: 'Annex 2: Sub-processors' },
    { id: 'security', title: 'Security Measures' },
    { id: 'technical-annex', title: 'Technical Annex' },
    { id: 'faq', title: 'FAQ' },
    { id: 'signatories', title: 'Signatories' },
    { id: 'contact', title: 'Contact Us' },
  ];

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString());
  }, []);

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
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-green-300/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-300/10 blur-[180px] rounded-full animate-pulse [animation-delay:4s]" />
      </div>

      {/* Hero Section */}
      <header className="pt-24 md:pt-32 lg:pt-64 pb-16 md:pb-32 px-6 md:px-10 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-12 shadow-sm">
          <FileSignature size={14} className="text-green-500" />
          <span>Enterprise Compliance v4.0</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-black tracking-tighter text-gray-900 mb-8 md:mb-12 leading-[0.9]">
          DPA <span className="text-green-600">Protocol.</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-800 max-w-4xl mx-auto font-black leading-relaxed">
          A comprehensive framework for the lawful, secure, and transparent processing of data within CarbonSynq.
        </p>
      </header>

      {/* Main Grid */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 pb-32 md:pb-64">
        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-20">
          
          {/* Sidebar */}
          <aside className="hidden lg:block col-span-3 sticky top-32 h-fit">
            <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-green-900/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-10 px-2 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Agreement Sections
              </h4>
              <div className="space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`flex items-center justify-between group py-3 px-5 rounded-xl text-[14px] font-black tracking-tight transition-all duration-500 ${
                      activeSection === s.id 
                      ? 'bg-green-600 text-white shadow-2xl scale-[1.05] shadow-green-200' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                    }`}
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="col-span-12 lg:col-span-9 space-y-4">
            
            <Section id="definitions" title="Definitions" index={0}>
              <div className="space-y-10">
                <p className="text-gray-800 font-black leading-relaxed">The following terms shall have the meanings set forth below for the purposes of this Agreement:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                  {[
                    { t: 'Affiliate', d: 'Any entity that directly or indirectly controls, is controlled by, or is under common control with the subject entity.' },
                    { t: 'Data Protection Laws', d: 'All laws and regulations, including laws and regulations of the European Union, the European Economic Area and their member states, Switzerland, the United Kingdom and the United States and its states, applicable to the Processing of Personal Data.' },
                    { t: 'Data Subject', d: 'The identified or identifiable person to whom Personal Data relates.' },
                    { t: 'Personal Data', d: 'Any information relating to (i) an identified or identifiable natural person and (ii) an identified or identifiable legal entity.' },
                    { t: 'Processing', d: 'Any operation or set of operations which is performed upon Personal Data, whether or not by automatic means.' },
                    { t: 'Processor', d: 'The entity which Processes Personal Data on behalf of the Controller.' },
                    { t: 'Security Breach', d: 'Any accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to, Personal Data transmitted, stored or otherwise Processed.' },
                    { t: 'Sub-processor', d: 'Any Processor engaged by CarbonSynq or its Affiliates to assist in fulfilling its obligations with respect to providing the Services.' },
                    { t: 'EEA', d: 'The European Economic Area, which constitutes the member states of the European Union plus Iceland, Liechtenstein and Norway.' },
                    { t: 'Standard Contractual Clauses', d: 'The standard contractual clauses for the transfer of personal data to processors established in third countries which do not ensure an adequate level of data protection.' }
                  ].map((item, i) => (
                    <div key={i} className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all">
                      <h5 className="font-black text-base md:text-lg text-green-600 mb-3 md:mb-4 uppercase tracking-tighter">{item.t}</h5>
                      <p className="text-base md:text-lg text-gray-900 font-black leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="roles" title="Roles of the Parties" index={1}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[2.5rem] bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-start gap-4 md:gap-8">
                  <UserCheck className="text-green-700 shrink-0 w-8 h-8 md:w-10 md:h-10" size={32} />
                  <div>
                    <h4 className="font-black text-xl md:text-2xl mb-3 md:mb-4 text-gray-900">Controller</h4>
                    <p className="text-base md:text-lg text-gray-800 font-black leading-relaxed">The Customer, who determines the purpose and means of data processing. Full ownership remains with the data originator.</p>
                  </div>
                </div>
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] bg-gray-900 text-white shadow-2xl flex flex-col md:flex-row items-start gap-4 md:gap-8">
                  <Cpu className="text-green-400 shrink-0 w-8 h-8 md:w-10 md:h-10" size={32} />
                  <div>
                    <h4 className="font-black text-xl md:text-2xl mb-3 md:mb-4 text-white">Processor</h4>
                    <p className="text-base md:text-lg text-gray-300 font-black leading-relaxed">CarbonSynq, which processes data strictly on behalf of the Controller under these rigorous safety protocols.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="purpose" title="Description and Purpose of Personal Data Processing" index={2}>
              <p className="text-gray-800 leading-relaxed font-black mb-10 text-lg">
                CarbonSynq processes data solely to provide ESG tracking, carbon footprint calculations, and sustainability reporting analytics. The processing operations include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
                <div className="p-5 md:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                  <div className="mb-3 md:mb-4"><FileSearch className="text-green-600 w-5 h-5 md:w-6 md:h-6" /></div>
                  <h5 className="font-black text-sm mb-2">Scope 3 Analytics</h5>
                  <p className="text-xs text-gray-500 font-black leading-relaxed">Aggregating supply chain emissions data to provide a holistic view of the organization's indirect environmental impact.</p>
                </div>
                <div className="p-5 md:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                  <div className="mb-3 md:mb-4"><History className="text-green-600 w-5 h-5 md:w-6 md:h-6" /></div>
                  <h5 className="font-black text-sm mb-2">Historical Benchmarking</h5>
                  <p className="text-xs text-gray-500 font-black leading-relaxed">Analyzing multi-year data sets to identify trends, efficiency gains, and areas requiring strategic sustainability intervention.</p>
                </div>
                <div className="p-5 md:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                  <div className="mb-3 md:mb-4"><Globe className="text-green-600 w-5 h-5 md:w-6 md:h-6" /></div>
                  <h5 className="font-black text-sm mb-2">Regulatory Compliance</h5>
                  <p className="text-xs text-gray-500 font-black leading-relaxed">Generating BRSR, CSRD, and TCFD aligned reports automatically based on uploaded operational metrics.</p>
                </div>
                <div className="p-5 md:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-white border border-gray-100 shadow-sm">
                  <div className="mb-3 md:mb-4"><Zap className="text-green-600 w-5 h-5 md:w-6 md:h-6" /></div>
                  <h5 className="font-black text-sm mb-2">Real-time Optimization</h5>
                  <p className="text-xs text-gray-500 font-black leading-relaxed">Providing immediate feedback on energy usage spikes and recommending carbon-offsetting strategies.</p>
                </div>
              </div>
            </Section>

            <Section id="terms" title="Data Processing Terms" index={3}>
              <div className="space-y-10">
                <p className="text-gray-800 leading-relaxed font-black text-lg">
                  Processor shall comply with the following specific obligations in respect of all Processing of Personal Data:
                </p>
                <div className="bg-gray-900 rounded-[1.5rem] lg:rounded-[3rem] p-6 md:p-10 lg:p-16 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-10">
                    <div className="space-y-8">
                      <h6 className="text-green-400 font-black uppercase text-sm tracking-widest">Compliance & Instructions</h6>
                      <p className="text-xl text-white leading-relaxed font-black">
                        CarbonSynq shall process Personal Data only on documented instructions from the Controller, including with regard to transfers of Personal Data to a third country or an international organization, unless required to do so by applicable law.
                      </p>
                      <p className="text-xl text-white leading-relaxed font-black">
                        Processor shall immediately inform the Controller if, in its opinion, an instruction infringes Data Protection Laws.
                      </p>
                    </div>
                    <div className="space-y-8">
                      <h6 className="text-green-400 font-black uppercase text-sm tracking-widest">Confidentiality & Training</h6>
                      <p className="text-xl text-white leading-relaxed font-black">
                        CarbonSynq ensures that persons authorized to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.
                      </p>
                      <p className="text-xl text-white leading-relaxed font-black">
                        Regular security awareness training is mandatory for all personnel having access to the processing environment.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-16 pt-8 md:pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-10">
                    <div className="space-y-8">
                      <h6 className="text-green-400 font-black uppercase text-sm tracking-widest">Security of Processing</h6>
                      <p className="text-xl text-white leading-relaxed font-black">
                        Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing, CarbonSynq shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk.
                      </p>
                    </div>
                    <div className="space-y-8">
                      <h6 className="text-green-400 font-black uppercase text-sm tracking-widest">Assistance to Controller</h6>
                      <p className="text-xl text-white leading-relaxed font-black">
                        Processor shall assist the Controller by appropriate technical and organizational measures for the fulfillment of the Controller's obligation to respond to requests for exercising the Data Subject's rights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="transfers" title="Restricted Transfers" index={4}>
              <div className="p-6 md:p-10 lg:p-12 rounded-[1.5rem] lg:rounded-[2.5rem] bg-blue-50 border border-blue-100 flex items-start gap-6">
                <Globe className="text-blue-600 shrink-0" size={32} />
                <div>
                  <h4 className="font-black text-lg text-blue-900 mb-3">Global Compliance</h4>
                  <p className="text-sm text-blue-800 font-black leading-relaxed">Any transfer of data to a third country shall only occur if the requirements of applicable Data Protection Laws are met (e.g., Standard Contractual Clauses).</p>
                </div>
              </div>
            </Section>

            <Section id="precedence" title="Precedence" index={5}>
              <div className="p-6 md:p-10 lg:p-12 rounded-[1.5rem] lg:rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
                <p className="text-gray-800 leading-relaxed font-black">
                  In the event of any conflict between this DPA and the Main Service Agreement, the provisions of this DPA shall prevail regarding data protection obligations.
                </p>
              </div>
            </Section>

            <Section id="indemnity" title="Indemnity & Limitation of Liability" index={6}>
              <div className="space-y-8">
                <p className="text-gray-800 leading-relaxed font-black">
                  The parties' liability under this DPA shall be subject to the limitations and exclusions of liability set out in the Main Service Agreement, provided that neither party shall be entitled to limit its liability to the other party for any breach of this DPA that leads to a Security Breach.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] bg-gray-50 border border-gray-100 flex items-start gap-4 md:gap-6 hover:bg-white hover:border-green-200 transition-all group">
                    <Landmark className="text-gray-900 group-hover:scale-110 transition-transform shrink-0 w-8 h-8 md:w-10 md:h-10" size={32} />
                    <div>
                      <h4 className="font-black text-base md:text-lg mb-3">Indemnification Clause</h4>
                      <p className="text-sm text-gray-500 font-black leading-relaxed">Controller shall indemnify CarbonSynq against all costs, claims, and damages arising out of the Controller's failure to provide adequate notice or obtain necessary consents from Data Subjects.</p>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[3rem] bg-gray-50 border border-gray-100 flex items-start gap-4 md:gap-6 hover:bg-white hover:border-green-200 transition-all group">
                    <ShieldAlert className="text-red-500 group-hover:scale-110 transition-transform shrink-0 w-8 h-8 md:w-10 md:h-10" size={32} />
                    <div>
                      <h4 className="font-black text-base md:text-lg mb-3 text-red-900">Breach Liability</h4>
                      <p className="text-sm text-gray-500 font-black leading-relaxed">CarbonSynq's liability for a Security Breach caused by its gross negligence shall be capped at three times (3x) the annual fees paid by the Customer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="severability" title="Severability" index={7}>
              <p className="text-gray-800 leading-relaxed font-black">
                Should any provision of this DPA be invalid or unenforceable, then the remainder of this DPA shall remain valid and in force.
              </p>
            </Section>
            <Section id="retention" title="Data Retention and Deletion" index={9}>
              <div className="space-y-6">
                <p className="text-gray-800 leading-relaxed font-black">
                  Processor shall retain Personal Data only for as long as necessary to fulfill the purposes outlined in the Main Agreement.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="p-5 md:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-gray-50 border border-gray-100">
                    <h6 className="font-black text-xs text-green-600 mb-2 uppercase">Active Period</h6>
                    <p className="text-xs text-gray-500 font-black">Full data accessibility throughout the active subscription term.</p>
                  </div>
                  <div className="p-5 md:p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] bg-gray-50 border border-gray-100">
                    <h6 className="font-black text-xs text-green-600 mb-2 uppercase">Post-Termination</h6>
                    <p className="text-xs text-gray-500 font-black">Data is securely deleted or anonymized within 90 days of contract termination unless legal retention is required.</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="rights" title="Data Subject Rights" index={10}>
              <div className="bg-white border border-gray-100 rounded-[1.5rem] lg:rounded-[3rem] p-5 md:p-6 lg:p-10 shadow-sm space-y-6">
                <p className="text-gray-800 leading-relaxed font-black">
                  Processor shall assist the Controller in fulfilling its obligations to respond to requests from Data Subjects under Data Protection Laws.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    'Right to Access & Portability',
                    'Right to Rectification',
                    'Right to Erasure (Right to be Forgotten)',
                    'Right to Restriction of Processing'
                  ].map((right, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-green-50/50 border border-green-100 text-xs font-black text-green-800">
                      <CheckCircle2 size={16} />
                      {right}
                    </div>
                  ))}
                </div>
              </div>
            </Section>
            <Section id="miscellaneous" title="Miscellaneous" index={8}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[2.5rem] bg-white border border-gray-200">
                  <h5 className="font-black text-xs uppercase tracking-widest text-gray-900 mb-4">Governing Law</h5>
                  <p className="text-lg md:text-xl font-black text-green-700">Laws of the Republic of India.</p>
                </div>
                <div className="p-5 md:p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[2.5rem] bg-white border border-gray-200">
                  <h5 className="font-black text-xs uppercase tracking-widest text-gray-900 mb-4">Jurisdiction</h5>
                  <p className="text-lg md:text-xl font-black text-green-700">Courts of Bangalore, India.</p>
                </div>
              </div>
            </Section>

            <Section id="annex1" title="Annex 1: Description of Processing Activities" index={9}>
              <div className="bg-white rounded-[1.5rem] lg:rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-5 md:p-6 lg:p-10 border-b border-gray-50 bg-gray-50/30">
                  <h5 className="font-black text-sm mb-4 text-green-600 uppercase tracking-widest">A. Categories of Data Subjects</h5>
                  <p className="text-sm text-gray-800 font-black leading-relaxed">
                    CarbonSynq processes data relating to: Employees (full-time/contract), On-site visitors, Supply chain partners, Logistical coordinators, and Authorized administrative users.
                  </p>
                </div>
                <div className="p-5 md:p-6 lg:p-10 border-b border-gray-50">
                  <h5 className="font-black text-sm mb-4 text-green-600 uppercase tracking-widest">B. Categories of Personal Data</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <ul className="space-y-3 text-xs text-gray-500 font-black">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Professional Identification (Name, Work Email)</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Utility Usage Data (kWh, Water consumption)</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Travel Logs (Business trips, Commute modes)</li>
                    </ul>
                    <ul className="space-y-3 text-xs text-gray-500 font-black">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> IT Usage Data (Logs for emission calculations)</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Facilities Metadata (Square footage, HVAC stats)</li>
                    </ul>
                  </div>
                </div>
                <div className="p-5 md:p-6 lg:p-10">
                  <h5 className="font-black text-sm mb-4 text-green-600 uppercase tracking-widest">C. Frequency and Nature</h5>
                  <p className="text-sm text-gray-800 font-black leading-relaxed">
                    Data is processed on a continuous, real-time basis via API integration or recurring batch uploads. The nature of processing involves algorithmic aggregation, trend analysis, and predictive modeling for net-zero strategy.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="annex2" title="Annex 2: CarbonSynq's Sub-processors" index={10}>
              <div className="overflow-x-auto rounded-[1.5rem] lg:rounded-[3rem] border border-gray-100 shadow-sm bg-white">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] md:text-[11px] uppercase tracking-widest text-gray-900">Partner Entity</th>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] md:text-[11px] uppercase tracking-widest text-gray-900">Technical Purpose</th>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] md:text-[11px] uppercase tracking-widest text-gray-900">Jurisdiction</th>
                      <th className="p-4 md:p-6 lg:p-8 font-black text-[10px] md:text-[11px] uppercase tracking-widest text-gray-900">Safety Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { p: 'Amazon Web Services', n: 'Compute & Database Storage', l: 'Mumbai / Ireland', s: 'Tier 4' },
                      { p: 'Stripe, Inc.', n: 'Financial Gateway Infrastructure', l: 'Global (USA Central)', s: 'PCI-DSS v4' },
                      { p: 'CarbonPulse AI', n: 'Optimized Emission Modeling', l: 'India (Bangalore)', s: 'ISO 27001' },
                      { p: 'Auth0 (Okta)', n: 'Enterprise IAM & Authentication', l: 'Frankfurt / USA', s: 'SOC2 Type II' },
                      { p: 'SendGrid', n: 'Automated Compliance Alerts', l: 'USA', s: 'GDPR Compliant' }
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="p-4 md:p-6 lg:p-8 font-black text-base md:text-lg text-gray-900">{row.p}</td>
                        <td className="p-4 md:p-6 lg:p-8 text-sm md:text-lg text-gray-800 font-black">{row.n}</td>
                        <td className="p-4 md:p-6 lg:p-8 text-sm md:text-lg text-green-700 font-black">{row.l}</td>
                        <td className="p-4 md:p-6 lg:p-8"><span className="px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-green-50 text-[10px] md:text-xs font-black text-green-700 border border-green-100 uppercase">{row.s}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="security" title="Technical and Organisational Security Measures" index={11}>
              <div className="bg-gray-900 rounded-[2rem] lg:rounded-[4rem] p-6 md:p-10 lg:p-16 text-white shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10">
                  <div className="mb-6 md:mb-8"><ShieldAlert className="text-green-500 w-10 h-10 md:w-12 md:h-12" size={48} /></div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 md:mb-8 tracking-tight text-white">Advanced TOMs Framework</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h6 className="font-black text-xs text-green-400 mb-2 uppercase">Physical Security</h6>
                      <p className="text-[11px] text-gray-400 font-black">Biometric access controls, 24/7 CCTV surveillance, and specialized fire suppression systems at all data center locations.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h6 className="font-black text-xs text-green-400 mb-2 uppercase">Data Isolation</h6>
                      <p className="text-[11px] text-gray-400 font-black">Logical separation of tenant data via specialized VPC architectures and unique encryption keys for every customer.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h6 className="font-black text-xs text-green-400 mb-2 uppercase">Resilience</h6>
                      <p className="text-[11px] text-gray-400 font-black">99.99% uptime SLA with automated failover and multi-region data redundancy to prevent any localized outages.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h6 className="font-black text-xs text-green-400 mb-2 uppercase">Encryption</h6>
                      <p className="text-[11px] text-gray-400 font-black">End-to-end encryption for all data packets, utilizing XTS-AES 256 for local storage and TLS 1.3 for API calls.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h6 className="font-black text-xs text-green-400 mb-2 uppercase">Incident Management</h6>
                      <p className="text-[11px] text-gray-400 font-black">Dedicated Security Operations Center (SOC) monitoring traffic 24/7 with automated AI-driven threat detection.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h6 className="font-black text-xs text-green-400 mb-2 uppercase">Auditability</h6>
                      <p className="text-[11px] text-gray-400 font-black">Immutable write-only audit logs capturing all administrative actions for forensic review if necessary.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="technical-annex" title="Technical Annex: Security Protocols" index={11}>
              <div className="bg-white border border-gray-100 rounded-[1.5rem] lg:rounded-[3rem] p-5 md:p-8 lg:p-12 shadow-sm space-y-6 md:space-y-10">
                <p className="text-gray-800 leading-relaxed font-black">CarbonSynq maintains the following technical security measures to ensure the highest level of data protection:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-8">
                  {[
                    'Pseudonymization and encryption of personal data at rest.',
                    'The ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems.',
                    'The ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident.',
                    'A process for regularly testing, assessing and evaluating the effectiveness of technical and organizational measures.',
                    'User identification and authorization (MFA, RBAC).',
                    'Protection of data during transmission (TLS 1.3, SSH).',
                    'Protection of data during storage (AES-256 GCM).',
                    'Physical security of locations at which personal data are processed.',
                    'Events logging and monitoring.',
                    'System configuration, including default security configurations.',
                    'Internal IT and IT security governance and management.',
                    'Data protection by design and by default.',
                    'Disaster recovery and business continuity planning.',
                    'Certification/assurance of processes and products (SOC2, ISO 27001).',
                    'Data minimization and purpose limitation.',
                    'Data quality and limited retention.',
                    'Accountability and transparency protocols.',
                    'Continuous threat intelligence and monitoring.'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 border-b border-gray-50 pb-4 last:border-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
                      <p className="text-xs text-gray-500 font-black leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="faq" title="Frequently Asked Questions (FAQ)" index={12}>
              <div className="space-y-6">
                {[
                  { q: 'Is my data encrypted during transit?', a: 'Yes, all data transmitted between your browser and our servers is encrypted using industry-standard TLS 1.3 protocols.' },
                  { q: 'How often are security audits performed?', a: 'We conduct internal security audits quarterly and engage independent third-party auditors for annual SOC2 and ISO 27001 assessments.' },
                  { q: 'Can I request a copy of my processed data?', a: 'Absolutely. Customers can request a full export of their data in a machine-readable format at any time via the admin console.' },
                  { q: 'Where is my data physically stored?', a: 'Primary data storage is in AWS Mumbai (India) and AWS Ireland (EU) regions, with failover clusters in AWS USA regions.' },
                  { q: 'What happens to my data if I cancel my subscription?', a: 'Upon cancellation, your data is archived for 90 days. After this period, it is permanently purged from our active systems and backups.' }
                ].map((item, i) => (
                  <div key={i} className="p-5 md:p-8 lg:p-12 rounded-[1.5rem] lg:rounded-[3.5rem] bg-white border border-gray-100 shadow-sm hover:border-green-300 hover:shadow-2xl transition-all group">
                    <h5 className="font-black text-lg md:text-xl lg:text-2xl text-gray-900 mb-4 md:mb-6 flex items-start md:items-center gap-3 md:gap-5">
                      <HelpCircle size={24} className="text-green-600 shrink-0 mt-1 md:mt-0" />
                      <span>{item.q}</span>
                    </h5>
                    <p className="text-base md:text-lg text-gray-800 font-black leading-relaxed md:pl-12">{item.a}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="signatories" title="Signatories" index={13}>
              <form onSubmit={handleSignAgreement} className="bg-gray-50 border border-gray-100 rounded-[1.5rem] lg:rounded-[3rem] p-6 md:p-10 lg:p-16 shadow-inner">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-black mb-8 md:mb-16 text-center">Please complete the digital execution fields below to acknowledge this agreement.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20">
                  {/* Customer Side */}
                  <div className="space-y-6 md:space-y-10">
                    <div className="h-1 bg-green-500 w-16 md:w-24 mb-6 md:mb-10 rounded-full" />
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 md:mb-10">On behalf of the Customer</p>
                    <div className="space-y-5 md:space-y-8">
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 md:mb-3 group-focus-within:text-green-600 transition-colors">Full Name</label>
                        <input name="Customer Name" type="text" placeholder="Enter Signatory Name" required className="w-full bg-white border border-gray-200 p-4 md:p-5 rounded-2xl font-black text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all placeholder:text-gray-200" />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 md:mb-3 group-focus-within:text-green-600 transition-colors">Title / Position</label>
                        <input name="Customer Title" type="text" placeholder="e.g. Chief Legal Officer" required className="w-full bg-white border border-gray-200 p-4 md:p-5 rounded-2xl font-black text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all placeholder:text-gray-200" />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 md:mb-3 group-focus-within:text-green-600 transition-colors">Client Email</label>
                        <input name="Customer Email" type="email" placeholder="client@company.com" required className="w-full bg-white border border-gray-200 p-4 md:p-5 rounded-2xl font-black text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all placeholder:text-gray-200" />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 md:mb-3 group-focus-within:text-green-600 transition-colors">Execution Date</label>
                        <input name="Execution Date" type="date" required className="w-full bg-white border border-gray-200 p-4 md:p-5 rounded-2xl font-black text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* CarbonSynq Side */}
                  <div className="space-y-6 md:space-y-10 opacity-80">
                    <div className="h-1 bg-gray-900 w-16 md:w-24 mb-6 md:mb-10 rounded-full" />
                    <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 md:mb-10">On behalf of CarbonSynq</p>
                    <div className="space-y-5 md:space-y-8">
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 md:mb-3">Authorized Signatory</label>
                        <div className="w-full bg-gray-100 border border-gray-200 p-4 md:p-5 rounded-2xl font-black text-gray-500">Pushkar Singh</div>
                        <input type="hidden" name="Processor Signatory" value="Pushkar Singh" />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 md:mb-3">Title / Position</label>
                        <div className="w-full bg-gray-100 border border-gray-200 p-4 md:p-5 rounded-2xl font-black text-gray-500">Managing Director</div>
                        <input type="hidden" name="Processor Title" value="Managing Director" />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 md:mb-3">System Timestamp</label>
                        <div className="w-full bg-gray-100 border border-gray-200 p-4 md:p-5 rounded-2xl font-black text-gray-500">{dateStr}</div>
                        <input type="hidden" name="Agreement Type" value="Data Processing Agreement (CarbonSynq)" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 md:mt-16 lg:mt-20 flex flex-col items-center">
                  {formStatus === 'success' ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-6 md:px-10 py-4 md:py-6 rounded-[1.5rem] lg:rounded-[2rem] flex items-center gap-4">
                      <CheckCircle2 size={24} className="text-green-600 shrink-0" />
                      <div>
                        <h4 className="font-black text-base md:text-lg">Agreement Executed Successfully</h4>
                        <p className="text-sm font-medium">Your submission has been recorded securely.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button disabled={formStatus === 'submitting'} type="submit" className="bg-green-600 text-white px-12 md:px-16 lg:px-20 py-6 md:py-8 rounded-[1.5rem] lg:rounded-[2.5rem] font-black uppercase text-xs tracking-widest hover:bg-gray-900 transition-all shadow-2xl shadow-green-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                        {formStatus === 'submitting' ? 'Executing...' : 'Digitally Sign & Execute Agreement'}
                      </button>
                      <p className="mt-6 md:mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">By clicking above, you agree to the electronic execution of this DPA.</p>
                    </>
                  )}
                  {formStatus === 'error' && (
                    <p className="mt-4 text-sm font-black text-red-500">Something went wrong. Please try again.</p>
                  )}
                </div>
              </form>
            </Section>
            <Section id="contact" title="Contact Us" index={14}>
              <div className="bg-gray-900 rounded-[2rem] lg:rounded-[4rem] p-6 md:p-10 lg:p-16 text-white shadow-[0_48px_96px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden group/final">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                  <div className="flex-1">
                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-[1.5rem] lg:rounded-[2rem] bg-green-600 text-white flex items-center justify-center mb-6 md:mb-10 shadow-2xl group-hover/final:scale-110 transition-transform shadow-green-600/20"><Mail size={28} className="md:hidden" /><Mail size={40} className="hidden md:block" /></div>
                    <h4 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 md:mb-6">DPO Office.</h4>
                    <p className="text-gray-300 text-base md:text-lg font-black leading-relaxed">For all data processing inquiries and SCC execution requests.</p>
                  </div>
                  <div className="space-y-6 md:space-y-10 w-full md:w-auto">
                    <div className="p-5 md:p-8 lg:p-10 rounded-[1.5rem] lg:rounded-[2.5rem] bg-white border border-gray-200 shadow-lg">
                      <p className="text-xs font-black uppercase tracking-widest text-green-700 mb-3">Direct Legal Contact</p>
                      <p className="text-lg md:text-xl lg:text-2xl font-black text-gray-900 break-all">contact@carbonsynqearth.com</p>
                    </div>
                    <form onSubmit={handleRaiseTicket} className="space-y-4">
                      <input type="hidden" name="Subject" value="New Compliance Ticket Requested" />
                      <input type="hidden" name="Source" value="DPA Page - Contact Section" />
                      {ticketStatus === 'success' ? (
                        <div className="bg-green-50 border border-green-200 text-green-800 px-6 md:px-8 py-4 md:py-6 rounded-[1.5rem] lg:rounded-[2rem] flex items-center gap-4">
                          <CheckCircle2 size={24} className="text-green-600 shrink-0" />
                          <div>
                            <h4 className="font-black text-sm md:text-base">Ticket Raised</h4>
                            <p className="text-xs font-medium">Our DPO office will contact you soon.</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <input 
                            name="Client Email" 
                            type="email" 
                            placeholder="Your work email address" 
                            required 
                            className="w-full bg-white/10 border border-white/20 p-4 md:p-5 lg:p-6 rounded-2xl lg:rounded-3xl font-black text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all placeholder:text-gray-400 text-sm md:text-base"
                          />
                          <button 
                            disabled={ticketStatus === 'submitting'}
                            type="submit"
                            className="block w-full text-center bg-gray-950 text-white px-8 md:px-12 py-6 md:py-8 rounded-2xl lg:rounded-3xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-green-600 transition-all shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {ticketStatus === 'submitting' ? 'Submitting...' : 'Raise Compliance Ticket'}
                          </button>
                        </>
                      )}
                      {ticketStatus === 'error' && (
                        <p className="text-sm font-black text-red-500 text-center">Failed to raise ticket. Please try again.</p>
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
