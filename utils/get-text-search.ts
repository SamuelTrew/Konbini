import { LAT, LONG } from "../constants/map"

export type Place = {
   currentOpeningHours: {
      weekdayDescriptions: string[]
   }
   displayName: {
      languageCode: string
      text: string
   }
   location: { latitude: number; longitude: number }
}

export const getTextSearch = async (shops: string[]): Promise<Place[]> => {
   const results = await Promise.all(
      shops.map(async (shop) => {
         const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
            headers,
            method: "POST",
            body: body(shop),
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

const body = (shop: string) =>
   JSON.stringify({
      textQuery: shop,
      locationBias: {
         circle: {
            center: {
               latitude: LAT,
               longitude: LONG,
            },
            radius: 50.0,
         },
      },
      pageSize: 3,
      openNow: true,
   })
