import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';

import SetupText from '../components/ManualScreen/SetupText';
import SetupTextDouble from '../components/ManualScreen/SetupTextDouble';
import SetupSwitch from '../components/ManualScreen/SetupSwitch';
import BtnSave from '../components/ManualScreen/BtnSave';

import NavComponent from '../components/NavComponent';
import Footer from '../components/Footer';

import { client } from '../shared/mqtt';
import { Message } from 'react-native-paho-mqtt';

export default class ManualScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ph_min: "",
      ph_max: "",
      ec_min: "",
      ec_max: "",
      on: "",
      off: "",
      spray_outside: false
    }
  }

  sendCloud = ({ ph_min, ph_max, ec_min, ec_max, on, off, spray_outside }) => {
    const dataBuffer = JSON.stringify({
      ph_min: parseFloat(ph_min),
      ph_max: parseFloat(ph_max),
      ec_min: parseFloat(ec_min),
      ec_max: parseFloat(ec_max),
      on: parseFloat(on),
      off: parseFloat(off),
      spray_outside
    });
    const message = new Message(dataBuffer);
    message.destinationName = 'FWpfOR6wyKZIoYj';
    client.send(message);

    AsyncStorage.setItem('mode', JSON.stringify({ mode: 2 }));
  }

  render() {
    let { ph_min, ph_max, ec_min, ec_max, on, off, spray_outside } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <NavComponent onPress={(route) => this.props.navigation.navigate(route)} />
          <SetupText title="Set pH" type="ph" value={{ min: ph_min, max: ph_max }} onChangeText={({ type, value }) => this.setState({ [type]: value })} />
          <SetupText title="Set EC" type="ec" value={{ min: ec_min, max: ec_max }} onChangeText={({ type, value }) => this.setState({ [type]: value })} />
          <SetupTextDouble value={{ on: on, off: off }} onChangeText={({ type, value }) => this.setState({ [type]: value })} />
          <SetupSwitch value={spray_outside} onValueChange={({ type, value }) => this.setState({ [type]: value })} />
          <BtnSave onPress={() => this.sendCloud(this.state)} />
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Expo.Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapStyle: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    width: '100%'
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'cereal-medium',
    color: '#9e9e9e',
    textAlign: 'center'
  }
});
