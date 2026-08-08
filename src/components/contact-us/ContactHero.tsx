'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Mail, Phone, ShieldCheck, User, Building, ChevronDown, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const countryCodes = [
  { code: "+91", label: "IN" },
  { code: "+1", label: "US" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "AU" },
  { code: "+65", label: "SG" },
  { code: "+971", label: "AE" },
  { code: "+49", label: "DE" },
  { code: "+33", label: "FR" },
];

const helpOptions = [
  "Select an option",
  "Carbon Measurement",
  "Reduction Strategy",
  "Carbon Offsetting",
  "Sustainability Reporting",
  "Net Zero Consulting",
  "Supply Chain Decarbonization",
  "Other",
];

export default function ContactHero() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xojyggok', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setIsAgreed(false);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const inputBase =
    "w-full pl-12 pr-5 py-[18px] rounded-xl border border-slate-200 bg-white outline-none transition-all duration-200 text-[16px] font-medium placeholder:text-slate-300 " +
    "hover:border-slate-300 hover:shadow-md " +
    "focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:shadow-lg focus:shadow-green-500/5";

  const labelBase =
    "text-[12px] font-black text-slate-500 uppercase tracking-wider ml-1 mb-2 block transition-colors duration-200";

  return (
    <div
      className="relative flex items-center overflow-hidden font-sans bg-white min-h-[850px]"
      style={{
        backgroundImage: "url('/landscape-bg.webp')",
        backgroundSize: 'cover', backgroundPosition: 'center 80%', backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white/30 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/10 to-transparent h-[40%] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-0" />

      <div className="max-w-[1280px] mx-auto w-full px-6 md:px-12 lg:px-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start py-20">

        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-[42%] flex flex-col pt-4"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-[12px] font-bold w-max mb-8 border border-green-100 shadow-sm">
            <Leaf size={14} className="fill-green-600/20" /> Let&apos;s Build a Net Zero Future Together
          </div>

          <h1 className="text-[40px] md:text-[52px] font-black text-[#0f172a] leading-[1.1] mb-6 tracking-tight">
            Start Your <br />
            <span className="text-green-600">Net Zero Journey</span> <br />
            with CarbonSynq
          </h1>

          <p className="text-[16px] text-slate-500 leading-relaxed mb-12 max-w-md font-medium">
            We help businesses measure, reduce, and offset their carbon footprint with data-driven solutions for a sustainable tomorrow.
          </p>

          <div className="space-y-7">
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-600/30">
                <Mail size={20} className="text-white" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Email</span>
                <span className="text-[#0f172a] font-bold text-[15px] group-hover:text-green-600 transition-colors break-all">contact@carbonsynqearth.com</span>
              </div>
            </div>

            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-600/30">
                <Phone size={20} className="text-white" />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Phone</span>
                <span className="text-[#0f172a] font-bold text-[15px] group-hover:text-green-600 transition-colors">+91 99118 75613</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Side: Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="w-full lg:w-[55%] max-w-[640px]"
        >
          <div className="bg-white rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)] p-8 md:p-10 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-600 to-emerald-500" />

            <div className="mb-8 text-center">
              <h3 className="text-[22px] font-black text-[#0f172a]">Send Us a Message</h3>
              <p className="text-[13px] text-slate-400 font-medium mt-1.5">Fill out the form and our team will reach out within 24 hours</p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-600/20">
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <h4 className="font-black text-[20px] text-[#0f172a] mb-2">Message Sent Successfully!</h4>
                  <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. One of our sustainability experts will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-[13px] font-bold text-green-600 hover:text-green-700 underline underline-offset-2 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className={labelBase}>Full Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors duration-200 peer-focus-within:text-green-500" />
                        <input name="name" type="text" required placeholder="Enter your name" className={inputBase + " peer"} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelBase}>Work Email</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        <input name="email" type="email" required placeholder="name@company.com" className={inputBase} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className={labelBase}>Phone Number</label>
                      <div className="flex gap-2.5">
                        <div className="relative w-[84px] shrink-0">
                          <select name="country_code" defaultValue="+91" className="w-full pl-3 pr-8 py-[16px] rounded-xl border border-slate-200 bg-white outline-none appearance-none cursor-pointer text-[14px] font-bold text-slate-700 transition-all duration-200 hover:border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10">
                            {countryCodes.map((c) => (
                              <option key={c.code} value={c.code}>{c.label}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <input name="phone" type="tel" required placeholder="Enter your phone number" className="w-full px-5 py-[16px] rounded-xl border border-slate-200 bg-white outline-none transition-all duration-200 text-[16px] font-medium placeholder:text-slate-300 hover:border-slate-300 hover:shadow-md focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:shadow-lg focus:shadow-green-500/5" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelBase}>Company</label>
                      <div className="relative">
                        <Building size={18} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        <input name="company" type="text" placeholder="Enter company name" className={inputBase} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelBase}>What do you need help with?</label>
                    <div className="relative">
                      <select name="help_category" defaultValue="" className="w-full px-5 py-[18px] rounded-xl border border-slate-200 bg-white outline-none appearance-none cursor-pointer transition-all duration-200 text-[16px] font-medium text-slate-700 hover:border-slate-300 hover:shadow-md focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:shadow-lg focus:shadow-green-500/5">
                        {helpOptions.map((opt, i) => (
                          <option key={opt} value={i === 0 ? "" : opt} disabled={i === 0}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className={labelBase}>Message</label>
                    <textarea name="message" required rows={5} placeholder="Tell us about your sustainability goals and how we can help..." className="w-full px-5 py-[18px] rounded-xl border border-slate-200 bg-white outline-none transition-all duration-200 text-[16px] font-medium resize-none placeholder:text-slate-300 hover:border-slate-300 hover:shadow-md focus:border-green-500 focus:ring-4 focus:ring-green-500/10 focus:shadow-lg focus:shadow-green-500/5"></textarea>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      required
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500 focus:ring-offset-1 cursor-pointer accent-green-600"
                    />
                    <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
                      I agree to the <a href="http://localhost:5174/" className="text-green-600 font-bold hover:underline cursor-pointer">privacy policy</a> and allow CarbonSynq to contact me regarding my inquiry.
                    </p>
                  </div>

                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-700 px-5 py-3.5 rounded-xl"
                    >
                      <AlertCircle size={18} className="text-red-500 shrink-0" />
                      <p className="text-[13px] font-semibold">Failed to send message. Please try again or email us directly.</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={!isAgreed || formStatus === 'submitting'}
                    className={`w-full font-black py-[18px] rounded-xl transition-all duration-300 flex justify-center items-center gap-3 text-[17px] relative overflow-hidden ${
                      isAgreed && formStatus !== 'submitting'
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20 hover:shadow-2xl hover:shadow-green-600/30 active:scale-[0.98]"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            
          </div>
        </motion.div>
      </div>
    </div>
  );
}
