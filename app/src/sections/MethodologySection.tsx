import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import ScrollReveal from '@/components/ScrollReveal';
import { METHODOLOGY_STEPS } from '@/data/projectData';

gsap.registerPlugin(ScrollTrigger);

export default function MethodologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const steps = stepsRef.current;
    if (!section || !line || !steps) return;

    const ctx = gsap.context(() => {
      // Line fill animation
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      // Steps bounce in
      const stepEls = steps.querySelectorAll('.method-step');
      gsap.from(stepEls, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: steps,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-obsidian">
      <div className="page-gutter section-gap content-max">
        <ScrollReveal>
          <SectionHeader
            overline="// METODOLOGÍA"
            title="De los datos a las decisiones"
          />
        </ScrollReveal>

        {/* Timeline */}
        <div ref={stepsRef} className="mt-20 relative">
          {/* Desktop: horizontal line */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-fog -z-0">
            <div
              ref={lineRef}
              className="h-full bg-teal origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          {/* Mobile: vertical line */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-fog -z-0">
            <div
              className="w-full bg-teal origin-top"
              style={{
                height: '100%',
                transform: 'scaleY(0)',
              }}
              ref={(el) => {
                if (!el) return;
                const observer = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) {
                      gsap.to(el, { scaleY: 1, duration: 2, ease: 'none' });
                      observer.disconnect();
                    }
                  },
                  { threshold: 0.5 }
                );
                observer.observe(el);
              }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {METHODOLOGY_STEPS.map((step, i) => (
              <div key={i} className="method-step flex lg:flex-col items-start lg:items-center gap-4 lg:text-center">
                {/* Number circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: '2px solid #0D9488',
                    backgroundColor: '#0A0A0C',
                  }}
                >
                  <span className="font-display font-bold text-teal">{step.num}</span>
                </div>

                {/* Content */}
                <div className="lg:mt-4">
                  <h4 className="text-ivory font-semibold text-sm">{step.title}</h4>
                  <p className="mt-1 text-ash text-xs leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
