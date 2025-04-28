// app/page.tsx
import AboutSection from '@/components/about/AboutSection';
import Hero from '@/components/hero/Hero';
import LastReviewSection from '@/components/lastreview/LastReviewSection';
import ClientMap from '@/components/map/ClientMap';
import UberEatsSection from '@/components/ubereats/UberEatsSection';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'The New Table | Restaurant Gastronomique',
  description: 'Bienvenue chez The New Table, restaurant gastronomique proposant une cuisine raffinée et inventive.',
};


export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection/>
      <UberEatsSection />
      <LastReviewSection />
      <ClientMap />
    </main>
  );
}