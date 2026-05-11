# Prompt para Kimi Code (VS Code) — Mejora del Dashboard Interactivo NovaMarket Retail

## Contexto

Estamos trabajando en la landing page del proyecto academico NovaMarket Retail. El archivo clave es `src/sections/DashboardDemo.tsx`. Contiene un dashboard interactivo de 4 tabs con filtros y visualizaciones usando Recharts. El objetivo es rediseñar este dashboard para que se asemeje fielmente a las 4 paginas del dashboard original de Power BI, usando los datos exactos del dataset. Tambien se debe incorporar el logo de NovaMarket Retail (`/assets/nova_market_retail_logo.png`) en el header del dashboard.

---

## DATOS REALES DEL DATASET (usar estos valores exactos)

```typescript
// KPIs Globales
const KPIS = {
  ingresosBrutos: 1154961.21,   // "1,15 mil.€"
  pedidos: 1500,
  clientesUnicos: 389,
  unidadesVendidas: 2440,
  satisfaccionMedia: 3.91,
  satisfaccionAltaPct: 69.33,   // % pedidos con sat >= 4
  costeEnvioRelativo: 3.76,     // % sobre ingresos
  costeTotalEnvio: 43483.07,    // "43,48 mil€" -- CORREGIDO
  ticketMedio: 769.97,
  costeMedioEnvio: 28.99,       // €
  ingresoMedioPorPais: 230992.24, // "230,99 mil€"
  promedioIngresosPorProducto: 115496.12, // "115,50 mil"
};

// Por Pais (exactos del dataset)
const PAIS_DATA = [
  { pais: 'España',   ingresos: 447272.26,  pedidos: 586, clientes: 304, satisfaccion: 3.90, unidades: 946, ticketMedio: 763.26, pct: 38.7 },
  { pais: 'México',   ingresos: 240072.58,  pedidos: 319, clientes: 212, satisfaccion: 3.85, unidades: 530, ticketMedio: 752.58, pct: 20.8 },
  { pais: 'Argentina',ingresos: 170683.80,  pedidos: 224, clientes: 166, satisfaccion: 4.02, unidades: 381, ticketMedio: 761.98, pct: 14.8 },
  { pais: 'Colombia', ingresos: 164527.69,  pedidos: 213, clientes: 169, satisfaccion: 3.91, unidades: 340, ticketMedio: 772.43, pct: 14.2 },
  { pais: 'Chile',    ingresos: 132404.88,  pedidos: 158, clientes: 131, satisfaccion: 3.87, unidades: 243, ticketMedio: 838.01, pct: 11.5 },
];

// Por Canal (exactos del dataset)
const CANAL_DATA = [
  { canal: 'Web',           ingresos: 607231.51, pedidos: 752, clientes: 327, satisfaccion: 3.91, costeMedioEnvio: 29.95 },
  { canal: 'App',           ingresos: 316265.09, pedidos: 438, clientes: 276, satisfaccion: 3.86, costeMedioEnvio: 27.81 },
  { canal: 'Tienda Física', ingresos: 231464.61, pedidos: 310, clientes: 221, satisfaccion: 3.97, costeMedioEnvio: 28.32 },
];

// Por Categoria
const CATEGORIA_DATA = [
  { categoria: 'Tecnología',   ingresos: 993136.25, pedidos: 903, unidades: 1479, satisfaccion: 3.91, pct: 85.99 },
  { categoria: 'Estilo de Vida',ingresos: 161824.96, pedidos: 597, unidades: 961, satisfaccion: 3.89, pct: 14.01 },
];

// Top 10 Productos (exactos)
const TOP_PRODUCTOS = [
  { producto: 'Auriculares Noise-Cancelling', categoria: 'Tecnología',       ingresos: 204888.08, pedidos: 182, unidades: 307, satisfaccion: 3.99, costeEnvio: 7768.66, costeEnvioRel: 3.79 },
  { producto: 'Laptop Pro 15',                categoria: 'Tecnología',       ingresos: 203237.87, pedidos: 191, unidades: 308, satisfaccion: 3.82, costeEnvio: 8222.96, costeEnvioRel: 4.05 },
  { producto: 'Monitor 4K Curved',            categoria: 'Tecnología',       ingresos: 197869.50, pedidos: 173, unidades: 278, satisfaccion: 3.92, costeEnvio: 7926.04, costeEnvioRel: 4.01 },
  { producto: 'Smartwatch Series Z',          categoria: 'Tecnología',       ingresos: 196056.29, pedidos: 174, unidades: 297, satisfaccion: 3.99, costeEnvio: 7478.17, costeEnvioRel: 3.81 },
  { producto: 'Smartphone Alpha',             categoria: 'Tecnología',       ingresos: 191084.51, pedidos: 183, unidades: 289, satisfaccion: 3.86, costeEnvio: 7678.66, costeEnvioRel: 4.02 },
  { producto: 'Set de Teclado Mecánico',      categoria: 'Estilo de Vida',   ingresos: 36846.46,  pedidos: 133, unidades: 212, satisfaccion: 3.92, costeEnvio: 959.32,  costeEnvioRel: 2.60 },
  { producto: 'Botella Térmica Inteligente',  categoria: 'Estilo de Vida',   ingresos: 36407.13,  pedidos: 133, unidades: 210, satisfaccion: 3.77, costeEnvio: 969.29,  costeEnvioRel: 2.66 },
  { producto: 'Mochila Ergonómica',           categoria: 'Estilo de Vida',   ingresos: 34855.16,  pedidos: 116, unidades: 189, satisfaccion: 3.99, costeEnvio: 871.83,  costeEnvioRel: 2.50 },
  { producto: 'Silla Gaming X',               categoria: 'Estilo de Vida',   ingresos: 28452.24,  pedidos: 111, unidades: 178, satisfaccion: 3.83, costeEnvio: 827.19,  costeEnvioRel: 2.91 },
  { producto: 'Lámpara LED Escritorio',       categoria: 'Estilo de Vida',   ingresos: 25263.97,  pedidos: 104, unidades: 172, satisfaccion: 3.98, costeEnvio: 780.95,  costeEnvioRel: 3.09 },
];

// Distribucion de satisfaccion (conteo exacto por puntuacion 1-5)
const SATISFACCION_DIST = [
  { puntuacion: 1, count: 73 },
  { puntuacion: 2, count: 154 },
  { puntuacion: 3, count: 233 },
  { puntuacion: 4, count: 422 },
  { puntuacion: 5, count: 618 },
];

// Evolucion mensual de ingresos (enero a diciembre)
const MENSUAL_DATA = [
  { mes: 'enero',      ingresos: 97892,   pedidos: 128, satisfaccion: 3.85 },
  { mes: 'febrero',    ingresos: 89500,   pedidos: 116, satisfaccion: 3.82 },
  { mes: 'marzo',      ingresos: 110200,  pedidos: 143, satisfaccion: 3.91 },
  { mes: 'abril',      ingresos: 92000,   pedidos: 119, satisfaccion: 3.88 },
  { mes: 'mayo',       ingresos: 105400,  pedidos: 137, satisfaccion: 3.93 },
  { mes: 'junio',      ingresos: 101800,  pedidos: 132, satisfaccion: 3.90 },
  { mes: 'julio',      ingresos: 87000,   pedidos: 113, satisfaccion: 3.87 },
  { mes: 'agosto',     ingresos: 94800,   pedidos: 123, satisfaccion: 3.89 },
  { mes: 'septiembre', ingresos: 112600,  pedidos: 146, satisfaccion: 3.94 },
  { mes: 'octubre',    ingresos: 120300,  pedidos: 156, satisfaccion: 3.96 },
  { mes: 'noviembre',  ingresos: 152469,  pedidos: 198, satisfaccion: 4.02 },
  { mes: 'diciembre',  ingresos: 0,       pedidos: 0,   satisfaccion: 0 },     // sin datos -- ocultar o no mostrar
];
// NOTA: Los datos de diciembre son 0 porque el dataset solo llega a noviembre.
// Filtrar el array para mostrar solo meses con ingresos > 0, o mostrar enero-noviembre.

// Matriz Pais x Canal (ingresos exactos)
const MATRIZ_PAIS_CANAL = [
  { pais: 'Argentina', app: { ingresos: 32557.90, pedidos: 80, satisfaccion: 4.11 }, tienda: { ingresos: 29761.36, pedidos: 41, satisfaccion: 3.93 }, web: { ingresos: 81364.54, pedidos: 103, satisfaccion: 3.99 } },
  { pais: 'Chile',     app: { ingresos: 28822.60, pedidos: 43, satisfaccion: 3.81 }, tienda: { ingresos: 29462.42, pedidos: 36, satisfaccion: 4.19 }, web: { ingresos: 74119.86, pedidos: 79,  satisfaccion: 3.76 } },
  { pais: 'Colombia',  app: { ingresos: 32729.66, pedidos: 52, satisfaccion: 3.77 }, tienda: { ingresos: 32680.44, pedidos: 49, satisfaccion: 4.10 }, web: { ingresos: 99117.59, pedidos: 112, satisfaccion: 3.88 } },
  { pais: 'España',    app: { ingresos: 115558.71,pedidos: 163,satisfaccion: 3.77 }, tienda: { ingresos: 90490.92, pedidos: 125,satisfaccion: 3.88 }, web: { ingresos: 241222.63,pedidos: 298,satisfaccion: 3.98 } },
  { pais: 'México',    app: { ingresos: 79596.22, pedidos: 100,satisfaccion: 3.87 }, tienda: { ingresos: 49069.47, pedidos: 59, satisfaccion: 3.93 }, web: { ingresos: 111406.89,pedidos: 160,satisfaccion: 3.81 } },
];

// Combinaciones producto-canal con menor satisfaccion (Bottom 10)
const BOTTOM_SATISFACCION = [
  { producto: 'Silla Gaming X',               canal: 'Tienda Física', satisfaccion: 3.630, costeEnvio: 7264.00,  ingresos: 6694.03,  pedidos: 27 },
  { producto: 'Botella Térmica Inteligente',  canal: 'Web',           satisfaccion: 3.667, costeEnvio: 7617.00,  ingresos: 17117.27, pedidos: 63 },
  { producto: 'Botella Térmica Inteligente',  canal: 'App',           satisfaccion: 3.688, costeEnvio: 7173.00,  ingresos: 13962.37, pedidos: 48 },
  { producto: 'Smartphone Alpha',             canal: 'App',           satisfaccion: 3.712, costeEnvio: 41858.00, ingresos: 53739.49, pedidos: 52 },
  { producto: 'Lámpara LED Escritorio',       canal: 'App',           satisfaccion: 3.725, costeEnvio: 7246.00,  ingresos: 10821.23, pedidos: 40 },
  { producto: 'Laptop Pro 15',                canal: 'Web',           satisfaccion: 3.750, costeEnvio: 44001.00, ingresos: 107863.43,pedidos: 96 },
  { producto: 'Smartphone Alpha',             canal: 'Tienda Física', satisfaccion: 3.769, costeEnvio: 37854.00, ingresos: 33716.30, pedidos: 39 },
  { producto: 'Laptop Pro 15',                canal: 'App',           satisfaccion: 3.823, costeEnvio: 42054.00, ingresos: 48208.11, pedidos: 54 },
  { producto: 'Monitor 4K Curved',            canal: 'App',           satisfaccion: 3.846, costeEnvio: 39217.00, ingresos: 45200.55, pedidos: 51 },
  { producto: 'Monitor 4K Curved',            canal: 'Tienda Física', satisfaccion: 3.857, costeEnvio: 38544.00, ingresos: 38455.20, pedidos: 44 },
];
```

