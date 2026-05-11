import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutDashboard, Globe, BarChart3, Users, Database, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    icon: Database,
    value: '1,500',
    label: 'Transacciones reales',
    description: 'Registro detallado de pedidos procesados durante el ejercicio fiscal 2025.',
  },
  {
    icon: Globe,
    value: '5',
    label: 'Países',
    description: 'España, México, Argentina, Colombia y Chile. Mercados hispanohablantes con dinámicas comerciales diferenciadas.',
  },
  {
    icon: LayoutDashboard,
    value: '3',
    label: 'Canales de venta',
    description: 'Web, aplicación móvil y tienda física. Análisis omnicanal del recorrido del cliente.',
  },
  {
    icon: BarChart3,
    value: '4',
    label: 'Páginas analíticas',
    description: 'Resumen ejecutivo, productos, geografía y satisfacción. Un dashboard completo en Power BI.',
  },
];

const SCOPE_ITEMS = [
  { icon: Target, text: 'Análisis comercial' },
  { icon: Globe, text: 'Distribución geográfica' },
  { icon: LayoutDashboard, text: 'Evaluación omnicanal' },
  { icon: Users, text: 'Satisfacción del cliente' },
];

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('.intro-reveal'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: '#0A0A0C' }}
    >
      {/* Decorative gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="page-gutter content-max relative z-10" style={{ paddingTop: 'clamp(6rem, 12vh, 12rem)', paddingBottom: 'clamp(4rem, 8vh, 8rem)' }}>
        {/* Header */}
        <div className="intro-reveal mb-4">
          <span className="font-label text-teal tracking-[0.15em]">// SOBRE EL PROYECTO</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column — Company & project description */}
          <div>
            <h2 className="intro-reveal font-display font-display-l text-ivory leading-tight" style={{ textWrap: 'balance' }}>
              NovaMarket Retail
            </h2>

            <p className="intro-reveal mt-6 text-ash leading-relaxed text-base" style={{ textWrap: 'pretty' }}>
              NovaMarket Retail es una empresa ficticia del sector retail que opera a través de un modelo de negocio omnicanal, distribuyendo productos de tecnología y estilo de vida en cinco mercados hispanohablantes. Este proyecto de análisis de datos tiene como objetivo transformar el registro transaccional de 1,500 pedidos en un dashboard ejecutivo capaz de responder preguntas de negocio reales.
            </p>

            <p className="intro-reveal mt-4 text-ash leading-relaxed text-base" style={{ textWrap: 'pretty' }}>
              El entregable principal es un dashboard de cuatro páginas desarrollado en Power BI, complementado con un pipeline de procesamiento en Python que garantiza la integridad, limpieza y estructuración del dataset. El resultado es una herramienta de toma de decisiones que analiza el desempeño por producto, país, canal de venta y nivel de satisfacción del cliente.
            </p>

            {/* Scope pills */}
            <div className="intro-reveal mt-8 flex flex-wrap gap-3">
              {SCOPE_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
                    style={{
                      backgroundColor: 'rgba(13, 148, 136, 0.08)',
                      border: '1px solid rgba(13, 148, 136, 0.2)',
                    }}
                  >
                    <Icon size={16} className="text-teal" />
                    <span className="text-sm text-ivory font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — What you'll find on this page */}
          <div>
            <h3 className="intro-reveal font-display text-xl font-bold text-ivory mb-6">
              Qué encontrarás en esta página
            </h3>

            <div className="intro-reveal space-y-4">
              <div className="card-interactive flex gap-4 p-5 cursor-default">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(13, 148, 136, 0.12)' }}>
                  <span className="font-mono text-teal font-bold text-sm">01</span>
                </div>
                <div>
                  <h4 className="text-ivory font-semibold text-sm">Dashboard interactivo</h4>
                  <p className="text-ash text-xs mt-1 leading-relaxed">Una demo con visualizaciones reales y filtros funcionales que reproduce el contenido del dashboard de Power BI: evolución de ingresos, distribución por país, ranking de productos y análisis de satisfacción.</p>
                </div>
              </div>

              <div className="card-interactive flex gap-4 p-5 cursor-default">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)' }}>
                  <span className="font-mono text-amber font-bold text-sm">02</span>
                </div>
                <div>
                  <h4 className="text-ivory font-semibold text-sm">Análisis por dimensión</h4>
                  <p className="text-ash text-xs mt-1 leading-relaxed">Desglose detallado del rendimiento por geografía, canal de venta y categoría de producto, con datos exactos extraídos del dataset limpio.</p>
                </div>
              </div>

              <div className="card-interactive flex gap-4 p-5 cursor-default">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(20, 184, 166, 0.12)' }}>
                  <span className="font-mono text-teal-glow font-bold text-sm">03</span>
                </div>
                <div>
                  <h4 className="text-ivory font-semibold text-sm">Stack tecnológico y metodología</h4>
                  <p className="text-ash text-xs mt-1 leading-relaxed">Las herramientas utilizadas —Power BI, Python y GitHub— y el proceso de trabajo seguido, desde la validación de datos hasta la visualización ejecutiva.</p>
                </div>
              </div>

              <div className="card-interactive flex gap-4 p-5 cursor-default">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(244, 63, 94, 0.12)' }}>
                  <span className="font-mono text-rose font-bold text-sm">04</span>
                </div>
                <div>
                  <h4 className="text-ivory font-semibold text-sm">Repositorio completo</h4>
                  <p className="text-ash text-xs mt-1 leading-relaxed">Acceso al código fuente, documentación técnica, diccionario de datos, medidas DAX y guion de defensa en el repositorio de GitHub del equipo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="intro-reveal mt-16" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #374151, transparent)' }} />

        {/* Quick highlights row */}
        <div className="intro-reveal mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3" style={{ backgroundColor: 'rgba(13, 148, 136, 0.1)', border: '1px solid rgba(13, 148, 136, 0.2)' }}>
                  <Icon size={18} className="text-teal" />
                </div>
                <div className="font-mono font-bold text-2xl text-ivory">{item.value}</div>
                <div className="font-label text-teal text-[0.65rem] tracking-wider mt-1">{item.label.toUpperCase()}</div>
                <p className="text-ash text-xs mt-2 leading-relaxed max-w-[220px] mx-auto">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom divider */}
        <div className="intro-reveal mt-16" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #374151, transparent)' }} />
      </div>
    </section>
  );
}
