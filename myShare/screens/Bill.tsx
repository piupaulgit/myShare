import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Box, Divider, HStack, Image, ScrollView, Stack, Text, View, VStack} from 'native-base';
import { edge, paperEdge } from '../assets/images';
import { StyleSheet } from 'react-native';

const Bill = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <Stack
          px="5"
          w={{
            base: '100%',
          }}>
            <Image source={edge}  style={{width: 800, marginTop:20, height: 80, transform: [{rotate: '180deg'}]}} alt="edge"/>
            <Box bg="white" px="6" py="4">
                <VStack space="6">
                    <VStack>
                        <Text style={[styles.fontStyle]} fontSize="md" fontWeight="bold">Bill</Text>
                        <Text style={[styles.fontStyle]} color="gray.300" fontWeight="bold" fontSize="lg">N{Math.floor(Math.random() * 100000000000000000000)}</Text>
                        <HStack space="4" alignItems="center">
                            <Text style={[styles.fontStyle]} color="gray.600">12.10.2013</Text>
                            <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">10:12AM</Text>
                        </HStack>
                    </VStack>
                    <VStack>
                        <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">Name</Text>
                        <Text style={[styles.fontStyle]} fontWeight="bold" color="gray.800" fontSize="xs">Deep Karmakar</Text>
                    </VStack>
                    <Divider/>
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
