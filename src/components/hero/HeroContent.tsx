"use client";
import { motion } from 'framer-motion';
import styles from '@/styles/hero/HeroContent.module.scss';
import Image from 'next/image';
import HeroTitle from './HeroTitle';
import HeroButton from './HeroButton';


const HeroContent: React.FC = () => {
  return (
    <div className={styles.heroContent}>
      {/* Sous-titre */}
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Une expérience gastronomique unique
      </motion.p>
      
      <div className={styles.heroContentContainer}>
        <Image 
          src="/images/rev-img.png" 
          alt="Décoration" 
          width={60} 
          height={15} 
          className={styles.heroImage} 
        />
        
        <HeroTitle />
        
        <Image 
          src="/images/rev-img.png" 
          alt="Décoration" 
          width={60} 
          height={15} 
          className={styles.heroImage} 
        />
      </div>

      <HeroButton />
    </div>
  );
};

export default HeroContent;