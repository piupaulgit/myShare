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

interface IUser {
  email: string;
  password: string;
  confirmPassowrd: string;
}
interface IErrorMessage {
  emailError: string,
  passwordError: string, 
  confirmPasswordError : string
}

const SignUp = (props:any) => {
  const [newUser, setNewUser] = useState<IUser>(Object);
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>(Object)
  const {loader} = useContext<any>(AuthContext);
  const {register} = useContext(AuthContext);

  useEffect(() => {
    if(errorMessages.emailError === '' && errorMessages.passwordError === '' && errorMessages.confirmPasswordError === ''){
      registerUser()
    }
  },[errorMessages])

  const validate = () => {
    setErrorMessages({
      emailError: '',
      passwordError: '', 
      confirmPasswordError : ''
    })

    let [emailMessage, passwordMessage, confrimPasswordMessage] = ["", "", ""]

    // for Email
    if(!newUser.email){
      emailMessage = "Please Provide your email";
    }
    else if(!newUser.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      emailMessage = 'Please Provide valid email';
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

    setErrorMessages({...errorMessages, emailError: emailMessage, passwordError : passwordMessage, confirmPasswordError: confrimPasswordMessage})
  }

  const registerUser = () => {
   register(newUser.email, newUser.password)
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
