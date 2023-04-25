import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import Login from '../screens/Login'
import OnBoarding from '../screens/OnBoarding'
import SignUp from '../screens/SignUp'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    const [routeName, setRouteName] = useState<string>('');

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value:any) => {
            if(value === 'true'){
                setRouteName('Login');
            }else{
                setRouteName('OnBoarding');
                AsyncStorage.setItem('alreadyLaunched', 'true');
            }
        })
    }, [])
    
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={routeName}>
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
            <Stack.Screen name='OnBoarding' component={OnBoarding}></Stack.Screen>
            <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack;