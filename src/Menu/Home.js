import 'react-native-gesture-handler';
import React , {Component}from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {drawerItemsMain} from './drawerItemsMain';
import CustomDrawerContent from './CustomDrawerContent.js';
import CustomHeader from './CustomHeader';
import Beecons from '../IoT/Beecons'
import Gateways from '../IoT/Gateways'
import Containers from '../Composition/Containers'
import Pallets from '../Composition/Pallets'
import Boxes from '../Composition/Box'
import Camera from '../Camera/Cameras'
import Dashboard from '../Dashbord/Dashboard'
import Products from '../Products/Products'
import Journeys from '../Journeys/Journeys'

const Drawer = createDrawerNavigator();
function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Containers" component={Containers} />
      <Drawer.Screen name="Pallets" component={Pallets} />
      <Drawer.Screen name="Boxes" component={Boxes} />
      <Drawer.Screen name="Beecons" component={Beecons} />
      <Drawer.Screen name="Gateways" component={Gateways} />
      <Drawer.Screen name="Camera" component={Camera} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Journeys" component={Journeys} />


    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

class App extends Component {
render(){
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: '#DCDCDC',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          header: (props) => {
            return <CustomHeader {...props} title='HiveTracker' />;
          },
        }}>
        <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

export default App;