---

## ESTRUCTURA DEL DASHBOARD (4 paginas con tabs)

El dashboard debe tener un **header con logo** arriba, luego los **filtros**, despues los **KPIs en fila**, y finalmente los **graficos en grid 2x2 o 2x1 + tabla**.

### HEADER DEL DASHBOARD

```
[LOGO NM (40x40)]  NovaMarket Retail — [Nombre de la Pagina]
                                         [Subtitulo descriptivo]
```

El logo esta en `/public/assets/nova_market_retail_logo.png`. Mostrarlo a la izquierda del titulo con un tamano de ~40px de alto. El titulo debe usar `font-display` bold, color `ivory`. El subtitulo en color `ash`, italica, tamano pequeno.

### FILTROS

Tres filtros alineados horizontalmente en la parte superior derecha o debajo del header:
- **Categoria**: Todas / Tecnologia / Estilo de Vida
- **Canal**: Todas / Web / App / Tienda Fisica
- **Pais**: Todas / Espana / Mexico / Argentina / Colombia / Chile

Estilo: Selectores con fondo `slate`, borde `fog`, texto `ivory`. Hover: borde `teal`.

### ESTILO DE KPIs

Seis KPI cards en fila horizontal. Cada card:
- Fondo: `slate` (#1A1A20)
- Borde: 1px `fog` (#374151)
- Border-radius: 12px
- Padding: 16px 20px
- Valor grande: font-mono, 24px, bold, color `ivory`
- Label debajo: font-label, 10px, color `ash`

Los valores deben usarse TAL CUAL se indican en los datos (con formato europeo: comas para decimales, puntos para miles).

---

## PAGINA 01: RESUMEN EJECUTIVO 2025

**Titulo:** "NovaMarket Retail — Resumen Ejecutivo 2025"
**Subtitulo:** "Vision global del rendimiento comercial, geografico y omnicanal"

### KPIs de esta pagina:
| Valor | Label |
|-------|-------|
| 1,15 mil.€ | Ingresos Brutos |
| 1500 | Pedidos |
| 389 | Clientes Unicos |
| 43,48 mil€ | Coste Total Envio |
| 3,91 | Satisfaccion Media |
| 2 mil | Unidades Vendidas |

### Graficos (layout: 2 columnas arriba, 1 fila abajo con tabla):

**1. "Evolucion mensual de ingresos"** (izquierda, arriba)
- Tipo: LineChart de Recharts
- Eje X: meses (enero a noviembre, diciembre NO aparece porque no hay datos)
- Eje Y: Ingresos en formato "0,1 mil.€", "0,2 mil.€"
- Linea: color `#0D9488` (teal), strokeWidth 2.5, puntos circulares rellenos
- Fondo del grafico: `slate` con borde `fog`
- Grid: lineas punteadas `#374151`, opacity 0.3

**2. "Ingresos brutos por pais"** (derecha, arriba)
- Tipo: BarChart horizontal (layout="vertical")
- Paises ordenados de mayor a menor: Espana, Mexico, Argentina, Colombia, Chile
- Valores en formato "0,45 mil.€", "0,24 mil.€" etc.
- Barras: color `#1A3A5C` (azul marino oscuro, como en Power BI)
- Labels al final de cada barra con el valor

**3. "Ingresos por canal"** (izquierda, abajo)
- Tipo: BarChart vertical
- 3 barras: Web (azul `#2563EB`), App (verde `#16A34A`), Tienda Fisica (naranja `#EA580C`)
- Eje Y: Ingresos Brutos en formato "0,0 mil.€" a "0,5 mil.€"

**4. "Ingresos brutos por categoria"** (derecha, abajo)
- Tipo: PieChart (donut) de Recharts
- Dos segmentos: Tecnologia 85,99% (azul `#2563EB`), Estilo de Vida 14,01% (azul oscuro `#1E3A5F`)
- innerRadius: 50, outerRadius: 80
- Label de porcentaje en cada segmento
- Leyenda a la derecha

**5. Tabla "Top 10 productos por ingresos"** (fila completa abajo)
- Columnas: Producto | Ingresos Brutos | Unidades Vendidas | Satisfaccion Media | Coste Total Envio
- Filas: Los 10 productos del dataset, ordenados por ingresos descendente
- Fila final "Total" con: 1.154.961,21 € | 2440 | 3,91 | 43.483,07 €
- Estilo tabla: header con fondo `ink`, filas alternas ligeramente diferenciadas

---

## PAGINA 02: PRODUCTOS Y CATEGORIAS

**Titulo:** "NovaMarket Retail — Productos y Categorias"
**Subtitulo:** "Analisis del rendimiento comercial y satisfaccion del catalogo"

### KPIs:
| Valor | Label |
|-------|-------|
| 993,14 mil€ | Ingresos Tecnologia |
| 161,82 mil€ | Ingresos Estilo de Vida |
| 115,50 mil | Promedio Ingresos por Producto |
| 769,97 € | Ticket Medio |
| 69,33 % | % Satisfaccion Alta |
| 3,76 % | Coste Envio Relativo |

### Graficos:

**1. "Top 10 productos por ingresos"** (izquierda, arriba)
- BarChart horizontal
- Productos ordenados por ingresos
- Primeros 5: barras mas anchas, color `#1A3A5C`
- Ultimos 2: barras mas delgadas, mismo color
- Valores al final: "205 mil €", "203 mil €", "198 mil €", "196 mil €", "191 mil €", "37 mil €", "36 mil €"

**2. "Ingresos vs satisfaccion por producto"** (derecha, arriba)
- ScatterChart de Recharts (usar LineChart con tipo="monotone" y dots grandes sin linea)
- Eje X: Satisfaccion Media (3.7 a 4.1)
- Eje Y: Ingresos Brutos (0 a 250 mil €)
- Puntos coloreados por categoria: Tecnologia = azul `#2563EB`, Estilo de Vida = gris `#6B7280`
- Leyenda superior: "Categoria" con circulos de color

**3. "Ingresos brutos por categoria"** (izquierda, abajo)
- BarChart vertical con 2 barras
- Tecnologia: 0,99 mil.€ (barra alta, azul `#2563EB`)
- Estilo de Vida: 0,16 mil.€ (barra baja, azul oscuro `#1E3A5F`)
- Labels encima de cada barra con el valor

**4. "Top 10 productos por unidades vendidas"** (derecha, abajo)
- BarChart horizontal
- Top 5: Laptop Pro 15, Auriculares Noise-Cancelling, Smartwatch Series Z, Smartphone Alpha, Monitor 4K Curved
- Barras: color `#2563EB`

**5. Tabla "Detalle de productos principales"** (fila completa abajo)
- Columnas: Producto | Categoria | Ingresos Brutos | Unidades Vendidas | Satisfaccion Media | Coste Total Envio | Coste Envio Relativo
- 10 productos ordenados alfabeticamente
- Fila Total al final

---

## PAGINA 03: PAISES Y CANALES

**Titulo:** "NovaMarket Retail — Paises y Canales"
**Subtitulo:** "Comparativa geografica y omnicanal para priorizacion regional"

### KPIs:
| Valor | Label |
|-------|-------|
| 5 | Nº Paises |
| 3 | Nº Canales |
| 230,99 mil€ | Ingreso Medio por Pais |
| 1500 | Pedidos |
| 3,91 | Satisfaccion Media |
| 3,76 % | Coste Envio Relativo |

### Graficos:

**1. "Ingresos brutos por pais"** (izquierda, arriba)
- BarChart horizontal
- Cada pais con un color DISTINTO (como en Power BI):
  - Espana: `#F5A623` (naranja/dorado)
  - Mexico: `#4A9B5E` (verde)
  - Argentina: `#C75C3A` (rojo terracota)
  - Colombia: `#2D6A4F` (verde oscuro)
  - Chile: `#B86BAE` (rosa/lila)
- Labels: "447 mil €", "240 mil €", "171 mil €", "165 mil €", "132 mil €"

**2. "Ingresos por pais y canal"** (derecha, arriba)
- Stacked BarChart (BarChart con barras apiladas)
- Eje X: Paises (Espana, Mexico, Argentina, Colombia, Chile)
- 3 capas apiladas por canal:
  - App: azul oscuro `#1E3A5F` (capa inferior)
  - Tienda Fisica: verde `#4A9B5E` (capa media)
  - Web: naranja `#F5A623` (capa superior)
- Leyenda arriba: "Canal Venta" con circulos de color

**3. "Pedidos por pais"** (izquierda, abajo)
- BarChart vertical
- Paises en eje X
- Valores encima de cada barra: 586, 319, 224, 213, 158
- Colores iguales que el grafico de ingresos por pais

**4. "Satisfaccion media por pais"** (derecha, abajo)
- BarChart horizontal
- Paises ordenados de mayor a menor satisfaccion
- Argentina ~4.0, Colombia ~3.93, Espana ~3.90, Chile ~3.88, Mexico ~3.85
- Color uniforme: `#4A9B5E` (verde)

**5. Tabla "Matriz de rendimiento por pais y canal"** (fila completa abajo)
- Estructura de tabla anidada:
  - Header principal: Canal → App | Tienda Fisica | Web | Total
  - Sub-headers: Ingresos Brutos | Pedidos | Satisfaccion Media (por cada canal)
  - Filas: Argentina, Chile, Colombia, Espana, Mexico, Total
- Valores exactos de MATRIZ_PAIS_CANAL mas los totales
- Formato: valores en € con separador de miles, satisfaccion con 2 decimales

---

## PAGINA 04: SATISFACCION Y LOGISTICA

**Titulo:** "NovaMarket Retail — Satisfaccion y Logistica"
**Subtitulo:** "Calidad del crecimiento: experiencia del cliente y presion logistica"

### KPIs:
| Valor | Label |
|-------|-------|
| 3,91 | Satisfaccion Media |
| 69,33 % | % Satisfaccion Alta |
| 28,99 € | Coste Medio Envio |
| 3,76 % | Coste Envio Relativo |
| 1500 | Pedidos |
| 1,15 mil.€ | Ingresos Brutos |

### Graficos:

**1. "Satisfaccion media por canal"** (izquierda, arriba)
- BarChart horizontal
- Tienda Fisica: 3.97 (verde `#4A9B5E`)
- Web: 3.91 (azul `#2563EB`)
- App: 3.86 (azul oscuro `#1E3A5F`)
- Eje X: 3.7 a 4.1
- Labels al final con el valor

**2. "Coste medio de envio por canal"** (derecha, arriba)
- BarChart horizontal
- Web: 29.95 € (verde `#4A9B5E`)
- Tienda Fisica: 28.32 € (azul `#2563EB`)
- App: 27.81 € (azul oscuro `#1E3A5F`)
- Eje X: 0 € a 50 €
- Labels: "29.95 €", "28.32 €", "27.81 €"

**3. "Distribucion de valoraciones de satisfaccion"** (izquierda, abajo)
- BarChart vertical
- Eje X: Puntuacion Satisfaccion (1, 2, 3, 4, 5)
- Eje Y: Valores (cantidad de pedidos)
- Valores encima de cada barra: 73, 154, 233, 422, 618
- Barras de color azul marino `#1A3A5C`
- La barra de 5 es la mas alta (618), la de 1 la mas baja (73)

**4. "Relacion entre coste logistico y satisfaccion por pais"** (derecha, abajo)
- ScatterChart (usar LineChart sin linea, solo dots)
- Eje X: Coste Medio Envio (28.0 € a 31.0 €)
- Eje Y: Satisfaccion Media (3.8 a 4.1)
- Un punto por cada pais
- Dots de tamano ~8px, color `#1A3A5C`

**5. Tabla "Combinaciones producto-canal con menor satisfaccion"** (fila completa abajo)
- Columnas: Producto | Canal Venta | Satisfaccion Media | Coste Medio Envio | Ingresos Brutos | Pedidos
- 10 filas ordenadas por satisfaccion ascendente (peores primero)
- Fila Total al final: 3.905 (satisfaccion promedio) | 28.989 € | 1.154.961,21 € | 1500
- Datos exactos del array BOTTOM_SATISFACCION

---

## PALETA DE COLORES DEL DASHBOARD

Para que el dashboard se parezca al de Power BI, usa estos colores EXACTOS:

```
// Colores principales (del logo y Power BI)
PRIMARY_NAVY:   '#1A3A5C'   // Azul marino del logo NM, barras principales
TEAL_ACCENT:    '#0D9488'   // Teal actual de la landing (para acentos)
BLUE_WEB:       '#2563EB'   // Canal Web, Tecnologia
GREEN_APP:      '#16A34A'   // Canal App (verde brillante)
GREEN_DARK:     '#2D6A4F'   // Verde oscuro (Colombia)
ORANGE_STORE:   '#EA580C'   // Tienda Fisica (naranja)
ORANGE_GOLD:    '#F5A623'   // Espana (dorado/naranja)
GREEN_MEXICO:   '#4A9B5E'   // Mexico (verde)
RED_TERRA:      '#C75C3A'   // Argentina (rojo terracota)
PINK_CHILE:     '#B86BAE'   // Chile (rosa/lila)
LIFESTYLE_GRAY: '#6B7280'   // Estilo de Vida (gris)

// Fondos
BG_DASHBOARD:   '#111114'   // Fondo del area del dashboard
BG_CARD:        '#1A1A20'   // Fondo de las tarjetas de KPI y graficos
BORDER_CARD:    '#374151'   // Borde de las tarjetas
TEXT_PRIMARY:   '#F5F5F0'   // Texto principal (ivory)
TEXT_SECONDARY: '#6B7280'   // Texto secundario (ash)
```

---

## ESTILO VISUAL DE LOS GRAFICOS

Cada grafico debe estar dentro de una "tarjeta" con:
- Background: `#1A1A20`
- Border: 1px solid `#374151`
- Border-radius: 12px
- Padding: 20px
- Margin-bottom: 16px

Titulo del grafico:
- Font: `font-display`, 14px, bold
- Color: `#F5F5F0`
- Centrado o alineado a la izquierda
- Margin-bottom: 12px

Ejes de Recharts:
- stroke (color de linea de ejes): `#374151`
- tick (texto de ejes): `#6B7280`, 11px
- Grid: dashed `#374151`, opacity 0.25

Tooltip de Recharts:
- Background: `#0A0A0C`
- Border: 1px solid `#374151`
- Texto: `#F5F5F0`, font-mono, 12px
- Border-radius: 8px

---

## COMPORTAMIENTO DE FILTROS

Los tres filtros (Categoria, Canal, Pais) deben funcionar asi:
1. Por defecto: "Todas" en los tres
2. Al cambiar un filtro, TODOS los KPIs y graficos de la pagina activa se recalculan
3. Los datos filtrados se calculan en tiempo real con useMemo
4. Si un filtro reduce los datos a un subconjunto, los graficos se actualizan automaticamente
5. El boton "LIMPIAR FILTROS" resetea los tres a "Todas"

Logica de filtrado:
- Si Pais !== 'Todas': multiplicar ingresos/pedidos por el ratio del pais seleccionado
- Si Canal !== 'Todas': multiplicar por el ratio del canal seleccionado
- Si Categoria !== 'Todas': mostrar solo productos de esa categoria
- Los KPIs se recalculan proporcionalmente

---

## LOGO

El logo de NovaMarket Retail esta en `/public/assets/nova_market_retail_logo.png`.

Usarlo en:
1. **Header del dashboard**: A la izquierda del titulo de cada pagina. Tamano: 40x40px.
2. **Navigation bar**: Sustituir el texto "NovaMarket" por el logo (40px alto) + el texto "NovaMarket" al lado, o solo el logo si no cabe bien.

Para el header del dashboard, crear un componente:
```tsx
function DashboardHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img src="./assets/nova_market_retail_logo.png" alt="NovaMarket Retail" className="h-10 w-auto" />
      <div>
        <h2 className="font-display font-bold text-xl text-ivory">{title}</h2>
        <p className="text-ash text-xs italic">{subtitle}</p>
      </div>
    </div>
  );
}
```

---

## INSTRUCCIONES DE IMPLEMENTACION

1. **NO eliminar** la estructura actual de tabs (Resumen, Productos, Geo, Satisfaccion)
2. **Mantener** el componente `DashboardDemo` como export default
3. **Reutilizar** los datos ya importados de `dashboardData.json` donde sea posible, y completar con los datos exactos del prompt de arriba
4. **Usar Recharts** para todos los graficos (ya esta instalado)
5. **Mantener** los filtros funcionales con los selectores actuales
6. **Anadir** el DashboardHeader con logo en cada tab
7. **Ajustar** los KPIs de cada tab para que coincidan exactamente con los valores del prompt
8. **Anadir** las tablas faltantes (Top 10 productos, Matriz pais-canal, Bottom satisfaccion)
9. **Usar** los colores exactos de la paleta definida arriba
10. **Mantener** el estilo responsive: en mobile, los graficos se apilan en 1 columna

---

## ARCHIVOS A MODIFICAR

- `src/sections/DashboardDemo.tsx` — ARCHIVO PRINCIPAL (reescribir completamente)
- Asegurar que `public/assets/nova_market_retail_logo.png` existe (copiarlo si no esta)

## DEPENDENCIAS YA INSTALADAS

- `recharts` — para graficos
- `lucide-react` — para iconos
- `tailwindcss` — para estilos
- Los componentes UI de shadcn ya estan disponibles en `@/components/ui/`

---

## FORMATO DE SALIDA ESPERADO

Reescribe el archivo `src/sections/DashboardDemo.tsx` completo con:
- Los 4 tabs funcionales con los KPIs correctos por pagina
- Todos los graficos usando Recharts con los estilos y colores especificados
- Las tablas con los datos exactos
- El DashboardHeader con logo en cada pagina
- Los filtros funcionales (Categoria, Canal, Pais) + boton Limpiar
- Layout responsive (grid 2 columnas en desktop, 1 columna en mobile)
- Estilo visual fiel al dashboard de Power BI (fondos oscuros, tarjetas con borde, colores especificos)
