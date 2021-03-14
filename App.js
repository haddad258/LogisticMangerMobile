// import 'react-native-gesture-handler';
// import React , {Component}from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// import {drawerItemsMain} from './drawerItemsMain';
// import CustomDrawerContent from './CustomDrawerContent.js';
// import CustomHeader from './CustomHeader';

// const Drawer = createDrawerNavigator();
// function MainDrawerNavigation() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(props) => (
//         <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
//       )}>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Settings1" component={Settings1Screen} />
//       <Drawer.Screen name="Settings2" component={Settings2Screen} />
//     </Drawer.Navigator>
//   );
// }
// function Settings1Screen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Settings 1 Screen</Text>
//     </View>
//   );
// }

// function Settings2Screen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Settings 2 Screen</Text>
//     </View>
//   );
// }
// function HomeScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Settings Screen</Text>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// class App extends Component {
// render(){
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerMode: 'screen',
//           headerTintColor: '#404554',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//           header: (props) => {
//             return <CustomHeader {...props} title='HiveTracker' />;
//           },
//         }}>
//         <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// };
// const styles = StyleSheet.create({});

// export default App;
import React,{Component} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Routes from './src/Routes/Routes'


//export default function Dashboard() {

  export default class App extends Component {
render(){

  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <PersistGate
    //       loading={
    //         // eslint-disable-next-line react/jsx-wrap-multilines
    //         <View style={styles.container}>
    //           <ActivityIndicator color={colors.red} />
    //         </View>
    //       }
    //       persistor={persistor}
    //     >
    //       <AppView />
    //     </PersistGate>
    //   </NavigationContainer>
    // </Provider>
    <Routes />
  );

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});


// import React, { Component } from 'react';
// 

// export default class App extends Component {
//    render() {
//       return (
//          <Routes />
//       )
//    }
// }