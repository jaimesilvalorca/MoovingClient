import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { UserTabsNavigator } from './src/Presentation/navigator/UserTabsNavigator';
import { ProfileUpdateScreen } from './src/Presentation/views/profile/update/ProfileUpdate';
import { User } from './src/Domain/entities/User';
import { UserProvider } from './src/Presentation/context/UserContext';
import { MapScreen } from './src/Presentation/views/mapScreen/Map';
import { DriversListScreen } from './src/Presentation/views/listDriver/ListDriverScreen';
import TripDetailScreen from './src/Presentation/views/tripDetailScreen/TripDetailScreen';


export type RootStackParamList = {
  HomeScreen: undefined,
  RegisterScreen: undefined,
  UserTabsNavigator: undefined,
  UserAddressListScreen: undefined,
  ProfileUpdateScreen: { user: User },
  MapScreen: { user: User },
  DriversListScreen: undefined
  TripDetailScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <UserState>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name='HomeScreen'
            component={HomeScreen}
          />
          <Stack.Screen
            name='RegisterScreen'
            component={RegisterScreen}
            options={{
              headerShown: true,
              title: 'Registro de usuarios'
            }}
          />
          <Stack.Screen
            name='UserTabsNavigator'
            component={UserTabsNavigator}
          />
          <Stack.Screen
            name='ProfileUpdateScreen'
            component={ProfileUpdateScreen}
            options={{
              headerShown: true,
              title: 'Actualizar usuario'
            }}
          />

          <Stack.Screen
            name='MapScreen'
            component={MapScreen}
            options={{
              headerShown: true,
              title: 'Punto de referencia'
            }}
          />

          <Stack.Screen
            name='DriversListScreen'
            component={DriversListScreen}
            options={{
              headerShown: true,
              title: 'Punto de referencia'
            }}
          />

          <Stack.Screen
            name='TripDetailScreen'
            component={TripDetailScreen}
            options={{
              headerShown: true,
              title: 'Punto de referencia'
            }}
          />


        </Stack.Navigator>
      </UserState>
    </NavigationContainer>
  )
}

const UserState = ({ children }: any) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}

export default App