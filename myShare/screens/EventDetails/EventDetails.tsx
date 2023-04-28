import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Overview from './Overview';
import ShareDetails from './ShareDetails';
import {Button} from 'native-base';
import Profile from '../Profile';
const Tab = createBottomTabNavigator();

const EventDetails = (props: any) => {

  const [singEventToSend, setSingleEventToSend] = useState<any>(props.route.params)

  useEffect(() => {
    setSingleEventToSend(props.route.params)
    console.log("bsdjsdfgfjgasdadffjgafasgdagfskja agfkajkdgkjdagkjdg jkgdsfjk", props.route.params)
  },[props.route.params])

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
        children={() => <Overview singleEventData={singEventToSend} props={props} />}
      />
      <Tab.Screen name="Share Details" children={() => <ShareDetails singleEventData={singEventToSend} props={props} />}/>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default EventDetails;

const styles = StyleSheet.create({});
