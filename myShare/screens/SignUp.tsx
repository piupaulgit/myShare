import React, {useContext, useState} from 'react';
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
  Input,
  Stack,
  Text,
} from 'native-base';
import {Link} from '@react-navigation/native';

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

  const {register} = useContext(AuthContext);

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
    if(errorMessages.emailError === '' && errorMessages.passwordError === '' && errorMessages.confirmPasswordError === ''){
      registerUser()
    }
  }

  const registerUser = () => {
   register(newUser.email, newUser.password)
   props.navigation.replace("Login")
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
            <Heading size="2xl">Split expenses, not friendships</Heading>
            <FormControl>
              <FormControl.Label>Email Address</FormControl.Label>
              <Input
                value={newUser.email}
                onChangeText={value => setNewUser({...newUser, email: value})}
              />
              {errorMessages.emailError && <Text fontSize="xs" color="red.500" mb="2">{errorMessages.emailError}</Text>} 
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={newUser.password}
                onChangeText={value =>
                  setNewUser({...newUser, password: value})
                }
              />
              {errorMessages.passwordError && <Text fontSize="xs" color="red.500" mb="2">{errorMessages.passwordError}</Text>} 
            </FormControl>
            <FormControl mb="4">
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                value={newUser.confirmPassowrd}
                onChangeText={value =>
                  setNewUser({...newUser, confirmPassowrd: value})
                }
              />
              {errorMessages.confirmPasswordError && <Text fontSize="xs" color="red.500" mb="2">{errorMessages.confirmPasswordError}</Text>} 
            </FormControl>
            <Button
              size="lg"
              colorScheme="secondary"
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
