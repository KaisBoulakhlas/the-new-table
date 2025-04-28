// src/components/MenuContainer.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import MenuTabs from './MenuTabs';
import MenuSection from './MenuSection';
import { MenuItemProps } from './MenuItem';
import styles from '@/styles/menus/MenuContainer.module.scss';

const MenuContainer: React.FC<{ menuItems: MenuItemProps[] }> = ({ menuItems }) => {
  const [activeTab, setActiveTab] = useState('entree');
  const [isSticky, setIsSticky] = useState(false);
  
  const tabsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const entreeRef = useRef(null);
  const platRef = useRef(null);
  const dessertRef = useRef(null);
  const boissonRef = useRef(null);
  
  const options = { 
    amount: 0.9,
    once: false
  };
  
  const entreeInView = useInView(entreeRef, options);
  const platInView = useInView(platRef, options);
  const dessertInView = useInView(dessertRef, options);
  const boissonInView = useInView(boissonRef, options);
  
  const entrees = menuItems.filter(item => item.category === 'entree');
  const plats = menuItems.filter(item => item.category === 'plat');
  const desserts = menuItems.filter(item => item.category === 'dessert');
  const boissons = menuItems.filter(item => item.category === 'boisson');

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current && headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom;
        
        if (headerBottom > 0) {
          if (isSticky) setIsSticky(false);
        } else {
          if (!isSticky) setIsSticky(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  useEffect(() => {
    if (boissonInView) {
      setActiveTab('boisson');
    } else if (dessertInView) {
      setActiveTab('dessert');
    } else if (platInView) {
      setActiveTab('plat');
    } else if (entreeInView) {
      setActiveTab('entree');
    }
  }, [entreeInView, platInView, dessertInView, boissonInView]);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuHeader} ref={headerRef}>
        <h1 className={styles.menuTitle}>Notre Carte</h1>
        <p className={styles.menuSubtitle}>Une expérience gastronomique unique</p>
      </div>
      
     
      <div className={`${styles.tabsPlaceholder} ${isSticky ? styles.active : ''}`}></div>
      
      <motion.div
        ref={tabsRef}
        id="menu-tabs"
        className={`${styles.tabsContainer} ${isSticky ? styles.sticky : ''}`}
        initial={false}
        animate={{
          boxShadow: isSticky ? "0 4px 15px rgba(0, 0, 0, 0.7)" : "none",
          backgroundColor: isSticky ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.9)"
        }}
        transition={{ duration: 0.3 }}
      >
        <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
      
      <div className={styles.menuSections}>
        <div ref={entreeRef}>
          <MenuSection title="Entrées" items={entrees} category="entree" />
        </div>
        <div ref={platRef}>
          <MenuSection title="Plats" items={plats} category="plat" />
        </div>
        <div ref={dessertRef}>
          <MenuSection title="Desserts" items={desserts} category="dessert" />
        </div>
        <div ref={boissonRef}>
          <MenuSection title="Boissons" items={boissons} category="boisson" />
        </div>
      </div>
    </div>
  );
};

export default MenuContainer;