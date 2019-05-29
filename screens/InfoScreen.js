import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  AsyncStorage
} from 'react-native';

import NavComponent from '../components/NavComponent';
import Footer from '../components/Footer';

import { Message } from 'react-native-paho-mqtt';
import InfoBox from '../components/InfoScreen/InfoBox';
import SwitchUI from '../components/InfoScreen/SwitchUI';
import ModeUI from '../components/InfoScreen/ModeUI';
import { mqtt, client } from '../shared/mqtt';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ph: 0,
      ec: 0,
      temp: 0,
      water: 0,
      spray: false,
      mixer: false,
      mode: 0
    }
  }

  componentDidMount() {
    mqtt.then(() => {
      console.log('onConnect');
      return client.subscribe('FWpfOR6wyKZIoYj');
    });
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    client.on('messageReceived', (message) => {
      const messageBuffer = message.payloadString;
      const data = JSON.parse(messageBuffer);
      data.hasOwnProperty('ph') ? this.setState({ ph: data.ph }) : null;
      data.hasOwnProperty('ec') ? this.setState({ ec: data.ec }) : null;
      data.hasOwnProperty('temp') ? this.setState({ temp: data.temp }) : null;
      data.hasOwnProperty('water') ? this.setState({ water: data.water }) : null;
      data.hasOwnProperty('spray') ? this.setState({ spray: data.spray }) : null;
      data.hasOwnProperty('mixer') ? this.setState({ mixer: data.mixer }) : null;
    });
    setInterval(() => {
      AsyncStorage.getItem('mode').then((value) => {
        const mode = JSON.parse(value);
        console.log(mode);
        if (mode) mode.hasOwnProperty('mode') ? this.setState({ mode: mode.mode }) : null;
      })
    }, 5000);
  }

  controlState = ({ type, value }) => {
    const state = { [type]: value };
    this.setState(state);
    const messageBuffer = JSON.stringify(state);
    const message = new Message(messageBuffer);
    message.destinationName = 'FWpfOR6wyKZIoYj';
    client.send(message);
  }

  render() {
    let { ph, ec, temp, water, spray, mixer, mode } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <NavComponent onPress={(route) => this.props.navigation.navigate(route)} />
          <InfoBox title={"pH"} value={ph} props="" />
          <InfoBox title={"Ec "} value={ec} props="(mS/cm): " />
          <InfoBox title={"Nhiệt độ"} value={temp} props="(°C): " />
          <InfoBox title={"Mực nước"} value={water} props="(%): " />
          <View style={styles.rowsAlign}>
            <SwitchUI title={"Máy phun sương"} value={spray} />
            <SwitchUI title={"Máy trộn"} value={mixer} />
            <ModeUI title={"Chế độ"} value={mode} />
          </View>
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
  rowsAlign: {
    flexDirection: 'column'
  }
});
