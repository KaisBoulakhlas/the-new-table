"use client";
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from '@/styles/header/Header.module.scss';
import Link from 'next/link';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <motion.img
              src="/images/logo.png"
              alt="The New Table"
              className={styles.logo}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Link>
        </div>
        
        <motion.nav 
          className={`${styles.nav} ${styles.desktopNav}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
              <Link href="/" className={styles.navLink}>
                Accueil
              </Link>
            </li>
            <li className={`${styles.navItem} ${pathname === '/menus' ? styles.active : ''}`}>
              <Link href="/menus" className={styles.navLink}>
                Menus
              </Link>
            </li>
            <li className={`${styles.navItem} ${pathname === '/avis' ? styles.active : ''}`}>
              <Link href="/avis" className={styles.navLink}>
                Avis
              </Link>
            </li>
          </ul>
        </motion.nav>
        <Sidebar />
      </header>
      
      <div className={styles.horizontalLine}></div>
    </>
  );
};

export default Header;