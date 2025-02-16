import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const navigation = useNavigation(); // Hook for navigation

  // Function to get user's current location
  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "You need to allow location access to use this feature.");
      return;
    }
  
    try {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  // Function to fetch locations from API
  const fetchLocations = async () => {
    try {
      const response = await fetch('https://example.com/api/locations'); // Replace with your actual API
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchLocations();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLocation?.latitude || 17.01183891531467,
        longitude: userLocation?.longitude || 73.33629707982992,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={userLocation ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      } : undefined}
    >
      {/* User's current location marker */}
      {userLocation && (
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Your Location"
          description="You are here"
          pinColor="blue"
        />
      )}

      {/* Two Custom Markers with PNG Icon and Navigation */}
      {[
        { latitude: 16.996773021068755, longitude: 73.34600234067669 },
        { latitude: 17.017038595926184, longitude: 73.3358416526145 }
      ].map((loc, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
          title="Parking Spot"
          description="Click to view slots"
          onPress={() => navigation.navigate('ParkingSlots')}
        >
          <Image source={require('../assets/location-icon.png')} style={{ width: 40, height: 40 }} />
        </Marker>
      ))}

      {/* Other locations from API */}
      {locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title={location.name}
          description={location.description}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
