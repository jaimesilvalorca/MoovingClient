import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

export const DriversListScreen = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriverEmail, setSelectedDriverEmail] = useState(null);
  const { user } = useContext(UserContext);
  const userEmail = user.email;

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://45.7.231.169:3000/api/drivers/getconnected');
        setDrivers(response.data.data);
      } catch (error) {
        console.error('Error al cargar la lista de conductores:', error.message);
      }
    };

    fetchDrivers();
  }, []);

  const handleDriverSelection = (email) => {
    setSelectedDriverEmail(email);
  };

  const handlePutRequest = async () => {
    try {
      if (selectedDriverEmail) {
        const response = await axios.put(
          'http://45.7.231.169:3000/api/trips/putRequest',
          {
            userEmail: userEmail,
            driverEmail: selectedDriverEmail,
            estado:'enviado'
          }
        );

        if (response.status === 200) {
          console.log('PUT exitoso en el backend');
          // Realiza cualquier otra acción necesaria después del PUT
        } else {
          console.error('Error en el PUT en el backend:', response.data);
        }
      }
    } catch (error) {
      console.error('Error en el PUT en el backend:', error.message);
    }
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 30 }}>Listado de Conductores Disponibles:</Text>
      <FlatList
        data={drivers}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDriverSelection(item.email)}>
            <Card>
              <Card.Title>{item && item.name}</Card.Title>
              <Card.Divider />
              <ListItem>
                <Avatar source={{ uri: item && item.image }} rounded size="xlarge" />
                <ListItem.Content>
                  <ListItem.Title>{item && item.name}</ListItem.Title>
                  <ListItem.Subtitle>{item && item.email}</ListItem.Subtitle>
                  <ListItem.Subtitle>{item && item.phone}</ListItem.Subtitle>
                  <ListItem.Subtitle>Vehículo: {item.car && item.car.make}</ListItem.Subtitle>
                  <ListItem.Subtitle>Modelo: {item.car && item.car.modelCar}</ListItem.Subtitle>
                  <ListItem.Subtitle>Año: {item.car && item.car.year}</ListItem.Subtitle>
                  <ListItem.Subtitle>Placa: {item.car && item.car.plate}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </Card>
          </TouchableOpacity>
        )}
      />
      {selectedDriverEmail && (
        <TouchableOpacity onPress={handlePutRequest}>
          <View style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Realizar PUT con conductor seleccionado</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
