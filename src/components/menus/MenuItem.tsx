import Image from 'next/image';
import styles from '@/styles/menus/MenuItem.module.scss';

export interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'entree' | 'plat' | 'dessert' | 'boisson';
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, image }) => {
  return (
    
        <div className={styles.menuItem}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className={styles.imageContainer}>
                    <Image 
                    src={image} 
                    alt={name} 
                    width={300} 
                    height={200} 
                    className={styles.image}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3 className={styles.name}>{name}</h3>
                        <span className={styles.price}>{price.toFixed(2)} €</span>
                    </div>
                </div>
            </div>
            <p className={styles.description}>{description}</p>
        </div>
  );
};

export default MenuItem;