import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, LabelList,
} from 'recharts';
import dashboardData from '@/data/dashboardData.json';

/* ─── TYPES ─── */
type TabKey = 'resumen' | 'productos' | 'geo' | 'satisfaccion';

/* ─── COLORS (Power BI inspired) ─── */
const C = {
  navy: '#1A3A5C', teal: '#0D9488', tealGlow: '#14B8A6',
  blue: '#2563EB', green: '#4A9B5E', greenBright: '#16A34A',
  orange: '#EA580C', gold: '#F5A623', red: '#C75C3A',
  pink: '#B86BAE', darkGreen: '#2D6A4F', lifesty: '#6B7280',
  ivory: '#F5F5F0', ash: '#6B7280', fog: '#374151',
  slate: '#1A1A20', ink: '#111114', obsidian: '#0A0A0C',
};

const COUNTRY_COLORS: Record<string, string> = {
  'España': C.gold, 'México': C.green, 'Argentina': C.red,
  'Colombia': C.darkGreen, 'Chile': C.pink,
};
const CHANNEL_COLORS: Record<string, string> = {
  'Web': C.blue, 'App': C.greenBright, 'Tienda Física': C.orange,
};
/* ─── TAB CONFIG ─── */
const TABS: { key: TabKey; label: string; subtitle: string }[] = [
  { key: 'resumen', label: 'Resumen Ejecutivo 2025', subtitle: 'Visión global del rendimiento comercial, geográfico y omnicanal' },
  { key: 'productos', label: 'Productos y Categorías', subtitle: 'Análisis del rendimiento comercial y satisfacción del catálogo' },
  { key: 'geo', label: 'Países y Canales', subtitle: 'Comparativa geográfica y omnicanal para priorización regional' },
  { key: 'satisfaccion', label: 'Satisfacción y Logística', subtitle: 'Calidad del crecimiento: experiencia del cliente y presión logística' },
];

const PAISES = ['Todos', ...dashboardData.country.map((c: any) => c.pais)];
const CATEGORIAS = ['Todos', ...dashboardData.category.map((c: any) => c.categoria)];
const CANALES = ['Todos', ...dashboardData.channel.map((c: any) => c.canal)];

/* ─── DATA TABLES ─── */
const TOP10_PRODUCTOS = [
  { producto: 'Auriculares Noise-Cancelling', categoria: 'Tecnología',       ingresos: 204888.08, unidades: 307, satisfaccion: 3.99, costeEnvio: 7768.66 },
  { producto: 'Laptop Pro 15',                categoria: 'Tecnología',       ingresos: 203237.87, unidades: 308, satisfaccion: 3.82, costeEnvio: 8222.96 },
  { producto: 'Monitor 4K Curved',            categoria: 'Tecnología',       ingresos: 197869.50, unidades: 278, satisfaccion: 3.92, costeEnvio: 7926.04 },
  { producto: 'Smartwatch Series Z',          categoria: 'Tecnología',       ingresos: 196056.29, unidades: 297, satisfaccion: 3.99, costeEnvio: 7478.17 },
  { producto: 'Smartphone Alpha',             categoria: 'Tecnología',       ingresos: 191084.51, unidades: 289, satisfaccion: 3.86, costeEnvio: 7678.66 },
  { producto: 'Set de Teclado Mecánico',      categoria: 'Estilo de Vida',   ingresos: 36846.46,  unidades: 212, satisfaccion: 3.92, costeEnvio: 959.32  },
  { producto: 'Botella Térmica Inteligente',  categoria: 'Estilo de Vida',   ingresos: 36407.13,  unidades: 210, satisfaccion: 3.77, costeEnvio: 969.29  },
  { producto: 'Mochila Ergonómica',           categoria: 'Estilo de Vida',   ingresos: 34855.16,  unidades: 189, satisfaccion: 3.99, costeEnvio: 871.83  },
  { producto: 'Silla Gaming X',               categoria: 'Estilo de Vida',   ingresos: 28452.24,  unidades: 178, satisfaccion: 3.83, costeEnvio: 827.19  },
  { producto: 'Lámpara LED Escritorio',       categoria: 'Estilo de Vida',   ingresos: 25263.97,  unidades: 172, satisfaccion: 3.98, costeEnvio: 780.95  },
];

const BOTTOM_SAT = [
  { producto: 'Silla Gaming X',              canal: 'Tienda Física', sat: 3.630, costeEnvio: 7264.00,  ingresos: 6694.03,  pedidos: 27 },
  { producto: 'Botella Térmica Inteligente', canal: 'Web',           sat: 3.667, costeEnvio: 7617.00,  ingresos: 17117.27, pedidos: 63 },
  { producto: 'Botella Térmica Inteligente', canal: 'App',           sat: 3.688, costeEnvio: 7173.00,  ingresos: 13962.37, pedidos: 48 },
  { producto: 'Smartphone Alpha',            canal: 'App',           sat: 3.712, costeEnvio: 41858.00, ingresos: 53739.49, pedidos: 52 },
  { producto: 'Lámpara LED Escritorio',      canal: 'App',           sat: 3.725, costeEnvio: 7246.00,  ingresos: 10821.23, pedidos: 40 },
  { producto: 'Laptop Pro 15',               canal: 'Web',           sat: 3.750, costeEnvio: 44001.00, ingresos: 107863.43,pedidos: 96 },
  { producto: 'Smartphone Alpha',            canal: 'Tienda Física', sat: 3.769, costeEnvio: 37854.00, ingresos: 33716.30, pedidos: 39 },
];

