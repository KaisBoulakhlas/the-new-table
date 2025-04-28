"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/ubereats/UberEatsSection.module.scss';

const UberEatsSection: React.FC = () => {
  return (
    <section className={styles.uberEatsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className={styles.imageWrapper}>
          <Image 
              src="/images/ubereats-logo.webp" 
              alt="Commandez sur Uber Eats" 
              width={300}
              height={300}
              className={styles.uberEatsImage}
            />
          </div>
          
          <div className={styles.textContent}>
            <h2 className={styles.title}>Profitez de nos plats chez vous</h2>
            <div className={styles.decorativeLine}></div>
            <p className={styles.description}>
              Vous ne pouvez pas venir au restaurant ? The New Table vient à vous ! 
              Commandez nos plats directement sur Uber Eats et recevez-les chez vous.
            </p>
            <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className={styles.uberEatsButton}>
              <span>Commander sur Uber Eats</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UberEatsSection;