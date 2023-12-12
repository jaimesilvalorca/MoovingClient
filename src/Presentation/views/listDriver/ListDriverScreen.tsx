import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';

import axios from 'axios';

export const DriversListScreen = () => {
  const [drivers, setDrivers] = useState([]);

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

  return (
    <View>
      <Text>Listado de Conductores Disponibles:</Text>
      <FlatList
        data={drivers}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
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
        )}
      />
    </View>
  );
};
