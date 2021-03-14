// import React from 'react'
// import { TouchableOpacity, Text } from 'react-native';
// import { Actions } from 'react-native-router-flux';

// const Home = () => {
//    const goToAbout = () => {
//       Actions.about()
//    }
//    return (
//       <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
//          <Text>This is HOME!</Text>
//       </TouchableOpacity>


//    )
// }
// export default Home


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from "axios"
//import Storage from 'react-native-storage';
//var ls = require('react-native-local-storage');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

var urlbackend = require('../env/env')();



// var storage = new Storage({
//   // maximum capacity, default 1000 
//   size: 1000,

//   // Use AsyncStorage for RN, or window.localStorage for web.
//   // If not set, data would be lost after reload.
//   storageBackend: AsyncStorage,

//   // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
//   // can be null, which means never expire.
//   defaultExpires: 1000 * 3600 * 24,

//   // cache data in the memory. default is true.
//   enableCache: true,

//   // if data was not found in storage or expired,
//   // the corresponding sync method will be invoked and return 
//   // the latest data.
//   sync : {
//       // we'll talk about the details later.
//   }
// })	

export default class Home extends Component {

  constructor(props) {
    super(props);
    state = {
      username: "",
      password: "",
      driver: [],
      Journey: [],
      loading: true
    }
  }
  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        console.log("here", value)
      }
    } catch (e) {
      // error reading value
    }
  }


  componentDidMount() {
    this.setState({ username: "" });
    this.setState({ password: "" });
    this.setState({ loading: false });

    //ls.clear()

    // axios
    // .get("http://192.168.1.134:3000/users/list")
    // .then((response) => response.data)
    // .then((data) => {
    //   this.setState({ driver: data.filter(drivers => drivers.descriminator !== "REGUSER") });
    //   // console.log(data.filter(drivers => drivers.descriminator != "REGUSER"));
    //   console.log(data)
    // });

    // axios
    //   .get("http://192.168.1.134:3000/journey/list")
    //   .then((response) => response.data)
    //   .then((data) => {
    //     this.setState({ Journey: data.content });
    //     console.log(data);
    //   });
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }
  goToAbout = () => {
    Actions.Home()
  }
  login() {

    if (this.state.username) {
      this.setState({ loading: true })
      console.log(this.state.username, this.state.password)



      axios.post(urlbackend,
        { username: this.state.username, password: this.state.password }).then((response) => {
          if (response.data) {
            this.getData(response.data.token)
            this.storeData(response.data.token)
            this.setState({ loading: false })

            this.goToAbout()
            //  reactLocalStorage.setObject('token', response.data.accessToken);
            // window.location.href= "/datta-able/react/default/dashboard/default"
            // console.log(settoken())
            // console.log(response.data.accessToken)
            //   console.log(typeof response.data.accessToken)
            //   storage.save({
            //     key: 'loginState',   // Note: Do not use underscore("_") in key!
            //     data: response.data.accessToken,

            //     // if not specified, the defaultExpires will be applied instead.
            //     // if set to null, then it will never expire.
            //     expires: 1000 * 3600
            // });
            // AsyncStorage.setItem("token",response.data.accessToken)
            // console.log(ls.save('token', response.data.accessToken))
            // ls('foo', 'bar');
            // ls.save('name', 'Kobe Bryant');
            //  ls.save('token', response.data.accessToken).then(()=>{
            //   this.goToAbout()
            //  })

            //  this.goToAbout()
          } else {
            alert("please check login")
            // window.location.href= "/datta-able/react/default/auth/signin-1"

          }
          // console.log(response.data)



        }).catch((err) => {
          // window.location.href= "/datta-able/react/default/"
          this.setState({ loading: false })

          alert(err.response.data.notice)
          console.log(err.response.data.notice)



        })

    } else {
      alert("please enter your username and password")
    }
  }

  gettoken() {
    this.getData()
    //   ls.get('token').then((data) => {console.log("get: ", data)});
    //console.log(AsyncStorage.getItem("access_token"))
    //console.log(ls.get("name"))
    // storage.load({
    //   key: 'loginState',

    //   // autoSync(default true) means if data not found or expired,
    //   // then invoke the corresponding sync method
    //   autoSync: true,

    //   // syncInBackground(default true) means if data expired,
    //   // return the outdated data first while invoke the sync method.
    //   // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
    //   syncInBackground: true,

    //   // you can pass extra params to sync method
    //   // see sync example below for example
    //   syncParams: {
    //     extraFetchOptions: {
    //       // blahblah
    //     },
    //     someFlag: true,
    //   },
    // }).then(ret => {
    //   // found data go to then()
    //   console.log(ret);
    // })
  }

  render() {
    const options = [{ value: 0, label: '0' }, { value: 1, label: '1' }, { value: 2, label: '2' }]
    return (
      <View style={styles.container}>

        {/* <Image source={require('./itesla.jpeg')}
          style={{ width: '80%', height: "50%", borderRadius: 30,  }} />
        <View></View> */}
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state ? this.state.loading : false}
          //Text with the Spinner 
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
            placeholder="Username"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.setState({ username })} />
          <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })} />
          <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
        </View>

        <TouchableOpacity style={styles.btnForgotPassword} onPress={() => this.onClickListener('restore_password')}>
          <Text style={styles.btnText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.gettoken()}>
          <Text style={styles.loginText}>Barcode</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  Actions.Home()()}>
          <Text style={styles.loginText}>hello</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.goToAbout()}>
          <Text style={styles.loginText}>Qrcode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.goToAbout()}>
          <Text style={styles.loginText}>Barcode</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: 580,
    height: 400,
    justifyContent: 'center',
  },
  btnText: {
    color: "white",
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    resizeMode,
    justifyContent: "center",
  },
});

