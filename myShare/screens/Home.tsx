import {getAuth} from 'firebase/auth';
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
  Spinner,
  Stack,
  Text,
  TextArea,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {noEvent} from '../assets/images';
import {AuthContext} from '../navigation/AuthProvider';
import {addDoc, collection, onSnapshot, query, where} from 'firebase/firestore';
import {windowHeight} from '../utils/Dimentions';
import {FirebaseDB} from '../firebaseConfig';
import { IEvent } from '../interfaces/interfaces';

interface IErrorMessage {
  titleErrorMessage: string;
  membersErrorMessage: string;
}

const Home = (props: any) => {
  const auth = getAuth();
  const {user} = useContext(AuthContext);
  const {showToaster} = useContext(AuthContext);
  const {currentEventIndex, setCurrentEventIndex} = useContext(AuthContext)
  const {setCurrentSingleEvent} = useContext(AuthContext)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<IEvent>({
    title: '',
    description: '',
    members: [],
    status: 'open',
    expenses: [],
    date: `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`,
    createdBy: user.displayName,
    totalExpense: 0
  });
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>({
    titleErrorMessage: '',
    membersErrorMessage: ''
  });
  const [newMemberName, setNewMemberName] = useState<string>('');
  const [eventList, setEventList] = useState<IEvent[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [addEventLoader, setAddEventLoader] = useState(false);

  useEffect(() => {
    const getAllEvents = async () => {
      setShowLoader(true);
      await onSnapshot(collection(FirebaseDB, 'events'), querySnapshot => {
        const events: IEvent[] = [];
        querySnapshot.forEach(doc => {
          const obj: any = {...doc.data()};
          obj.id = doc.id;
          events.push(obj);
        });
        
        setEventList(events);
        setShowLoader(false);
      });
    };
    getAllEvents();
  }, []);

  useEffect(() => {
    if(currentEventIndex > -1){
      setCurrentSingleEvent(eventList[currentEventIndex])
    }
  },[eventList])

  useEffect(() => {
    if (
      errorMessages.titleErrorMessage === '' &&
      errorMessages.membersErrorMessage === '' &&
      newEvent.title !== '' 
    ) {
      addThisEvent();
    }
  }, [errorMessages]);

  const addThisMember = () => {
    const ifAlreadyAdded = newEvent.members.filter(
      (member: string) => member === newMemberName,
    );
    ifAlreadyAdded.length
      ? showToaster('Member already added')
      : setNewEvent({
          ...newEvent,
          members: [...newEvent.members, newMemberName.toLocaleLowerCase()],
        });
    setNewMemberName('');
  };

  const removeThisMember = (index: number) => {
    newEvent.members.splice(index, 1);
    setNewEvent({...newEvent, members: newEvent.members});
  };

  const validate = () => {
    setErrorMessages({
      titleErrorMessage: '',
      membersErrorMessage: '',
    });

    let [titleMessage, membersMessage] = ['', ''];

    // for title
    if (!newEvent.title) {
      titleMessage = 'Please Provide title for your event';
    }

    // for members
    if (newEvent.members.length === 0) {
      membersMessage = 'Please add at least one member';
    }

    setErrorMessages({
      titleErrorMessage: titleMessage,
      membersErrorMessage: membersMessage,
    });
  };

  const addThisEvent = async() => {
    const saveObject = {
      ...newEvent,
      expenses: []
    }
    try{
      setAddEventLoader(true)
      await addDoc(collection(FirebaseDB, "events"), saveObject)
    }
    catch(e){
      console.warn(e)
    }
    finally{
      setNewEvent({...newEvent, title: '', description: '', members: []})
      setAddEventLoader(false)
      setShowModal(false);
    }
  };

  const eventDetail = (item: any, index:any) => {
    console.log(item,'opopo')
    setCurrentEventIndex(index)
    setCurrentSingleEvent(item)
    props.navigation.navigate('EventDetail', item);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {showLoader ? (
          <VStack space={8} justifyContent="center" alignItems="center" minHeight={windowHeight}>
            <Spinner size="lg" color="dark.50" />
          </VStack>
        ) : (
          <Stack
            space={6}
            alignSelf="center"
            px="6"
            safeArea
            mt="4"
            w={{
              base: '100%',
            }}>
            {(eventList.length === 0 && (
              <VStack
                justifyContent="center"
                minHeight={windowHeight}
                alignItems="center"
                mt="-10">
                <Image
                  source={noEvent}
                  style={{width: 104, height: 110}}
                  alt="no event image"
                />
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
                  data={eventList}
                  renderItem={({item,index}) => (
                    <Pressable onPress={() => eventDetail(item,index)}>
                      <HStack
                        bg="#fff"
                        mb="2"
                        borderColor="muted.800"
                        borderRadius="10"
                        justifyContent="space-between"
                        pl={['4', '4']}
                        pr={['4', '4']}
                        py="3">
                        <Avatar>{item?.title?.split('')[0]?.toUpperCase()}</Avatar>

                        <VStack maxWidth="200" width="160">
                          <Text
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            bold>
                            {item.title}
                          </Text>
                          <Text
                            style={{fontSize: 8, lineHeight: 10}}
                            color="gray.600">
                            {item.date}
                          </Text>
                          {item?.description.length > 0 && <Text
                            isTruncated
                            maxW="175"
                            color="coolGray.600"
                            _dark={{
                              color: 'warmGray.200',
                            }}>
                            {item.description}
                          </Text> }
                          <Text fontSize="xs" color="coolGray.600">
                            created by: {item.createdBy}
                          </Text>
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
                        {errorMessages?.titleErrorMessage?.length > 0 && (
                          <Text fontSize="xs" color="gray.500">
                            {errorMessages.titleErrorMessage}
                          </Text>
                        )}
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
                        {newEvent?.members?.length > 0 && (
                          <>
                            <Text fontSize="xs" color="gray.800" mb="1">
                              Tap on the memeber name to remove
                            </Text>
                            <HStack space="2" mb="2" flexWrap="wrap">
                              {newEvent?.members?.map(
                                (member: string, index: number) => {
                                  return (
                                    <Pressable
                                      key={index}
                                      onPress={() => removeThisMember(index)}>
                                      <Badge variant="outline" mb="2">{member}</Badge>
                                    </Pressable>
                                  );
                                },
                              )}
                            </HStack>
                          </>
                        )}
                        <HStack space={2}>
                          <Input
                            flex="1"
                            value={newMemberName}
                            onChangeText={value => setNewMemberName(value)}
                            placeholder="Members"
                          />
                          <Button
                            bg="dark.50"
                            onPress={addThisMember}
                            py="2"
                            isDisabled={!newMemberName}>
                            Add
                          </Button>
                        </HStack>
                        {errorMessages?.membersErrorMessage?.length > 0 && (
                          <Text fontSize="xs" color="gray.500">
                            {errorMessages.membersErrorMessage}
                          </Text>
                        )}
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
                      <Button bg="dark.50" onPress={validate} isLoading={addEventLoader}>
                        Add this event
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </View>
          </Stack>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
