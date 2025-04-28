import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft, FaQuoteRight, FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/lastreview/LastReviewSection.module.scss';
import { getLatestReview } from '../../../actions/reviewsAction';

const LastReviewSection = async () => {

  const review = await getLatestReview();
  
  if (!review) {
    return null;
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className={styles.star} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={styles.star} />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={styles.starEmpty} />);
    }
    
    return stars;
  };

  return (
    <section className={styles.lastReviewSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Ce que nos clients disent</h2>
          <div className={styles.decorativeLine}></div>
          <p className={styles.subtitle}>Découvrez le dernier avis laissé par l&apos;un de nos clients</p>
        </div>
        
        <div className={styles.reviewCard}>
          <div className={styles.reviewCardInner}>
            <div className={styles.reviewerInfo}>
              <div className={styles.reviewerPhoto}>
                {review.profile_photo_url ? (
                  <Image 
                    src={review.profile_photo_url} 
                    alt={review.author_name} 
                    width={70} 
                    height={70} 
                  />
                ) : (
                  <div className={styles.reviewerInitials}>
                    {review.author_name.split(' ').map(name => name[0]).join('')}
                  </div>
                )}
              </div>
              <div>
                <h3 className={styles.reviewerName}>{review.author_name}</h3>
                <div className={styles.reviewMeta}>
                  <div className={styles.reviewStars}>
                    {renderStars(review.rating)}
                  </div>
                  <span className={styles.reviewDate}>
                    {new Date(review.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={styles.reviewContent}>
              <FaQuoteLeft className={styles.quoteIcon} />
              <p className={styles.reviewText}>
                {review.text.length > 250 
                  ? `${review.text.substring(0, 250)}...` 
                  : review.text
                }
              </p>
              <FaQuoteRight className={`${styles.quoteIcon} ${styles.quoteRight}`} />
            </div>
            
            <div className={styles.sourceNote}>Via {review.source}</div>
            
            <div className={styles.buttonContainer}>
              <Link href="/avis" className={styles.viewAllButton}>
                Voir tous les avis <FaArrowRight className={styles.arrowIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastReviewSection;