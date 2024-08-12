import { Tabs } from "expo-router"
import React from "react"
import { Text, useColorScheme } from "react-native"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Colors } from "@/constants/Colors"
import { PlacesProvider } from "@/hooks/use-places"

export default function TabLayout() {
   const colorScheme = useColorScheme()

   return (
      <PlacesProvider>
         <Tabs
            screenOptions={{
               tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
               name="settings"
               options={{
                  title: "Settings",
                  tabBarIcon: ({ color, focused }) => (
                     <TabBarIcon color={color} name={focused ? "settings" : "settings-outline"} />
                  ),
               }}
            />
         </Tabs>
      </PlacesProvider>
   )
}
