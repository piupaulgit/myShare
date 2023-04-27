import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box, Button, Divider, HStack, Image, ScrollView, Stack, Text, VStack} from 'native-base';
import { edge } from '../assets/images';
import { StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

const Bill = (props:any) => {
  return (
    <SafeAreaView>
      <ScrollView>
      <Stack
          px="5"
          mb="5"
          w={{
            base: '100%',
          }}>
            <Image source={edge}  style={{width: 800, marginTop:20, height: 80, transform: [{rotate: '180deg'}]}} alt="edge"/>
            <Box bg="white" px="6" py="4">
                <VStack space="4">
                    <VStack>
                        <Text style={[styles.fontStyle]} fontSize="md" fontWeight="bold">Bill</Text>
                        <Text style={[styles.fontStyle]} color="gray.300" fontWeight="bold" fontSize="lg">N{Math.floor(Math.random() * 100000000000000000000)}</Text>
                        <HStack space="4" alignItems="center">
                            <Text style={[styles.fontStyle]} color="gray.600">12.10.2013</Text>
                            <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">10:12AM</Text>
                        </HStack>
                    </VStack>
                    <VStack>
                      <Text style={[styles.fontStyle]} color="gray.900" fontSize="xs" fontWeight="bold">Event Name</Text>
                      <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">lorem ipsome dolor site amet nik hola the santua and thene</Text>
                    </VStack>
                    <VStack>
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">Name</Text>
                        <Text style={[styles.fontStyle]} fontWeight="bold" color="gray.800" fontSize="xs">Deep Karmakar</Text>
                    </VStack>
                    <Divider/>
                    <VStack space="1">
                      <HStack justifyContent="space-between">
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">1. Hotel expense</Text>
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">2,000</Text>
                      </HStack>
                      <HStack justifyContent="space-between">
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">2. Food expense</Text>
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">3,443</Text>
                      </HStack>
                      <HStack justifyContent="space-between">
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">3. Train ticket</Text>
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">6,777</Text>
                      </HStack>
                      <HStack justifyContent="space-between">
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">4. Other expenses</Text>
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">2,900</Text>
                      </HStack>
                    </VStack>
                    <Divider/>
                    <HStack justifyContent="space-between" mt="-3">
                      <Text style={[styles.fontStyle]} color="gray.600" fontSize="lg" fontWeight="bold">TOTAL</Text>
                      <Text style={[styles.fontStyle]} color="gray.600" fontSize="lg" fontWeight="bold">12,334</Text>
                    </HStack>
                    <HStack mt="2">
                      <Button bg="dark.50" size="md" mt="3" mb="2">
                          <Link to="/EventDetail" style={{color: '#fff'}}>Close</Link>
                      </Button>
                    </HStack>
                </VStack>
            </Box>
            <Image source={edge}  style={{width: 800, height: 80}} alt="edge"/>
          </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    fontStyle : {
        fontFamily:'Source Code Pro'
    }
})
export default Bill;
