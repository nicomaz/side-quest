import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const dummyQuestList = {
  quests: [
    {name: 'hyde park',
    description: 'dhbrfurhbfhj',
    location: {
      latitude: 51.5074,
      longitude: 0.1641}
    }
  ]
}

const Map = () => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [questDestination, setQuestDestination] = useState(null)


  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (userLocation) => {
            setCurrentLocation(userLocation);
            setQuestDestination(dummyQuestList[quests].location)
          }
        );
        return () => locationSubscription.remove();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {currentLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.5072,
            longitude: 0.1276,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker 
            coordinate={questDestination}
            title={dummyquest.name}
            />
          <MapViewDirections
            origin={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            destination={questDestination}
            apikey="AIzaSyDfMw0j4oBjMtX2Ja5MMCAfYmdW1SAji0A"
            mode="WALKING"
            strokeWidth={2}
            strokeColor="#d86429"
          />
          </MapView>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.4808,
            longitude: -0.1227,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        </MapView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mapContainer: {
    height: '50%',
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
export default Map;

//figure out how to make the red modal for quest info, and how to link it to markers