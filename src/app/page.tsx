import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/home/HeroSection';
import TeVasAMorirSection from '../../components/home/TeVasAMorirSection';
import BioSection from '../../components/home/BioSection';
import ServicesSection from '../../components/home/ServicesSection';
import TestimonialCarousel from '../../components/home/TestimonialCarousel';
import EmailSection from '../../components/home/EmailSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <TeVasAMorirSection />
      <BioSection />
      <ServicesSection />
      <TestimonialCarousel />
      <EmailSection />
    </Layout>
  );
}
