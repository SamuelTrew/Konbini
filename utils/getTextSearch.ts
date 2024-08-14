import { LatLng } from "react-native-maps"

export type Place = {
   currentOpeningHours: {
      weekdayDescriptions: string[]
   }
   displayName: {
      languageCode: string
      text: string
   }
   location: LatLng
}

export const getTextSearch = async (currentLocation: LatLng, shops: string[]): Promise<Place[]> => {
   const results = await Promise.all(
      shops.map(async (shop) => {
         const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
            headers,
            method: "POST",
            body: body(currentLocation, shop),
         })

         return (await res.json()).places as Place[]
      }),
   )

   return results.flat()
}

const headers = {
   "X-Goog-Api-Key": process.env.EXPO_PUBLIC_API_KEY as string,
   "X-Goog-FieldMask":
      "places.location,places.displayName.text,places.currentOpeningHours.weekdayDescriptions",
   "content-type": "application/json",
}

const body = (currentLocation: LatLng, shop: string) =>
   JSON.stringify({
      textQuery: shop,
      locationBias: {
         circle: {
            center: currentLocation,
            radius: 50.0,
         },
      },
      pageSize: 3,
      openNow: true,
   })
