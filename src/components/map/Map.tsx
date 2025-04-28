"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngExpression } from "leaflet";
import styles from "@/styles/map/Map.module.scss";

const Map: React.FC = () => {
    const position: LatLngExpression = [48.8566, 2.3522];
    const zoom = 17;
    const popupText = "The New Table - 123 Rue Example, 75001 Paris";

  return (
    <section className={styles.mapSection}>
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={true}
            className={styles.mapContainer}
            >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            <Marker position={position}>
                <Popup>{popupText}</Popup>
            </Marker>
        </MapContainer>
    </section>
  );
};

export default Map;