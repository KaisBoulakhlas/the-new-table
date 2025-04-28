// src/app/avis/page.tsx
import { Metadata } from 'next';
import styles from '@/styles/reviews/ReviewsPage.module.scss';
import ReviewsSection from '@/components/reviews/ReviewsSection';

export const metadata: Metadata = {
  title: 'Avis',
  description: 'Découvrez ce que nos clients pensent de leur expérience gastronomique à La Nouvelle Table.',
};

export default function ReviewsPage() {
  return (
    <main className={styles.main}>
      <ReviewsSection />
    </main>
  );
}