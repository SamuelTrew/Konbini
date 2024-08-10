import { Image, StyleSheet, Platform, View } from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import MapView, { MarkerAnimated, PROVIDER_GOOGLE } from "react-native-maps"

import * as Location from "expo-location"
import { useEffect, useState } from "react"

export default function HomeScreen() {
   const [errMessage, setErr] = useState<string>()
   const [location, setLocation] = useState<Location.LocationObject>()

   const requestLocationPermission = async () => {
      const result = await Location.requestForegroundPermissionsAsync()
      if (result.granted) {
         setLocation(
            await Location.getCurrentPositionAsync({
               accuracy: Location.LocationAccuracy.BestForNavigation,
               timeInterval: 1000,
               distanceInterval: 5,
            }),
         )
         setErr(undefined)
         return
      }

      setErr(
         "Permission to access location was denied. Please enable to allow the app to function.",
      )
   }

   useEffect(() => {
      void requestLocationPermission()
   }, [])

   return (
      <ThemedView style={styles.container}>
         <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
               latitude: 35.652832,
               longitude: 139.839478,
               latitudeDelta: 35.652832,
               longitudeDelta: 139.839478,
            }}
            // initialRegion={location && {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: location.coords.latitude, longitudeDelta: location.coords.longitude}}
            camera={{
               zoom: 10,
               center: { latitude: 35.65, longitude: 139.75 },
               heading: 0,
               pitch: 0,
            }}
         >
            {location && (
               <MarkerAnimated
                  coordinate={{ latitude: 35.652832, longitude: 139.839478 }}
               />
            )}
         </MapView>
         {errMessage && <ThemedText>{errMessage}</ThemedText>}
         <ThemedText>{JSON.stringify(location, null, 2)}</ThemedText>
      </ThemedView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 10,
      marginVertical: 30,
   },
   map: {
      width: "100%",
      height: "70%",
   },
})
