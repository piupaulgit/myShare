import React, {Children, createContext, useState} from 'react';
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {auth, FirebaseDB} from '../firebaseConfig';
import { useToast } from 'native-base';
import { addDoc, collection } from 'firebase/firestore';

export const AuthContext = createContext<any>(null);

const AuthProvider = (props: any) => {
  const [user, setUser] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [bill, setBill] = useState<any>({});
  const [error, setError] = useState<string>('');
  const toast = useToast();
  const toastIdRef = React.useRef();

  function addToast(msg:string) {
    toastIdRef.current = toast.show({
      title: msg,
      duration: 2000
    });
  }

  async function addRegisterUserInUserCollection(uid: string, userName: string) {
    await addDoc(collection(FirebaseDB, "users"), {uid: uid, userName: userName})
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loader,
        setLoader,
        bill,
        setBill,
        error,
        setError,
        showToaster: (msg: string) => {
          toastIdRef.current = toast.show({
            title: msg,
            duration: 2000
          });
        },
        generateBill: (detail:any) => {
          setBill(detail)
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
