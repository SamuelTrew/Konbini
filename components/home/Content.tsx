/* eslint-disable prettier/prettier */
import { LocationObject } from "expo-location"
import { useState } from "react"
import { StyleSheet, Button, ScrollView } from "react-native"
import MapView, { LatLng, MarkerAnimated, PROVIDER_GOOGLE } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"

import { RouteInfo } from "@/components/home/RouteInfo"
import { getDirections, Route } from "@/components/map-route/getDirections"
import { MapViewRoute } from "@/components/map-route/MapViewRoute"
import { MapMarkers } from "@/components/MapMarkers"
import { ThemedText } from "@/components/ThemedText"
import { usePlaces } from "@/hooks/usePlaces"
import { getNearestPlace } from "@/utils/getNearestPlace"
import { getTextSearch, Place } from "@/utils/getTextSearch"

type Props = {
   errMessage: string | undefined
   location: LocationObject
}

export const Content = ({ location, errMessage }: Props) => {
   const [places, setPlaces] = useState<Place[]>()
   const [nearestPlace, setNearest] = useState<LatLng>()
   const [route, setRoute] = useState<Route>()
   const [routeErr, setRouteErr] = useState<string>()
   const { places: SHOPS } = usePlaces()
   const [coordinates, setCoordinates] = useState<LatLng[]>([])

   const myLatLng: LatLng = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
   }

   const fetchRoute = async (nearestPlace: LatLng | undefined) => {
      if (!nearestPlace) return

      try {
         const route = await getDirections(myLatLng, nearestPlace)
         setCoordinates(route.coords)
         setRoute(route)
      } catch (error) {
         setRouteErr(JSON.stringify(error, null, 2))
      }
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
            googleMapId="426aaad5ca25b6f6"
            userLocationUpdateInterval={1000}
            showsUserLocation
            followsUserLocation
            userLocationPriority="high"
            userLocationFastestInterval={300}
         >
            {places && <MapMarkers places={places} />}
            <MapViewRoute coordinates={coordinates} />
         </MapView>
         <Button
            disabled={!location}
            title="Search"
            onPress={async () => {
               const results = await getTextSearch(myLatLng, SHOPS)
               setPlaces(results)
               const nearest = getNearestPlace(
                  myLatLng,
                  results.map((r) => r.location),
               )
               await fetchRoute(nearest)
               setNearest(nearest)
            }}
         />
         {errMessage && <ThemedText>{errMessage}</ThemedText>}
         <RouteInfo route={route} />
         <ScrollView>
            <ThemedText>{routeErr && JSON.stringify(routeErr, null, 2)}</ThemedText>
         </ScrollView>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 10,
      height: "100%",
   },
   map: {
      width: "100%",
      height: "60%",
   },
})
