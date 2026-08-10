'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

const links = [
  {
    name: 'Solutions',
    href: '#',
    hasDropdown: true,
    items: [
      { name: 'Net Zero', description: 'Track and manage carbon footprint', href: '/solutions/net-zero' },
      { name: 'Supply Chain', description: 'Monitor value chain impact', href: '/solutions/supply-chain' },
    ],
  },
  {
    name: 'Platform',
    href: '#',
    hasDropdown: true,
    items: [
      // { name: 'Dashboard', description: 'Real-time analytics and insights', href: '/dashboard' },
      { name: 'Plans', description: 'Flexible pricing for every business size', href: '/platform/pricing' },
    ],
  },
  {
    name: 'Company',
    href: '#',
    hasDropdown: true,
    items: [
      { name: 'Careers', description: 'Join our mission', href: '/careers' },
      { name: 'Contact Us', description: 'Get in touch with our team', href: '/contact' },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [open]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleDropdown = useCallback((name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Image
              src="/netzero/unnamed.webp"
              alt="CarbonSynq"
              width={64}
              height={64}
              priority
              unoptimized
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#1a2e35]">
              CarbonSynq<span className="text-[#10b981]">Earth</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = !link.hasDropdown && isActive(link.href);
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-all ${
                      active
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className="text-gray-400 group-hover:rotate-180 transition-transform duration-200"
                      />
                    )}
                  </Link>

                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-2 min-w-[240px]">
                        {link.items?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block px-4 py-3 rounded-lg transition-colors group/subitem ${
                              isActive(item.href)
                                ? 'bg-green-50'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                              {item.name}
                              <ArrowRight
                                size={14}
                                className="opacity-0 -translate-x-2 group-hover/subitem:opacity-100 group-hover/subitem:translate-x-0 transition-all"
                              />
                            </div>
                            {item.description && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2.5 text-sm font-semibold text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-all"
            >
              Register
            </Link>
            <Link
              href="/book-demo"
              className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition-all hover:shadow-lg active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden relative z-[60] flex items-center justify-center w-11 h-11 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-all"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ========= MOBILE MENU ========= */}

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 right-0 z-[58] h-[100dvh] w-[85vw] max-w-[380px] bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header with logo */}
        <div className="flex items-center justify-between h-16 md:h-20 px-5 border-b border-gray-100">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image
              src="/netzero/unnamed.webp"
              alt="CarbonSynq"
              width={48}
              height={48}
              unoptimized
              className="w-11 h-11 object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-[#1a2e35]">
              CarbonSynq<span className="text-[#10b981]">Earth</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex flex-col h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)]">
          <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-1">
            {links.map((link, index) => (
              <div
                key={link.name}
                className="animate-[slideIn_0.3s_ease_forwards]"
                style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
              >
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex items-center justify-between w-full px-3 py-3.5 text-[15px] font-semibold text-gray-900 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        activeDropdown === link.name
                          ? 'max-h-[500px] opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="ml-2 pl-3 border-l-2 border-green-200 space-y-0.5 pb-2">
                        {link.items?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`block px-3 py-3 rounded-xl transition-all ${
                              isActive(item.href)
                                ? 'text-green-700 bg-green-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                            }`}
                          >
                            <div className="text-sm font-medium">{item.name}</div>
                            {item.description && (
                              <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-3.5 text-[15px] font-semibold rounded-xl transition-all ${
                      isActive(link.href)
                        ? 'text-green-700 bg-green-50'
                        : 'text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA at bottom */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-2">
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl text-[15px] font-semibold text-center text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl text-[15px] font-semibold text-center text-white bg-green-600 hover:bg-green-700 transition-all active:scale-[0.98]"
              >
                Register
              </Link>
            </div>
            <Link
              href="/book-demo"
              onClick={() => setOpen(false)}
              className="bg-gray-900 text-white px-5 py-3.5 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 w-full hover:bg-gray-800 active:bg-gray-700 transition-all active:scale-[0.98] shadow-lg shadow-gray-900/10"
            >
              Book a demo
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide-in animation for mobile menu items */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
