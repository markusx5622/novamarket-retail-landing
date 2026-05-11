import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { TOP_PRODUCTOS, CATEGORIA_DATA } from '@/data/projectData';

gsap.registerPlugin(ScrollTrigger);

export default function ProductPerformanceSection() {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!tableRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(tableRef.current!.querySelectorAll('tbody tr'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: tableRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, tableRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-obsidian">
      <div className="page-gutter section-gap content-max">
        <ScrollReveal>
          <SectionHeader
            overline="// CATÁLOGO"
            title="Top productos"
          />
        </ScrollReveal>

        <div className="mt-12 overflow-x-auto card-interactive">
          <table ref={tableRef} className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '2px solid #374151' }}>
                <th className="font-label text-ash py-4 pr-4 pl-5">Producto</th>
                <th className="font-label text-ash py-4 pr-4">Categoría</th>
                <th className="font-label text-ash py-4 pr-4 text-right">Ingresos</th>
                <th className="font-label text-ash py-4 pr-4 text-right">Pedidos</th>
                <th className="font-label text-ash py-4 pr-5 text-right">Satisfacción</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTOS.map((product, i) => (
                <tr
                  key={i}
                  className="table-row-interactive cursor-default"
                  style={{ borderBottom: '1px solid rgba(55, 65, 81, 0.3)' }}
                >
                  <td className="py-4 pr-4 text-sm font-medium text-ivory row-title pl-5">
                    {product.producto}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-label"
                      style={{
                        backgroundColor: product.categoria === 'Tecnología' ? 'rgba(13, 148, 136, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: product.categoria === 'Tecnología' ? '#0D9488' : '#F59E0B',
                      }}
                    >
                      {product.categoria}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right font-mono-sm text-teal">
                    €{product.ingresos.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                  <td className="py-4 pr-4 text-right text-ash text-sm">
                    {product.pedidos}
                  </td>
                  <td className="py-4 pr-5 text-right text-sm">
                    <span className={product.satisfaccion >= 3.9 ? 'text-teal' : 'text-amber'}>
                      {product.satisfaccion.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Insight strip */}
        <div className="card-interactive p-6 mt-8 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
          <span className="text-ash">Tecnología concentra el</span>
          <span className="font-display font-bold text-teal font-display-l">86%</span>
          <span className="text-ash">de los ingresos totales</span>
          <span className="hidden md:inline text-fog mx-2">|</span>
          <span className="font-mono-sm text-ash text-sm">
            €{(CATEGORIA_DATA.tecnologia.ingresos / 1000).toFixed(0)}K vs €{(CATEGORIA_DATA.estiloVida.ingresos / 1000).toFixed(0)}K
          </span>
        </div>
      </div>
    </section>
  );
}
