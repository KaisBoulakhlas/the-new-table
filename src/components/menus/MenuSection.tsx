import React from 'react';
import MenuItem, { MenuItemProps } from './MenuItem';
import styles from '@/styles/menus/MenuSection.module.scss';
import Image from 'next/image';

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
  category: 'entree' | 'plat' | 'dessert' | 'boisson';
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, category }) => {
  return (
    <section className={`${styles.menuSection} ${styles[category]}`} id={category}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.decorativeLine}></div>
      </div>
      <div className={styles.sectionContent}>
        <div style={{ minHeight: '100px' }}>
          <Image src="/images/menus/menu-top-left.svg" alt={title} className={styles.menuTopLeft} width={0} height={0} />
          <Image src="/images/menus/menu-top-right.svg" alt={title} className={styles.menuTopRight} width={0} height={0} />
        </div>
      
        <div className={styles.itemsGrid}>
          {items.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </div>
        <div style={{ minHeight: '100px' }}>
          <Image src="/images/menus/menu-btm-left.svg" alt={title} className={styles.menuBtmLeft} width={0} height={0} />
          <Image src="/images/menus/menu-btm-right.svg" alt={title} className={styles.menuBtmRight} width={0} height={0} />
        </div>
      </div>
    </section>
  );
};

export default MenuSection;