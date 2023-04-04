/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const appStack = createNativeStackNavigator();

import {loginImage} from './assets/images';

function App(): JSX.Element {

  return (
    // <SafeAreaView>
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic">
    //     <View style={styles.sectionContainer}>
    //       <View style={{alignItems: 'center'}}>
    //         <Image source={loginImage} style={{width: 150, height: 340, marginBottom: 30}} />
    //       </View>
    //       <Text style={[styles.h1, styles.darkText, {marginBottom: 10}]}>Manage your buddies to calculate</Text>
    //       <Text style={[styles.bodyText, styles.darkText, {marginBottom: 30}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Text>
    //       <Pressable style={styles.buttonStyle}>
    //         <Text style={styles.btnText}>Login with Google</Text>
    //       </Pressable>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <NavigationContainer>
      <appStack.Navigator>
        
      </appStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  buttonStyle:{
    backgroundColor: '#E63946',
    paddingTop: 18,
    paddingBottom: 18,
    color: '#fff',
    borderRadius: 5
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize:15
  },
  h1: {
    fontSize: 30,
    fontWeight: "700"
  },
  bodyText: {
    fontSize: 15
  },
  darkText: {
    color: '#1D3557'
  }
});

export default App;
