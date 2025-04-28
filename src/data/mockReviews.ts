// src/data/mockReviews.ts

export interface ReviewData {
    id: string;
    author_name: string;
    rating: number;
    text: string;
    date: string; // Format ISO pour faciliter la manipulation
    profile_photo_url?: string;
  }
  
  export const mockReviews: ReviewData[] = [
    {
      id: "1",
      author_name: "Sophie Martin",
      rating: 5,
      text: "Une expérience culinaire exceptionnelle ! Les saveurs étaient parfaitement équilibrées et le service impeccable. Le chef est venu nous saluer à notre table, une attention très appréciée.",
      date: "2023-11-15",
      profile_photo_url: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: "2",
      author_name: "Thomas Durand",
      rating: 4,
      text: "Cadre élégant et cuisine raffinée. J'ai particulièrement apprécié les suggestions du sommelier qui a su parfaitement accompagner notre repas.",
      date: "2023-10-28",
      profile_photo_url: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: "3",
      author_name: "Marie Leroy",
      rating: 5,
      text: "Probablement le meilleur restaurant que j'ai essayé cette année ! Les plats sont créatifs et les saveurs incroyables. Réservation indispensable car l'endroit est très prisé.",
      date: "2023-11-05",
      profile_photo_url: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: "4",
      author_name: "Jean Dupont",
      rating: 4.5,
      text: "La cuisine est vraiment excellente. Les produits sont frais et de qualité. Petit bémol sur le temps d'attente entre les plats, mais cela reste raisonnable pour une cuisine de ce niveau.",
      date: "2023-09-18",
      profile_photo_url: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: "5",
      author_name: "Claire Bernard",
      rating: 5,
      text: "Tous les plats étaient divins, de l'entrée au dessert. Le service était attentionné et discret. Nous avons passé une soirée mémorable pour notre anniversaire de mariage.",
      date: "2023-10-12",
      profile_photo_url: "https://randomuser.me/api/portraits/women/90.jpg"
    },
    {
      id: "6",
      author_name: "Pierre Moreau",
      rating: 3.5,
      text: "La nourriture était excellente, mais le service un peu lent. Nous avons attendu 30 minutes pour notre entrée. Les plats valent néanmoins le détour pour leurs saveurs uniques.",
      date: "2023-11-01",
      profile_photo_url: "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
      id: "7",
      author_name: "Émilie Dubois",
      rating: 5,
      text: "Un pur délice ! Je recommande particulièrement le menu dégustation qui permet de découvrir toute l'étendue du talent du chef. La carte des vins est également très bien pensée.",
      date: "2023-10-22",
      profile_photo_url: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
      id: "8",
      author_name: "Laurent Lambert",
      rating: 4,
      text: "Très bonne table, ambiance feutrée et élégante. Les plats sont bien présentés et savoureux. Le rapport qualité-prix est correct pour un restaurant de ce standing.",
      date: "2023-09-30",
      profile_photo_url: "https://randomuser.me/api/portraits/men/36.jpg"
    }
  ];