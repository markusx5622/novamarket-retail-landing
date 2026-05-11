import { useEffect, useRef } from 'react';

interface ParticleDataFieldProps {
  particleCount?: number;
  enableMouse?: boolean;
  opacity?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

export default function ParticleDataField({
  particleCount,
  enableMouse = true,
  opacity = 1,
  className = '',
}: ParticleDataFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      initParticles(rect.width, rect.height);
    };

    const initParticles = (w: number, h: number) => {
      const count = particleCount ?? Math.min(80, Math.floor(w * h / 15000));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: 1 + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.5,
          color: Math.random() > 0.3 ? '#0D9488' : '#F59E0B',
        });
      }
      particlesRef.current = particles;
    };

    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouse) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect || !ctx) return;
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Draw radial gradient background
      const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      gradient.addColorStop(0, 'rgba(10, 10, 12, 0.3)');
      gradient.addColorStop(0.7, 'rgba(13, 17, 23, 0.2)');
      gradient.addColorStop(1, 'rgba(17, 17, 20, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * opacity;
        ctx.fill();
      }

      // Draw connections
      ctx.globalAlpha = opacity;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const lineOpacity = Math.min(0.15, (1 - dist / 120) * 0.15);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(13, 148, 136, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      if (enableMouse && mouseRef.current.x !== null && mouseRef.current.y !== null) {
        for (const p of particles) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const lineOpacity = Math.min(0.2, (1 - dist / 150) * 0.2);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(13, 148, 136, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [particleCount, enableMouse, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-[1] ${className}`}
      style={{ pointerEvents: enableMouse ? 'auto' : 'none' }}
    />
  );
}
