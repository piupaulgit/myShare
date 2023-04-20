import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import { Link } from '@react-navigation/native';

const ShareDetails = (props:any) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack
          px="5"
          py="5"
          w={{
            base: '100%',
          }}>
          <Heading>Total expense - 34,355</Heading>
          <Box mt="5">
            <VStack space="2" mb="5">
              <Heading size="sm">
                Who spent how much
              </Heading>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="white"
                px="4"
                py="2"
                borderRadius="4">
                <Text fontWeight="bold">Deep</Text>
                <Text flex="1">Hote, food, ticket</Text>
                <Text fontWeight="bold">2345</Text>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="white"
                px="4"
                py="2"
                borderRadius="4">
                <Text fontWeight="bold">Kunal</Text>
                <Text flex="1">Hote, food, ticket</Text>
                <Text fontWeight="bold">2345</Text>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="white"
                px="4"
                py="2"
                borderRadius="4">
                <Text fontWeight="bold">Piu</Text>
                <Text flex="1">
                  Hote, food, ticket,Hote, food, ticket,Hote, food, ticket,Hote,
                  food, ticket,
                </Text>
                <Text fontWeight="bold">2345</Text>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="white"
                px="4"
                py="2"
                borderRadius="4">
                <Text fontWeight="bold">Joyeeta</Text>
                <Text flex="1">Hote, food, ticket</Text>
                <Text fontWeight="bold">2345</Text>
              </HStack>
            </VStack>
            <Divider my="5"/>
            <VStack space="2" mt="3" mb="5">
              <Heading size="sm">
                Share Details
              </Heading>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="gray.200"
                px="4"
                py="2"
                alignItems="center"
                borderRadius="4">
                <Text fontWeight="bold">Deep</Text>
                <Text flex="1">Hote, food, ticket</Text>
                <Text fontWeight="bold">2345</Text>
                <Button size="xs" px="2" py="2" alignSelf="center" bg="dark.50" onPress={() => props.navigation.navigate('Bill')}>Generate Bill</Button>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="gray.200"
                px="4"
                py="2"
                borderRadius="4">
                <Text fontWeight="bold">Deep</Text>
                <Text flex="1">Hote, food, ticket</Text>
                <Text fontWeight="bold">2345</Text>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="gray.200"
                px="4"
                py="2"
                borderRadius="4">
                <Text fontWeight="bold">Deep</Text>
                <Text flex="1">Hote, food, ticket</Text>
                <Text fontWeight="bold">2345</Text>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="gray.200"
                px="4"
                py="2"
                borderRadius="4">
                <Text fontWeight="bold">Deep</Text>
                <Text flex="1">Hote, food, ticket</Text>
                <Text fontWeight="bold">2345</Text>
              </HStack>
            </VStack>
            <Divider my="5"/>
            <VStack space="2" mb="5">
              <Heading size="sm">
                Who needs to pay whom
              </Heading>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="gray.700"
                px="4"
                py="2"
                borderRadius="4">
                <Text color="white" fontWeight="bold">Deep</Text>
                <Text color="white" flex="1">needs to pay Piu</Text>
                <Text color="white" fontWeight="bold">2345</Text>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="gray.700"
                px="4"
                py="2"
                borderRadius="4">
                <Text color="white" fontWeight="bold">Kunal</Text>
                <Text color="white" flex="1">needs to pay Deep</Text>
                <Text color="white" fontWeight="bold">678</Text>
              </HStack>
              <HStack
                space="4"
                justifyContent="space-between"
                bg="gray.700"
                px="4"
                py="2"
                borderRadius="4">
                <Text color="white" fontWeight="bold">Piu</Text>
                <Text color="white" flex="1">needs to pay Joyeeta</Text>
                <Text color="white" fontWeight="bold">4532</Text>
              </HStack>
            </VStack>
          </Box>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareDetails;
