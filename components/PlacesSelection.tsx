import React, { Keyboard, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import Material from "@expo/vector-icons/MaterialCommunityIcons"

import { ThemedText } from "@/components/ThemedText"
import { usePlaces } from "@/hooks/use-places"
import { useState } from "react"

export const PlacesSelection = () => {
   const { places, setPlaces } = usePlaces()
   const disabled = places.length >= 5

   const [value, setValue] = useState("")

   const submit = () => {
      if (!value) return
      setPlaces([...places, value])
      setValue("")
   }

   const adjustedValue = !disabled ? value : "Woah there, I'm not made of money"

   return (
      <View style={styles.container}>
         <View style={[styles.inputContainer, disabled && styles.disabled]}>
            <TextInput
               style={[styles.input, disabled && styles.disabled]}
               value={adjustedValue}
               onChangeText={setValue}
               onSubmitEditing={submit}
               blurOnSubmit={false}
               editable={!disabled}
            />
            <Material name="plus" onPress={submit} size={20} disabled={disabled} />
         </View>

         <View style={styles.pills}>
            {places.map((place) => {
               return (
                  <View style={styles.pill} key={place}>
                     <ThemedText>{place}</ThemedText>
                     <Material
                        name="delete"
                        onPress={() => {
                           setPlaces(places.filter((p) => p !== place))
                        }}
                        size={20}
                        color="#ff6666"
                     />
                  </View>
               )
            })}
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      gap: 8,
      display: "flex",
   },
   inputContainer: {
      backgroundColor: "white",
      padding: 8,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 10,
   },
   disabled: {
      backgroundColor: "black",
      borderBottomColor: "black",
      color: "white",
   },
   input: {
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
      flex: 1,
   },
   pills: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
   },
   pill: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 20,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderColor: "black",
      borderWidth: 1,
      textAlign: "center",
   },
})
