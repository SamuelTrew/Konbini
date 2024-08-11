import { LatLng } from "react-native-maps"

export type GooglePolylineRoute = {
   distanceMeters: number
   duration: string
   polyline: {
      encodedPolyline: string
   }
}

export const decodeRoutesPolyline = (route: GooglePolylineRoute) => {
   const points: LatLng[] = []
   const encoded = route.polyline.encodedPolyline
   const len = encoded.length

   let index = 0
   let lat = 0
   let lng = 0

   while (index < len) {
      const dLatRes = getLatLng(encoded, index)
      lat += dLatRes.value
      index = dLatRes.newIndex

      const dLngRes = getLatLng(encoded, index)
      lng += dLngRes.value
      index = dLngRes.newIndex

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 })
   }
   return points
}

type Result = {
   newIndex: number
   value: number
}

const getLatLng = (encoded: string, startIndex: number): Result => {
   let index = startIndex
   let shift = 0
   let result = 0
   let char: number

   do {
      char = encoded.charAt(index++).charCodeAt(0) - 63
      result |= (char & 0x1f) << shift
      shift += 5
   } while (char >= 0x20)

   return {
      value: (result & 1) !== 0 ? ~(result >> 1) : result >> 1,
      newIndex: index,
   }
}
