import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { auth } from '../firebaseConfig'
import AppStack from './AppStack'
import { AuthContext } from './AuthProvider'
import AuthStack from './AuthStack'

const Routes = () => {
    const {user, setUser} = useContext<any>(AuthContext);

  useEffect(() => {
    const monitorAuth = async () =>{
      await onAuthStateChanged(auth, userDetail => {
        if(userDetail){
          setUser(userDetail)
        }else{ 
          setUser(null)
        }
      })
    }
    monitorAuth()
  }, []);

  return (
    <NavigationContainer>
        {
          user && <AppStack/> ||  <AuthStack/>
        }
    </NavigationContainer>
  )
}

export default Routes