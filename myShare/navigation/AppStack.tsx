import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SideDrawer from '../components/SideDrawer';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator()
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default AppStack