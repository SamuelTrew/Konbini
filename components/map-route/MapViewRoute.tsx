import React, { useCallback, useEffect, useState } from "react"
import { LatLng, Polyline } from "react-native-maps"

import { getDirections, Route } from "./getDirections"

type Props = {
   destination: LatLng | undefined
   onError?: (error: any) => void
   onSuccess?: (route: Route) => void
   origin: LatLng | undefined
}

export const MapViewRoute = ({ origin, destination, onSuccess, onError }: Props) => {
   const [coordinates, setCoordinates] = useState<LatLng[]>([])

   const fetchRoute = useCallback(async () => {
      if (!origin || !destination) return

      try {
         const route = await getDirections(origin, destination)
         setCoordinates(route.coords)
         onSuccess?.(route)
      } catch (error) {
         onError?.(error)
      }
   }, [origin, destination, onSuccess, onError])

   useEffect(() => {
      void fetchRoute()
   }, [fetchRoute])

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