const MATRIZ = [
  { pais: 'Argentina', appI: 32557.90, appP: 80,  appS: 4.11, tiendaI: 29761.36, tiendaP: 41, tiendaS: 3.93, webI: 81364.54,  webP: 103, webS: 3.99, totalI: 170683.80, totalP: 224, totalS: 4.02 },
  { pais: 'Chile',     appI: 28822.60, appP: 43,  appS: 3.81, tiendaI: 29462.42, tiendaP: 36, tiendaS: 4.19, webI: 74119.86,  webP: 79,  webS: 3.76, totalI: 132404.88, totalP: 158, totalS: 3.87 },
  { pais: 'Colombia',  appI: 32729.66, appP: 52,  appS: 3.77, tiendaI: 32680.44, tiendaP: 49, tiendaS: 4.10, webI: 99117.59,  webP: 112, webS: 3.88, totalI: 164527.69, totalP: 213, totalS: 3.91 },
  { pais: 'España',    appI: 115558.71,appP: 163, appS: 3.77, tiendaI: 90490.92, tiendaP: 125,tiendaS: 3.88, webI: 241222.63, webP: 298,webS: 3.98, totalI: 447272.26, totalP: 586, totalS: 3.90 },
  { pais: 'México',    appI: 79596.22, appP: 100, appS: 3.87, tiendaI: 49069.47, tiendaP: 59, tiendaS: 3.93, webI: 111406.89, webP: 160,webS: 3.81, totalI: 240072.58, totalP: 319, totalS: 3.85 },
];
const MATRIZ_TOTAL = { appI: 289265.09, appP: 438, appS: 3.86, tiendaI: 231464.61, tiendaP: 310, tiendaS: 3.97, webI: 607231.51, webP: 752, webS: 3.91, totalI: 1154961.21, totalP: 1500, totalS: 3.91 };

const SAT_DIST = [
  { p: 1, c: 73 }, { p: 2, c: 154 }, { p: 3, c: 233 }, { p: 4, c: 422 }, { p: 5, c: 618 },
];

const SCATTER_DATA = [
  { producto: 'Auriculares NC',    categoria: 'Tecnología',     sat: 3.99, ingresos: 204888, unidades: 307 },
  { producto: 'Laptop Pro 15',     categoria: 'Tecnología',     sat: 3.82, ingresos: 203238, unidades: 308 },
  { producto: 'Monitor 4K',        categoria: 'Tecnología',     sat: 3.92, ingresos: 197870, unidades: 278 },
  { producto: 'Smartwatch Z',      categoria: 'Tecnología',     sat: 3.99, ingresos: 196056, unidades: 297 },
  { producto: 'Smartphone Alpha',  categoria: 'Tecnología',     sat: 3.86, ingresos: 191085, unidades: 289 },
  { producto: 'Teclado Mecánico',  categoria: 'Estilo de Vida', sat: 3.92, ingresos: 36846,  unidades: 212 },
  { producto: 'Botella Térmica',   categoria: 'Estilo de Vida', sat: 3.77, ingresos: 36407,  unidades: 210 },
  { producto: 'Mochila Ergo',      categoria: 'Estilo de Vida', sat: 3.99, ingresos: 34855,  unidades: 189 },
  { producto: 'Silla Gaming X',    categoria: 'Estilo de Vida', sat: 3.83, ingresos: 28452,  unidades: 178 },
  { producto: 'Lámpara LED',       categoria: 'Estilo de Vida', sat: 3.98, ingresos: 25264,  unidades: 172 },
];

/* ─── FORMATTERS ─── */
const fEuro = (v: number) => '€' + v.toLocaleString('es-ES', { maximumFractionDigits: 0 });
const fEuroD = (v: number) => '€' + v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─── COMPONENTS ─── */
function ChartCard({ title, subtitle, children, className = '' }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`card-interactive p-5 ${className}`}>
      <h3 className="font-display font-semibold text-ivory text-sm">{title}</h3>
      {subtitle && <p className="text-ash text-xs mt-0.5 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-3" />}
      {children}
    </div>
  );
}

function KPICard({ label, value, color = C.teal }: { label: string; value: string; color?: string }) {
  return (
    <div className="card-interactive p-4 cursor-default">
      <p className="font-mono font-bold text-xl" style={{ color }}>{value}</p>
      <p className="font-label text-ash text-[0.6rem] tracking-wider mt-1">{label.toUpperCase()}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label, valueFormatter = (v: number) => String(v) }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg px-3 py-2 text-xs shadow-2xl" style={{ backgroundColor: C.ink, border: `1px solid ${C.fog}` }}>
      {label !== undefined && <p className="text-ash mb-1 font-medium">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-mono" style={{ color: p.color || C.ivory }}>
          {p.name}: {valueFormatter(p.value)}
        </p>
      ))}
    </div>
  );
}

