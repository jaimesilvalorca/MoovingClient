import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import { GOOGLE_MAPS_KEY } from '@env';

const TripDetailScreen = ({ route, navigation }) => {
  const { tripId } = route.params;
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState([]);

  const fetchTripDetails = async () => {
    try {
      const response = await axios.get(`http://45.7.231.169:3000/api/trips/${tripId}`);
      
      if (response.status === 200) {
        setTripDetails(response.data.data);
      } else {
        setError('Error al obtener detalles del viaje');
      }
    } catch (error) {
      setError('Error al obtener detalles del viaje');
    } finally {
      setLoading(false);
    }
  };

  const fetchDirections = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: `${tripDetails.originLatitude},${tripDetails.originLongitude}`,
          destination: `${tripDetails.destinationLatitude},${tripDetails.destinationLongitude}`,
          key: GOOGLE_MAPS_KEY, 
        },
      });

      if (response.status === 200) {
        setDirections(response.data.routes[0].overview_polyline.points);
      } else {
        setError('Error al obtener direcciones');
      }
    } catch (error) {
      setError('Error al obtener direcciones');
    }
  };

  const completeTrip = async () => {
    try {
        navigation.navigate('UserTabsNavigator')
    } catch (error) {
      console.error('Error al completar el viaje:');
    }
  };

  useEffect(() => {
    fetchTripDetails();
  }, [tripId]);

  useEffect(() => {
    if (tripDetails) {
      fetchDirections();
    }
  }, [tripDetails]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles del viaje...</Text>
      </View>
    );
  }

  if (error || !tripDetails) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar detalles del viaje</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: tripDetails.originLatitude || -33.4489,
          longitude: tripDetails.originLongitude || -70.6693,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: tripDetails.originLatitude, longitude: tripDetails.originLongitude }} title="Origen" />
        <Marker coordinate={{ latitude: tripDetails.destinationLatitude, longitude: tripDetails.destinationLongitude }} title="Destino" />

        {directions.length > 0 && (
          <Polyline
            coordinates={decodePolyline(directions)}
            strokeWidth={3}
            strokeColor="#009788"
          />
        )}
      </MapView>

      <FlatList
        style={styles.flatList}
        data={[
          { key: 'User Email', value: tripDetails.userEmail || 'N/A' },
          { key: 'Driver Email', value: tripDetails.driverEmail || 'N/A' },
          { key: 'Origin', value: tripDetails.origin },
          { key: 'Destination', value: tripDetails.destination },
          { key: 'Distance', value: tripDetails.distance || 'N/A' },
          { key: 'Amount', value: tripDetails.amount || 'N/A' },
        ]}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>{item.key}:</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.finishButton}
          onPress={completeTrip}
        >
          <Text style={styles.buttonText}>Terminar Viaje</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  flatList: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  item: {
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  finishButton: {
    backgroundColor: '#009788',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

// Función para decodificar la polilínea codificada de Google Maps
const decodePolyline = (encoded) => {
  let polyline = [];
  let index = 0;
  let len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    polyline.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }

  return polyline;
};

export default TripDetailScreen;
