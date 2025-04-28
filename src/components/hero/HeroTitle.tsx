"use client";
import { motion } from 'framer-motion';
import styles from '@/styles/hero/HeroTitle.module.scss';

const HeroTitle: React.FC = () => {
  return (
    <motion.h1 
      className={styles.title}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.5,
        ease: "easeOut"
      }}
    >
      The New Table
    </motion.h1>
  );
};

export default HeroTitle;