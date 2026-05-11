import SectionHeader from '@/components/SectionHeader';
import ParticleDataField from '@/components/ParticleDataField';
import { ExternalLinkIcon, DownloadIcon } from '@/components/Icons';
import { GITHUB_REPO } from '@/data/projectData';

const STATS = [
  '1,500 pedidos',
  '389 clientes',
  '5 países',
  '3 canales',
  '10 productos',
];

export default function CTASection() {
  return (
    <section id="cta" className="relative w-full bg-ink overflow-hidden">
      {/* Subtle particle background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <ParticleDataField particleCount={30} enableMouse={false} opacity={0.5} />
      </div>

      <div className="relative z-10 page-gutter section-gap content-max text-center">
        <SectionHeader
          overline="// PROYECTO ACADÉMICO"
          title="El código habla"
          subtitle="Explora el repositorio completo con dataset, documentación, medidas DAX y guion de defensa."
          align="center"
        />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-lg"
          >
            Ver en GitHub
            <ExternalLinkIcon size={18} />
          </a>

          <a
            href="./assets/novamarket_retail_limpio.csv"
            download="novamarket_retail_limpio.csv"
            className="inline-flex items-center gap-2 text-ash hover:text-teal transition-all duration-200 font-label cursor-pointer"
          >
            <DownloadIcon size={16} />
            Descargar dataset
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {STATS.map((stat, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />}
              <span className="font-mono-sm text-ash text-sm">{stat}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
