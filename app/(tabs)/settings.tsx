import * as Application from "expo-application"
import React, { SafeAreaView, StyleSheet, View } from "react-native"

import { PlacesSelection } from "../../components/PlacesSelection"
import { ThemedText } from "@/components/ThemedText"
import { usePlaces } from "@/hooks/use-places"

export default function Settings() {
   const { errMessage } = usePlaces()

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.view}>
            <ThemedText type="subtitle">About</ThemedText>

            <ThemedText>Name: {Application.applicationName}</ThemedText>
            <ThemedText>Version: {Application.nativeApplicationVersion}</ThemedText>
            <ThemedText>Developer: Samuel Trew</ThemedText>
         </View>

         <View style={styles.view}>
            <ThemedText type="subtitle">Settings</ThemedText>
            <ThemedText>Places</ThemedText>
            <PlacesSelection />
            {errMessage && <ThemedText>Error: {errMessage}</ThemedText>}
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      margin: 10,
      height: "100%",
   },
   view: {
      height: "50%",
   },
})
