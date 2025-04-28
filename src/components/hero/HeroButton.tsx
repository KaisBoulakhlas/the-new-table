"use client";
import { motion } from 'framer-motion';
import styles from '@/styles/hero/HeroButton.module.scss';
import Link from 'next/link';

const HeroButton: React.FC = () => {
  return (
    <motion.div
      className={styles.buttonWrapper}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Link href="#about" className={styles.button}>
        Nous découvrir
        <div className={`${styles.diagonalLine} ${styles.topLine}`}></div>
        <div className={`${styles.diagonalLine} ${styles.bottomLine}`}></div>
      </Link>
    </motion.div>
  );
};

export default HeroButton;