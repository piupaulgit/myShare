import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SideDrawer from '../components/SideDrawer';
import Home from '../screens/Home';
import EventDetails from '../screens/EventDetails/EventDetails';
import Bill from '../screens/Bill';

const Stack = createNativeStackNavigator()
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="EventDetail" component={EventDetails}></Stack.Screen>
        <Stack.Screen name="Bill" component={Bill}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default AppStack;