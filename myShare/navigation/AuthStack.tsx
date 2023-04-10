import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import Login from '../screens/Login'
import OnBoarding from '../screens/OnBoarding'
import SignUp from '../screens/SignUp'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    const [isFirstLaunch, setIsForstLaunch] = useState<any>(null);
    let routeName;

    // useEffect(() => {
    //     AsyncStorage.getItem('alreadyLaunched').then((value:any) => {
    //         if(value === null){
    //             AsyncStorage.setItem('alreadyLaunched', 'true');
    //             setIsForstLaunch(true)
    //         }else{
    //             setIsForstLaunch(false)
    //         }
    //     })
    // }, [])

    // if(isFirstLaunch === null){
    //     return null;
    // } else if (isFirstLaunch == true){
    //     routeName = 'OnBoarding'
    // }else{
    //     routeName = 'Login'
    // }
    
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Onboarding' component={OnBoarding}></Stack.Screen>
            <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AuthStack;