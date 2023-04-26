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

interface IGenaricObjectForMember {
  name: string;
  detail: any;
  totalAmountSpent: number;
  totalShare: number;
  spentIn: string;
  shareIn: string;
  finalCalculation: number;
  extra: number
}

const ShareDetails = (props: any) => {
  const [singleEvent, setSingleEvent] = useState<IEvent>(props.singleEventData);
  const [memberShareDetails, setMemberShareDetails] =
    useState<IGenaricObjectForMember[]>([]);

  const expenses: IExpense[] = [
    {
      title: 'hotel',
      value: 3000,
      splitBetween: ['piu', 'kun', 'deep'],
      spentBy: 'deep',
      date: '9',
      status: 'open',
    },
    {
      title: 'food',
      value: 3000,
      splitBetween: ['piu', 'kun'],
      spentBy: 'piu',
      date: '9',
      status: 'open',
    },
    {
      title: 'train',
      value: 3000,
      splitBetween: ['piu', 'kun', 'joye'],
      spentBy: 'piu',
      date: '9',
      status: 'open',
    },
  ];

  useEffect(() => {
    const memberArray: any = [];
    singleEvent.members.forEach(member => {
      var obj: IGenaricObjectForMember = {
        name: member,
        totalAmountSpent: 0,
        detail: [],
        spentIn: '',
        shareIn: '',
        totalShare: 0,
        finalCalculation: 0,
        extra: 0
      };
      singleEvent.expenses.forEach(expense => {
        if (member === expense.spentBy) {
          obj['totalAmountSpent'] = obj.totalAmountSpent + expense.value;
          obj['spentIn'] = `${obj['spentIn']} ${expense.title} `;
        }
        if(expense.splitBetween.includes(member)){
          obj['totalShare'] = obj.totalShare + expense.value/expense.splitBetween.length;
          obj['shareIn'] = `${obj['shareIn']} ${expense.title} `;
        }
      });
      obj['finalCalculation'] = obj.totalAmountSpent - obj.totalShare;
      obj['extra'] = obj['finalCalculation']
      memberArray.push(obj);
    });
    memberArray.forEach((eachMember:IGenaricObjectForMember) => {
      if(eachMember.extra < 0 ){ 
        memberArray.forEach((mem:IGenaricObjectForMember) => {
          if(mem.extra > 0 ){
            if(mem.extra === Math.abs(eachMember.extra)){
              eachMember.detail.push(`${eachMember.name} needs to pay ${mem.extra} to ${mem.name}`)
              mem.detail.push(`${mem.name} will get ${mem.extra} from ${eachMember.name}`)
              eachMember.extra = 0;
              mem.extra = 0
            }
            else if(Math.abs(eachMember.extra) > mem.extra){
              eachMember.detail.push(`${eachMember.name} needs to pay ${mem.extra} to ${mem.name}`)
              mem.detail.push(`${mem.name} will get ${mem.extra} from ${eachMember.name}`)
              eachMember.extra = -(Math.abs(eachMember.extra) - mem.extra)
              mem.extra = 0;
            }
          }
        })
      }
    });
    setMemberShareDetails(memberArray)
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
          <Heading>Total expense - {singleEvent.totalExpense}</Heading>
          <Box mt="5">
            <VStack space="2" mb="5">
              <VStack>
                <Heading size="sm" mb="2">Sharing Details</Heading>
                {
                  memberShareDetails.length > 0 && memberShareDetails.map((member:IGenaricObjectForMember) => {
                    return(
                      <VStack bg="white" px="4" py="2" mb="2" borderRadius="3">
                        <Text bold fontSize="lg" mb="1" style={{textTransform:'capitalize'}}>{member.name}</Text>
                        <Text>Spent: {member.totalAmountSpent}rs. ( {member.spentIn})</Text>
                        <Text>Expense: {member.totalShare}rs. ( {member.shareIn})</Text>
                        {
                          (member.finalCalculation === 0 || member.finalCalculation > 0) ?
                          <Text color="green.800">Due Amount to get: {member.finalCalculation}rs.</Text> :
                          <Text color="red.800">Due Amount to Pay: {member.finalCalculation}rs.</Text>
                        }
                        {
                          member.detail.length > 0 && 
                          <HStack>
                            <Text>FNF: </Text>
                            <VStack>
                              {member.detail.map((detail:string) => <Text>{detail}</Text>)}
                            </VStack>
                          </HStack>
                        }
                        <Button bg="dark.50" size="sm" mt="3" mb="2" alignSelf="flex-start">Generate Bill</Button>
                      </VStack>
                    )
                  })
                }
              </VStack>
            </VStack>
          </Box>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShareDetails;
