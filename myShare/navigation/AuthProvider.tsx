import React, {Children, createContext, useState} from 'react';
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {auth} from '../firebaseConfig';
import { useToast } from 'native-base';

export const AuthContext = createContext<any>(null);

const AuthProvider = (props: any) => {
  const [user, setUser] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const toast = useToast();
  const toastIdRef = React.useRef();

  function addToast(msg:string) {
    toastIdRef.current = toast.show({
      title: msg,
      duration: 2000
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loader,
        setLoader,
        error,
        setError,
        showToaster: (msg: string) => {
          toastIdRef.current = toast.show({
            title: msg,
            duration: 2000
          });
        },
        login: async (email: string, password: string) => {
          setLoader(true);
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error:any) {
            addToast(error.message)
          } finally {
            setLoader(false);
          }
        },
        register: async (email: string, password: string) => {
          setLoader(true);
          try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (error:any) {
            addToast(error.message)
          } finally {
            setLoader(false);
          }
        },
        logout: async () => {
          setLoader(true);
          try {
            await signOut(auth);
          } catch (error:any) {
            addToast(error.message)
          } finally {
            setLoader(false);
          }
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
