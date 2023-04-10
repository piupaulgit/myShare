import React, { Children, createContext, useState } from 'react'
import {signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { auth } from '../firebaseConfig';



export const AuthContext = createContext<any>(null)

const AuthProvider = (props:any) => {
    const [user, setUser] = useState<any>(null)
  return (
    <AuthContext.Provider value={{
        user,
        setUser,
        login: async (email: string, password:string) => {
            try{
                await signInWithEmailAndPassword(auth, email, password)
            } catch(error){
                console.warn(error)
            }
        },
        register: async (email:string, password: string) => {
            try{
                await createUserWithEmailAndPassword(auth, email, password)
            }catch(error){
              console.log(error)
            }
        },
        logout: async () =>{
            try{
                await signOut(auth)
            } catch(e){

            }
        }
    }}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider