import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Overview from './Overview';
import ShareDetails from './ShareDetails';
const Tab = createBottomTabNavigator();

const EventDetails = () => {

  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15
        },
        tabBarIconStyle: { display: "none" },
      }}>
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="ShareDetails" component={ShareDetails} />
    </Tab.Navigator>
  )
}

export default EventDetails

const styles = StyleSheet.create({})