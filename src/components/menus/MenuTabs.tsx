"use client";

import React from 'react';
import styles from '@/styles/menus/MenuTabs.module.scss';

interface MenuTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'entree', label: 'Entrées' },
    { id: 'plat', label: 'Plats' },
    { id: 'dessert', label: 'Desserts' },
    { id: 'boisson', label: 'Boissons' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    // Scroll to section
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.menuTabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;