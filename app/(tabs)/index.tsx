/* eslint-disable prettier/prettier */
import { useState } from "react"
import { StyleSheet, Button, ScrollView, ActivityIndicator } from "react-native"
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"

import { RouteInfo } from "@/components/home/RouteInfo"
import { Route } from "@/components/map-route/getDirections"
import { MapViewRoute } from "@/components/map-route/MapViewRoute"
import { MapMarkers } from "@/components/MapMarkers"
import { ThemedText } from "@/components/ThemedText"
import { useLocation } from "@/hooks/useLocation"
import { usePlaces } from "@/hooks/usePlaces"
import { getNearestPlace } from "@/utils/getNearestPlace"
import { getTextSearch, Place } from "@/utils/getTextSearch"

export default function HomeScreen() {
   const [places, setPlaces] = useState<Place[]>()
   const { location, errMessage, retryLocation, isLoading } = useLocation()
   const [nearestPlace, setNearest] = useState<LatLng>()
   const [route, setRoute] = useState<Route>()
   const [routeErr, setRouteErr] = useState<string>()
   const { places: SHOPS } = usePlaces()

   if (isLoading) {
      return (
         <SafeAreaView style={styles.container}>
            <ActivityIndicator color="#00ff00" size="large" />
         </SafeAreaView>
      )
   }
   if (!location) {
      return (
         <SafeAreaView style={styles.container}>
            <Button title="Re-attempt to fetch location" onPress={retryLocation} />
         </SafeAreaView>
      )
   }

   const myLatLng: LatLng = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
   }

   return (
      <SafeAreaView style={styles.container}>
         <MapView
            camera={{
               zoom: nearestPlace ? 15 : 13,
               center: nearestPlace ? nearestPlace : myLatLng,
               heading: 0,
               pitch: 0,
            }}
            initialRegion={{
               ...myLatLng,
               latitudeDelta: myLatLng.latitude,
               longitudeDelta: myLatLng.longitude,
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
         >
            {location && <Marker coordinate={myLatLng} pinColor="green" />}
            {places && <MapMarkers places={places} />}
            <MapViewRoute
               destination={nearestPlace}
               origin={myLatLng}
               onError={setRouteErr}
               onSuccess={setRoute}
            />
         </MapView>
         <Button
            disabled={!location}
            title="Search"
            onPress={async () => {
               const results = await getTextSearch(myLatLng, SHOPS)
               setPlaces(results)
               setNearest(
                  getNearestPlace(
                     myLatLng,
                     results.map((r) => r.location),
                  ),
               )
            }}
         />
         {errMessage && <ThemedText>{errMessage}</ThemedText>}
         <RouteInfo route={route} />
         {routeErr && (
            <ScrollView>
               <ThemedText>{JSON.stringify(routeErr, null, 2)}</ThemedText>
            </ScrollView>
         )}
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 10,
      height: "100%",
   },
   map: {
      width: "100%",
      height: "60%",
   },
})
