// KPIs Globales
export const KPIS = {
  ingresosBrutos: 1154961.21,
  pedidos: 1500,
  clientesUnicos: 389,
  unidadesVendidas: 2440,
  satisfaccionMedia: 3.91,
  satisfaccionAltaPct: 69.3,
  costeEnvioRelativo: 3.76, // Corregido a 3.76 según modelo
  ticketMedio: 769.97,
};

// Por País
export const PAIS_DATA = [
  { pais: 'España', ingresos: 447272.26, pedidos: 586, clientes: 304, satisfaccion: 3.90, ticketMedio: 763.26, pct: 38.7 },
  { pais: 'México', ingresos: 240072.58, pedidos: 319, clientes: 212, satisfaccion: 3.85, ticketMedio: 752.58, pct: 20.8 },
  { pais: 'Argentina', ingresos: 170683.80, pedidos: 224, clientes: 166, satisfaccion: 4.02, ticketMedio: 761.98, pct: 14.8 },
  { pais: 'Colombia', ingresos: 164527.69, pedidos: 213, clientes: 169, satisfaccion: 3.91, ticketMedio: 772.43, pct: 14.2 },
  { pais: 'Chile', ingresos: 132404.88, pedidos: 158, clientes: 131, satisfaccion: 3.87, ticketMedio: 838.01, pct: 11.5 },
];

// Por Canal
export const CANAL_DATA = [
  { canal: 'Web', ingresos: 607231.51, pedidos: 752, clientes: 327, satisfaccion: 3.91, ticketMedio: 807.49, pct: 52.6 },
  { canal: 'App', ingresos: 316265.09, pedidos: 438, clientes: 276, satisfaccion: 3.86, ticketMedio: 722.07, pct: 27.4 },
  { canal: 'Tienda Física', ingresos: 231464.61, pedidos: 310, clientes: 221, satisfaccion: 3.97, ticketMedio: 746.66, pct: 20.0 },
];

// Por Categoría
export const CATEGORIA_DATA = {
  tecnologia: { ingresos: 993136.25, pedidos: 903, unidades: 1479, satisfaccion: 3.91, pct: 86.0 },
  estiloVida: { ingresos: 161824.96, pedidos: 597, unidades: 961, satisfaccion: 3.89, pct: 14.0 },
};

// Top Productos
export const TOP_PRODUCTOS = [
  { producto: 'Auriculares Noise-Cancelling', categoria: 'Tecnología', ingresos: 204888.08, pedidos: 182, cantidad: 307, satisfaccion: 3.99 },
  { producto: 'Laptop Pro 15', categoria: 'Tecnología', ingresos: 203237.87, pedidos: 191, cantidad: 308, satisfaccion: 3.82 },
  { producto: 'Monitor 4K Curved', categoria: 'Tecnología', ingresos: 197869.50, pedidos: 173, cantidad: 278, satisfaccion: 3.92 },
  { producto: 'Smartwatch Series Z', categoria: 'Tecnología', ingresos: 196056.29, pedidos: 174, cantidad: 297, satisfaccion: 3.99 },
  { producto: 'Smartphone Alpha', categoria: 'Tecnología', ingresos: 191084.51, pedidos: 183, cantidad: 289, satisfaccion: 3.86 },
  { producto: 'Set de Teclado Mecánico', categoria: 'Estilo de Vida', ingresos: 36846.46, pedidos: 133, cantidad: 212, satisfaccion: 3.92 },
  { producto: 'Botella Térmica Inteligente', categoria: 'Estilo de Vida', ingresos: 36407.13, pedidos: 133, cantidad: 210, satisfaccion: 3.77 },
  { producto: 'Mochila Ergonómica', categoria: 'Estilo de Vida', ingresos: 34855.16, pedidos: 116, cantidad: 189, satisfaccion: 3.99 },
  { producto: 'Silla Gaming X', categoria: 'Estilo de Vida', ingresos: 28452.24, pedidos: 111, cantidad: 178, satisfaccion: 3.83 },
  { producto: 'Lámpara LED Escritorio', categoria: 'Estilo de Vida', ingresos: 25263.97, pedidos: 104, cantidad: 172, satisfaccion: 3.98 },
];

// Dashboard pages
export const DASHBOARD_PAGES = [
  {
    num: '01',
    title: 'Resumen Ejecutivo',
    description: 'KPIs globales en una sola vista: ingresos totales, volumen de pedidos, clientes activos y ticket medio. El punto de partida para cualquier análisis.',
    tags: ['KPIs', 'Ejecutivo', 'Global'],
  },
  {
    num: '02',
    title: 'Productos y Categorías',
    description: 'Comparativa Tecnología vs. Estilo de Vida. Ranking de productos por ingresos. Identificación de estrellas y oportunidades del catálogo.',
    tags: ['Categorías', 'Productos', 'Ranking'],
  },
  {
    num: '03',
    title: 'Países y Canales',
    description: 'Mapa de calor geográfico y análisis omnicanal. Desempeño por país y eficiencia de cada canal de venta.',
    tags: ['Geografía', 'Canales', 'Omnicanal'],
  },
  {
    num: '04',
    title: 'Satisfacción y Logística',
    description: 'Correlación entre satisfacción del cliente y costes logísticos. Alertas operativas y segmentación de rendimiento.',
    tags: ['Satisfacción', 'Logística', 'Alertas'],
  },
];

// Technology stack
export const TECH_STACK = [
  {
    name: 'Power BI',
    role: 'Visualización',
    description: 'Modelado semántico, medidas DAX y dashboards ejecutivos con tema visual corporativo.',
    codePreview: 'Ingresos Brutos =\n  SUMX(Ventas,\n    [Precio] * [Cantidad])',
  },
  {
    name: 'Python',
    role: 'Procesamiento',
    description: 'Validación de integridad, limpieza de datos, normalización y exportación de KPIs.',
    codePreview: 'df_clean = df\n  .dropna()\n  .drop_duplicates()',
  },
  {
    name: 'GitHub',
    role: 'Control de versiones',
    description: 'Repositorio trazable con estructura profesional para entrega académica.',
    codePreview: 'git commit -m\n  "feat: dashboard v1"',
  },
];

// Methodology steps
export const METHODOLOGY_STEPS = [
  { num: 1, title: 'Validación', description: 'Revisión de estructura, tipos de datos, nulos y duplicados.' },
  { num: 2, title: 'Limpieza', description: 'Estandarización de categorías, normalización de formatos.' },
  { num: 3, title: 'Modelado', description: 'Tablas, relaciones y capa semántica para cálculo de KPIs.' },
  { num: 4, title: 'DAX', description: 'Medidas comerciales, logísticas y de satisfacción del cliente.' },
  { num: 5, title: 'Visualización', description: 'Dashboard de 4 páginas con narrativa ejecutiva.' },
];

// Marquee items
export const MARQUEE_ITEMS = [
  '€1.15M INGRESOS',
  '1,500 PEDIDOS',
  '389 CLIENTES',
  '5 PAÍSES',
  '3 CANALES',
  '10 PRODUCTOS',
  '3.91/5 SATISFACCIÓN',
  '2,440 UNIDADES',
];

// GitHub repo URL
export const GITHUB_REPO = 'https://github.com/markusx5622/novamarket-retail-powerbi';
