import { LAT, LONG } from "../constants/map"

export const getNearbySearch = async () => {
   const res = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
         headers: {
            "X-Goog-Api-Key": process.env.EXPO_PUBLIC_API_KEY as string,
            "X-Goog-FieldMask": "places.location,places.displayName",
            "content-type": "application/json",
         },
         method: "POST",
         body: JSON.stringify({
            includedTypes: ["supermarket"],
            maxResultCount: 10,
            locationRestriction: {
               circle: {
                  center: {
                     latitude: LAT,
                     longitude: LONG,
                  },
                  radius: 500.0,
               },
            },
         }),
      },
   )

   return await res.json()
}
