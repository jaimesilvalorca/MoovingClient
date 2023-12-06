import React, { useState, useEffect, useRef,useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_KEY } from '@env';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

export const MapScreen = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [originDescription, setOriginDescription] = useState('Origen');
  const mapRef = useRef(null);
  const {user} = useContext(UserContext)

  // Simula la información de sesión del usuario
  const userEmail = user.email; // Reemplaza con la lógica real para obtener el correo del usuario

  const handleSelectOrigin = async (data, details = null) => {
    if (data.description === 'Mi ubicación') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          description: 'Mi ubicación',
        });
        setOriginDescription('Mi ubicación');
      }
    } else {
      setOrigin({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        description: data.description,
      });
      setOriginDescription(data.description);
    }
  };

  const handleSelectDestination = (data, details = null) => {
    setDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      description: data.description,
    });
  };

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        if (origin && destination) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_KEY}`
          );

          if (!response.ok) {
            throw new Error(`Error de red: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.status === 'OK' && data.rows.length > 0) {
            const distanceInMeters = data.rows[0].elements[0].distance.value;
            const distanceInKilometers = distanceInMeters / 1000;
            setDistance(distanceInKilometers.toFixed(2));
          } else {
            console.error('Error al obtener la distancia:', data);
          }
        }
      } catch (error) {
        console.error('Error al obtener la distancia:', error.message);
      }
    };

    fetchDistance();
  }, [origin, destination]);

  useEffect(() => {
    if (mapRef.current && origin && destination) {
      const bounds = [origin, destination];
      mapRef.current.fitToCoordinates(bounds, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [origin, destination]);

  const saveTripToBackend = async () => {
    try {
      if (origin && destination && distance) {
        const tripData = {
          email: userEmail,
          origin: originDescription,
          destination: destination.description,
          originLatitude: origin.latitude,
          originLongitude: origin.longitude,
          destinationLatitude: destination.latitude,
          destinationLongitude: destination.longitude,
          distance: distance,
          amount: 3000 * distance,
          estado:'solicitado' // Ajusta según tus necesidades
        };

        const response = await axios.post(
          'http://45.7.231.169:3000/api/trips/create',
          tripData
        );

        if (response.status === 200) {
          console.log('Viaje guardado con éxito en el backend');
        } else {
          console.error('Error al guardar el viaje en el backend:', response.data);
        }
      }
    } catch (error) {
      console.error('Error al guardar el viaje en el backend:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -33.4489, 
          longitude: -70.6693, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {origin && <Marker coordinate={origin} title="Origen" />}
        {destination && <Marker coordinate={destination} title="Destino" />}

        {origin && destination && distance && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )}
      </MapView>

      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          placeholder={originDescription}
          onPress={handleSelectOrigin}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'es',
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            description: {
              fontWeight: 'bold',
            },
          }}
          renderRightButton={() => (
            <TouchableOpacity
              onPress={() => handleSelectOrigin({ description: 'Mi ubicación' })}
              style={styles.currentLocationButton}
            >
              <Text style={styles.currentLocationButtonText}>Mi ubicación</Text>
            </TouchableOpacity>
          )}
        />

        <GooglePlacesAutocomplete
          placeholder="Destino"
          onPress={handleSelectDestination}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'es',
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
            },
            description: {
              fontWeight: 'bold',
            },
          }}
        />
      </View>

      {distance && (
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>Distancia: {distance} km</Text>
          <Text style={styles.distanceText}>Tarifa:$ {distance*3000}</Text>
        </View>
      )}

      <TouchableOpacity onPress={saveTripToBackend} style={styles.saveTripButton}>
        <Text style={styles.saveTripButtonText}>Guardar Viaje</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  distanceText: {
    fontWeight: 'bold',
  },
  currentLocationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
  },
  currentLocationButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveTripButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
  },
  saveTripButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
