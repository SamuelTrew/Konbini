/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Platform, View, Button, ScrollView } from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import {LAT, LONG} from "@/constants/map"
import {getNearbySearch} from "@/utils/getNearbySearch"
import {getTextSearch, Result} from "@/utils/getTextSearch"

import * as Location from "expo-location"
import { useEffect, useState } from "react"


export default function HomeScreen() {
   const [errMessage, setErr] = useState<string>()
   const [location, setLocation] = useState<Location.LocationObject>()
   const [searchRes, setRes] = useState<Result>()

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
               latitude: LAT,
               longitude: LONG,
               latitudeDelta: LAT,
               longitudeDelta: LONG,
            }}
            // initialRegion={location && {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: location.coords.latitude, longitudeDelta: location.coords.longitude}}
            camera={{
               zoom: 13,
               center: { latitude: LAT, longitude: LONG },
               heading: 0,
               pitch: 0,
            }}
         >
            {location && (
               <Marker
                  coordinate={{ latitude: LAT, longitude: LONG }}
                  pinColor="green"
               />
            )}
            {searchRes?.places?.map(({location, displayName, currentOpeningHours}) => {
               const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
               const title =currentOpeningHours.weekdayDescriptions.find(d => d.startsWith(weekday[(new Date()).getDay()]))
               return (
                  <Marker
                     coordinate={location}
                     key={`${location.latitude}-${location.longitude}`}
                  >
                     <Callout>
                        <ScrollView>
                           <ThemedText>{`${displayName.text}\n${title?.split(": ").at(-1)}`}</ThemedText>
                        </ScrollView>
                     </Callout>
                  </Marker>
               )
            }
            )}
         </MapView>
         <Button
            onPress={async () => {
               setRes(await getTextSearch())
            }}
            title="Click"
         >
         </Button>
         {errMessage && <ThemedText>{errMessage}</ThemedText>}
         <ScrollView>
            <ThemedText>{JSON.stringify(searchRes, null, 2)}</ThemedText>
         </ScrollView>
         {/* <ThemedText>{JSON.stringify(location, null, 2)}</ThemedText> */}
      </ThemedView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 10,
      marginVertical: 30,
      height: "100%",
   },
   map: {
      width: "100%",
      height: "60%",
   },
})
