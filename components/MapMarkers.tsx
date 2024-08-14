import { Callout, Marker } from "react-native-maps"

import { ThemedText } from "./ThemedText"
import { Place } from "@/utils/getTextSearch"

type Props = {
   places: Place[]
}

export const MapMarkers = ({ places }: Props) => {
   return places.map(({ location, displayName, currentOpeningHours }) => {
      const title = currentOpeningHours.weekdayDescriptions.find((d) =>
         d.startsWith(weekday[new Date().getDay()]),
      )
      return (
         <Marker coordinate={location} key={`${location.latitude}-${location.longitude}`}>
            <Callout>
               <ThemedText>{`${displayName.text}\n${title?.split(": ").at(-1)}`}</ThemedText>
            </Callout>
         </Marker>
      )
   })
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
