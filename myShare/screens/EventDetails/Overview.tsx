import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  FlatList,
  FormControl,
  HStack,
  Input,
  Modal,
  Pressable,
  Radio,
  ScrollView,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';

interface IExpense {
  name: string;
  value: string;
  spentBy: string;
  members: string[];
  date: string;
  status: string;
}

const Overview = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMemberModal, setShowMemberModal] = useState<boolean>(false);
    const [showDeleterModal, setShowDeleterModal] = useState<boolean>(false);
    const [addMemberFor, setAddMemberFor] = useState<string>('spentBy');
    const [deleteModalType, setDeleteModalType] = useState<string>('')
    const [expenses, setExpenses] = useState<IExpense[]>([
    {
      name: 'hotel',
      value: '2000',
      spentBy: 'Deep',
      members: ['Piu', 'Deep', 'Kunal'],
      date: '12/12/2023',
      status: 'open',
    },
    {
      name: 'food',
      value: '2000',
      spentBy: 'Deep',
      members: ['joyeeta'],
      date: '12/12/2023',
      status: 'open',
    },
    {
      name: 'shopping',
      value: '2000',
      spentBy: 'Piu',
      members: ['Piu'],
      date: '12/12/2023',
      status: 'open',
    },
  ]);

  const [newOldExpense, setNewOldExpense] = useState<IExpense>({
    name: '',
    value: '',
    spentBy: '',
    members: [],
    date: '',
    status: 'open',
  });

  const openMemberModal = (modalType: string) =>{
    setAddMemberFor(modalType)
    setShowMemberModal(true)
  }

  const validate = () => {
    console.log(newOldExpense)
  };

  const openEditExpenseModal = (selectedExpense: IExpense) => {
    setShowModal(true)
    setNewOldExpense(selectedExpense)
    console.log(newOldExpense)
  }

  const openDeleteModal = (modalType: string) =>{
    setShowDeleterModal(true)
    setDeleteModalType(modalType)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack
          px="5"
          w={{
            base: '100%',
          }}>
          <Box py="4" borderRadius="5">
            <HStack justifyContent="space-between">
              <Text fontSize="md" bold mb="1">
                Deep's Birthday Party
              </Text>
              <Badge variant="outline">Open</Badge>
            </HStack>
            <Text fontSize="xs" mb="3">
              Create By: Deep
            </Text>
            <Text color="gray.600" fontSize="sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, eos consectetur vel iste sed possimus at, nihil
              similique rerum magnam est doloribus beatae impedit quam deserunt
              iusto earum eaque! Ad.
            </Text>
            <HStack mt="3" flexWrap="wrap" space={2}>
              <Badge variant="outline" mb="2">
                Piu
              </Badge>
              <Badge variant="outline" mb="2">
                Deep
              </Badge>
              <Badge variant="outline" mb="2">
                Kunal
              </Badge>
              <Badge variant="outline" mb="2">
                Joyeeta
              </Badge>
              <Badge variant="outline" mb="2">
                Piu
              </Badge>
              <Badge variant="outline" mb="2">
                Deep
              </Badge>
              <Badge variant="outline" mb="2">
                Kunal
              </Badge>
              <Badge variant="outline" mb="2">
                Joyeeta
              </Badge>
              <Badge variant="outline" mb="2">
                Piu
              </Badge>
              <Badge variant="outline" mb="2">
                Deep
              </Badge>
              <Badge variant="outline" mb="2">
                Kunal
              </Badge>
              <Badge variant="outline" mb="2">
                Joyeeta
              </Badge>
            </HStack>
            <HStack space="3" mt="2">
              <Button flex="1" bg="dark.300">
                Edit Event
              </Button>
              <Button flex="1" bg="dark.500" onPress={()=> openDeleteModal('event')}>
                Delete Event
              </Button>
            </HStack>
            <VStack mt="10">
              <HStack justifyContent="space-between" alignItems="center" mb="2">
                <Text fontSize="sm" bold>
                  Expenses
                </Text>
                <Button
                  size="sm"
                  bg="dark.50"
                  onPress={() => {
                    setShowModal(true);
                  }}>
                  Add expenses
                </Button>
              </HStack>
              <FlatList
                mt="3"
                data={expenses}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                  <Box bg="white" borderRadius="4" px="4" py="2" mb="2">
                    <HStack justifyContent="space-between" flexWrap="wrap">
                      <Text>{item.name}</Text>
                      <Text>{item.value}</Text>
                    </HStack>
                    <Text fontSize="xs" mb="4">
                      Spent by: {item.spentBy} ({item.date})
                    </Text>
                    <Divider />
                    <HStack justifyContent="space-between">
                      <HStack space="2" mt="2">
                        {item?.members?.map((member: string) => {
                          return (
                            <Badge variant="outline" key={member}>
                              {member}
                            </Badge>
                          );
                        })}
                      </HStack>
                      <HStack space="2" mt="2">
                        <Button bg="dark.300" py="1" onPress={() => openEditExpenseModal(item)}>
                          Edit
                        </Button>
                        <Button bg="dark.500" py="1" onPress={() => openDeleteModal('expense')}>
                          Delete
                        </Button>
                      </HStack>
                    </HStack>
                  </Box>
                )}></FlatList>
              <HStack
                borderColor="dark.200"
                borderWidth="1"
                px="3"
                py="3"
                mt="2"
                justifyContent="space-between"
                borderRadius="4">
                <Text>Total Expense</Text>
                <Text>23000</Text>
              </HStack>
            </VStack>
          </Box>
        </Stack>

        {/* add expense modal */}
        <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add new expense</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <FormControl mb="2">
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    placeholder="Name"
                    onChangeText={value =>
                      setNewOldExpense({...newOldExpense, name: value})
                    }
                  />
                  {/* {errorMessages?.titleErrorMessage?.length > 0 && <Text fontSize="xs" color="gray.500">{errorMessages.titleErrorMessage}</Text>}  */}
                </FormControl>
                <FormControl mb="2">
                  <FormControl.Label>Value</FormControl.Label>
                  <Input
                    placeholder="Value"
                    onChangeText={val =>
                      setNewOldExpense({...newOldExpense, value: val})
                    }
                  />
                </FormControl>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space="2">
                    <Text color="gray.500">Spent by: </Text>
                    {newOldExpense.spentBy && <Badge variant="outline">{newOldExpense.spentBy}</Badge>}
                  </HStack>
                  <Button bg="dark.50" size="xs" onPress={() => openMemberModal('spentBy')}>
                    {newOldExpense.spentBy ? 'Change' : 'Show Members'}
                  </Button>
                </HStack>
                <FormControl mb="2">
                  <FormControl.Label>Date</FormControl.Label>
                  <Input
                    placeholder="Date"
                    onChangeText={value =>
                      setNewOldExpense({...newOldExpense, date: value})
                    }
                  />
                </FormControl>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="gray.500">Divide between</Text>
                  <Button bg="dark.50" size="xs" onPress={() => openMemberModal('divideWith')}>Show Members</Button>
                </HStack>
                <HStack space="2" mt="2" flexWrap="wrap">
                    {newOldExpense?.members?.map((member: string) => {
                      return (
                        <Badge variant="outline" key={member}>
                          {member}
                        </Badge>
                      );
                    })}
                </HStack>
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
                <Button bg="dark.50" onPress={validate}>
                  Add Expense
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal size="sm" isOpen={showMemberModal} onClose={() => setShowMemberModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Select Member</Modal.Header>
            <Modal.Body>
                {
                    addMemberFor === 'spentBy' && 
                    <Radio.Group name="spentBy" value={newOldExpense.spentBy}
                      onChange={value =>
                        setNewOldExpense({...newOldExpense, spentBy: value})
                      }>
                        {["deep",'kunal','piu'].map((member:string) => <Radio value={member} my="1" key={member}>{member}</Radio>)}
                    </Radio.Group>
                }
                {
                    addMemberFor === 'divideWith' && 
                    <VStack>
                      <Checkbox.Group defaultValue={newOldExpense.members} onChange={values => {
                          setNewOldExpense({...newOldExpense, members: values || []});
                        }}>
                        {["deep",'kunal'].map((member:string) => 
                          <Checkbox value={member}  my="1" key={member}>{member}</Checkbox>
                        )}
                      </Checkbox.Group>
                    </VStack>
                }
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  bg="dark.500"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowMemberModal(false);
                  }}>
                  Cancel
                </Button>
                <Button bg="dark.50" onPress={() => setShowMemberModal(false)}>Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* delete modal */}
        <Modal size="md" isOpen={showDeleterModal} onClose={() => setShowDeleterModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Delete</Modal.Header>
            <Modal.Body>
              <Text>Do you really want to delete this {deleteModalType}?</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  bg="dark.500"
                  onPress={() => {
                    setShowDeleterModal(false);
                  }}>
                  Cancel
                </Button>
                <Button bg="dark.50" onPress={() => setShowDeleterModal(false)}>Delete</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Overview;
