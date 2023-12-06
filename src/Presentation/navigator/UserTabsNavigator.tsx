import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TripScreen } from '../views/trips/Trips';
import { MapScreen } from '../views/mapScreen/Map';
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export const UserTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TripScreen"
        component={TripScreen}
        options={{
          title: 'Historial de viajes',
          headerShown:true,
          tabBarLabel: 'Historial de viajes',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../../assets/list.png')}
              style={{ width: 25, height: 25 }}
            />
          )
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Mapa',
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../../assets/map.png')}
              style={{ width: 25, height: 25 }}
            />
          )
        }}


      />
      <Tab.Screen
        name="ProfileInfoScreen"
        component={ProfileInfoScreen}
        options={{
          title: 'Perfil',
          headerShown:false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../../assets/user_menu.png')}
              style={{ width: 25, height: 25 }}
            />
          )
        }}

      />
    </Tab.Navigator>
  );
}

