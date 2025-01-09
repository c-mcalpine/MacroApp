import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ restaurants }) => {
  return (
    <MapContainer center={[39.9515, -75.1910]} zoom={13} className="h-96 w-full">
      <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
/>

      {restaurants.map((restaurant) => (
        <Marker key={restaurant.id} position={[restaurant.latitude, restaurant.longitude]}>
          <Popup>
            <strong>{restaurant.name}</strong><br />
            {restaurant.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
