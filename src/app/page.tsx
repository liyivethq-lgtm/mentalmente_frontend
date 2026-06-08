import HeroSection from "@/components/HeroSection";
import MirrorSection from "@/components/MirrorSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ClosingSection from "@/components/ClosingSection";
import CallToActionSection from "@/components/CallToActionSection";
import Header from "@/layout/navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <MirrorSection />
      <ServicesSection />
      <AboutSection />
      <ClosingSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
