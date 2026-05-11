import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import IntroSection from '@/sections/IntroSection';
import MetricsSection from '@/sections/MetricsSection';
import DashboardDemo from '@/sections/DashboardDemo';
import DataShowcaseSection from '@/sections/DataShowcaseSection';
import ProductPerformanceSection from '@/sections/ProductPerformanceSection';
import TechnologyStackSection from '@/sections/TechnologyStackSection';
import MethodologySection from '@/sections/MethodologySection';
import CTASection from '@/sections/CTASection';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-obsidian text-ivory overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <IntroSection />
        <MetricsSection />
        <DashboardDemo />
        <DataShowcaseSection />
        <ProductPerformanceSection />
        <TechnologyStackSection />
        <MethodologySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
