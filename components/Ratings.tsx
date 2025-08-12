import Icon from "@expo/vector-icons/MaterialIcons"
import { StyleSheet, View } from "react-native"
import { ThemedText } from "./ThemedText"

type Props = { rating: number }

export const Ratings = ({ rating }: Props) => {
   return (
      <View style={styles.container}>
         {Array(5)
            .fill(0)
            .map((_, i) => (
               <Icon key={i} name={getIcon(rating, i + 1)} size={16} color="purple" />
            ))}
         <ThemedText style={styles.raw}>{rating}</ThemedText>
      </View>
   )
}

const getIcon = (rating: number, offset: number) => {
   if (rating > offset) {
      return "star"
   }

   if (rating >= offset - 0.5) {
      return "star-half"
   }

   return "star-outline"
}

const styles = StyleSheet.create({
   container: {
      display: "flex",
      flexDirection: "row",
      gap: 1,
      alignItems: "center",
   },
   raw: {
      fontSize: 12,
   },
})