function DashHeader({ activeTab }: { activeTab: TabKey }) {
  const tab = TABS.find(t => t.key === activeTab)!;
  return (
    <div className="flex items-center gap-3 mb-6">
      <img src="./assets/nova_market_retail_logo.png" alt="NovaMarket" className="h-10 w-auto" />
      <div>
        <h2 className="font-display font-bold text-lg text-ivory leading-tight">NovaMarket Retail — {tab.label}</h2>
        <p className="text-ash text-xs italic">{tab.subtitle}</p>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>('resumen');
  const [filterPais, setFilterPais] = useState('Todos');
  const [filterCat, setFilterCat] = useState('Todos');
  const [filterCanal, setFilterCanal] = useState('Todos');

  /* ---- Filtered data ---- */
  const fCountry = useMemo(() =>
    filterPais === 'Todos' ? [...dashboardData.country] : (dashboardData.country as any[]).filter((c: any) => c.pais === filterPais),
    [filterPais]);

  const fChannel = useMemo(() =>
    filterCanal === 'Todos' ? [...dashboardData.channel] : (dashboardData.channel as any[]).filter((c: any) => c.canal === filterCanal),
    [filterCanal]);

  const fMonthly = useMemo(() => {
    let ratio = 1;
    if (filterPais !== 'Todos') {
      const c = (dashboardData.country as any[]).find((x: any) => x.pais === filterPais);
      ratio = c ? c.ingresos / dashboardData.total_revenue : 1;
    }
    if (filterCanal !== 'Todos') {
      const ch = (dashboardData.channel as any[]).find((x: any) => x.canal === filterCanal);
      ratio *= ch ? ch.ingresos / dashboardData.total_revenue : 1;
    }
    return (dashboardData.monthly as any[]).filter((m: any) => m.ingresos > 0).map((m: any) => ({ ...m, ingresos: Math.round(m.ingresos * ratio) }));
  }, [filterPais, filterCanal]);

  /* ─── TAB 01: RESUMEN ─── */
  const TabResumen = () => (
    <div className="animate-in fade-in duration-500">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <KPICard label="Ingresos Brutos" value="1,15 mil.€" color={C.teal} />
        <KPICard label="Pedidos" value="1500" color={C.ivory} />
        <KPICard label="Clientes Únicos" value="389" color={C.ivory} />
        <KPICard label="Coste Total Envío" value="43,48 mil€" color={C.orange} />
        <KPICard label="Satisfacción Media" value="3,91" color={C.teal} />
        <KPICard label="Unidades Vendidas" value="2 mil" color={C.ivory} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Monthly line */}
        <ChartCard title="Evolución mensual de ingresos">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={fMonthly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
              <XAxis dataKey="mes" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} angle={-30} textAnchor="end" height={50} />
              <YAxis stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + 'K'} width={35} />
              <Tooltip content={<CustomTooltip valueFormatter={fEuro} />} />
              <Line type="monotone" dataKey="ingresos" name="Ingresos" stroke={C.teal} strokeWidth={2.5} dot={{ r: 3, fill: C.teal }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Country bars */}
        <ChartCard title="Ingresos brutos por país">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fCountry.sort((a: any, b: any) => b.ingresos - a.ingresos)} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} horizontal={false} />
              <XAxis type="number" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(2) + ' mil.€'} />
              <YAxis dataKey="pais" type="category" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} width={65} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => (v / 1000).toFixed(0) + ' mil €'} />} />
              <Bar dataKey="ingresos" name="Ingresos" radius={[0, 4, 4, 0]} barSize={20}>
                {fCountry.map((entry: any, i: number) => <Cell key={i} fill={COUNTRY_COLORS[entry.pais] || C.navy} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Channel bars */}
        <ChartCard title="Ingresos por canal">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fChannel} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
              <XAxis dataKey="canal" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(1) + 'K'} width={40} />
              <Tooltip content={<CustomTooltip valueFormatter={fEuro} />} />
              <Bar dataKey="ingresos" name="Ingresos" radius={[4, 4, 0, 0]} barSize={50}>
                {fChannel.map((entry: any, i: number) => <Cell key={i} fill={CHANNEL_COLORS[entry.canal] || C.blue} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category donut */}
        <ChartCard title="Ingresos brutos por categoría">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={dashboardData.category as any[]} dataKey="ingresos" nameKey="categoria" cx="40%" cy="50%" outerRadius={80} innerRadius={50} stroke={C.slate} strokeWidth={2}
                label={({ percent }: any) => `${(percent * 100).toFixed(2)}%`}>
                {(dashboardData.category as any[]).map((_e: any, i: number) => (
                  <Cell key={i} fill={i === 0 ? C.blue : C.navy} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip valueFormatter={fEuro} />} />
              <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" iconSize={8}
                formatter={(v: string) => <span className="text-ash text-xs">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top 10 Table */}
      <ChartCard title="Top 10 productos por ingresos">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.fog}` }}>
                <th className="font-label text-ash py-2 pr-3">PRODUCTO</th>
                <th className="font-label text-ash py-2 pr-3 text-right">INGRESOS BRUTOS</th>
                <th className="font-label text-ash py-2 pr-3 text-right">UNIDADES</th>
                <th className="font-label text-ash py-2 pr-3 text-right">SAT.</th>
                <th className="font-label text-ash py-2 text-right">COSTE ENVÍO</th>
              </tr>
            </thead>
            <tbody>
              {TOP10_PRODUCTOS.map((p, i) => (
                <tr key={i} className="table-row-interactive" style={{ borderBottom: `1px solid rgba(55,65,81,0.3)` }}>
                  <td className="py-2 pr-3 text-ivory row-title">{p.producto}</td>
                  <td className="py-2 pr-3 text-right font-mono text-teal">{fEuroD(p.ingresos)}</td>
                  <td className="py-2 pr-3 text-right text-ash">{p.unidades}</td>
                  <td className="py-2 pr-3 text-right" style={{ color: p.satisfaccion >= 3.9 ? C.teal : C.gold }}>{p.satisfaccion.toFixed(2)}</td>
                  <td className="py-2 text-right font-mono text-ash">{fEuroD(p.costeEnvio)}</td>
                </tr>
              ))}
              <tr style={{ borderTop: `2px solid ${C.fog}` }}>
                <td className="py-2 pr-3 font-bold text-ivory">Total</td>
                <td className="py-2 pr-3 text-right font-mono font-bold text-teal">{fEuroD(1154961.21)}</td>
                <td className="py-2 pr-3 text-right font-bold text-ivory">2440</td>
                <td className="py-2 pr-3 text-right font-bold" style={{ color: C.teal }}>3,91</td>
                <td className="py-2 text-right font-mono font-bold text-ash">{fEuroD(43483.07)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );

  /* ─── TAB 02: PRODUCTOS ─── */
  const TabProductos = () => (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <KPICard label="Ingresos Tecnología" value="993,14 mil€" color={C.blue} />
        <KPICard label="Ingresos Estilo de Vida" value="161,82 mil€" color={C.lifesty} />
        <KPICard label="Promedio x Producto" value="115,50 mil" color={C.ivory} />
        <KPICard label="Ticket Medio" value="769,97 €" color={C.ivory} />
        <KPICard label="% Satisfacción Alta" value="69,33%" color={C.teal} />
        <KPICard label="Coste Envío Relativo" value="3,76%" color={C.orange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Top 10 products */}
        <ChartCard title="Top 10 productos por ingresos">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={TOP10_PRODUCTOS.slice(0, 7)} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} horizontal={false} />
              <XAxis type="number" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + ' mil €'} />
              <YAxis dataKey="producto" type="category" stroke={C.ivory} fontSize={10} tickLine={false} axisLine={false} width={150}
                tickFormatter={(v: string) => v.length > 18 ? v.slice(0, 18) + '…' : v} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => (v / 1000).toFixed(0) + ' mil €'} />} />
              <Bar dataKey="ingresos" name="Ingresos" fill={C.navy} radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Scatter: Ingresos vs Satisfacción */}
        <ChartCard title="Ingresos vs satisfacción por producto">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={SCATTER_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
              <XAxis dataKey="sat" name="Satisfacción" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} domain={[3.7, 4.1]} label={{ value: 'Satisfacción Media', position: 'insideBottom', offset: -2, style: { fill: C.ash, fontSize: 10 } }} />
              <YAxis dataKey="ingresos" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + ' mil €'} width={45} label={{ value: 'Ingresos Brutos', angle: -90, position: 'insideLeft', offset: 10, style: { fill: C.ash, fontSize: 10 } }} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => typeof v === 'number' && v > 1000 ? fEuro(v) : v.toFixed(2)} />} />
              <Legend verticalAlign="top" height={20} iconType="circle" iconSize={7} formatter={(v: string) => <span className="text-ash text-[10px]">{v}</span>} />
              <Line type="monotone" dataKey="ingresos" name="Tecnología" stroke="transparent" dot={(props: any) => {
                const d = SCATTER_DATA[props.index];
                if (!d || d.categoria !== 'Tecnología') return <circle cx={props.cx} cy={props.cy} r={0} />;
                return <circle cx={props.cx} cy={props.cy} r={6} fill={C.blue} opacity={0.85} />;
              }} />
              <Line type="monotone" dataKey="ingresos" name="Estilo de Vida" stroke="transparent" dot={(props: any) => {
                const d = SCATTER_DATA[props.index];
                if (!d || d.categoria !== 'Estilo de Vida') return <circle cx={props.cx} cy={props.cy} r={0} />;
                return <circle cx={props.cx} cy={props.cy} r={6} fill={C.lifesty} opacity={0.85} />;
              }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Category bars */}
        <ChartCard title="Ingresos brutos por categoría">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dashboardData.category as any[]} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
              <XAxis dataKey="categoria" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(2) + ' mil.€'} width={50} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => (v / 1000).toFixed(2) + ' mil.€'} />} />
              <Bar dataKey="ingresos" name="Ingresos" radius={[4, 4, 0, 0]} barSize={60}>
                {(dashboardData.category as any[]).map((_: any, i: number) => <Cell key={i} fill={i === 0 ? C.blue : C.navy} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top by units */}
        <ChartCard title="Top 10 productos por unidades vendidas">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[...TOP10_PRODUCTOS].sort((a, b) => b.unidades - a.unidades).slice(0, 5)} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} horizontal={false} />
              <XAxis type="number" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis dataKey="producto" type="category" stroke={C.ivory} fontSize={10} tickLine={false} axisLine={false} width={150}
                tickFormatter={(v: string) => v.length > 18 ? v.slice(0, 18) + '…' : v} />
              <Tooltip />
              <Bar dataKey="unidades" name="Unidades" fill={C.blue} radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Detail table */}
      <ChartCard title="Detalle de productos principales">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.fog}` }}>
                <th className="font-label text-ash py-2 pr-2">PRODUCTO</th>
                <th className="font-label text-ash py-2 pr-2">CAT.</th>
                <th className="font-label text-ash py-2 pr-2 text-right">INGRESOS</th>
                <th className="font-label text-ash py-2 pr-2 text-right">UNID.</th>
                <th className="font-label text-ash py-2 pr-2 text-right">SAT.</th>
                <th className="font-label text-ash py-2 pr-2 text-right">COSTE ENV.</th>
                <th className="font-label text-ash py-2 text-right">COSTE %</th>
              </tr>
            </thead>
            <tbody>
              {[...TOP10_PRODUCTOS].sort((a, b) => a.producto.localeCompare(b.producto)).map((p, i) => (
                <tr key={i} className="table-row-interactive" style={{ borderBottom: `1px solid rgba(55,65,81,0.3)` }}>
                  <td className="py-2 pr-2 text-ivory row-title">{p.producto}</td>
                  <td className="py-2 pr-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-label" style={{ backgroundColor: p.categoria === 'Tecnología' ? 'rgba(37,99,235,0.12)' : 'rgba(107,114,128,0.12)', color: p.categoria === 'Tecnología' ? C.blue : C.lifesty }}>{p.categoria}</span>
                  </td>
                  <td className="py-2 pr-2 text-right font-mono text-teal">{fEuroD(p.ingresos)}</td>
                  <td className="py-2 pr-2 text-right text-ash">{p.unidades}</td>
                  <td className="py-2 pr-2 text-right" style={{ color: p.satisfaccion >= 3.9 ? C.teal : C.gold }}>{p.satisfaccion.toFixed(2)}</td>
                  <td className="py-2 pr-2 text-right font-mono text-ash">{fEuroD(p.costeEnvio)}</td>
                  <td className="py-2 text-right font-mono text-ash">{((p.costeEnvio / p.ingresos) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );

  /* ─── TAB 03: GEO ─── */
  const TabGeo = () => {
    const stackedData = (dashboardData.country as any[]).map((c: any) => {
      const m = MATRIZ.find(x => x.pais === c.pais)!;
      return { pais: c.pais, App: m.appI, 'Tienda Física': m.tiendaI, Web: m.webI };
    });
    return (
      <div className="animate-in fade-in duration-500">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <KPICard label="Nº Países" value="5" color={C.ivory} />
          <KPICard label="Nº Canales" value="3" color={C.ivory} />
          <KPICard label="Ingreso Medio/País" value="230,99 mil€" color={C.teal} />
          <KPICard label="Pedidos" value="1500" color={C.ivory} />
          <KPICard label="Satisfacción Media" value="3,91" color={C.teal} />
          <KPICard label="Coste Envío Relativo" value="3,76%" color={C.orange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Country bars with distinct colors */}
          <ChartCard title="Ingresos brutos por país">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={fCountry.sort((a: any, b: any) => b.ingresos - a.ingresos)} layout="vertical" margin={{ top: 5, right: 35, left: 5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} horizontal={false} />
                <XAxis type="number" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + ' mil €'} />
                <YAxis dataKey="pais" type="category" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} width={65} />
                <Tooltip content={<CustomTooltip valueFormatter={(v: number) => (v / 1000).toFixed(0) + ' mil €'} />} />
                <Bar dataKey="ingresos" name="Ingresos" radius={[0, 4, 4, 0]} barSize={24}>
                  {fCountry.map((entry: any, i: number) => <Cell key={i} fill={COUNTRY_COLORS[entry.pais] || C.navy} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Stacked: Country x Channel */}
          <ChartCard title="Ingresos por país y canal">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stackedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
                <XAxis dataKey="pais" stroke={C.ivory} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => (v / 1000).toFixed(0) + 'K'} width={35} />
                <Tooltip content={<CustomTooltip valueFormatter={fEuro} />} />
                <Legend iconType="circle" iconSize={7} formatter={(v: string) => <span className="text-ash text-[10px]">{v}</span>} />
                <Bar dataKey="App" stackId="a" fill={C.greenBright} radius={[0, 0, 0, 0]} />
                <Bar dataKey="Tienda Física" stackId="a" fill={C.green} radius={[0, 0, 0, 0]} />
                <Bar dataKey="Web" stackId="a" fill={C.gold} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Pedidos por país */}
          <ChartCard title="Pedidos por país">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={fCountry.sort((a: any, b: any) => b.pedidos - a.pedidos)} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
                <XAxis dataKey="pais" stroke={C.ivory} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} width={35} />
                <Tooltip />
                <Bar dataKey="pedidos" name="Pedidos" radius={[4, 4, 0, 0]} barSize={40}>
                  {fCountry.map((entry: any, i: number) => <Cell key={i} fill={COUNTRY_COLORS[entry.pais] || C.navy} />)}
                </Bar>
                <LabelList dataKey="pedidos" position="top" fill={C.ivory} fontSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Satisfacción por país */}
          <ChartCard title="Satisfacción media por país">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={[...dashboardData.satisfactionByCountry as any[]].sort((a: any, b: any) => b.satisfaccion - a.satisfaccion)} layout="vertical" margin={{ top: 5, right: 20, left: 5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} horizontal={false} />
                <XAxis type="number" domain={[3.7, 4.1]} stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis dataKey="pais" type="category" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} width={65} />
                <Tooltip content={<CustomTooltip valueFormatter={(v: number) => v.toFixed(2)} />} />
                <Bar dataKey="satisfaccion" name="Satisfacción" fill={C.green} radius={[0, 4, 4, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Matrix table */}
        <ChartCard title="Matriz de rendimiento por país y canal">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr>
                  <th rowSpan={2} className="font-label text-ash py-2 pr-2 border-b-2 border-r" style={{ borderColor: C.fog }}>PAÍS</th>
                  <th colSpan={3} className="font-label text-ash py-1 px-2 text-center border-b" style={{ borderColor: C.fog, color: C.greenBright }}>APP</th>
                  <th colSpan={3} className="font-label text-ash py-1 px-2 text-center border-b" style={{ borderColor: C.fog, color: C.green }}>TIENDA FÍSICA</th>
                  <th colSpan={3} className="font-label text-ash py-1 px-2 text-center border-b" style={{ borderColor: C.fog, color: C.gold }}>WEB</th>
                  <th colSpan={3} className="font-label text-ash py-1 px-2 text-center border-b" style={{ borderColor: C.fog, color: C.teal }}>TOTAL</th>
                </tr>
                <tr style={{ borderBottom: `2px solid ${C.fog}` }}>
                  <th className="font-label text-ash py-1 px-1 text-right">Ingr.</th><th className="font-label text-ash py-1 px-1 text-right">Ped.</th><th className="font-label text-ash py-1 px-1 text-right pr-2 border-r" style={{ borderColor: C.fog }}>Sat.</th>
                  <th className="font-label text-ash py-1 px-1 text-right">Ingr.</th><th className="font-label text-ash py-1 px-1 text-right">Ped.</th><th className="font-label text-ash py-1 px-1 text-right pr-2 border-r" style={{ borderColor: C.fog }}>Sat.</th>
                  <th className="font-label text-ash py-1 px-1 text-right">Ingr.</th><th className="font-label text-ash py-1 px-1 text-right">Ped.</th><th className="font-label text-ash py-1 px-1 text-right pr-2 border-r" style={{ borderColor: C.fog }}>Sat.</th>
                  <th className="font-label text-ash py-1 px-1 text-right">Ingr.</th><th className="font-label text-ash py-1 px-1 text-right">Ped.</th><th className="font-label text-ash py-1 px-1 text-right">Sat.</th>
                </tr>
              </thead>
              <tbody>
                {MATRIZ.map((m, i) => (
                  <tr key={i} className="table-row-interactive" style={{ borderBottom: `1px solid rgba(55,65,81,0.2)` }}>
                    <td className="py-1.5 pr-2 text-ivory font-medium border-r" style={{ borderColor: C.fog }}>{m.pais}</td>
                    <td className="py-1.5 px-1 text-right font-mono text-ash">{fEuroD(m.appI)}</td><td className="py-1.5 px-1 text-right text-ash">{m.appP}</td><td className="py-1.5 px-1 text-right text-ash pr-2 border-r" style={{ borderColor: C.fog }}>{m.appS.toFixed(2)}</td>
                    <td className="py-1.5 px-1 text-right font-mono text-ash">{fEuroD(m.tiendaI)}</td><td className="py-1.5 px-1 text-right text-ash">{m.tiendaP}</td><td className="py-1.5 px-1 text-right text-ash pr-2 border-r" style={{ borderColor: C.fog }}>{m.tiendaS.toFixed(2)}</td>
                    <td className="py-1.5 px-1 text-right font-mono text-ash">{fEuroD(m.webI)}</td><td className="py-1.5 px-1 text-right text-ash">{m.webP}</td><td className="py-1.5 px-1 text-right text-ash pr-2 border-r" style={{ borderColor: C.fog }}>{m.webS.toFixed(2)}</td>
                    <td className="py-1.5 px-1 text-right font-mono font-bold text-teal">{fEuroD(m.totalI)}</td><td className="py-1.5 px-1 text-right font-bold text-ivory">{m.totalP}</td><td className="py-1.5 px-1 text-right font-bold" style={{ color: C.teal }}>{m.totalS.toFixed(2)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: `2px solid ${C.fog}` }}>
                  <td className="py-1.5 pr-2 font-bold text-ivory border-r" style={{ borderColor: C.fog }}>Total</td>
                  <td className="py-1.5 px-1 text-right font-mono font-bold text-ash">{fEuroD(MATRIZ_TOTAL.appI)}</td><td className="py-1.5 px-1 text-right font-bold text-ivory">{MATRIZ_TOTAL.appP}</td><td className="py-1.5 px-1 text-right font-bold text-ivory pr-2 border-r" style={{ borderColor: C.fog }}>{MATRIZ_TOTAL.appS.toFixed(2)}</td>
                  <td className="py-1.5 px-1 text-right font-mono font-bold text-ash">{fEuroD(MATRIZ_TOTAL.tiendaI)}</td><td className="py-1.5 px-1 text-right font-bold text-ivory">{MATRIZ_TOTAL.tiendaP}</td><td className="py-1.5 px-1 text-right font-bold text-ivory pr-2 border-r" style={{ borderColor: C.fog }}>{MATRIZ_TOTAL.tiendaS.toFixed(2)}</td>
                  <td className="py-1.5 px-1 text-right font-mono font-bold text-ash">{fEuroD(MATRIZ_TOTAL.webI)}</td><td className="py-1.5 px-1 text-right font-bold text-ivory">{MATRIZ_TOTAL.webP}</td><td className="py-1.5 px-1 text-right font-bold text-ivory pr-2 border-r" style={{ borderColor: C.fog }}>{MATRIZ_TOTAL.webS.toFixed(2)}</td>
                  <td className="py-1.5 px-1 text-right font-mono font-bold text-teal">{fEuroD(MATRIZ_TOTAL.totalI)}</td><td className="py-1.5 px-1 text-right font-bold text-ivory">{MATRIZ_TOTAL.totalP}</td><td className="py-1.5 px-1 text-right font-bold text-teal">{MATRIZ_TOTAL.totalS.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    );
  };

  /* ─── TAB 04: SATISFACCIÓN ─── */
  const TabSatisfaccion = () => (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <KPICard label="Satisfacción Media" value="3,91" color={C.teal} />
        <KPICard label="% Satisfacción Alta" value="69,33%" color={C.teal} />
        <KPICard label="Coste Medio Envío" value="28,99 €" color={C.orange} />
        <KPICard label="Coste Envío Relativo" value="3,76%" color={C.orange} />
        <KPICard label="Pedidos" value="1500" color={C.ivory} />
        <KPICard label="Ingresos Brutos" value="1,15 mil.€" color={C.teal} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Satisfacción por canal */}
        <ChartCard title="Satisfacción media por canal">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dashboardData.satisfactionByChannel as any[]} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} horizontal={false} />
              <XAxis type="number" domain={[3.7, 4.1]} stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis dataKey="canal" type="category" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} width={85} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => v.toFixed(2)} />} />
              <Bar dataKey="satisfaccion" name="Satisfacción" radius={[0, 4, 4, 0]} barSize={24}>
                {(dashboardData.satisfactionByChannel as any[]).map((entry: any, i: number) => <Cell key={i} fill={CHANNEL_COLORS[entry.canal] || C.blue} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Coste envío por canal */}
        <ChartCard title="Coste medio de envío por canal">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dashboardData.channel as any[]} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} horizontal={false} />
              <XAxis type="number" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v: number) => v.toFixed(0) + ' €'} />
              <YAxis dataKey="canal" type="category" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} width={85} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => v.toFixed(2) + ' €'} />} />
              <Bar dataKey="costeMedioEnvio" name="Coste Medio" radius={[0, 4, 4, 0]} barSize={24}>
                {(dashboardData.channel as any[]).map((entry: any, i: number) => <Cell key={i} fill={CHANNEL_COLORS[entry.canal] || C.blue} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Distribución puntuaciones */}
        <ChartCard title="Distribución de valoraciones de satisfacción">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SAT_DIST} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
              <XAxis dataKey="p" name="Puntuación" stroke={C.ivory} fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Puntuación Satisfacción', position: 'insideBottom', offset: -5, style: { fill: C.ash, fontSize: 10 } }} />
              <YAxis stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} width={35} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => v.toLocaleString('es-ES')} />} />
              <Bar dataKey="c" name="Valores" fill={C.navy} radius={[4, 4, 0, 0]} barSize={45}>
                <LabelList dataKey="c" position="top" fill={C.ivory} fontSize={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Scatter: Coste vs Satisfacción por país */}
        <ChartCard title="Relación coste logístico y satisfacción por país">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dashboardData.satisfactionByCountry as any[]} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.fog} opacity={0.25} />
              <XAxis dataKey="costeMedioEnvio" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} domain={[27, 31]} label={{ value: 'Coste Medio Envío (€)', position: 'insideBottom', offset: -10, style: { fill: C.ash, fontSize: 10 } }} />
              <YAxis dataKey="satisfaccion" stroke={C.ash} fontSize={10} tickLine={false} axisLine={false} domain={[3.7, 4.1]} label={{ value: 'Satisfacción Media', angle: -90, position: 'insideLeft', offset: 10, style: { fill: C.ash, fontSize: 10 } }} />
              <Tooltip content={<CustomTooltip valueFormatter={(v: number) => typeof v === 'number' && v < 10 ? v.toFixed(2) : fEuro(v)} />} />
              <Line type="monotone" dataKey="satisfaccion" stroke="transparent" dot={(props: any) => {
                const d = (dashboardData.satisfactionByCountry as any[])[props.index];
                return <circle cx={props.cx} cy={props.cy} r={7} fill={COUNTRY_COLORS[d?.pais] || C.navy} opacity={0.85} />;
              }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bottom satisfaction table */}
      <ChartCard title="Combinaciones producto-canal con menor satisfacción">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.fog}` }}>
                <th className="font-label text-ash py-2 pr-2">PRODUCTO</th>
                <th className="font-label text-ash py-2 pr-2">CANAL</th>
                <th className="font-label text-ash py-2 pr-2 text-right">SAT. MEDIA</th>
                <th className="font-label text-ash py-2 pr-2 text-right">COSTE MEDIO ENV.</th>
                <th className="font-label text-ash py-2 pr-2 text-right">INGRESOS</th>
                <th className="font-label text-ash py-2 text-right">PEDIDOS</th>
              </tr>
            </thead>
            <tbody>
              {BOTTOM_SAT.map((p, i) => (
                <tr key={i} className="table-row-interactive" style={{ borderBottom: `1px solid rgba(55,65,81,0.3)` }}>
                  <td className="py-2 pr-2 text-ivory row-title">{p.producto}</td>
                  <td className="py-2 pr-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-label" style={{ backgroundColor: 'rgba(13,148,136,0.1)', color: C.teal }}>{p.canal}</span>
                  </td>
                  <td className="py-2 pr-2 text-right font-mono" style={{ color: C.red }}>{p.sat.toFixed(3)}</td>
                  <td className="py-2 pr-2 text-right font-mono text-ash">{fEuroD(p.costeEnvio)}</td>
                  <td className="py-2 pr-2 text-right font-mono text-teal">{fEuroD(p.ingresos)}</td>
                  <td className="py-2 text-right text-ash">{p.pedidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );

  /* ─── RENDER ─── */
  return (
    <section id="dashboard" className="w-full bg-obsidian">
      <div className="page-gutter section-gap content-max">
        {/* External header */}
        <div className="mb-8">
          <p className="font-label text-teal mb-2">// DASHBOARD INTERACTIVO</p>
          <h2 className="font-display font-display-l text-ivory">Demo ejecutiva</h2>
          <p className="mt-2 text-ash max-w-[650px] text-sm leading-relaxed">
            Explora los datos de NovaMarket Retail con filtros interactivos. Cada página replica la estructura del dashboard de Power BI.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 pb-5" style={{ borderBottom: `1px solid ${C.fog}` }}>
          <div className="flex items-center gap-2">
            <span className="font-label text-ash text-xs">CATEGORÍA</span>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="filter-select">
              {CATEGORIAS.map(o => <option key={o} value={o} style={{ backgroundColor: C.slate }}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label text-ash text-xs">CANAL</span>
            <select value={filterCanal} onChange={e => setFilterCanal(e.target.value)} className="filter-select">
              {CANALES.map(o => <option key={o} value={o} style={{ backgroundColor: C.slate }}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label text-ash text-xs">PAÍS</span>
            <select value={filterPais} onChange={e => setFilterPais(e.target.value)} className="filter-select">
              {PAISES.map(o => <option key={o} value={o} style={{ backgroundColor: C.slate }}>{o}</option>)}
            </select>
          </div>
          <button onClick={() => { setFilterPais('Todos'); setFilterCat('Todos'); setFilterCanal('Todos'); }}
            className="text-xs font-label text-teal transition-all duration-200 hover:text-teal-glow underline underline-offset-2">
            LIMPIAR FILTROS
          </button>
        </div>

        {/* Dashboard Header with logo */}
        <DashHeader activeTab={activeTab} />

        {/* Tab content */}
        {activeTab === 'resumen' && <TabResumen />}
        {activeTab === 'productos' && <TabProductos />}
        {activeTab === 'geo' && <TabGeo />}
        {activeTab === 'satisfaccion' && <TabSatisfaccion />}
      </div>
    </section>
  );
}
