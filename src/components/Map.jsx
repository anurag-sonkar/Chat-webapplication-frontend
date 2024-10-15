import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { useSelector } from 'react-redux';
import { user_base_url } from '../utils/base_url';

function Map() {
    const [markers, setMarkers] = useState({});
    const mapRef = useRef(null);
    const socketRef = useRef(null);
    const {user} = useSelector(state =>state.auth)

    useEffect(() => {
        if (!user?._id) return; // Prevent execution if user is not available
        
        // Initialize the map only once
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([0, 0], 16);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?', { attribution: 'Location tracker' }).addTo(mapRef.current);
        }

        // Initialize socket connection
        socketRef.current = io(`${user_base_url}`);

        // Geolocation setup
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    socketRef.current.emit('send-location', { latitude, longitude , id :_id  });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000, // ms
                }
            );
        }

        // Socket listener for receiving locations
        socketRef.current.on('receive-location', (data) => {
            const { id, latitude, longitude } = data;
            mapRef.current.setView([latitude, longitude], 16);

            setMarkers((prevMarkers) => {
                if (prevMarkers[id]) {
                    prevMarkers[id].setLatLng([latitude, longitude]);
                } else {
                    const newMarker = L.marker([latitude, longitude])
                        .addTo(mapRef.current)
                        .bindTooltip(`ID: ${id}`, {
                            permanent: true,
                            direction: 'bottom'
                        })
                        .openTooltip();

                    return { ...prevMarkers, [id]: newMarker };
                }

                return prevMarkers;
            });
        });

        // Handle user disconnection and remove marker
        socketRef.current.on('user-disconnected', (disconnectedUserId) => {
            setMarkers((prevMarkers) => {
                if (prevMarkers[disconnectedUserId]) {
                    mapRef.current.removeLayer(prevMarkers[disconnectedUserId]); // Remove marker from map
                    const updatedMarkers = { ...prevMarkers };
                    delete updatedMarkers[disconnectedUserId]; // Remove marker from state
                    return updatedMarkers;
                }
                return prevMarkers;
            });
        });


        // Cleanup function to remove map and socket connection
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            if (socketRef.current) {
                socketRef.current.disconnect();  // Properly close the socket connection
            }
        };
    }, []);

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>; // Adjust map container size
}

export default Map;
