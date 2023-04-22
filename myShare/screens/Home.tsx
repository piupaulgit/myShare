import {
  Avatar,
  Badge,
  Box,
  Button,
  FlatList,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  Pressable,
  Spacer,
  Stack,
  Text,
  TextArea,
  View,
  VStack
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { noEvent } from '../assets/images';
import {AuthContext} from '../navigation/AuthProvider';
import { windowHeight } from '../utils/Dimentions';

interface IEvent {
  id?: string;
  title: string;
  description: string;
  date: any;
  createdBy: string;
  members: string[];
  status: string;
}

interface IErrorMessage {
  titleErrorMessage: string,
  membersErrorMessage: string
}


const Home = (props:any) => {
  const {showToaster} = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<IEvent>({
    title: '',
    description: '',
    members: [],
    status: 'open',
    date: '',
    createdBy: ''
  });
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>(Object)
  const [newMemberName, setNewMemberName] = useState<string>('');
  const events: IEvent[] = [
    // {
    //   id: 'string',
    //   title: 'string',
    //   description: 'string',
    //   date: 'string',
    //   createdBy: 'string',
    //   members: ['string'],
    //   status: 'string',
    // }
  ];

  useEffect(() => {
    if(errorMessages.titleErrorMessage === '' && errorMessages.membersErrorMessage === ''){
      addThisEvent()
    }
  },[errorMessages])

  const addThisMember = () => {
    const ifAlreadyAdded = newEvent.members.filter((member:string) => member === newMemberName)
    ifAlreadyAdded.length ? showToaster("Member already added") : setNewEvent({...newEvent, members: [...newEvent.members, newMemberName]});
    setNewMemberName('')
  };

  const removeThisMember = (index: number) => {
    newEvent.members.splice(index,1)
    setNewEvent({...newEvent, members: newEvent.members})
  }
  
  const validate = () => {
    setErrorMessages({
      titleErrorMessage: '',
      membersErrorMessage: ''
    })

    let [titleMessage, membersMessage] = ["", ""]

    // for title
    if(!newEvent.title){
      titleMessage = "Please Provide title for our event";
    }

    // for members
    if(newEvent.members.length === 0){
      membersMessage = "Please add at least one member";
    }

    setErrorMessages({titleErrorMessage: titleMessage, membersErrorMessage: membersMessage })
  }

  const addThisEvent = () => {
    let today:any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    setShowModal(false)
    setNewEvent({...newEvent, date: today, status: 'open'})
  }

  const eventDetail = (event:any) => {
    props.navigation.navigate("EventDetail")
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Stack
          space={6}
          alignSelf="center"
          px="6"
          safeArea
          mt="4"
          w={{
            base: '100%',
          }}>

          {(events.length === 0 && (
            <VStack justifyContent="center" minHeight={windowHeight} alignItems="center" mt="-10">
              <Image source={noEvent} style={{width: 104, height: 110}} alt="no event image"/>
              <Heading size="md" mb="4" mt="4" textAlign="center">
                You don't have any event yet. Create your first event here
              </Heading>
              <Button bg="dark.50" onPress={() => setShowModal(true)}>
                Add New Event
              </Button>
            </VStack>
          )) || (
            <Box>
              <Heading mb="4">Your events</Heading>
              <FlatList
                data={events}
                renderItem={({item}) => (
                  <Pressable onPress={() => eventDetail(item)}>
                    <HStack bg="#fff"
                      mb="2"
                      borderColor="muted.800"
                      borderRadius="10"
                      justifyContent="space-between"
                      pl={['4', '4']}
                      pr={['4', '4']}
                      py="3">
                      <Avatar
                        >{item.title.split('')[0].toUpperCase()}</Avatar>

                        <VStack>
                          <Text
                              _dark={{
                                color: 'warmGray.50',
                              }}
                              color="coolGray.800"
                              bold>
                              {item.title}
                            </Text>
                            <Text
                              isTruncated maxW="175"
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}>
                              {item.description}
                            </Text>
                            <Text fontSize="xs" color="coolGray.600">created by: {item.createdBy}</Text>
                        </VStack>
                        <Badge
                          colorScheme="gray"
                          alignSelf="flex-start"
                          variant="outline">
                          {item.status}
                        </Badge>
                    </HStack>
                  </Pressable>
                )}
              />

            <Button bg="dark.50" onPress={() => setShowModal(true)}>
              Add New Event
            </Button>
            </Box>
          )}

          <View>
            <Modal
              size="xl"
              isOpen={showModal}
              onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Create a new event</Modal.Header>
                <Modal.Body>
                  <ScrollView>
                    <FormControl mb="2">
                      <FormControl.Label>Title</FormControl.Label>
                      <Input
                        placeholder="Title"
                        onChangeText={value =>
                          setNewEvent({...newEvent, title: value})
                        }
                      />
                      {errorMessages?.titleErrorMessage?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.titleErrorMessage}</Text>} 
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>Description</FormControl.Label>
                      <TextArea
                        h={20}
                        placeholder="Description"
                        w="100%"
                        autoCompleteType={true}
                        onChangeText={value =>
                          setNewEvent({...newEvent, description: value})
                        }
                      />
                    </FormControl>
                    {/* <HStack space={3}>
                      <FormControl mt="3" flex="1">
                        <FormControl.Label>Start Date</FormControl.Label>
                        <Input />
                      </FormControl>
                      <FormControl mt="3" flex="1">
                        <FormControl.Label>End Date</FormControl.Label>
                        <Input />
                      </FormControl>
                    </HStack> */}
                    <FormControl mt="2">
                      <FormControl.Label>Members</FormControl.Label>
                      {newEvent?.members?.length > 0 && 
                      <>
                        <Text fontSize="xs" color="gray.800" mb="1">Tap on the memeber name to remove</Text>
                        <HStack space="2" mb="2">
                          {newEvent?.members?.map((member: string, index:number) => {
                            return (
                                <Pressable key={index} onPress={() => removeThisMember(index)}>
                                  <Badge variant="outline">{member}</Badge>
                                </Pressable>
                              )
                            })
                          }
                        </HStack>
                      </>
                        
                      }
                      <HStack space={2}>
                        <Input
                          flex="1"
                          value={newMemberName}
                          onChangeText={value => setNewMemberName(value)}
                          placeholder="Members"
                        />
                        <Button bg="dark.50" onPress={addThisMember} py="2" isDisabled={!newMemberName}>
                          Add
                        </Button>
                      </HStack>
                      {errorMessages?.membersErrorMessage?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.membersErrorMessage}</Text>} 
                    </FormControl>
                  </ScrollView>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      bg="dark.500"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      bg="dark.50"
                      onPress={validate}>
                      Add this event
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
