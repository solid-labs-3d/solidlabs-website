import HeroSection from "../components/home/HeroSection";
import ProductsSection from "../components/home/ProductsSection";
import InfoSections from "../components/home/InfoSection";
import ContactSection from "../components/home/ContactSection";
import { useReveal } from "../hooks/useReveal";
import Footer from "../components/footer";

export default function Home() {
  useReveal();

  return (
    <div className="page-home">
      <HeroSection />
      <ProductsSection />
      <InfoSections />
      <ContactSection />
      <Footer/>
    </div>
  );
}