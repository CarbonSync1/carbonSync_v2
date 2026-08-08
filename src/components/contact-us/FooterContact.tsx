import { Mail, Phone, Leaf, ArrowRight } from "lucide-react";

export default function FooterContact() {
  return (
    <footer className="bg-white pt-20 pb-16 px-8 md:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-[50px] p-12 md:p-20 flex flex-col xl:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-2xl">
        
        {/* Abstract Background Element */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Left Column - Branding */}
        <div className="flex flex-col md:flex-row items-center gap-10 lg:w-1/3">
          <div className="w-32 h-32 rounded-3xl border-2 border-white/10 flex items-center justify-center bg-white/5 shrink-0 transition-transform hover:rotate-6 shadow-2xl">
             <Leaf size={56} className="text-green-500 fill-current" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-white mb-4 leading-tight tracking-tighter">
              Net Zero Journey<br />with <span className="text-green-500">CarbonSynq</span>
            </h3>
            <p className="text-[13px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed max-w-[240px]">
              Together, let's build a cleaner, greener, and net zero future.
            </p>
          </div>
        </div>

        {/* Middle Column - Contact Info */}
        <div className="flex flex-col items-center xl:w-1/3">
          <div className="space-y-8 w-full max-w-sm">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-12 h-12 bg-white/5 text-green-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">Phone</h4>
                <p className="text-[14px] text-white font-medium tracking-tight">+91 99118 75613</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-12 h-12 bg-white/5 text-green-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">Email</h4>
                <p className="text-[14px] text-white font-medium">contact@carbonsynqearth.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Newsletter */}
        <div className="xl:w-1/3 w-full max-w-md bg-white/5 p-10 rounded-[40px] border border-white/5 backdrop-blur-sm">
          <h4 className="text-white text-xl font-black mb-2 tracking-tight">Stay in the know</h4>
          <p className="text-gray-400 text-sm font-medium mb-8">Subscribe to our newsletter for latest updates.</p>

          <form action="https://formspree.io/f/xojyggok" method="POST" className="flex flex-col gap-3 w-full">
            <input
              name="email"
              type="email"
              required
              placeholder="Enter email address"
              className="w-full px-6 py-4 bg-white rounded-2xl outline-none text-[15px] font-medium text-gray-900 border border-transparent focus:ring-4 focus:ring-green-500/20 transition-all"
            />
            <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-gray-900 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/20">
              Subscribe <ArrowRight size={18} strokeWidth={3} />
            </button>
          </form>
        </div>

      </div>

      <div className="mt-16 text-center text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em]">
        © 2026 CarbonSynq Private Limited. All Rights Reserved.
      </div>
    </footer>
  );
}
