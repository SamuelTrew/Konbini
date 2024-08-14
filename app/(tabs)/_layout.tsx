import { Tabs } from "expo-router"
import React from "react"
import { useColorScheme } from "react-native"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Colors } from "@/constants/Colors"
import { PlacesProvider } from "@/hooks/usePlaces"

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
                  tabBarIcon: tabIcon("home"),
               }}
            />
            <Tabs.Screen
               name="settings"
               options={{
                  title: "Settings",
                  tabBarIcon: tabIcon("settings"),
               }}
            />
         </Tabs>
      </PlacesProvider>
   )
}

type TabIconProps = {
   color: string
   focused: boolean
   size: number
}

const tabIcon =
   (name: "home" | "settings") =>
   ({ color, focused }: TabIconProps) => {
      return <TabBarIcon color={color} name={focused ? name : `${name}-outline`} />
   }
