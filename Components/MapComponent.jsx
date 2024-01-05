import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import Example from "./BottomSheet";
import mapStyle from "../assets/MapStyle";


const dummyQuest = {
  name: "The London Eye",
  description: "dhbrfurhbfhj",
  location: {
    latitude: 51.503399,
    longitude: -0.119519,
  },
};
const dummyLocations = [
  {
    name: "The Ritz",
    description: "dhbrfurhbfhj",
    location: {
      latitude: 51.5071,
      longitude: 0.1416,
    },
  },
  {
    name: "hyde park",
    description: "dhbrfurhbfhj",
    location: {
      latitude: 51.5074,
      longitude: 0.1641,
    },
  },
  {
    name: "The London Eye",
    description: "dhbrfurhbfhj",
    location: {
      latitude: 51.503399,
      longitude: -0.119519,
    },
  },
];

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [questDestination, setQuestDestination] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
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
            setQuestDestination(dummyQuest.location);
          }
        );
        return () => locationSubscription.remove();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handlePress = (e) => {
    const pressedMarker = dummyLocations.find(
      (marker) =>
        marker.location.latitude === e.nativeEvent.coordinate.latitude &&
        marker.location.longitude === e.nativeEvent.coordinate.longitude
    );
    if (pressedMarker) {
      console.log('Pressed Marker Title:', pressedMarker.name);
      setSelectedMarker(e.nativeEvent.coordinate);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {currentLocation ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
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
          {dummyLocations.map((questMarker) => {
            return (
              <Marker
                key={questMarker.name}
                coordinate={questMarker.location}
                title={questMarker.name}
                onPress={handlePress}
              />
            );
          })}
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
        ></MapView>
      )}
      <Example selectedMarker={selectedMarker} />
    </View>
  );
};
const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
export default Map;

//figure out how to make the red modal for quest info, and how to link it to markers
