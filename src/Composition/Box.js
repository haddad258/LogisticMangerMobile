import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios"
import { Actions } from 'react-native-router-flux';

export default class Boxes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      loading: false
    };
  }
  Displaylist() {
    AsyncStorage.getItem('@storage_Key').then((data) => {
      console.log('Bearer ' + data)

      const config = {

        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data }
      };

      this.setState({ loading: true })


      axios.get("http://dev.hivetracker.io/api/mobile/boxes/index", config)
        .then(response => {
          console.log("this respon list", response.data)
          // this.props.navigation.navigate('Grids', {"item":this.props.route.params.article})
          this.setState({ boxes: response.data })
          this.setState({ loading: false })

          // alert(response.data.id)
        })
        .catch(e => {
          console.log(e.response.data)
        })

    })
  }
  componentDidMount() {
    // AsyncStorage.getItem('@storage_Key').then((data) => {
    //   console.log('Bearer ' + data)

    //   const config = {

    //     headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data }
    //   };




    //   axios.get("http://dev.hivetracker.io/api/mobile/boxes/index", config)
    //     .then(response => {
    //       console.log("this respon list", response.data)
    //       // this.props.navigation.navigate('Grids', {"item":this.props.route.params.article})
    //       this.setState({ boxes: response.data })
    //       this.setState({ loading: false })

    //       // alert(response.data.id)
    //     })
    //     .catch(e => {
    //       console.log(e.response.data)
    //     })

    // })



  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity key={item.id}>
        <View key={item.id} style={styles.row}>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} >{item.serial_number}</Text>
              <Text style={styles.mblTxt} numberOfLines={1} ellipsizeMode="tail">show beecons</Text>

              {/* <Text style={styles.mblTxt}>Mobile</Text> */}
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.mblTxt}>{item.batch_number}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        {/* <View style={styles.loading}>
          <ActivityIndicator/>
          </View> */}


        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.loading}
          //Text with the Spinner 
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{ flexDirection: "row", marginLeft: 20, marginRight: 20 }}>
          <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={() => this.Displaylist()}>
            <Text style={styles.buttonText}>all boxes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={() => this.props.navigation.navigate("Camera",{entity:"Boxes"})}>
            <Text style={styles.buttonText}>Scan Qrcode</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={() => console.log("hello")}>
          <Text style={styles.followButtonText}>All</Text>
        </TouchableOpacity> */}
        </View>
        <FlatList
          extraData={this.state}
          data={this.state.boxes}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
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
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  buttonText: {
    color: '#EE82EE',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
    margin:2
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#001133',
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: "#FFFFFF",
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
