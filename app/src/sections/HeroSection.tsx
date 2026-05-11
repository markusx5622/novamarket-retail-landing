import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleDataField from '@/components/ParticleDataField';
import { ArrowRightIcon, ExternalLinkIcon } from '@/components/Icons';
import { GITHUB_REPO } from '@/data/projectData';

gsap.registerPlugin(ScrollTrigger);

const TEXT_BLOCKS = [
  {
    overline: '// PROYECTO DE ANÁLISIS DE DATOS',
    title: 'NovaMarket\nRetail',
    subtitle: 'Retail omnicanal en 5 países. 1,500 pedidos. Un dashboard ejecutivo en Power BI.',
    cta: { text: 'Explorar métricas', href: '#metrics', external: false },
  },
  {
    overline: '',
    title: 'Datos que\ndeciden',
    subtitle: 'Transformamos transacciones en insights ejecutivos para la toma de decisiones informada.',
    cta: null,
  },
  {
    overline: '',
    title: 'Equipo 9',
    subtitle: 'Grado en Ingeniería. Asignatura: Proyecto Análisis de Datos.',
    cta: { text: 'Ver repositorio', href: GITHUB_REPO, external: true },
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<HTMLDivElement[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      // Entrance animation for first text block
      const firstBlock = textBlocksRef.current[0];
      if (firstBlock) {
        const chars = firstBlock.querySelectorAll('.hero-char');
        gsap.fromTo(chars,
          { opacity: 0, scale: 0.5, rotateY: 45, z: -500 },
          {
            opacity: 1, scale: 1, rotateY: 0, z: 0,
            stagger: 0.025, ease: 'back.out(1.2)', duration: 0.8,
            delay: 0.5,
          }
        );
        gsap.fromTo(firstBlock.querySelectorAll('.hero-fade'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, ease: 'power3.out', duration: 0.8, delay: 1.2 }
        );
      }

      // Main scroll-driven timeline — SMOOTHER settings
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',        // Shorter pin distance for faster, smoother scroll
          pin: true,
          scrub: 0.8,           // Smoother scrub with higher smoothing
        },
      });

      // Background zoom and blur — subtler scale
      tl.fromTo(bg,
        { scale: 1, filter: 'brightness(1) blur(0px)' },
        { scale: 0.6, filter: 'brightness(0.35) blur(12px)', ease: 'power1.inOut' },
        0
      );

      // Text block transitions — 3 blocks, smoother easing
      const blocks = textBlocksRef.current;
      const numBlocks = blocks.length;

      for (let i = 1; i < numBlocks; i++) {
        const prevBlock = blocks[i - 1];
        const currBlock = blocks[i];
        const position = i / numBlocks;

        // Smooth cross-fade: out prev, in current
        tl.to(prevBlock, {
          opacity: 0,
          y: -30,
          filter: 'blur(6px)',
          duration: 0.15,
          ease: 'power2.in',
          onStart: () => { prevBlock.style.pointerEvents = 'none'; },
        }, position - 0.08);

        tl.fromTo(currBlock,
          { opacity: 0, y: 40, filter: 'blur(6px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.2, ease: 'power2.out',
            onStart: () => { currBlock.style.pointerEvents = 'auto'; },
          },
          position - 0.02
        );

        // Animate characters of current block
        const chars = currBlock.querySelectorAll('.hero-char');
        if (chars.length > 0) {
          tl.fromTo(chars,
            { opacity: 0, scale: 0.7, rotateY: 25 },
            { opacity: 1, scale: 1, rotateY: 0, stagger: 0.012, ease: 'back.out(1.4)' },
            position + 0.01
          );
        }

        // Fade in subtitle/CTA
        tl.fromTo(currBlock.querySelectorAll('.hero-fade'),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.06, ease: 'power3.out', duration: 0.3 },
          position + 0.06
        );
      }

      // Scroll indicator fade out
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: '8% top',
            end: '15% top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const renderTitle = (title: string) => {
    return title.split('\n').map((line, li) => (
      <span key={li} className="block">
        {line.split('').map((char, ci) => (
          <span
            key={ci}
            className="hero-char inline-block"
            style={{ transformOrigin: '0% 50%' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-obsidian"
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'center center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian" />
      </div>

      {/* Particle overlay */}
      <ParticleDataField />

      {/* Text blocks */}
      <div
        className="relative z-10 w-full min-h-[100dvh] flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        {TEXT_BLOCKS.map((block, i) => (
          <div
            key={i}
            ref={(el) => { if (el) textBlocksRef.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center page-gutter"
            style={{
              opacity: i === 0 ? 1 : 0,
              pointerEvents: i === 0 ? 'auto' : 'none',
              willChange: 'transform, opacity, filter',
            }}
          >
            {block.overline && (
              <p className="hero-fade font-label text-teal tracking-[0.15em] mb-6">
                {block.overline}
              </p>
            )}

            <h1 className="font-display font-display-xl text-ivory" style={{ textWrap: 'balance' }}>
              {renderTitle(block.title)}
            </h1>

            {block.subtitle && (
              <p className="hero-fade mt-6 text-ash max-w-[500px] text-base leading-relaxed" style={{ textWrap: 'pretty' }}>
                {block.subtitle}
              </p>
            )}

            {block.cta && (
              <div className="hero-fade mt-8">
                {block.cta.external ? (
                  <a
                    href={block.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    {block.cta.text}
                    <ExternalLinkIcon size={16} />
                  </a>
                ) : (
                  <a
                    href={block.cta.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(block.cta!.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-teal font-label hover:underline underline-offset-4 transition-all duration-300 group"
                  >
                    {block.cta.text}
                    <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-ash/50 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-ash"
            style={{
              animation: 'scrollBounce 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 32px); }
        }
      `}</style>
    </section>
  );
}
