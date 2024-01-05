import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import Example from "./BottomSheet";
import mapStyle from "../assets/MapStyle";
import { applyActionCode, getAuth } from "firebase/auth"
import {app, db } from "../firebaseConfig"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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
    name: "Great Fire Quest",
    description: "dhbrfurhbfhj",
    location: {
      latitude: 51.5101,
      longitude: 0.0859,
    },
  },
  {
    name: "Tower Bridge Quest",
    description: "dhbrfurhbfhj",
    location: {
      latitude: 51.5055,
      longitude: 0.0754,
    },
  },
  {
    name: "Covent Garden Quest",
    description: "dhbrfurhbfhj",
    location: {
      latitude: 51.5117,
      longitude: 0.1240,
    },
  },
];



const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [questDestination, setQuestDestination] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentQuest, setCurrentQuest] = useState(null)

  const auth = getAuth(app)
  const user = auth.currentUser
  console.log(user)
  async function getUser () {
    const docRef = doc(db, "users", user.phoneNumber);
    const docSnap = await getDoc(docRef);
    setCurrentQuest(docSnap.data().currentQuest);
    console.log(docSnap.data(), '<===')
  }
  async function getLocation() {
    const questsRef = collection(db, "quests");
    const q = query(questsRef, where("questId", "==", currentQuest));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().location);
      setQuestDestination(doc.data().location);
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        getUser()
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (userLocation) => {
            setCurrentLocation(userLocation);
            getLocation()
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
      console.log("Pressed Marker Title:", pressedMarker.name);
      setSelectedMarker(pressedMarker.name);
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
      <Example selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
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

//51.511087475628955, -0.08601434783572807
