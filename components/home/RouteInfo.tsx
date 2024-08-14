import { Route } from "../map-route/getDirections"
import { ThemedText } from "../ThemedText"

type Props = {
   route: Route | undefined
}

export const RouteInfo = ({ route }: Props) => {
   if (!route) {
      return <ThemedText>No route exists</ThemedText>
   }

   const parsedDistance = parse(route.distance, 1000, "km")
   const parsedDuration = parse(route.duration, 60, "min")

   return (
      <ThemedText>
         Distance: {parsedDistance}. Time: {parsedDuration}
      </ThemedText>
   )
}

const parse = (val: string | undefined, breakPoint: number, suffix: string) => {
   if (!val || val.length === 1) {
      return "Unknown"
   }

   try {
      const parsed = parseInt(val.slice(0, -1))
      if (Number.isNaN(parsed)) return val

      if (parsed >= breakPoint) {
         return `${(parsed / breakPoint).toPrecision(3)}${suffix}`
      }
   } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
   }

   return val
}
