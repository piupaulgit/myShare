import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { Text } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import AppStack from './AppStack'
import { AuthContext } from './AuthProvider'
import AuthStack from './AuthStack'

const Routes = () => {
    const {user, setUser} = useContext<any>(AuthContext);
    const [initializing, setInitializing] = useState<boolean>(true)


  useEffect(() => {
    // const subscriber = onAuthStateChanged(onAuthStateChanged);
    // return subscriber; 
    const monitorAuth = async () =>{
      await onAuthStateChanged(auth, userDetail => {
        if(userDetail){
          console.warn(userDetail)
          setUser(userDetail)
        }else{
          console.warn('user')
        }
      })
    }
    monitorAuth()
  }, []);

  return (
    <NavigationContainer>
      {/* <Text>{user.uid}</Text> */}
        {
          user && <AppStack/> ||  <AuthStack/>
        }
    </NavigationContainer>
  )
}

export default Routes