import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Overview from './Overview';
import ShareDetails from './ShareDetails';
import {Button} from 'native-base';
import Profile from '../Profile';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {FirebaseDB} from '../../firebaseConfig';
import {IEvent} from '../../interfaces/interfaces';
const Tab = createBottomTabNavigator();

const EventDetails = (props: any) => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: '#1d1d1d',
        },
        headerRight: () => (
          <Button
            bg="dark.50"
            size="xs"
            mr="4"
            onPress={() => props.navigation.navigate('Home')}>
            Back
          </Button>
        ),
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen
        name="Overview"
        children={() => <Overview singleEventData={props.route.params} />}
      />
      <Tab.Screen name="Share Details" component={ShareDetails} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default EventDetails;

const styles = StyleSheet.create({});
