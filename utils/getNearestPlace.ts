import { LatLng } from "react-native-maps"

export const getNearestPlace = (
   location: LatLng | undefined,
   places: LatLng[],
): LatLng | undefined => {
   if (!location) return undefined

   let nearest: LatLng | undefined
   let minDist: number = Infinity

   for (const place of places) {
      const dist = getDist(location, place)
      if (dist < minDist) {
         minDist = dist
         nearest = place
      }
   }

   return nearest
}

const getDist = (start: LatLng, end: LatLng): number => {
   const dy = Math.abs(start.latitude) - Math.abs(end.latitude)
   const dx = Math.abs(start.longitude) - Math.abs(end.longitude)

   return Math.sqrt(dx ** 2 + dy ** 2)
}
