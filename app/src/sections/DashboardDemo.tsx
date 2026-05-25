import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, LabelList,
} from 'recharts';
import dashboardData from '@/data/dashboardData.json';

/* TYPES */
type TabKey = 'resumen' | 'productos' | 'geo' | 'satisfaccion';

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

const TABS: { key: TabKey; label: string; subtitle: string }[] = [
  { key: 'resumen', label: 'Resumen Ejecutivo 2025', subtitle: 'Visión global del rendimiento comercial, geográfico y omnicanal' },
  { key: 'productos', label: 'Productos y Categorías', subtitle: 'Análisis del rendimiento comercial y satisfacción del catálogo' },
  { key: 'geo', label: 'Países y Canales', subtitle: 'Comparativa geográfica y omnicanal para priorización regional' },
  { key: 'satisfaccion', label: 'Satisfacción y Logística', subtitle: 'Calidad del crecimiento: experiencia del cliente y presión logística' },
];

const PAISES = ['Todos', ...dashboardData.country.map((c: any) => c.pais)];
const CATEGORIAS = ['Todos', ...dashboardData.category.map((c: any) => c.categoria)];
const CANALES = ['Todos', ...dashboardData.channel.map((c: any) => c.canal)];

const fEuro = (v: number) => '€' + v.toLocaleString('es-ES', { maximumFractionDigits: 0 });
const fEuroD = (v: number) => '€' + v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* --- CALCULO REVENUE RATIO--- */
function getRevenueRatio({ filterPais, filterCanal, filterCat }: { filterPais: string, filterCanal: string, filterCat: string }): number {
  let ratio = 1;
  let total = dashboardData.total_revenue as number;
  if (filterPais !== 'Todos') {
    const d = dashboardData.country.find(c => c.pais === filterPais);
    if (d) ratio *= d.ingresos / total;
  }
  if (filterCanal !== 'Todos') {
    const d = dashboardData.channel.find(c => c.canal === filterCanal);
    if (d) ratio *= d.ingresos / total;
  }
  if (filterCat !== 'Todos') {
    const d = dashboardData.category.find(c => c.categoria === filterCat);
    if (d) ratio *= d.ingresos / total;
  }
  return ratio;
}

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>('resumen');
  const [filterPais, setFilterPais] = useState('Todos');
  const [filterCat, setFilterCat] = useState('Todos');
  const [filterCanal, setFilterCanal] = useState('Todos');

  const revenueRatio = useMemo(() =>
    getRevenueRatio({ filterPais, filterCanal, filterCat }),
    [filterPais, filterCanal, filterCat]
  );

  const fCountry = useMemo(() =>
    filterPais === 'Todos'
      ? [...dashboardData.country]
      : dashboardData.country.filter((c: any) => c.pais === filterPais),
    [filterPais]
  );
  const fChannel = useMemo(() =>
    filterCanal === 'Todos'
      ? [...dashboardData.channel]
      : dashboardData.channel.filter((c: any) => c.canal === filterCanal),
    [filterCanal]
  );
  const fCategory = useMemo(() => {
    let arr = [...dashboardData.category];
    if (filterCat !== 'Todos') arr = arr.filter(c => c.categoria === filterCat);
    return arr.map(c => ({
      ...c,
      ingresos: Number((c.ingresos * revenueRatio).toFixed(2)),
      pedidos: Math.round(c.pedidos * revenueRatio),
      satisfaccion: c.satisfaccion
    }));
  }, [filterCat, revenueRatio]);
  const fProducts = useMemo(() => {
    return dashboardData.products
      .filter(p =>
        (filterCat === 'Todos' || p.categoria === filterCat) &&
        (filterPais === 'Todos' || true) &&
        (filterCanal === 'Todos' || true)
      )
      .map(p => ({
        ...p,
        ingresos: +(p.ingresos * revenueRatio).toFixed(2),
        pedidos: Math.round(p.pedidos * revenueRatio)
      }));
  }, [filterCat, filterPais, filterCanal, revenueRatio]);
  const fMonthly = useMemo(() =>
    dashboardData.monthly.map(m => ({
      ...m,
      ingresos: +(m.ingresos * revenueRatio).toFixed(2),
      pedidos: Math.round(m.pedidos * revenueRatio)
    })),
    [revenueRatio]
  );
  const fQuarterly = useMemo(() =>
    dashboardData.quarterly.map(q => ({
      ...q,
      ingresos: +(q.ingresos * revenueRatio).toFixed(2),
      pedidos: Math.round(q.pedidos * revenueRatio)
    })),
    [revenueRatio]
  );
  const fSatisfaction = useMemo(() => {
    return dashboardData.satisfaction.map(s => ({
      ...s,
      count: Math.round(s.count * revenueRatio)
    }));
  }, [revenueRatio]);
  const fSatisfactionByCountry = useMemo(() => {
    let arr = [...dashboardData.satisfactionByCountry];
    if (filterPais !== 'Todos') arr = arr.filter(c => c.pais === filterPais);
    return arr.map(c => ({
      ...c,
      costeMedioEnvio: +(c.costeMedioEnvio * revenueRatio).toFixed(2)
    }));
  }, [filterPais, revenueRatio]);
  const fSatisfactionByChannel = useMemo(() => {
    let arr = [...dashboardData.satisfactionByChannel];
    if (filterCanal !== 'Todos') arr = arr.filter(c => c.canal === filterCanal);
    return arr.map(c => ({ ...c, satisfaccion: c.satisfaccion }));
  }, [filterCanal, revenueRatio]);
  const fCosts = useMemo(() => ({
    ...dashboardData.costs,
    coste_envio_relativo_medio: +(dashboardData.costs.coste_envio_relativo_medio * revenueRatio).toFixed(2),
    costo_envio_total: +(dashboardData.costs.costo_envio_total * revenueRatio).toFixed(2),
    ingreso_neto_total: +(dashboardData.costs.ingreso_neto_total * revenueRatio).toFixed(2),
  }), [revenueRatio]);
  const SAT_DIST = [
    { p: 1, c: Math.round(73 * revenueRatio) },
    { p: 2, c: Math.round(154 * revenueRatio) },
    { p: 3, c: Math.round(233 * revenueRatio) },
    { p: 4, c: Math.round(422 * revenueRatio) },
    { p: 5, c: Math.round(618 * revenueRatio) },
  ];

  // (tu código de render, componentes, tablas, etc.)
  // Solo debes consumir fCountry, fChannel, fCategory, fProducts, fMonthly, fQuarterly, fSatisfaction, fSatisfactionByCountry, fSatisfactionByChannel, fCosts, SAT_DIST
  // Ejemplo:
  // <BarChart data={fCategory} ... />
  // ...
  return <>{/* JSX según referencia anterior, solo usando los datos filtrados */}</>;
}
