import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import Example from "./BottomSheet";
import mapStyle from "../assets/MapStyle";
import { getSingularQuest, getQuests, getUser } from "../utils/api";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [questLocations, setQuestLocations] = useState([]);
  const [questDestination, setQuestDestination] = useState({
    latitude: 51.5138,
    longitude: -0.0984,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentQuest, setCurrentQuest] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        await getQuests(setQuestLocations);
        const user = await getUser();
        setCurrentQuest(user.currentQuest);

        getSingularQuest(setCurrentQuest, currentQuest, setQuestDestination);

        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (userLocation) => {
            setCurrentLocation(userLocation);
          }
        );
        return () => locationSubscription.remove();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentQuest]);

  const handlePress = (e) => {
    const pressedMarker = questLocations.find(
      (marker) =>
        marker.location.latitude === e.nativeEvent.coordinate.latitude &&
        marker.location.longitude === e.nativeEvent.coordinate.longitude
    );
    if (pressedMarker) {
      setSelectedMarker(pressedMarker.questId);
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
          {questLocations.map((questMarker) => {
            return (
              <Marker
                key={questMarker.questId}
                coordinate={{
                  latitude: questMarker.location.latitude,
                  longitude: questMarker.location.longitude,
                }}
                title={questMarker.landmark}
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
      <Example
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        currentQuest={currentQuest}
      />
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

//51.511087475628955, -0.08601434783572807
