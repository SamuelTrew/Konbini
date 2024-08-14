import { LatLng } from "react-native-maps"

import { decodeRoutesPolyline, GooglePolylineRoute } from "./decoder"

export type Route = {
   coords: LatLng[]
   distance?: string
   duration?: string
}

export const getDirections = async (origin: LatLng, destination: LatLng): Promise<Route> => {
   const res = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers,
      body: body(origin, destination),
   })

   const json = await res.json()
   if (!json.routes) {
      throw new Error("Could not find route for given origin and destination")
   }

   const route = json.routes?.[0] as GooglePolylineRoute | undefined
   if (!route) {
      return {
         coords: [],
      }
   }
   return {
      coords: decodeRoutesPolyline(route),
      distance: `${route.distanceMeters}m`,
      duration: route.duration,
   }
}

const headers = {
   "Content-Type": "application/json",
   "X-Goog-Api-Key": process.env.EXPO_PUBLIC_API_KEY as string,
   "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
}

const body = (origin: LatLng, destination: LatLng) =>
   JSON.stringify({
      origin: {
         location: {
            latLng: origin,
         },
      },
      destination: {
         location: {
            latLng: destination,
         },
      },
      travelMode: "walk",
      computeAlternativeRoutes: false,
      units: "metric",
      polylineQuality: "overview",
   })
