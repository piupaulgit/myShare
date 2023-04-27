import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {edge} from '../assets/images';
import {StyleSheet} from 'react-native';
import {Link} from '@react-navigation/native';
import {event} from 'react-native-reanimated';

const Bill = (props: any) => {
  const memberBill = props.route.params.billDetail;
  const eventTitle = props.route.params.eventTitle;
  const eventDes = props.route.params.eventDes;

  useEffect(() => {
    console.log(memberBill);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack
          px="5"
          mb="5"
          w={{
            base: '100%',
          }}>
          <Image
            source={edge}
            style={{
              width: 800,
              marginTop: 20,
              height: 80,
              transform: [{rotate: '180deg'}],
            }}
            alt="edge"
          />
          <Box bg="white" px="6" py="4">
            <VStack space="4">
              <VStack>
                <Text
                  style={[styles.fontStyle]}
                  fontSize="md"
                  fontWeight="bold">
                  Bill
                </Text>
                <Text
                  style={[styles.fontStyle]}
                  color="gray.300"
                  fontWeight="bold"
                  fontSize="lg">
                  N{Math.floor(Math.random() * 100000000000000000000)}
                </Text>
                <HStack space="4" alignItems="center">
                  <Text style={[styles.fontStyle]} color="gray.600">
                    12.10.2013
                  </Text>
                  <Text
                    style={[styles.fontStyle]}
                    color="gray.600"
                    fontSize="xs">
                    10:12AM
                  </Text>
                </HStack>
              </VStack>
              <VStack>
                <Text
                  style={[styles.fontStyle]}
                  color="gray.900"
                  fontSize="xs"
                  fontWeight="bold">
                  {eventTitle}
                </Text>
                <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">
                  {eventDes}
                </Text>
              </VStack>
              <VStack>
                <Text style={[styles.fontStyle]} color="gray.600" fontSize="xs">
                  Name
                </Text>
                <Text
                  style={[styles.fontStyle, {textTransform: 'capitalize'}]}
                  fontWeight="bold"
                  color="gray.800"
                  fontSize="xs">
                  {memberBill.name}
                </Text>
              </VStack>

                {memberBill.shareDetail.length > 0 && (
                  <VStack space="1">
                    <Text
                      style={[styles.fontStyle, {textTransform: 'capitalize'}]}
                      fontWeight="bold"
                      color="gray.800"
                      fontSize="xs">
                      Expenses
                    </Text>
                    <Divider />
                    {memberBill.shareDetail.map((item: any, indx: number) => {
                      return (
                        <HStack justifyContent="space-between" key={indx}>
                          <Text
                            style={[
                              styles.fontStyle,
                              {textTransform: 'capitalize'},
                            ]}
                            color="gray.600"
                            fontSize="xs">
                            {indx + 1}. {item.title}
                          </Text>
                          <Text
                            style={[styles.fontStyle]}
                            color="gray.600"
                            fontSize="xs">
                            {item.value}
                          </Text>
                        </HStack>
                      );
                    })}
                    <Divider/>
                    <HStack justifyContent="space-between">
                      <Text fontSize="xs">Total</Text>
                      <Text fontSize="xs" bold>{memberBill.totalShare}</Text>
                    </HStack>
                  </VStack>
                )}

                {memberBill.spentDetail.length > 0 && (
                  <VStack space="1" mt="3">
                    <Text
                      style={[styles.fontStyle, {textTransform: 'capitalize'}]}
                      fontWeight="bold"
                      color="gray.800"
                      fontSize="xs">
                      Spent
                    </Text>
                    <Divider />
                    {memberBill.spentDetail.map((item: any, indx: number) => {
                      return (
                        <HStack justifyContent="space-between" key={indx}>
                          <Text
                            style={[
                              styles.fontStyle,
                              {textTransform: 'capitalize'},
                            ]}
                            color="gray.600"
                            fontSize="xs">
                            {indx + 1}. {item.title}
                          </Text>
                          <Text
                            style={[styles.fontStyle]}
                            color="gray.600"
                            fontSize="xs">
                            {item.value}
                          </Text>
                        </HStack>
                      );
                    })}
                    <Divider/>
                    <HStack justifyContent="space-between">
                      <Text fontSize="xs">Total</Text>
                      <Text fontSize="xs" bold>{memberBill.totalAmountSpent}</Text>
                    </HStack>
                  </VStack>
                )}

              <Divider />
              <HStack justifyContent="space-between" mt="-3">
                <Text
                  style={[styles.fontStyle]}
                  color="gray.600"
                  fontSize="lg"
                  fontWeight="bold">
                  DUE AMOUNT
                </Text>
                <Text
                  style={[styles.fontStyle]}
                  color="gray.600"
                  fontSize="lg"
                  fontWeight="bold">
                  {memberBill.finalCalculation}
                </Text>
              </HStack>
              <HStack mt="2">
                <Button bg="dark.50" size="md" mt="3" mb="2">
                  <Link to="/EventDetail" style={{color: '#fff'}}>
                    Close
                  </Link>
                </Button>
              </HStack>
            </VStack>
          </Box>
          <Image source={edge} style={{width: 800, height: 80}} alt="edge" />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Source Code Pro',
  },
});
export default Bill;
