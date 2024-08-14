import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"

export const usePlaces = () => {
   const context = useContext(PlacesContext)

   if (!context) {
      throw new Error("Places context used outside of provider")
   }

   return context
}

const KEY = "places"

type PlacesState = {
   errMessage?: string
   places: string[]
   setPlaces: (places: string[]) => void
}
const PlacesContext = createContext<PlacesState | undefined>(undefined)

export const PlacesProvider = ({ children }: PropsWithChildren) => {
   const [places, savePlaces] = useState<string[]>([])
   const [errMessage, setErr] = useState<string>()

   useEffect(() => {
      void getData()
         .then(setPlaces)
         .catch((e) => setErr(JSON.stringify(e)))
   }, [])

   const setPlaces = (places: string[]) => {
      const corrected = [...new Set(places.filter(Boolean))]

      savePlaces(corrected)
      void storeData(corrected).catch((e) => setErr(JSON.stringify(e)))
   }

   return (
      <PlacesContext.Provider value={{ places, setPlaces, errMessage }}>
         {children}
      </PlacesContext.Provider>
   )
}

const storeData = async (value: string[]) => {
   const jsonValue = JSON.stringify(value)
   await AsyncStorage.setItem(KEY, jsonValue)
}

const getData = async (): Promise<string[]> => {
   const jsonValue = await AsyncStorage.getItem(KEY)
   const parsed = jsonValue ? JSON.parse(jsonValue) : []

   if (!Array.isArray(parsed)) {
      return [...SHOPS]
   }
   const res = jsonValue ? (JSON.parse(jsonValue) as string[]) : []
   return res.length > 0 ? res : []
}

const SHOPS = ["7-Eleven", "Lawson", "FamilyMart"]
