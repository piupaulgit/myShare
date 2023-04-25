import React, {useEffect, useState} from 'react';
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
  Radio,
  ScrollView,
  Select,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {IEvent, IExpense} from '../../interfaces/interfaces';

interface IErrorMessage {
  titleErrorMessage: string;
  valueErrorMessage: string;
  spentByErrorMessage: string;
  dateErrorMessage: string;
  splitBetweenErrorMessage: string;
}

const Overview = (props: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [singleEvent, setSingleEvent] = useState<IEvent>(props.singleEventData);
  const [showMemberModal, setShowMemberModal] = useState<boolean>(false);
  const [showEditEventModal, setShowEditEventModal] = useState<boolean>(false);
  const [showDeleterModal, setShowDeleterModal] = useState<boolean>(false);
  const [addMemberFor, setAddMemberFor] = useState<string>('spentBy');
  const [deleteModalType, setDeleteModalType] = useState<string>('');
  const [addEditExpenseError, setAddEditExpenseError] =
    useState<IErrorMessage>(Object);

  const [newOldExpense, setNewOldExpense] = useState<IExpense>({
    title: '',
    value: '',
    spentBy: '',
    splitBetween: props.singleEventData.members,
    date: props.singleEventData.date,
    status: props.singleEventData.status,
  });

  const openMemberModal = (modalType: string) => {
    setAddMemberFor(modalType);
    setShowMemberModal(true);
  };

  const validate = () => {
    setAddEditExpenseError({
      titleErrorMessage: '',
      valueErrorMessage: '',
      spentByErrorMessage: '',
      dateErrorMessage: '',
      splitBetweenErrorMessage: '',
    });

    let [
      titleMessage,
      valueMessage,
      spentByMessage,
      dateMessage,
      splitBetweenMessage,
    ] = ['', '', '', '', ''];

    if (!newOldExpense.title) {
      titleMessage = 'Please Provide title for expense';
    }
    if (!newOldExpense.value) {
      valueMessage = 'Please Provide value for expense';
    }
    if (!newOldExpense.spentBy) {
      spentByMessage = 'Please select member';
    }
    if (!newOldExpense.date) {
      dateMessage = 'Please provide date';
    }
    if (newOldExpense.splitBetween.length === 0) {
      splitBetweenMessage = 'Please select at least on member';
    }

    setAddEditExpenseError({
      titleErrorMessage: titleMessage,
      valueErrorMessage: valueMessage,
      spentByErrorMessage: spentByMessage,
      dateErrorMessage: dateMessage,
      splitBetweenErrorMessage: splitBetweenMessage,
    });
  };

  const openEditExpenseModal = (selectedExpense: any) => {
    setShowModal(true);
    setNewOldExpense(selectedExpense);
    console.log(newOldExpense);
  };

  const openDeleteModal = (modalType: string) => {
    setShowDeleterModal(true);
    setDeleteModalType(modalType);
  };

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
                {singleEvent.title}
              </Text>
              <Badge variant="outline">{singleEvent.status}</Badge>
            </HStack>
            <Text fontSize="xs">Date: {singleEvent.date}</Text>
            <Text fontSize="xs" mb="3">
              Created By: {singleEvent.createdBy}
            </Text>
            <Text color="gray.600" fontSize="sm">
              {singleEvent.description}
            </Text>
            <HStack mt="3" flexWrap="wrap" space={2}>
              {singleEvent.members.length > 0 &&
                singleEvent.members.map(member => (
                  <Badge variant="outline" mb="2" key={member}>
                    {member}
                  </Badge>
                ))}
            </HStack>
            <HStack space="3" mt="2">
              <Button
                flex="1"
                bg="dark.300"
                onPress={() => setShowEditEventModal(true)}>
                Edit Event
              </Button>
              <Button
                flex="1"
                bg="dark.500"
                onPress={() => openDeleteModal('event')}>
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
                data={singleEvent.expenses}
                keyExtractor={item => item.title}
                renderItem={({item}) => (
                  <Box bg="white" borderRadius="4" px="4" py="2" mb="2">
                    <HStack justifyContent="space-between" flexWrap="wrap">
                      <Text>{item.title}</Text>
                      <Text>{item.value}</Text>
                    </HStack>
                    <Text fontSize="xs" mb="4">
                      Spent by: {item.spentBy} ({item.date})
                    </Text>
                    <Divider />
                    <HStack justifyContent="space-between">
                      <HStack space="2" mt="2">
                        {item?.splitBetween?.map((member: string) => {
                          return (
                            <Badge variant="outline" key={member}>
                              {member}
                            </Badge>
                          );
                        })}
                      </HStack>
                      <HStack space="2" mt="2">
                        <Button
                          bg="dark.300"
                          py="1"
                          onPress={() => openEditExpenseModal(item)}>
                          Edit
                        </Button>
                        <Button
                          bg="dark.500"
                          py="1"
                          onPress={() => openDeleteModal('expense')}>
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
                  <FormControl.Label>Title</FormControl.Label>
                  <Input
                    placeholder="Title"
                    value={newOldExpense.title}
                    onChangeText={value =>
                      setNewOldExpense({...newOldExpense, title: value})
                    }
                  />
                  {addEditExpenseError?.titleErrorMessage?.length > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      {addEditExpenseError.titleErrorMessage}
                    </Text>
                  )}
                </FormControl>
                <FormControl mb="2">
                  <FormControl.Label>Value</FormControl.Label>
                  <Input
                    placeholder="Value"
                    value={newOldExpense.value}
                    onChangeText={val =>
                      setNewOldExpense({...newOldExpense, value: val})
                    }
                  />
                  {addEditExpenseError?.valueErrorMessage?.length > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      {addEditExpenseError.valueErrorMessage}
                    </Text>
                  )}
                </FormControl>
                <VStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space="2" alignItems="center">
                    <Text color="gray.500">Spent by: </Text>
                    {newOldExpense.spentBy ? (
                      <>
                        <Badge variant="outline">{newOldExpense.spentBy}</Badge>
                        <Button
                          bg="dark.50"
                          size="xs"
                          onPress={() => openMemberModal('spentBy')}>
                          Show Members
                        </Button>
                      </>
                    ) : (
                      <Button
                        bg="dark.50"
                        size="xs"
                        onPress={() => openMemberModal('spentBy')}>
                        Show Members
                      </Button>
                    )}
                  </HStack>
                  </HStack>
                  {addEditExpenseError?.spentByErrorMessage?.length > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      {addEditExpenseError.spentByErrorMessage}
                    </Text>
                  )}
                </VStack>
                <FormControl mb="2">
                  <FormControl.Label>Date</FormControl.Label>
                  <Input
                    placeholder="Date"
                    value={singleEvent.date}
                    onChangeText={value =>
                      setNewOldExpense({...newOldExpense, date: value})
                    }
                  />
                  {addEditExpenseError?.dateErrorMessage?.length > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      {addEditExpenseError.dateErrorMessage}
                    </Text>
                  )}
                </FormControl>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="gray.500">Split between</Text>
                  <Button
                    bg="dark.50"
                    size="xs"
                    onPress={() => openMemberModal('divideWith')}>
                    Add/Remove Members
                  </Button>
                </HStack>
                <HStack space="2" mt="2" flexWrap="wrap">
                  {newOldExpense?.splitBetween?.map((member: string) => {
                    return (
                      <Badge variant="outline" key={member}>
                        {member}
                      </Badge>
                    );
                  })}
                </HStack>
                {addEditExpenseError?.splitBetweenErrorMessage?.length > 0 && (
                  <Text fontSize="xs" color="gray.500">
                    {addEditExpenseError.splitBetweenErrorMessage}
                  </Text>
                )}
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

        <Modal
          size="sm"
          isOpen={showMemberModal}
          onClose={() => setShowMemberModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Select Member</Modal.Header>
            <Modal.Body>
              {addMemberFor === 'spentBy' && (
                <Radio.Group
                  name="spentBy"
                  value={newOldExpense.spentBy}
                  onChange={value =>
                    setNewOldExpense({...newOldExpense, spentBy: value})
                  }>
                  {singleEvent?.members?.map((member: string) => (
                    <Radio value={member} my="1" key={member}>
                      {member}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
              {addMemberFor === 'divideWith' && (
                <VStack>
                  <Checkbox.Group
                    defaultValue={newOldExpense.splitBetween}
                    onChange={values => {
                      setNewOldExpense({
                        ...newOldExpense,
                        splitBetween: values || [],
                      });
                    }}>
                    {singleEvent?.members?.map((member: string) => (
                      <Checkbox value={member} my="1" key={member}>
                        {member}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </VStack>
              )}
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
                <Button bg="dark.50" onPress={() => setShowMemberModal(false)}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* delete modal */}
        <Modal
          size="md"
          isOpen={showDeleterModal}
          onClose={() => setShowDeleterModal(false)}>
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
                <Button bg="dark.50" onPress={() => setShowDeleterModal(false)}>
                  Delete
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* edit event modal */}

        <Modal
          size="xl"
          isOpen={showEditEventModal}
          onClose={() => setShowEditEventModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Create a new event</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <FormControl mb="2">
                  <FormControl.Label>Title</FormControl.Label>
                  <Input placeholder="Title" />
                  {/* {errorMessages?.titleErrorMessage?.length > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      {errorMessages.titleErrorMessage}
                    </Text>
                  )} */}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Description</FormControl.Label>
                  <TextArea
                    h={20}
                    placeholder="Description"
                    w="100%"
                    autoCompleteType={true}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Status</FormControl.Label>
                  <Select minWidth="200" placeholder="Status">
                    <Select.Item label="Open" value="open" />
                    <Select.Item label="Close" value="close" />
                  </Select>
                </FormControl>
                <FormControl mt="2">
                  <FormControl.Label>Members</FormControl.Label>
                  {/* {newEvent?.members?.length > 0 && (
                    <>
                      <Text fontSize="xs" color="gray.800" mb="1">
                        Tap on the memeber name to remove
                      </Text>
                      <HStack space="2" mb="2">
                        {newEvent?.members?.map(
                          (member: string, index: number) => {
                            return (
                              <Pressable
                                key={index}
                                onPress={() => removeThisMember(index)}>
                                <Badge variant="outline">{member}</Badge>
                              </Pressable>
                            );
                          },
                        )}
                      </HStack>
                    </>
                  )} */}
                  <HStack space={2}>
                    <Input flex="1" placeholder="Members" />
                    <Button bg="dark.50" py="2">
                      Add
                    </Button>
                  </HStack>
                  {/* {errorMessages?.membersErrorMessage?.length > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      {errorMessages.membersErrorMessage}
                    </Text>
                  )} */}
                </FormControl>
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  bg="dark.500"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowEditEventModal(false);
                  }}>
                  Cancel
                </Button>
                <Button bg="dark.50" onPress={validate}>
                  Add this event
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Overview;
