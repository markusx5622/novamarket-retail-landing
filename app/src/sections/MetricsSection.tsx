import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { EuroIcon, ShoppingCartIcon, UsersIcon, PackageIcon, SmileIcon } from '@/components/Icons';
import { MARQUEE_ITEMS } from '@/data/projectData';

gsap.registerPlugin(ScrollTrigger);

const KPI_CARDS = [
  { icon: EuroIcon, value: 1.15, suffix: 'M', prefix: '€', label: 'Ingresos brutos', decimals: 2 },
  { icon: ShoppingCartIcon, value: 1500, suffix: '', prefix: '', label: 'Pedidos procesados', decimals: 0 },
  { icon: UsersIcon, value: 389, suffix: '', prefix: '', label: 'Clientes únicos', decimals: 0 },
  { icon: PackageIcon, value: 2440, suffix: '', prefix: '', label: 'Unidades vendidas', decimals: 0 },
  { icon: SmileIcon, value: 3.91, suffix: '/5', prefix: '', label: 'Satisfacción media', decimals: 2 },
];

function KPITicker({ value, prefix, suffix, decimals }: { value: number; prefix: string; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      snap: { val: decimals === 0 ? 1 : 0.01 },
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (decimals === 0) {
          el.textContent = prefix + Math.round(obj.val).toLocaleString('es-ES') + suffix;
        } else {
          el.textContent = prefix + obj.val.toFixed(decimals).replace('.', ',') + suffix;
        }
      },
    });

    return () => { tween.kill(); };
  }, [value, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function MarqueeDataRibbon() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    const tl1 = gsap.fromTo(row1Ref.current, { x: 0 }, { x: '-50%', duration: 30, ease: 'none', repeat: -1 });
    const tl2 = gsap.fromTo(row2Ref.current, { x: '-50%' }, { x: '0%', duration: 35, ease: 'none', repeat: -1 });

    const container = row1Ref.current.parentElement;
    const handleEnter = () => { tl1.pause(); tl2.pause(); };
    const handleLeave = () => { tl1.resume(); tl2.resume(); };

    container?.addEventListener('mouseenter', handleEnter);
    container?.addEventListener('mouseleave', handleLeave);

    return () => {
      tl1.kill();
      tl2.kill();
      container?.removeEventListener('mouseenter', handleEnter);
      container?.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const items = MARQUEE_ITEMS;
  const content = [...items, ...items].join(' // ');

  return (
    <div className="w-full overflow-hidden py-8" style={{ borderTop: '1px solid #374151' }}>
      <div className="flex whitespace-nowrap" ref={row1Ref}>
        <span className="font-mono-sm text-teal uppercase tracking-widest text-sm px-4">
          {content}
        </span>
        <span className="font-mono-sm text-teal uppercase tracking-widest text-sm px-4">
          {content}
        </span>
      </div>
      <div className="flex whitespace-nowrap mt-3" ref={row2Ref}>
        <span className="font-mono-sm text-ash uppercase tracking-widest text-sm px-4 opacity-50">
          {content}
        </span>
        <span className="font-mono-sm text-ash uppercase tracking-widest text-sm px-4 opacity-50">
          {content}
        </span>
      </div>
    </div>
  );
}

export default function MetricsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.kpi-card-interactive');
    const accents = cardsRef.current.querySelectorAll('.kpi-accent-line');

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(accents, {
        scaleX: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" className="w-full bg-ink">
      <div className="page-gutter section-gap content-max">
        <ScrollReveal>
          <SectionHeader
            overline="// MÉTRICAS CLAVE"
            title="La operación en números"
          />
        </ScrollReveal>

        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {KPI_CARDS.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div
                key={i}
                className="kpi-card-interactive group"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-teal" size={32} />
                </div>
                <div className="mt-4 font-mono text-2xl lg:text-[2rem] font-bold text-ivory leading-tight">
                  <KPITicker
                    value={kpi.value}
                    prefix={kpi.prefix}
                    suffix={kpi.suffix}
                    decimals={kpi.decimals}
                  />
                </div>
                <p className="mt-2 font-label text-ash text-xs">{kpi.label}</p>
                <div className="kpi-accent-line" style={{ transformOrigin: 'left' }} />
              </div>
            );
          })}
        </div>
      </div>

      <MarqueeDataRibbon />
    </section>
  );
}
