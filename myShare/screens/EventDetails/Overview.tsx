import React, {useContext, useEffect, useState} from 'react';
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
  Select,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {IEvent, IExpense} from '../../interfaces/interfaces';
import {AuthContext} from '../../navigation/AuthProvider';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {FirebaseDB} from '../../firebaseConfig';

interface IErrorMessage {
  titleErrorMessage: string;
  valueErrorMessage: string;
  spentByErrorMessage: string;
  dateErrorMessage: string;
  splitBetweenErrorMessage: string;
}

interface IErrorMessageForEditEvent {
  titleErrorMessage: string;
  membersErrorMessage: string;
}

const Overview = (props: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newMemberName, setNewMemberName] = useState<string>('');
  const [singleEvent, setSingleEvent] = useState<IEvent>(props.singleEventData);
  const [showMemberModal, setShowMemberModal] = useState<boolean>(false);
  const [showEditEventModal, setShowEditEventModal] = useState<boolean>(false);
  const [showDeleterModal, setShowDeleterModal] = useState<boolean>(false);
  const [addMemberFor, setAddMemberFor] = useState<string>('spentBy');
  const [deleteModalType, setDeleteModalType] = useState<string>('');
  const {showToaster} = useContext(AuthContext);
  const [addEditExpenseError, setAddEditExpenseError] =
    useState<IErrorMessage>(Object);
  const [eventForEdit, setEventForEdit] = useState<any>(Object);

  const [newOldExpense, setNewOldExpense] = useState<IExpense>({
    title: '',
    value: 0,
    spentBy: '',
    splitBetween: props.singleEventData.members,
    date: props.singleEventData.date,
    status: props.singleEventData.status,
  });

  const [errorMessagesForEditEvent, setErrorMessagesForEditEvent] =
    useState<IErrorMessageForEditEvent>(Object);
  const [loader, setLoader] = useState<boolean>(false);
  const [activeExpenseIndex, setActiveExpenseIndex] = useState<any>()
  const [expenseActionType,setExpenseActionType] = useState<string>('add')

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
    setExpenseActionType('edit')
  };

  const openDeleteModal = (modalType: string) => {
    setShowDeleterModal(true);
    setDeleteModalType(modalType);
  };

  const addThisMember = () => {
    const ifAlreadyAdded = eventForEdit.members.filter(
      (member: string) => member === newMemberName,
    );
    ifAlreadyAdded.length
      ? showToaster('Member already added')
      : setEventForEdit({
          ...eventForEdit,
          members: [...eventForEdit.members, newMemberName],
        });
    setNewMemberName('');
  };

  const validateEvent = () => {
    setErrorMessagesForEditEvent({
      titleErrorMessage: '',
      membersErrorMessage: '',
    });

    let [titleMessage, membersMessage] = ['', '', ''];

    // for title
    if (!eventForEdit.title) {
      titleMessage = 'Please Provide title for your event';
    }

    // for members
    if (eventForEdit.members.length === 0) {
      membersMessage = 'Please add at least one member';
    }

    setErrorMessagesForEditEvent({
      titleErrorMessage: titleMessage,
      membersErrorMessage: membersMessage,
    });
  };

  useEffect(() => {
    if (
      errorMessagesForEditEvent.titleErrorMessage === '' &&
      errorMessagesForEditEvent.membersErrorMessage === ''
    ) {
      editThisEvent(singleEvent.id);
    }
  }, [errorMessagesForEditEvent]);

  const editThisEvent = async (eventId: any) => {
    try {
      setLoader(true);
      const updatedEvent = doc(FirebaseDB, 'events', eventId);
      await updateDoc(updatedEvent, eventForEdit).then(res => {
        showToaster('Event updated successfully');
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
      setShowEditEventModal(false);
      setSingleEvent(eventForEdit);
    }
  };

  const removeThisMember = (index: number) => {
    const eventMembers = [...eventForEdit.members];
    eventMembers.splice(index, 1);
    setEventForEdit({...eventForEdit, members: eventMembers});
  };

  const calculateAllTypeOfExpenses = () => {
    let totalExpense = 0;
    singleEvent.expenses.forEach((expense: IExpense) => {
      totalExpense = totalExpense + Number(expense.value);
    });
    console.warn(totalExpense);
  };

  const deleteEvent = async (id: any) => {
    setLoader(true);
    try {
      await deleteDoc(doc(FirebaseDB, 'events', id))
        .then(res => {
          showToaster('Event deleted successfully');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setShowDeleterModal(false);
      props.props.navigation.navigate('Home');
    }
  };

  const addExpense = async(eventId:any) => {
    const newTotalExpenseAmount = singleEvent.totalExpense+newOldExpense.value;
    const expenseDoc = doc(FirebaseDB, "events", eventId);
    try{
      setLoader(true)
      await updateDoc(expenseDoc, {expenses: [...singleEvent.expenses,newOldExpense], totalExpense: newTotalExpenseAmount}).then(res => {
        showToaster("EventAdded Successfully")
        setSingleEvent({...singleEvent, expenses: [...singleEvent.expenses, newOldExpense], totalExpense: newTotalExpenseAmount});
      })
    }catch(e){
      console.log(e)
    }finally{
      setLoader(false)
      setShowModal(false)
    }
  };

  const deleteExpense = async(eventId:any) => {
    const newTotalExpenseAmount = singleEvent.totalExpense - singleEvent.expenses[activeExpenseIndex].value;
    const expenseDoc = doc(FirebaseDB, "events", eventId);
    try{
      setLoader(true)
      singleEvent.expenses.splice(activeExpenseIndex, 1)
      await updateDoc(expenseDoc, {expenses: singleEvent.expenses, totalExpense: newTotalExpenseAmount}).then(res => {
        showToaster("EventAdded Successfully")
        setSingleEvent({...singleEvent, expenses: singleEvent.expenses, totalExpense: newTotalExpenseAmount});
      })
    }catch(e){
      console.log(e)
    }finally{
      setLoader(false)
      setShowDeleterModal(false)
    }
    
  }

  const editExpense = async(eventId:any) => {
    const newTotalExpenseAmount = (singleEvent.totalExpense-Number(singleEvent.expenses[activeExpenseIndex].value))+newOldExpense.value;
    singleEvent.expenses.splice(activeExpenseIndex,1,newOldExpense)
    const expenseDoc = doc(FirebaseDB, "events", eventId);
    try{
      setLoader(true)
      await updateDoc(expenseDoc, {expenses: singleEvent.expenses, totalExpense: newTotalExpenseAmount}).then(res => {
        showToaster("EventAdded Successfully")
        setSingleEvent({...singleEvent, expenses: singleEvent.expenses, totalExpense: newTotalExpenseAmount});
      })
    }catch(e){
      console.log(e)
    }finally{
      setLoader(false)
      setShowModal(false)
    }
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
                singleEvent.members.map((member, index) => (
                  <Badge variant="outline" mb="2" key={index}>
                    {member}
                  </Badge>
                ))}
            </HStack>
            <HStack space="3" mt="2">
              <Button
                flex="1"
                bg="dark.300"
                onPress={() => {
                  setEventForEdit(singleEvent), setShowEditEventModal(true);
                }}>
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
                  onPress={() => {setShowModal(true), setExpenseActionType('add')}}>
                  Add expenses
                </Button>
              </HStack>

              {(!singleEvent.expenses || singleEvent.expenses?.length) === 0 ? (
                <Text>
                  No expense added till now. Please add one to get calculation
                  started
                </Text>
              ) : (
                <>
                  <FlatList
                    mt="3"
                    data={singleEvent.expenses}
                    keyExtractor={item => item.title}
                    renderItem={({item,index}) => (
                      <Box bg="white" borderRadius="4" px="4" py="2" mb="2">
                        <HStack justifyContent="space-between" flexWrap="wrap">
                          <Text>{item.title}</Text>
                          <Text>{item.value}</Text>
                        </HStack>
                        <Text fontSize="xs" mb="4">
                          Spent by: {item.spentBy} ({item.date})
                        </Text>
                        <Divider />
                        <HStack justifyContent="space-between" flexWrap="wrap">
                          <HStack space="2" mt="2" flexWrap="wrap" maxW="60%">
                            {item?.splitBetween?.map((member: string, index:number) => {
                              return (
                                <Badge variant="outline" key={index} mb="1">
                                  {member}
                                </Badge>
                              );
                            })}
                          </HStack>
                          <HStack space="2" mt="2" maxW="40%">
                            <Button
                              bg="dark.300"
                              py="1"
                              alignSelf="flex-start"
                              onPress={() => {openEditExpenseModal(item), setActiveExpenseIndex(index)}}>
                              Edit
                            </Button>
                            <Button
                              bg="dark.500"
                              alignSelf="flex-start"
                              py="1"
                              onPress={() => {openDeleteModal('expense'), setActiveExpenseIndex(index)}}>
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
                    <Text>{singleEvent.totalExpense}</Text>
                  </HStack>
                </>
              )}
            </VStack>
          </Box>
        </Stack>

        {/* add expense modal */}
        <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              {expenseActionType === 'add' ? 'Add new expense' : 'Edit'}
            </Modal.Header>
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
                    value={newOldExpense.value.toString()}
                    onChangeText={val =>
                      setNewOldExpense({...newOldExpense, value: Number(val)})
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
                      <VStack>
                      <Text color="gray.500" mb="1">Spent by: </Text>
                      <HStack flex="1">
                        <Select
                          minWidth="305"
                          placeholder="Select"
                          onValueChange={itemValue =>
                            setNewOldExpense({
                              ...newOldExpense,
                              spentBy: itemValue,
                            })
                          }
                          selectedValue={newOldExpense.spentBy}>
                          {singleEvent?.members?.map((member: string,index:number) => (
                            <Select.Item label={member} value={member} key={index} />
                          ))}
                        </Select>
                      </HStack>
                      </VStack>
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
                    value={newOldExpense.date}
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
                  {newOldExpense?.splitBetween?.map((member: string, index:number) => {
                    return (
                      <Badge variant="outline" key={index}>
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
                {
                  expenseActionType === 'add' ? <Button isLoading={loader} bg="dark.50" onPress={() => addExpense(singleEvent.id)}>
                  Add Expense
                </Button> :
                <Button isLoading={loader} bg="dark.50" onPress={() => editExpense(singleEvent.id)}>
                Edit Expense
              </Button>
                }
                
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
                {
                  deleteModalType === 'event' ? <Button
                  isLoading={loader}
                  bg="dark.50"
                  onPress={() => deleteEvent(singleEvent.id)}>
                  Delete
                </Button>
                :
                <Button
                  isLoading={loader}
                  bg="dark.50"
                  onPress={() => deleteExpense(singleEvent.id)}>
                  Delete
                </Button>
                }
                
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
            <Modal.Header>Edit event</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <FormControl mb="2">
                  <FormControl.Label>Title</FormControl.Label>
                  <Input
                    placeholder="Title"
                    value={eventForEdit.title}
                    onChangeText={(val: string) =>
                      setEventForEdit({...eventForEdit, title: val})
                    }
                  />
                  {errorMessagesForEditEvent?.titleErrorMessage?.length > 0 && (
                    <Text fontSize="xs" color="gray.500">
                      {errorMessagesForEditEvent.titleErrorMessage}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Description</FormControl.Label>
                  <Input
                    placeholder="Description"
                    value={eventForEdit.description}
                    onChangeText={value =>
                      setEventForEdit({...eventForEdit, description: value})
                    }
                    style={{height: 50}}
                    mb="2"
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Status</FormControl.Label>
                  <Select
                    minWidth="200"
                    placeholder="Status"
                    onValueChange={itemValue =>
                      setEventForEdit({...eventForEdit, status: itemValue})
                    }
                    selectedValue={eventForEdit.status}>
                    <Select.Item label="Open" value="open" />
                    <Select.Item label="Close" value="close" />
                  </Select>
                </FormControl>
                <FormControl mt="2">
                  <FormControl.Label>Members</FormControl.Label>
                  <Text fontSize="xs" color="gray.800" mb="1">
                    Tap on the memeber name to remove
                  </Text>
                  <HStack space="2" mb="2" flexWrap="wrap">
                    {eventForEdit?.members?.map(
                      (member: string, index: number) => {
                        return (
                          <Pressable
                            key={index}
                            onPress={() => removeThisMember(index)}>
                            <Badge variant="outline" mb="2">
                              {member}
                            </Badge>
                          </Pressable>
                        );
                      },
                    )}
                  </HStack>
                  <HStack space={2}>
                    <Input
                      flex="1"
                      placeholder="Members"
                      value={newMemberName}
                      onChangeText={value => setNewMemberName(value)}
                    />
                    <Button
                      bg="dark.50"
                      onPress={addThisMember}
                      py="2"
                      isDisabled={!newMemberName}>
                      Add
                    </Button>
                  </HStack>
                  {errorMessagesForEditEvent?.membersErrorMessage?.length >
                    0 && (
                    <Text fontSize="xs" color="gray.500">
                      {errorMessagesForEditEvent.membersErrorMessage}
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
                    setShowEditEventModal(false);
                  }}>
                  Cancel
                </Button>
                <Button bg="dark.50" onPress={validateEvent} isLoading={loader}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* add expense memeber modal */}
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
                <Button bg="dark.50" onPress={() => setShowMemberModal(false)}>
                  Done
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
