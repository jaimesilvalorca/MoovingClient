import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

export const TripScreen = () => {
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedTrips = async () => {
      try {
        const response = await fetch('http://45.7.231.169:3000/api/trips/completed');
        const data = await response.json();

        if (response.ok) {
          setCompletedTrips(data.data);
        } else {
          setError(data.message || 'Error al obtener los viajes completados');
        }
      } catch (error) {
        setError('Error al conectarse con la API');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTrips();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando viajes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Viajes Realizados</Text>
      <FlatList
        data={completedTrips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.tripItem}>
            <Text style={styles.userEmail}>Conductor: {item.driverEmail}</Text>
            <Text style={styles.userEmail}>Origen: {item.origin}</Text>
            <Text style={styles.userEmail}>Destino: {item.destination}</Text>
            <Text style={styles.userEmail}>Distancia: {item.distance} KM</Text>
            <Text style={styles.userEmail}>Precio: ${item.amount}</Text>

            
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tripItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
