import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../Screens/Home"
import WeatherDetails from "../Screens/WeatherDetails"
import SearchCities from "../Screens/SearchCities"

const Stack = createNativeStackNavigator()


export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SearchCities" component={SearchCities} />
            <Stack.Screen name="WeatherDetails" component={WeatherDetails} />
        </Stack.Navigator>
    )
}