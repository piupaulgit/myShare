import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from '@react-navigation/native'
import { Box, Button, FormControl, Heading, Input, Stack, Text, VStack, Image } from 'native-base'
import { AuthContext } from '../navigation/AuthProvider'
import { logo } from '../assets/images'

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
  const {loader} = useContext<any>(AuthContext);
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>(Object)

  useEffect(() => {
    if(errorMessages.emailError === '' && errorMessages.passwordError === ''){
      loginUser()
    }
  },[errorMessages])

  const validate = () => {
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
  }

  const loginUser = () => {
   login(user.email, user.password)
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
          <Heading size="xl" alignSelf="center" mb="5">Login account</Heading>
          <FormControl mb="2">
            <FormControl.Label>Email Address</FormControl.Label>
            <Input onChangeText={value => setUser({...user, email: value})}/>
            {errorMessages?.emailError?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.emailError}</Text>} 
          </FormControl>
          <FormControl mb="2">
            <FormControl.Label>Password</FormControl.Label>
            <Input type='password' onChangeText={value => setUser({...user, password: value})}/>
            {errorMessages?.passwordError?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.passwordError}</Text>} 
          </FormControl>
          <Button
            size="lg"
            mt="4"
            bg="dark.50"
            isLoading={loader}
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