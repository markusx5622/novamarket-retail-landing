import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { PAIS_DATA, CANAL_DATA } from '@/data/projectData';

gsap.registerPlugin(ScrollTrigger);

function AnimatedDataBar({
  label,
  value,
  percentage,
  delay = 0,
}: {
  label: string;
  value: number;
  percentage: number;
  delay?: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fillRef.current || !valueRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.2,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 1.2,
        ease: 'power2.out',
        delay,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          valueRef.current!.textContent = '€' + Math.round(obj.val).toLocaleString('es-ES');
        },
      });
    }, barRef);

    return () => ctx.revert();
  }, [percentage, value, delay]);

  return (
    <div ref={barRef} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-ivory font-medium">{label}</span>
        <span ref={valueRef} className="font-mono-sm text-teal">€0</span>
      </div>
      <div className="w-full h-2 bg-slate rounded-sm overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-sm"
          style={{
            background: 'linear-gradient(90deg, #0D9488, #14B8A6)',
            width: '0%',
          }}
        />
      </div>
    </div>
  );
}

function ChannelBar({
  label,
  percentage,
  delay = 0,
}: {
  label: string;
  percentage: number;
  delay?: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.2,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, barRef);
    return () => ctx.revert();
  }, [percentage, delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-ivory font-medium">{label}</span>
        <span className="font-mono-sm text-teal">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-slate rounded-sm overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-sm"
          style={{
            background: 'linear-gradient(90deg, #0D9488, #F59E0B)',
            width: '0%',
          }}
        />
      </div>
    </div>
  );
}

export default function DataShowcaseSection() {
  return (
    <section id="showcase" className="w-full bg-ink">
      <div className="page-gutter section-gap content-max">
        <ScrollReveal>
          <SectionHeader
            overline="// ANÁLISIS POR DIMENSIÓN"
            title="Datos que importan"
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Country data */}
          <ScrollReveal>
            <div>
              <h3 className="font-display font-heading text-ivory">Ingresos por mercado</h3>
              <p className="mt-3 text-sm text-ash leading-relaxed" style={{ textWrap: 'pretty' }}>
                España lidera con el 38.7% del volumen de ingresos. Los cinco mercados hispanohablantes muestran distribución desigual pero consistente.
              </p>

              <div className="mt-8">
                {PAIS_DATA.map((p, i) => (
                  <AnimatedDataBar
                    key={p.pais}
                    label={p.pais}
                    value={p.ingresos}
                    percentage={p.pct}
                    delay={i * 0.08}
                  />
                ))}
              </div>

              {/* Insight box */}
              <div
                className="mt-6 bg-slate p-4 rounded-lg"
                style={{ borderLeft: '3px solid #F59E0B' }}
              >
                <p className="text-sm text-ivory leading-relaxed">
                  Chile presenta el ticket medio más alto (€838) a pesar de menor volumen, sugiriendo un mercado premium.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Channel data */}
          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="font-display font-heading text-ivory">Distribución por canal</h3>
              <p className="mt-3 text-sm text-ash leading-relaxed" style={{ textWrap: 'pretty' }}>
                El canal Web concentra más de la mitad de los ingresos. La App muestra crecimiento sostenido y la tienda física mantiene un 20% estable.
              </p>

              <div className="mt-8">
                {CANAL_DATA.map((c, i) => (
                  <ChannelBar
                    key={c.canal}
                    label={c.canal}
                    percentage={c.pct}
                    delay={i * 0.08}
                  />
                ))}
              </div>

              {/* Donut chart image */}
              <div className="mt-8 rounded-xl overflow-hidden">
                <img
                  src="./assets/donut-chart.jpg"
                  alt="Mix de Canales 2025 - Gráfico donut"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
