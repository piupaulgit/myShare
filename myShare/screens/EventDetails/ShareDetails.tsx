import React, {useEffect, useState} from 'react';
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
import {IEvent, IExpense} from '../../interfaces/interfaces';
import {Link} from '@react-navigation/native';

interface IGenaricObjectForMember {
  name: string;
  detail: any;
  totalAmountSpent: number;
  totalShare: number;
  shareDetail: {
    title: string;
    value: number;
  }[];
  spentDetail: {
    title: string;
    value: number;
  }[];
  finalCalculation: number;
  extra: number;
}

const ShareDetails = (props: any) => {
  const [singleEvent, setSingleEvent] = useState<IEvent>(props.singleEventData);
  const [memberShareDetails, setMemberShareDetails] = useState<
    IGenaricObjectForMember[]
  >([]);

  useEffect(() => {
    const memberArray: any = [];
    singleEvent.members.forEach(member => {
      var obj: IGenaricObjectForMember = {
        name: member,
        totalAmountSpent: 0,
        detail: [],
        shareDetail: [],
        spentDetail: [],
        totalShare: 0,
        finalCalculation: 0,
        extra: 0,
      };
      singleEvent.expenses.forEach(expense => {
        if (member === expense.spentBy) {
          obj['totalAmountSpent'] = obj.totalAmountSpent + expense.value;
          const spentDetailObj = {
            title: expense.title,
            value: expense.value,
          };
          obj['spentDetail'].push(spentDetailObj);
        }
        if (expense.splitBetween.includes(member)) {
          obj['totalShare'] =
            obj.totalShare + expense.value / expense.splitBetween.length;
          const shareDetailObj = {
            title: expense.title,
            value: expense.value / expense.splitBetween.length,
          };
          obj['shareDetail'].push(shareDetailObj);
        }
      });
      obj['finalCalculation'] = obj.totalAmountSpent - obj.totalShare;
      obj['extra'] = obj['finalCalculation'];
      memberArray.push(obj);
    });
    memberArray.forEach((eachMember: IGenaricObjectForMember) => {
      if (eachMember.extra < 0) {
        memberArray.forEach((mem: IGenaricObjectForMember) => {
          let amount = 0;
          if (mem.extra > 0) {
            if (mem.extra - Math.abs(eachMember.extra) === 0) {
              eachMember.extra = 0;
              amount = mem.extra;
              mem.extra = 0;
            } else if (mem.extra - Math.abs(eachMember.extra) > 0) {
              mem.extra = mem.extra - Math.abs(eachMember.extra);
              amount = Math.abs(eachMember.extra);
              eachMember.extra = 0;
            } else if (mem.extra - Math.abs(eachMember.extra) < 0) {
              eachMember.extra = mem.extra - Math.abs(eachMember.extra);
              amount = mem.extra;
              mem.extra = 0;
            }
          }
          if (amount > 0) {
            eachMember.detail.push(
              `${eachMember.name} needs to pay ${amount} to ${mem.name}`,
            );
            mem.detail.push(
              `${mem.name} will get ${amount} from ${eachMember.name}`,
            );
          }
        });
      }
    });

    setMemberShareDetails(memberArray);
  }, [singleEvent]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack
          px="5"
          py="5"
          w={{
            base: '100%',
          }}>
          {singleEvent.expenses.length > 0 ? (
            <>
              <Heading>Total expense - {singleEvent.totalExpense}</Heading>
              <Box mt="5">
                <VStack space="2" mb="5">
                  <VStack>
                    <Heading size="sm" mb="2">
                      Sharing Details
                    </Heading>
                    {memberShareDetails.length > 0 &&
                      memberShareDetails.map(
                        (member: IGenaricObjectForMember) => {
                          return (
                            <VStack
                              bg="white"
                              px="4"
                              py="2"
                              mb="2"
                              borderRadius="3"
                              key={member.name}>
                              <Text
                                bold
                                fontSize="lg"
                                mb="1"
                                style={{textTransform: 'capitalize'}}>
                                {member.name}
                              </Text>
                              <Text>
                                Spent: {member.totalAmountSpent}rs.
                                {member.spentDetail.length > 0 && (
                                  <>
                                    [
                                    {member.spentDetail.map((detail, ind) => (
                                      <>
                                        {detail.title}
                                        {ind === member.spentDetail.length && (
                                          <>, </>
                                        )}
                                      </>
                                    ))}
                                    ]
                                  </>
                                )}
                              </Text>
                              <Text>
                                Expense: {member.totalShare}rs.
                                {member.shareDetail.length > 0 && (
                                  <>
                                    [
                                    {member.shareDetail.map((detail, ind) => (
                                      <>
                                        {detail.title}
                                        {ind !==
                                          member.shareDetail.length - 1 && (
                                          <>, </>
                                        )}
                                      </>
                                    ))}
                                    ]
                                  </>
                                )}
                              </Text>
                              {member.finalCalculation === 0 ||
                              member.finalCalculation > 0 ? (
                                <Text color="green.800">
                                  Due Amount to get: {member.finalCalculation}
                                  rs.
                                </Text>
                              ) : (
                                <Text color="red.800">
                                  Due Amount to Pay: {member.finalCalculation}
                                  rs.
                                </Text>
                              )}
                              {member.detail.length > 0 && (
                                <HStack>
                                  <Text>FNF: </Text>
                                  <VStack>
                                    {member.detail.map((detail: string) => (
                                      <Text>{detail}</Text>
                                    ))}
                                  </VStack>
                                </HStack>
                              )}
                              <Button
                                bg="dark.50"
                                size="sm"
                                mt="3"
                                mb="2"
                                alignSelf="flex-start"
                                onPress={() =>
                                  props.props.navigation.navigate('Bill', {
                                    eventTitle: singleEvent.title,
                                    eventDes: singleEvent.description,
                                    billDetail: member,
                                  })
                                }>
                                Generate Bill
                              </Button>
                            </VStack>
                          );
                        },
                      )}
                  </VStack>
                </VStack>
              </Box>
            </>
          ) : (
            <Text fontSize="lg" alignSelf="center" mt="10">
              No Expense aded till now
            </Text>
          )}
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareDetails;
