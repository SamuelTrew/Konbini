import * as Location from "expo-location"
import { useEffect, useState } from "react"

export const useLocation = () => {
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

   return {
      location,
      errMessage,
   }
}
