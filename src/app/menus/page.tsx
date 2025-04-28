// src/app/menus/page.tsx
import { Metadata } from 'next';
import styles from '@/styles/menus/MenuPage.module.scss';
import MenuContainer from '@/components/menus/MenuContainer';
import { menuData } from '@/data/menuData';

export const metadata: Metadata = {
  title: 'Menus | The New Table',
  description: 'Découvrez notre carte et nos menus gastronomiques avec des entrées, plats, desserts et boissons raffinés.',
};

export default function MenusPage() {
  return (
    <main className={styles.menuPage}>
      <MenuContainer menuItems={menuData} />
    </main>
  );
}