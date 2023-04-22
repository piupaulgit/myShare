import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Overview from './Overview';
import ShareDetails from './ShareDetails';
import { Button } from 'native-base';
import Profile from '../Profile';
const Tab = createBottomTabNavigator();

const EventDetails = (props:any) => {

  return (
    <Tab.Navigator screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15
        },
        headerRight: () => (
          <Button bg="dark.50" size="xs" mr="4" onPress={() => props.navigation.navigate('Home')}>Back</Button>
        ),
        tabBarIconStyle: { display: "none" },
      }}>
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="Share Details" component={ShareDetails} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default EventDetails

const styles = StyleSheet.create({})