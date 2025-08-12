import { LatLng, Polyline } from "react-native-maps"

type Props = {
   coordinates: LatLng[]
}

export const MapViewRoute = ({ coordinates }: Props) => {
   return (
      <Polyline
         coordinates={coordinates}
         lineCap="round"
         lineJoin="round"
         strokeColor="hotpink"
         strokeWidth={6}
      />
   )
}
