import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { PowerBIIcon, PythonIcon, GitHubIcon } from '@/components/Icons';
import { TECH_STACK } from '@/data/projectData';

gsap.registerPlugin(ScrollTrigger);

const ICONS = [PowerBIIcon, PythonIcon, GitHubIcon];

export default function TechnologyStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.card-interactive');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tecnologia"
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: '#111114',
      }}
    >
      {/* Decorative gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="page-gutter section-gap content-max relative z-10">
        <ScrollReveal>
          <SectionHeader
            overline="// STACK TECNOLÓGICO"
            title="Herramientas del proyecto"
            subtitle="Un ecosistema integrado de captura, procesamiento, modelado y visualización."
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_STACK.map((tool, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="card-interactive p-6 lg:p-8"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(13,148,136,0.15)]"
                  style={{
                    backgroundColor: '#0A0A0C',
                    border: '1px solid rgba(13, 148, 136, 0.3)',
                  }}
                >
                  <Icon size={28} className="text-teal" />
                </div>

                <h3 className="font-display text-xl font-bold text-ivory">
                  {tool.name}
                </h3>

                <p className="font-label text-teal text-[0.7rem] tracking-wider mt-1">
                  {tool.role.toUpperCase()}
                </p>

                <p className="mt-4 text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                  {tool.description}
                </p>

                {/* Code snippet */}
                <div
                  className="mt-6 rounded-lg p-4 overflow-hidden"
                  style={{
                    backgroundColor: '#0A0A0C',
                    border: '1px solid rgba(55, 65, 81, 0.3)',
                  }}
                >
                  <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap" style={{ color: '#14B8A6' }}>
                    {tool.codePreview}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
