"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/footer/Footer.module.scss';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Section principale du footer avec 3 colonnes */}
        <div className={styles.mainFooter}>
          {/* Première colonne : Sitemap */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Navigation</h3>
            <nav className={styles.navLinks}>
              <Link href="/" className={styles.navLink}>Accueil</Link>
              <Link href="/menus" className={styles.navLink}>Menus</Link>
              <Link href="/avis" className={styles.navLink}>Avis</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <div className={styles.logoCircle}>
              <Image 
                src="/images/logo.png" 
                alt="The New Table" 
                width={80} 
                height={80}
                className={styles.logo}
              />
            </div>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaTwitter />
              </a>
            </div>
          </div>


          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <div className={styles.contactInfo}>
              <a href="tel:+33123456789" className={styles.contactItem}>
                <FiPhone className={styles.contactIcon} />
                <span>+33 1 23 45 67 89</span>
              </a>
              <a href="mailto:contact@lanouvelletable.fr" className={styles.contactItem}>
                <FiMail className={styles.contactIcon} />
                <span>contact@lanouvelletable.fr</span>
              </a>
              <div className={styles.contactItem}>
                <FiMapPin className={styles.contactIcon} />
                <span>123 Rue Example, 75001 Paris</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bas du footer */}
        <div className={styles.bottomFooter}>
          <p className={styles.copyright}>
            © {currentYear} The New Table. Tous droits réservés.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy" className={styles.legalLink}>Politique de confidentialité</Link>
            <Link href="/terms" className={styles.legalLink}>Termes & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;