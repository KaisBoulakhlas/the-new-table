"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from '@/styles/reviews/Reviews.module.scss';
import { usePathname } from 'next/navigation';
import { fetchGoogleReviews, FormattedReview } from '../../../actions/reviewsAction';


const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<FormattedReview[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const initialLoad = pathname === '/avis';

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchGoogleReviews();
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      } catch (error) {
        console.error("Erreur lors du chargement des avis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  const filteredReviews = activeFilter 
    ? reviews.filter(review => Math.floor(review.rating) === activeFilter) 
    : reviews;
  
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

  if (isLoading) {
    return (
      <section className={styles.reviewsSection}>
        <div className={styles.container}>
          <div className={styles.loading}>Chargement des avis...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={initialLoad ? { opacity: 1, y: 0 } : {}}
          whileInView={!initialLoad ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>Avis de nos clients</h2>
          <div className={styles.decorativeLine}></div>
          <p className={styles.subtitle}>Découvrez ce que pensent nos clients de leur expérience chez The New Table</p>
          
          <div className={styles.ratingOverview}>
            <div className={styles.averageRating}>
              <span className={styles.ratingNumber}>{averageRating.toFixed(1)}</span>
              <div className={styles.starsWrapper}>
                {renderStars(averageRating)}
              </div>
              <span className={styles.reviewCount}>Basé sur {totalReviews} avis</span>
              <div className={styles.sourceNote}>Source: Google Reviews</div>
            </div>
            
            <div className={styles.filtersContainer}>
              <p className={styles.filterLabel}>Filtrer par note :</p>
              <div className={styles.filters}>
                {[5, 4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    className={`${styles.filterButton} ${activeFilter === rating ? styles.active : ''}`}
                    onClick={() => setActiveFilter(activeFilter === rating ? null : rating)}
                  >
                    {rating} <FaStar className={styles.filterStar} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className={styles.reviewsList}>
          {filteredReviews.map((review, index) => (
            <motion.div 
              key={review.id}
              className={styles.reviewCard}
              initial={{ opacity: 0, y: 20 }}
              animate={initialLoad ? { opacity: 1, y: 0 } : {}}
              whileInView={!initialLoad ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerPhoto}>
                  {review.profile_photo_url ? (
                    <Image 
                      src={review.profile_photo_url} 
                      alt={review.author_name} 
                      width={60} 
                      height={60} 
                    />
                  ) : (
                    <div className={styles.reviewerInitials}>
                      {review.author_name.split(' ').map(name => name[0]).join('')}
                    </div>
                  )}
                </div>
                <div className={styles.reviewerInfo}>
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
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.reviewSource}>Via {review.source}</div>
            </motion.div>
          ))}
        </div>
        
        {filteredReviews.length === 0 && activeFilter !== null && (
          <div className={styles.noReviews}>
            Aucun avis ne correspond à ce filtre. Veuillez sélectionner une autre note.
          </div>
        )}
        
        <motion.div 
          className={styles.callToAction}
          initial={{ opacity: 0, y: 20 }}
          animate={initialLoad ? { opacity: 1, y: 0 } : {}}
          whileInView={!initialLoad ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.ctaTitle}>Avez-vous visité notre restaurant ?</h3>
          <p className={styles.ctaText}>Partagez votre expérience et aidez d&apos;autres clients à découvrir The New Table</p>
          <a 
            href={`https://search.google.com/local/writereview?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ''}`}
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Laisser un avis sur Google
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;