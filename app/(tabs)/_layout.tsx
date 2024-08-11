import { Tabs } from "expo-router"
import React from "react"
import { useColorScheme } from "react-native"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Colors } from "@/constants/Colors"

export default function TabLayout() {
   const colorScheme = useColorScheme()

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon color={color} name={focused ? "home" : "home-outline"} />
               ),
            }}
         />
         <Tabs.Screen
            name="about"
            options={{
               title: "About",
               tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon color={color} name={focused ? "code-slash" : "code-slash-outline"} />
               ),
            }}
         />
      </Tabs>
   )
}
