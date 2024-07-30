import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const TrainerProfileMap = ({ address }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const apiKey = "AIzaSyBrl6-l3pzGlN-5PrX8JVqB4wLrC0t2aJQ";

  useEffect(() => {
    const searchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.results.length > 0) {
          const coords = {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
          };
          setLocation(coords);
          setError(null);
        } else {
          setError("No results found for the given address.");
        }
      } catch (error) {
        console.error("Error fetching the geocode data:", error);
        setError(error.message);
      }
    };

    if (address) {
      searchAddress();
    }
  }, [address, apiKey]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => setIsApiLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const containerStyle = {
    width: "100%",
    height: "33rem",
  };

  return (
    <div className="trainer-profile-actions-map">
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          <p>Error: {error}</p>
          <p>
            Please check the address or try again later. If the problem
            persists, contact support.
          </p>
        </div>
      )}
      {isApiLoaded && location.lat && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      )}
    </div>
  );
};

export default TrainerProfileMap;
