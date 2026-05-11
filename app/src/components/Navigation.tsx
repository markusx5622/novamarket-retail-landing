import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MenuIcon, XIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Métricas', href: '#metrics' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Tecnología', href: '#tecnologia' },
  { label: 'Repositorio', href: '#cta' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: '100vh top',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => { trigger.kill(); };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
        style={{
          backgroundColor: 'rgba(10, 10, 12, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid #374151' : '1px solid transparent',
          transition: 'border-color 0.4s ease',
        }}
      >
        <div className="page-gutter w-full flex items-center justify-between content-max">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-display font-bold text-[1.1rem] text-ivory tracking-tight relative group"
          >
            NovaMarket
            <span
              className="absolute -bottom-0.5 left-0 h-[1.5px] bg-teal"
              style={{ width: 0, transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)' }}
            />
            <style>{`.group:hover span{width:100%!important}`}</style>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="nav-link-interactive"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ivory p-1.5 rounded-lg transition-all duration-200 hover:bg-slate hover:text-teal active:scale-95"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,148,136,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
          >
            {mobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 bg-obsidian flex flex-col items-center justify-center gap-8 md:hidden"
        style={{
          paddingTop: '64px',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="font-display font-bold text-2xl text-ivory transition-all duration-200 hover:text-teal"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.3s ${0.1 + i * 0.05}s, transform 0.3s ${0.1 + i * 0.05}s, color 0.2s`,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
