import { LAT, LONG } from "../constants/map"

type Period = {
   date: {
      day: number
      month: number
      year: number
   }
   day: number
   hour: number
   minute: number
   truncated: boolean
}

type Place = {
   currentOpeningHours: {
      openNow: boolean
      periods: {
         close: Period
         open: Period
      }
      weekdayDescriptions: string[]
   }
   displayName: {
      languageCode: string
      text: string
   }
   location: { latitude: number; longitude: number }
}

export type Result = {
   places: Place[]
}

export const getTextSearch = async (): Promise<Result> => {
   const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      headers,
      method: "POST",
      body,
   })

   return await res.json()
}

const headers = {
   "X-Goog-Api-Key": process.env.EXPO_PUBLIC_API_KEY as string,
   "X-Goog-FieldMask": "places.location,places.displayName,places.currentOpeningHours",
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
