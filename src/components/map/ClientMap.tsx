"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(
  () => import("@/components/map/Map"),
  { 
    loading: () => <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Chargement de la carte...</div>,
    ssr: false 
  }
);

const ClientMap: React.FC = () => {
  return <MapComponent />;
};

export default ClientMap;