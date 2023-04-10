import {Box, Divider, Text, VStack} from 'native-base';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            john_doe@gmail.com
          </Text>
        </Box>
      </VStack>
    </DrawerContentScrollView>
  );
}
const SideDrawer = () => {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Inbox" component={Home} />
        <Drawer.Screen name="Outbox" component={Home} />
        <Drawer.Screen name="Favorites" component={Home} />
        <Drawer.Screen name="Archive" component={Home} />
        <Drawer.Screen name="Trash" component={Home} />
        <Drawer.Screen name="Spam" component={Home} />
      </Drawer.Navigator>
    </Box>
  );
};

export default SideDrawer;
