import Material from "@expo/vector-icons/MaterialCommunityIcons"
import { useState } from "react"
import React, { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { usePlaces } from "@/hooks/use-places"

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
               blurOnSubmit={false}
               editable={!disabled}
               style={[styles.input, disabled && styles.disabled]}
               value={adjustedValue}
               onChangeText={setValue}
               onSubmitEditing={submit}
            />
            <TouchableOpacity onPress={submit}>
               <Material disabled={disabled} name="plus" size={20} />
            </TouchableOpacity>
         </View>

         <View style={styles.pills}>
            {places.map((place) => {
               return (
                  <View key={place} style={styles.pill}>
                     <ThemedText>{place}</ThemedText>
                     <Material
                        color="#ff6666"
                        name="delete"
                        size={20}
                        onPress={() => {
                           setPlaces(places.filter((p) => p !== place))
                        }}
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
