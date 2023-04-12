import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Container,
  FlatList,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Modal,
  Spacer,
  Stack,
  Text,
  TextArea,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {AuthContext} from '../navigation/AuthProvider';
const randomColor = ["green","yellow","blue"]
interface IEvent {
  id: string,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  imageUrl: string,
  createdBy: string,
  members: string[],
  status: string
}


const Home = () => {
  const {logout} = useContext(AuthContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const events:IEvent[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Manali',
      description: 'Lorem ipsum dolor sit amet',
      startDate: '12/12/20',
      endDate: '19/12/20',
      createdBy: 'Deep',
      members: ['deep','piu','kunal','joyeeta'],
      status: 'open',
      imageUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=50',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-dd',
      title: 'Hyderabad',
      description: 'Lorem ipsum dolor sit amet',
      startDate: '12/12/20',
      endDate: '19/12/20',
      createdBy: 'Deep',
      members: [],
      status: 'open',
      imageUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-dduu',
      title: 'Hyderabad',
      description: 'Lorem ipsum dolor sit amet',
      startDate: '12/12/20',
      endDate: '19/12/20',
      createdBy: 'Deep',
      members: [],
      status: 'open',
      imageUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ];
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
            base: '100%',
          }}>
          <Header />

          <Button bg="dark.50" onPress={() => setShowModal(true)}>
            Add New Event
          </Button>

          {
            events.length === 0 &&
            <Box>
              <Heading size="md" mb="4">
                You don't have any event yet. Create your first event here
              </Heading>
            </Box>
            ||
            <Box>
              <Heading mb="4">Your events</Heading>
                <FlatList
                  data={events}
                  renderItem={({item}) => (
                    <Box
                      bg="#fff"
                      mb="1"
                      borderColor="muted.800"
                      borderRadius="10"
                      pl={['4', '4']}
                      pr={['4', '4']}
                      py="2">
                      <HStack space={[2, 3]} justifyContent="space-between">
                        <Avatar
                          size="50px"
                          source={{
                            uri: item.imageUrl,
                          }}
                        />
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
                            color="coolGray.600"
                            _dark={{
                              color: 'warmGray.200',
                            }}>
                            {item.description}
                          </Text>
                        </VStack>
                        <Spacer />
                        {/* <Text
                          fontSize="xs"
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start">
                          {item.startDate}
                        </Text> */}
                        <Badge colorScheme="gray" alignSelf="flex-start" variant="outline">{item.status}</Badge>
                      </HStack>
                    </Box>
                  )}
                  keyExtractor={item => item.id}
                />
            </Box>
          }

          <View>
            <Modal
              size="xl"
              isOpen={showModal}
              onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Create a new event</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>Title</FormControl.Label>
                    <Input />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Description</FormControl.Label>
                    <TextArea
                      h={20}
                      placeholder="Text Area Placeholder"
                      w="100%"
                      autoCompleteType={true}
                    />
                  </FormControl>
                  <HStack space={3}>
                    <FormControl mt="3" w="48%">
                      <FormControl.Label>Start Date</FormControl.Label>
                      <Input />
                    </FormControl>
                    <FormControl mt="3" w="48%">
                      <FormControl.Label>End Date</FormControl.Label>
                      <Input />
                    </FormControl>
                  </HStack>
                  <FormControl mt="3">
                    <FormControl.Label>Members</FormControl.Label>
                    <HStack mb="2" space="1">
                    {
                      ['piu','deep','kunal'].map((member:string) => {
                        const color = randomColor[Math.floor(Math.random() * randomColor.length)]
                        return (
                          <Avatar size="xs" bg="cyan.900">{member}</Avatar>
                        )
                      })
                    }
                    </HStack>
                    <Input />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="green"
                      onPress={() => {
                        setShowModal(false);
                      }}>
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
          <Button onPress={logout} bg="dark.50">Logout</Button>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
