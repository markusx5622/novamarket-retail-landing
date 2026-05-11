# NovaMarket Retail — Tech Spec

## Dependencias

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | ^19.1 | Framework UI |
| react-dom | ^19.1 | Renderizado DOM |
| vite | ^6.3 | Bundler / dev server |
| @vitejs/plugin-react | ^4.4 | Plugin React para Vite |
| tailwindcss | ^4.1 | Estilos utilitarios |
| @tailwindcss/vite | ^4.1 | Integración Tailwind + Vite |
| typescript | ^5.8 | Tipado estático |
| @types/react | ^19.1 | Tipos React |
| @types/react-dom | ^19.1 | Tipos ReactDOM |
| gsap | ^3.13 | Motor de animación principal (ScrollTrigger, Flip, timelines) |
| lenis | ^1.3 | Smooth scroll con inercia |
| splitting | ^1.0 | Splitting de texto en caracteres para animaciones |

Fuentes (Space Grotesk, Inter, JetBrains Mono) se cargan vía Google Fonts CDN en `index.html`. No requieren paquete npm.

---

## Inventario de Componentes

### Layout (compartidos)

| Componente | Fuente | Reutilización |
|------------|--------|---------------|
| Navigation | Custom | Único — barra fija, 64px, backdrop-blur. Links smooth-scroll a secciones. Hamburger en mobile. |
| Footer | Custom | Único — 3-column grid desktop, bottom bar con stats. |

### Secciones (página Home)

| Componente | Fuente | Notas |
|------------|--------|-------|
| HeroSection | Custom | Contiene CinematicHeroStack + ParticleDataField. Fullscreen, pinneado por GSAP (400% scroll). |
| MetricsSection | Custom | KPI grid (5 tarjetas) + MarqueeDataRibbon inferior. |
| DashboardPillarsSection | Custom | Grid 4 columnas con tarjetas de página del dashboard. |
| DataShowcaseSection | Custom | Layout 2 columnas: AnimatedDataBars (izq) + barras de canal + imagen donut (der). |
| ProductPerformanceSection | Custom | Tabla HTML top 5 productos + insight strip. |
| TechnologyStackSection | Custom | Grid 3 columnas con cards de herramienta. |
| MethodologySection | Custom | Timeline horizontal (5 pasos) con línea progresiva GSAP scrub. |
| CTASection | Custom | Cerrada centrada con ParticleDataField simplificado de fondo. |

### Componentes Reutilizables

| Componente | Fuente | Usado por |
|------------|--------|-----------|
| ParticleDataField | Custom | HeroSection (full), CTASection (simplificado, 30p, sin mouse). Canvas 2D con rAF. |
| CinematicHeroStack | Custom | HeroSection (exclusivo). Efecto core: Flip + ScrollTrigger + perspectiva 3D. |
| MarqueeDataRibbon | Custom | MetricsSection (exclusivo). Dos filas con GSAP repeat infinito. |
| AnimatedDataBars | Custom | DataShowcaseSection (izquierda). Barras horizontales con counter. |
| KPITicker | Custom | MetricsSection (5 instancias). Counter numérico con GSAP snap. |
| ScrollReveal | Custom | Todas las secciones. Wrapper que aplica fade-up + stagger vía ScrollTrigger. |
| SectionHeader | Custom | Todas las secciones excepto Hero. Overline + título + subtítulo opcional. |

No se usa shadcn/ui. El diseño es 100% custom con estilos propios (colores, formas, animaciones) que no se alinean con el sistema de componentes de shadcn.

---

## Plan de Animaciones

