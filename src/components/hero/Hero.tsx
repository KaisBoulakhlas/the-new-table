"use client";
import styles from '@/styles/hero/Hero.module.scss';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

const Hero: React.FC = () => {
  return (
    <div className={styles.heroContainer}>
      <HeroBackground />
      <HeroContent />
    </div>
  );
};

export default Hero;