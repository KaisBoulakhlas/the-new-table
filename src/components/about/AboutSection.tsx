"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/styles/about/AboutSection.module.scss';

const AboutSection: React.FC = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className={styles.title}>The New Table</h2>
          <div className={styles.decorativeLine}></div>
          <p className={styles.description}>
            Bienvenue chez The New Table, un espace gastronomique où tradition et innovation se rencontrent pour créer une expérience culinaire inoubliable. Notre Chef, passionné par les produits de saison et le terroir français, élabore une cuisine raffinée qui éveille les sens et raconte une histoire.
          </p>
          <p className={styles.description}>
            Dans notre établissement, nous croyons que chaque plat doit être une œuvre d&apos;art, méticuleusement préparée pour enchanter vos papilles et vous offrir un moment de plaisir absolu. Venez découvrir notre univers où l&apos;excellence est servie à chaque table.
          </p>
        </motion.div>
        
        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className={styles.mainImageWrapper}>
            <Image 
              src="/images/about/h3-intro-big.png" 
              alt="The New Table - Cuisine gastronomique" 
              width={600} 
              height={400}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.secondaryImageWrapper}>
            <Image 
              src="/images/about/h3-intro-big.png" 
              alt="The New Table - Chef" 
              width={450} 
              height={300}
              className={styles.secondaryImage}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;