import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../navigation/AuthProvider';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {Link} from '@react-navigation/native';
import { logo } from '../assets/images';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface IUser {
  email: string;
  userName: string;
  password: string;
  confirmPassowrd: string;
}
interface IErrorMessage {
  emailError: string,
  userNameError: string,
  passwordError: string, 
  confirmPasswordError : string
}

const SignUp = (props:any) => {
  const [newUser, setNewUser] = useState<IUser>(Object);
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>(Object)
  const {loader} = useContext<any>(AuthContext);
  const {showToaster} = useContext(AuthContext);

  useEffect(() => {
    if(errorMessages.emailError === '' && errorMessages.passwordError === '' && 
    errorMessages.confirmPasswordError === ''
    && errorMessages.userNameError === ''){
      registerUser()
    }
  },[errorMessages])

  const validate = () => {
    setErrorMessages({
      emailError: '',
      userNameError: '',
      passwordError: '', 
      confirmPasswordError : ''
    })

    let [emailMessage, passwordMessage, userNameMessage, confrimPasswordMessage] = ["", "", "",""]

    // for Email
    if(!newUser.email){
      emailMessage = "Please Provide your email";
    }
    else if(!newUser.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      emailMessage = 'Please Provide valid email';
    }

    // userName error
    if(!newUser.userName){
      userNameMessage = "Please Provide your username";
    }

    // for password
    if(newUser.password){
      if(newUser.password.length < 6){
        passwordMessage =  'Password should be 6 or greater than 6 charecter';
      }
    }else{
      passwordMessage = 'Please provide password';
    }

    // for confirmpassword
    if(newUser.confirmPassowrd){
      if(newUser.confirmPassowrd !== newUser.password){
        confrimPasswordMessage = 'Password does not match';
      }
    }else{
      confrimPasswordMessage = 'Please confirm password';
    }

    setErrorMessages({...errorMessages, emailError: emailMessage, passwordError : passwordMessage, confirmPasswordError: confrimPasswordMessage, userNameError: userNameMessage})
  }

  const registerUser = async() => {
    // console.warn(newUser)
    try{
      const res = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
			const user:any = res.user;
			await updateProfile(user.auth.currentUser, {
				displayName: newUser.userName,
			});
    }catch(e:any){
      showToaster(e.message)
    }finally{
      showToaster('Your Created successfully')
    }
    
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Stack
          space={6}
          alignSelf="center"
          px="6"
          safeArea
          mt="4"
          pb="10"
          w={{
            base: '95%'
          }}>
          <Box>
            <VStack alignItems="center" mb="10">
              <Image source={logo}  style={{width: 70, height: 80, marginBottom: 5}} alt="myShare logo"/>
              <Text fontSize="xs">Split expenses, not friendships</Text>
            </VStack>
            <Heading size="xl" alignSelf="center" mb="5">Create Account</Heading>

            <FormControl mb="2">
              <FormControl.Label>User Name</FormControl.Label>
              <Input
                value={newUser.userName}
                onChangeText={value => setNewUser({...newUser, userName: value})}
              />
              {errorMessages?.userNameError?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.userNameError}</Text>} 
            </FormControl>
            <FormControl mb="2">
              <FormControl.Label>Email Address</FormControl.Label>
              <Input
                value={newUser.email}
                onChangeText={value => setNewUser({...newUser, email: value})}
              />
              {errorMessages?.emailError?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.emailError}</Text>} 
            </FormControl>
            <FormControl mb="2">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={newUser.password}
                onChangeText={value =>
                  setNewUser({...newUser, password: value})
                }
              />
              {errorMessages?.passwordError?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.passwordError}</Text>} 
            </FormControl>
            <FormControl mb="2">
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                value={newUser.confirmPassowrd}
                onChangeText={value =>
                  setNewUser({...newUser, confirmPassowrd: value})
                }
              />
              {errorMessages?.confirmPasswordError?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.confirmPasswordError}</Text>} 
            </FormControl>
            <Button
              size="lg"
              bg="dark.50"
              mt="4"
              isLoading={loader}
              onPress={validate}>
              Sign up
            </Button>
          </Box>
          <Box>
            <Text>
              Already have an account?{' '}
              <Link to="/Login" style={{textDecorationLine: 'underline'}}>
                Login Here
              </Link>
            </Text>
          </Box>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
