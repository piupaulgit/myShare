import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from '@react-navigation/native'
import { Box, Button, FormControl, Heading, Input, Stack, Text } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'

interface IUser {
  email: string,
  password: string
}
interface IErrorMessage {
  emailError: string,
  passwordError: string
}

const Login = (props: any) => {
  const {login} = useContext(AuthContext);
  const [user, setUser] = useState<IUser>(Object)
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>(Object)

  const validate = () => {
    console.log("validate function")
    setErrorMessages({
      emailError: '',
      passwordError: ''
    })

    let [emailMessage, passwordMessage] = ["", ""]

    // for Email
    if(!user.email){
      emailMessage = "Please Provide your email";
    }

    // for password
    if(!user.password){
      passwordMessage = 'Please provide password';
    }

    setErrorMessages({...errorMessages, emailError: emailMessage, passwordError : passwordMessage})
    if(errorMessages.emailError === '' && errorMessages.passwordError === ''){
      loginUser()
    }
  }

  const loginUser = () => {
   login(user.email, user.password)
   props.navigation.replace("Home")
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
          <FormControl mb="3">
            <FormControl.Label>Email Address</FormControl.Label>
            <Input onChangeText={value => setUser({...user, email: value})}/>
            {errorMessages?.emailError?.length > 0 && <Text fontSize="xs" color="red.500" mb="2">{errorMessages.emailError}</Text>} 
          </FormControl>
          <FormControl mb="5">
            <FormControl.Label>Password</FormControl.Label>
            <Input type='password' onChangeText={value => setUser({...user, password: value})}/>
            {errorMessages?.passwordError?.length > 0 && <Text fontSize="xs" color="red.500" mb="2">{errorMessages.passwordError}</Text>} 
          </FormControl>
          <Button
            size="lg"
            colorScheme="secondary"
            onPress={validate}>
            Login
          </Button>
        </Box>
        <Box>
          <Text>
            Don't have an account yet?{' '}
            <Link to="/SignUp" style={{textDecorationLine: 'underline'}}>
              Create account
            </Link>
          </Text>
        </Box>
      </Stack>
    </ScrollView>
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  }
});

export default Login