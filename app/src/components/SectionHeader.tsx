interface SectionHeaderProps {
  overline: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ overline, title, subtitle, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <p className="font-label text-teal mb-4">{overline}</p>
      <h2 className="font-display font-display-l text-ivory">{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-ash max-w-[600px] leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
