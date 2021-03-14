import React, {Component} from 'react';
    import {StyleSheet, Text, View } from 'react-native';
    import { RNCamera } from 'react-native-camera-tflite';
    import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

    let _currentInstant = 0;

    export default class Camera extends Component {
      constructor(props) {
        super(props);
        this.state = {
          time: 0,
          output: ""
        };
      }
      componentDidMount(){
          // if(this.props){
          //   console.log(this.props.route.params.entity)

          // }else{
          //     console.log("therisno")
          // }
      }
      shouldComponentUpdate(nextProps, nextState) {
        console.log("dismoun")

        return true;
      }
      componentDidUpdate(prevProps ,nextState){
        console.log(prevProps)


      }
      componentWillUnmount(){
        this.componentDidMount()
        console.log("helloherre")
        console.log(this.props.route.params.entity)
      }
    processOutput({data}) {
        const probs = _.map(data, item => _.round(item/255.0, 0.02));
        const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc').map(item => [_.round(item[0]/255.0, 2), item[1]]).value();
        const outputData = _.chain(orderedData).take(3).map(item => `${item[1]}: ${item[0]}`).join('\n').value();
        const time = Date.now() - (_currentInstant || Date.now());
        const output = `Guesses:\n${outputData}\nTime:${time} ms`;
        this.setState(state => ({
          output
        }));
        _currentInstant = Date.now();
      }
      
      render() {
        const modelParams = {
          file: "mobilenet_v1_1.0_224_quant.tflite",
          inputDimX: 224,
          inputDimY: 224,
          outputDim: 1001,
          freqms: 0
        };
        return (
          <View style={{ flex: 1 }}>
            <RNCamera
           // onCameraReady={()=>this.camera.resumePreview()}
                ref={ref => {
                    this.camera = ref;
                  }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
              //  onModelProcessed={data => this.processOutput(data)}
               // modelParams={modelParams}
               onBarCodeRead={data=>{
                //this.camera.pausePreview();   
                console.log('heeood')
                this.props.navigation.navigate("Pallets")
              return ;}}
            >
              <Text style={styles.cameraText}>{this.state.output}</Text>
            </RNCamera>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
      },
      preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      cameraText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
      }
    });