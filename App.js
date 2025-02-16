import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './Components/Map';
import ParkingSlots from './Components/ParkingSlots';
import Book from './Components/Book';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFD95F' }, // Customize header background
          headerTintColor: '#fff', // Customize text color
          headerTitleAlign: 'center', // Center the title
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, // Style for title
        }}
      >
        <Stack.Screen name="Map" component={Map} options={{ title: 'Parking Map' }} />
        <Stack.Screen name="ParkingSlots" component={ParkingSlots} options={{ title: 'Select a Slot' }} />
        <Stack.Screen name="Book" component={Book} options={{ title: 'Booking Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}