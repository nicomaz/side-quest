import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react'

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%',
    }
  });

const Map = () => {
    const [location, setLocation] = useState(null)

    useEffect(() => {
        Location.requestForegroundPermissionsAsync()
        .then(({ status }) => {
            if(status !== 'granted') {
                return Promise.reject()
            }
        })
        return Location.getCurrentPositionAsync({})
        .then((location) => {
            setLocation(location)
        })
    }, [])
    const userLocation = {latitude: location.coords.latitude,
    longitude: location.coords.longitude}
   return (
    <MapView style={styles.map}
  initialRegion={{
    latitude: 51.5072,
    longitude: 0.1276,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}>
        <Marker coordinate={{latitude: 51.5104,
        longitude: -0.0971}}
        />
        <MapViewDirections 
        origin={userLocation}
        destination={{latitude: 51.5104,
            longitude: -0.0871}}
        apikey='AIzaSyDfMw0j4oBjMtX2Ja5MMCAfYmdW1SAji0A'/>
    </MapView>
   )
}

export default Map