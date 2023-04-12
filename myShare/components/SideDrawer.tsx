import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Avatar, Pressable, Text } from 'native-base';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

function SideDrawer(props:any) {
  return (
    <Drawer.Navigator screenOptions={{
      drawerPosition: 'left',
      headerLeft: () => <Pressable onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}><Avatar bg="gray.700">PP</Avatar></Pressable>,
  }}>
    <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default SideDrawer;