import { StyleSheet, Button, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Content } from "@/components/home/Content"
import { useLocation } from "@/hooks/useLocation"

export default function HomeScreen() {
   const { location, errMessage, retryLocation, isLoading } = useLocation()

   if (isLoading) {
      return (
         <SafeAreaView style={styles.container}>
            <ActivityIndicator color="purple" size="large" />
         </SafeAreaView>
      )
   }
   if (!location) {
      return (
         <SafeAreaView style={styles.container}>
            <Button title="Re-attempt to fetch location" onPress={retryLocation} />
         </SafeAreaView>
      )
   }

   return <Content errMessage={errMessage} location={location} />
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 10,
      height: "100%",
   },
})
