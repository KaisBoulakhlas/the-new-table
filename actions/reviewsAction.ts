'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { cache } from 'react';

export interface GoogleReview {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GoogleReviewsResponse {
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
}

export interface FormattedReview {
  id: string;
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  date: string;
  text: string;
  source: string;
}

export interface FormattedReviewsData {
  averageRating: number;
  totalReviews: number;
  reviews: FormattedReview[];
}

const mockReviews: GoogleReviewsResponse = {
  rating: 4.7,
  totalRatings: 28,
  reviews: [
    {
      author_name: "Sophie Martin",
      profile_photo_url: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 5,
      relative_time_description: "il y a 2 semaines",
      text: "Un dîner exceptionnel ! Les plats sont délicieux et le service attentionné. J'ai particulièrement apprécié le carré d'agneau aux herbes fraîches et le dessert au chocolat. Une belle découverte que je recommande vivement.",
      time: Date.now() / 1000 - 86400 * 14 // il y a 2 semaines
    },
    {
      author_name: "Thomas Dubois",
      profile_photo_url: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      relative_time_description: "il y a 1 mois",
      text: "Très bonne expérience culinaire. Les saveurs sont au rendez-vous, l'ambiance est soignée. Seul petit bémol, l'attente un peu longue entre les plats. Je reviendrai néanmoins pour goûter le reste de la carte.",
      time: Date.now() / 1000 - 86400 * 30 // il y a 1 mois
    },
    {
      author_name: "Émilie Petit",
      profile_photo_url: "https://randomuser.me/api/portraits/women/67.jpg",
      rating: 5,
      relative_time_description: "il y a 2 mois",
      text: "Je suis vraiment conquise par ce restaurant! Les plats sont raffinés, originaux et préparés avec des produits de saison. Le chef a su créer des associations de saveurs surprenantes mais parfaitement équilibrées. Le service est également impeccable. Un vrai moment de plaisir gastronomique.",
      time: Date.now() / 1000 - 86400 * 60 // il y a 2 mois
    },
    {
      author_name: "Laurent Bernard",
      rating: 4,
      relative_time_description: "il y a 3 mois",
      text: "Bonne table, cuisine inventive avec des produits frais. Le cadre est élégant et l'accueil chaleureux. Prix un peu élevés mais justifiés par la qualité. Bon rapport qualité-prix pour ce niveau de cuisine.",
      time: Date.now() / 1000 - 86400 * 90 // il y a 3 mois
    },
    {
      author_name: "Marie Leroy",
      profile_photo_url: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 5,
      relative_time_description: "il y a 4 mois",
      text: "Soirée anniversaire parfaite ! L'équipe a été aux petits soins et nous a préparé une belle surprise pour l'occasion. Les plats étaient divins, notamment les Saint-Jacques et le soufflé au Grand Marnier. Merci pour ce beau moment.",
      time: Date.now() / 1000 - 86400 * 120 // il y a 4 mois
    }
  ]
};

function formatGoogleReviews(reviewsData: GoogleReviewsResponse): FormattedReviewsData {
  return {
    averageRating: reviewsData.rating,
    totalReviews: reviewsData.totalRatings,
    reviews: reviewsData.reviews.map(review => ({
      id: `google-${review.time}`,
      author_name: review.author_name,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      date: new Date(review.time * 1000).toISOString(),
      text: review.text,
      source: 'Google'
    }))
  };
}

export const fetchGoogleReviews = cache(async (): Promise<FormattedReviewsData> => {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  const cookiesStore = await cookies();
  
  const mockPreference = cookiesStore.get('use-mock-reviews');
  const USE_MOCK_DATA = mockPreference 
    ? mockPreference.value === 'true' 
    : process.env.NODE_ENV === "development" || !GOOGLE_API_KEY || !PLACE_ID;
  
  const cachedReviews = cookiesStore.get('google-reviews-cache');
  
  if (cachedReviews) {
    try {
      const cachedData = JSON.parse(cachedReviews.value);
      const cacheTime = new Date(cachedData.timestamp);
      const now = new Date();
      
      if ((now.getTime() - cacheTime.getTime()) < 24 * 60 * 60 * 1000) {
        console.log('Utilisation des données mises en cache pour les avis Google', cachedData.data);
        return cachedData.data;
      }
    } catch (e) {
      console.error('Erreur de lecture du cache:', e);
    }
  }
  
  if (USE_MOCK_DATA) {
    console.log('Utilisation des données simulées pour les avis Google');
    const formattedData = formatGoogleReviews(mockReviews);
    
    const cacheData = {
      timestamp: new Date().toISOString(),
      data: formattedData
    };
    
    cookiesStore.set({
      name: 'google-reviews-cache',
      value: JSON.stringify(cacheData),
      maxAge: 86400,
      path: '/'
    });
    
    return formattedData;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Erreur API Google: ${data.status}`);
    }
    
    const formattedData = formatGoogleReviews({
      rating: data.result.rating,
      totalRatings: data.result.user_ratings_total,
      reviews: data.result.reviews || []
    });
    
    const cacheData = {
      timestamp: new Date().toISOString(),
      data: formattedData
    };
    
    cookiesStore.set({
      name: 'google-reviews-cache',
      value: JSON.stringify(cacheData),
      maxAge: 86400,
      path: '/'
    });
    
    return formattedData;
    
  } catch (error) {
    console.error('Erreur lors de la récupération des avis Google:', error);
    
    console.log('Utilisation des données simulées comme fallback après une erreur API');
    return formatGoogleReviews(mockReviews);
  }
});

export const getLatestReview = cache(async (): Promise<FormattedReview | null> => {
  const { reviews } = await fetchGoogleReviews();
  
  if (reviews.length === 0) {
    return null;
  }

  return reviews.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
});

export async function refreshReviews() {
  const cookiesStore = await cookies();
  cookiesStore.delete('google-reviews-cache');
  revalidatePath('/avis');
  revalidatePath('/');
  
  await fetchGoogleReviews();
  
  return { success: true };
}