| Animación | Librería | Enfoque de implementación | Complejidad |
|-----------|----------|---------------------------|-------------|
| Cinematic Hero Stack | GSAP + Flip + ScrollTrigger | Timeline única con pin. Secuencia de 4 text blocks con Flip.fit entre estados absoluto/relativo. Zoom de background simultáneo. | **High** ⭐ |
| Particle Data Field | Canvas 2D + rAF | Sistema de partículas custom con conexiones por distancia y tracking de mouse. Clase Particle, loop de animación con clearRect + gradiente radial. | **High** ⭐ |
| Marquee Data Ribbon | GSAP | Dos tweens infinitos con `repeat: -1` en direcciones opuestas. Contenido duplicado para loop seamless. Pause/resume en hover. | **Medium** |
| Animated Data Bars | GSAP + ScrollTrigger | `fromTo` width 0% → target%. Counter sincronizado con `onUpdate`. Stagger 0.08s. | **Medium** |
| Hero Character Entrance | GSAP + Splitting | `.char` con Splitting.js. `fromTo` scale/opacity/rotationY/z con stagger 0.02s. Perspective 1000px en padre. Auto-play con delay 0.5s. | **Medium** |
| Methodology Timeline Fill | GSAP + ScrollTrigger | Scrub vinculado a scroll de sección. Línea `Fog` → `Teal` progresivamente. Circles con scale bounce. | **Medium** |
| KPI Counter Animation | GSAP + ScrollTrigger | `snap` de innerText. Formato vía `onUpdate` (euros, comas). Trigger: top 80%. | **Low** |
| ScrollReveal (global) | GSAP + ScrollTrigger | Wrapper reutilizable: opacity 0→1, y 40px→0, 0.8s, power3.out, stagger 0.1s. `start: "top 80%"`. | **Low** |
| Scroll Indicator (hero) | GSAP | Círculo animado `yoyo: true, repeat: -1` a 2s. Fade-out tras primer scroll. | **Low** |
| Card Hover Effects | CSS | `transition` en border-color, translateY, box-shadow. Solo CSS, no GSAP. | **Low** |
| Nav Border on Scroll | CSS + ScrollTrigger | ScrollTrigger a 100vh añade clase que activa border-bottom con transition 0.4s. | **Low** |

---

## Estado y Lógica — Decisiones Arquitectónicas

### Canvas Particle System ↔ React

El Particle Data Field es un sistema imperativo de canvas que no sigue el modelo declarativo de React. Se encapsula en un componente con `useRef` para el canvas y `useEffect` para iniciar/detener el loop de `requestAnimationFrame`. El array de partículas, el mouse tracker y el gradiente de fondo se gestionan fuera del estado de React. Cleanup del efecto debe cancelar el rAF y eliminar listeners de resize/mouse.

### Cinematic Hero Stack — Coordenadas Flip

El efecto requiere que los 4 text blocks compartan el mismo contenedor con `position: absolute` y sean intercambiados por Flip entre estados. Esto exige un contenedor padre con refs a todos los bloques, gestionados por una única timeline de GSAP. No se puede desacoplar en componentes independientes porque Flip necesita medir el DOM del contexto compartido. El componente CinematicHeroStack maneja toda la lógica internamente, exponiendo solo las props de contenido.

### Splitting.js — Timing de Inicialización

Splitting.js debe ejecutarse sobre los títulos ANTES de que GSAP intente animar los `.char`. Se inicializa en un `useEffect` de montaje, guardando la instancia para cleanup. Los títulos del hero son la excepción: su animación de caracteres es parte de la timeline pinneada y no usa ScrollTrigger.

### Lenis — Integración con GSAP ScrollTrigger

Lenis debe sincronizarse con ScrollTrigger para que el smooth scroll no desajuste los triggers. Se configura `ScrollTrigger.scrollerProxy` o se usa la integración nativa de Lenis con GSAP (llamando a `ScrollTrigger.update()` en cada frame de Lenis). La instancia de Lenis se comparte a nivel de app vía contexto o se expone como ref global.

---

## Otras Decisiones Clave

### Routing

Single page, sin routing. La navegación usa anchors (`#metrics`, `#dashboard`, etc.) con smooth scroll vía Lenis. No se instala react-router.

### Datos

Todos los valores (KPIs, barras de país/canal, tabla de productos) son constantes hardcodeadas provenientes del dataset CSV. No hay fetching ni estado asíncrono. Se definen en un módulo `data.ts` exportando objetos literales.

### Imágenes

Dos imágenes generadas (hero-bg, donut-chart) se colocan en `public/assets/`. El hero-bg es `background-image` CSS; el donut-chart es `<img loading="lazy">`.

### Responsive Breakpoints

Tailwind con puntos de corte personalizados: mobile < 768px, tablet 768–1023px, desktop ≥ 1024px. El hero stack reduce el pin a 300% y ajusta parámetros en mobile vía media queries en JS (detectadas con `matchMedia` en GSAP).
