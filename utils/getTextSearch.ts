import { LAT, LONG } from "../constants/map"

type Period = {
   day: number
   hour: number
   minute: number
   truncated: boolean
   date: {
      year: number
      month: number
      day: number
   }
}

type Place = {
   location: { latitude: number; longitude: number }
   displayName: {
      text: string
      languageCode: string
   }
   currentOpeningHours: {
      weekdayDescriptions: string[]
      openNow: boolean
      periods: {
         open: Period
         close: Period
      }
   }
}

export type Result = {
   places: Place[]
}

export const getTextSearch = async (): Promise<Result> => {
   const res = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
         headers,
         method: "POST",
         body,
      },
   )

   return await res.json()
}

const headers = {
   "X-Goog-Api-Key": process.env.EXPO_PUBLIC_API_KEY as string,
   "X-Goog-FieldMask":
      "places.location,places.displayName,places.currentOpeningHours",
   "content-type": "application/json",
}

const body = JSON.stringify({
   textQuery: "7-Eleven",
   locationBias: {
      circle: {
         center: {
            latitude: LAT,
            longitude: LONG,
         },
         radius: 500.0,
      },
   },
   pageSize: 10,
   openNow: true,
})
