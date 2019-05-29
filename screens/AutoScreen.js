import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Text
} from 'react-native';
import ImageSection from '../components/AutoScreen/ImageSection';
import InfoSection from '../components/AutoScreen/InfoSection';
import ButtonSection from '../components/AutoScreen/ButtonSection';
import NavComponent from '../components/NavComponent';
import Footer from '../components/Footer';


import { client } from '../shared/mqtt';
import { Message } from 'react-native-paho-mqtt';

export default class AutoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      params: {
        name: '',
        phMin: 0,
        phMax: 0,
        ecMin: 0,
        ecMax: 0,
        image: require('../assets/images/vegetables/white.jpg'),
        description: ''
      }
    }
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      let { params } = this.props.navigation.state;
      if (params) {
        this.setState({ params: params });
        const paramsBuffer = JSON.stringify(params);
        AsyncStorage.setItem('params', paramsBuffer);
        AsyncStorage.setItem('mode', JSON.stringify({ mode: 1 }));
        this.sendCloud({
          ph_min: params.phMin,
          ph_max: params.phMax,
          ec_min: params.ecMin,
          ec_max: params.ecMax,
          on: 180,
          off: 60
        });
      }
    })
  }

  sendCloud = (data) => {
    const dataBuffer = JSON.stringify(data);
    const message = new Message(dataBuffer);
    message.destinationName = 'FWpfOR6wyKZIoYj';
    client.send(message);
  }

  componentDidMount() {
    AsyncStorage.getItem('params').then((paramsBuffer) => {
      if (paramsBuffer) {
        const params = JSON.parse(paramsBuffer);
        this.setState({ params: params })
      }
    })
  }

  processButton = (type) => {
    switch (type) {
      case 'change_tree':
        const { navigate } = this.props.navigation;
        navigate('ListTrees');
        break;
      case 'stop_system':
        this.sendCloud({ status: false })
        break;
    }
  }

  render() {
    const { name, phMin, phMax, ecMin, ecMax, image, description } = this.state.params;
    return (
      <View style={styles.container}>
        <ScrollView>
          <NavComponent onPress={(route) => this.props.navigation.navigate(route)} />
          <View style={styles.wrapShadow}>
            <View style={{ flexDirection: 'row' }}>
              <ImageSection source={image} />
              <InfoSection name={name} ph={` ${phMin} → ${phMax}`} ec={` ${ecMin} → ${ecMax}`} />
            </View>
            <View style={styles.wrapText}>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
            <ButtonSection onPress={({ type }) => this.processButton(type)} />
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
  navStyle: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'red'
  },
  wrapShadow: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: 'cereal-medium',
    color: '#9e9e9e',
    textAlign: 'justify'
  },
  wrapText: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 30
  }
});
