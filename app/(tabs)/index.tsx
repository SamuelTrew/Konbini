/* eslint-disable prettier/prettier */
import { useState } from "react"
import { StyleSheet, Button, ScrollView } from "react-native"
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"

import { MapMarkers } from "@/components/map-markers"
import { Route } from "@/components/map-route/get-directions"
import { MapViewRoute } from "@/components/map-route/map-view-route"
import { ThemedText } from "@/components/ThemedText"
import { LAT, LONG } from "@/constants/map"
import { useLocation } from "@/hooks/use-location"
import { usePlaces } from "@/hooks/use-places"
import { getTextSearch, Place } from "@/utils/get-text-search"
import { getNearestPlace } from "@/utils/getNearestPlace"

export default function HomeScreen() {
   const [places, setPlaces] = useState<Place[]>()
   const { location, errMessage } = useLocation()
   const [nearestPlace, setNearest] = useState<LatLng>()
   const [route, setRoute] = useState<Route>()
   const [routeErr, setRouteErr] = useState<string>()
   const { places: SHOPS } = usePlaces()

   return (
      <SafeAreaView style={styles.container}>
         <MapView
            camera={{
               zoom: 13,
               center: { latitude: LAT, longitude: LONG },
               heading: 0,
               pitch: 0,
            }}
            initialRegion={{
               latitude: LAT,
               longitude: LONG,
               latitudeDelta: LAT,
               longitudeDelta: LONG,
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
         >
            {location && (
               <Marker coordinate={{ latitude: LAT, longitude: LONG }} pinColor="green" />
            )}
            {places && <MapMarkers places={places} />}
            <MapViewRoute
               destination={nearestPlace}
               origin={{
                  latitude: LAT,
                  longitude: LONG,
               }}
               onError={setRouteErr}
               onSuccess={setRoute}
            />
         </MapView>
         <Button
            disabled={!location}
            title="Search"
            onPress={async () => {
               const results = await getTextSearch(SHOPS)
               setPlaces(results)
               setNearest(
                  getNearestPlace(
                     { latitude: LAT, longitude: LONG },
                     results.map((r) => r.location),
                  ),
               )
            }}
         />
         {errMessage && <ThemedText>{errMessage}</ThemedText>}
         <ThemedText>
            {route ? `Distance: ${route.distance}. Time: ${route.duration}` : "No route exists"}
         </ThemedText>
         <ScrollView>
            <ThemedText>{routeErr && JSON.stringify(routeErr, null, 2)}</ThemedText>
         </ScrollView>
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
