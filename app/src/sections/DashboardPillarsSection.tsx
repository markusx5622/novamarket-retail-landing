import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { LayoutDashboardIcon, BarChart3Icon, GlobeIcon, HeartPulseIcon } from '@/components/Icons';
import { DASHBOARD_PAGES } from '@/data/projectData';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [LayoutDashboardIcon, BarChart3Icon, GlobeIcon, HeartPulseIcon];

export default function DashboardPillarsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current!.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="dashboard" className="w-full bg-obsidian">
      <div className="page-gutter section-gap content-max">
        <ScrollReveal>
          <SectionHeader
            overline="// EL DASHBOARD"
            title="Cuatro vistas analíticas"
            subtitle="Una arquitectura de datos diseñada para la lectura ejecutiva. Cada página responde a una pregunta de negocio diferente."
          />
        </ScrollReveal>

        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {DASHBOARD_PAGES.map((page, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="group relative bg-slate rounded-2xl p-8 cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid #374151',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#0D9488';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(13, 148, 136, 0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#374151';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Decorative number */}
                <span
                  className="absolute top-6 right-6 font-display font-bold text-4xl transition-opacity duration-300"
                  style={{ color: 'rgba(55, 65, 81, 0.15)' }}
                >
                  {page.num}
                </span>

                <div className="text-teal">
                  <Icon size={48} />
                </div>

                <h3 className="mt-6 font-display font-heading text-ivory">
                  {page.title}
                </h3>

                <p className="mt-3 text-sm text-ash leading-relaxed">
                  {page.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {page.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-ink text-teal font-label text-[0.7rem] px-3 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
