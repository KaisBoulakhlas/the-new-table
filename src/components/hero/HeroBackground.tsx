"use client";
import styles from '@/styles/hero/HeroBackground.module.scss';

const HeroBackground: React.FC = () => {
  return (
    <>
      <video
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/banner.mp4" type="video/mp4" />
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video>
      
      <div className={styles.overlay}></div>
    </>
  );
};

export default HeroBackground;