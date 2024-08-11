import React, { useEffect, useState } from "react"
import { LatLng, Polyline } from "react-native-maps"

import { getDirections, Route } from "./get-directions"

type Props = {
   destination: LatLng | undefined
   onError?: (error: any) => void
   onSuccess?: (route: Route) => void
   origin: LatLng | undefined
}

export const MapViewRoute = ({ origin, destination, onSuccess, onError }: Props) => {
   const [coordinates, setCoordinates] = useState<LatLng[]>([])

   useEffect(() => {
      fetchRoute()
   }, [origin, destination])

   const fetchRoute = async () => {
      if (!origin || !destination) return

      try {
         const route = await getDirections(origin, destination)
         setCoordinates(route.coords)
         onSuccess?.(route)
      } catch (error) {
         onError?.(error)
      }
   }

   return (
      <Polyline
         coordinates={coordinates}
         lineCap="round"
         lineJoin="round"
         strokeColor="hotpink"
         strokeWidth={6}
      />
   )
}
