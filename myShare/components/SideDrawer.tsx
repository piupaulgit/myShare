import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

function SideDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

export default SideDrawer;