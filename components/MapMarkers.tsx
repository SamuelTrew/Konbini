import { Callout, Marker } from "react-native-maps"

import { ThemedText } from "./ThemedText"
import { Place } from "@/utils/getTextSearch"
import { Ratings } from "./Ratings"

type Props = {
   places: Place[]
}

export const MapMarkers = ({ places }: Props) => {
   return places.map(({ location, displayName, currentOpeningHours, rating }) => {
      const title = currentOpeningHours.weekdayDescriptions.find((d) =>
         d.startsWith(weekday[new Date().getDay()]),
      )
      return (
         <Marker coordinate={location} key={`${location.latitude}-${location.longitude}`}>
            <Callout>
               <ThemedText darkColor="black">{displayName.text}</ThemedText>
               <ThemedText darkColor="black">{title?.split(": ").at(-1)}</ThemedText>
               <Ratings rating={rating} />
            </Callout>
         </Marker>
      )
   })
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
