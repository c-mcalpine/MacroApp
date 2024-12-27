import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ restaurants }) => {
  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={13} className="h-96 w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
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
