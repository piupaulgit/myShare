import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Avatar,
  Button,
  HStack,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {AuthContext} from '../navigation/AuthProvider';

const Profile = () => {
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);
  const {loader} = useContext<any>(AuthContext);
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack
          space={2}
          alignSelf="center"
          px="6"
          safeArea
          mt="4"
          w={{
            base: '100%',
          }}>
          <VStack justifyContent="center" alignItems="center" space="4">
            <Avatar bg="gray.700">{user.email.split('')[0].toUpperCase()}</Avatar>
            <Text>{user.email}</Text>
            <Button onPress={logout} isLoading={loader} bg="dark.50">
              Logout
            </Button>
          </VStack>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
