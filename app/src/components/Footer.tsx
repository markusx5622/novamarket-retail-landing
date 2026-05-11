import { GITHUB_REPO } from '@/data/projectData';
import { GitHubIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="w-full bg-ink" style={{ borderTop: '1px solid #374151' }}>
      <div className="page-gutter py-12 content-max">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr] gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-lg text-ivory">NovaMarket Retail</h3>
            <p className="mt-2 text-sm text-ash">Análisis de datos para retail omnicanal</p>
          </div>

          {/* Project links */}
          <div>
            <h4 className="font-label text-ash mb-4">Proyecto</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ash hover:text-teal transition-colors duration-300 flex items-center gap-2"
                >
                  <GitHubIcon size={16} /> GitHub
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-sm text-ash hover:text-teal transition-colors duration-300">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-sm text-ash hover:text-teal transition-colors duration-300">
                  Métricas
                </a>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="font-label text-ash mb-4">Equipo</h4>
            <p className="text-sm text-ash">Equipo 9</p>
            <p className="text-sm text-ash">Grado en Ingeniería</p>
            <p className="text-sm text-ash mt-1">Proyecto: Análisis de Datos</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(55, 65, 81, 0.5)' }}>
          <p className="font-label text-ash text-xs">
            © 2025 NovaMarket Retail. Proyecto académico.
          </p>
          <p className="font-mono-sm text-teal text-xs">
            Dataset: 1,500 pedidos · 389 clientes · 5 países
          </p>
        </div>
      </div>
    </footer>
  );
}
