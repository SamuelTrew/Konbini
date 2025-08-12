import { LatLng } from "react-native-maps"

export type Place = {
   currentOpeningHours: {
      weekdayDescriptions: string[]
   }
   displayName: {
      text: string
   }
   location: LatLng
   rating: number
}

export const getTextSearch = async (currentLocation: LatLng, shops: string[]): Promise<Place[]> => {
   // eslint-disable-next-line no-console
   console.log("Making call to do search")

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

   return results.flat().filter(Boolean)
}

const headers = {
   "X-Goog-Api-Key": process.env.EXPO_PUBLIC_API_KEY as string,
   "X-Goog-FieldMask":
      "places.location,places.displayName.text,places.currentOpeningHours.weekdayDescriptions,places.rating",
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
