import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import { AppLoading, Asset, Font, Icon } from 'expo';
import MainTabNavigator from './navigation/MainTabNavigator';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import firebase from './shared/firebase';
import 'firebase/auth';

const LoadingComponent = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#00bfa5" />
      <Text style={styles.loadingStyle}>Loading...</Text>
    </View>
  );
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    login: null
  };


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged');
        this.setState({ login: true });
      } else {
        console.log('Sign out');
        this.setState({ login: false });
      }
    });
  }

  render() {
    const { login } = this.state;
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {
            login === null ?
              <LoadingComponent /> :
              login === false ?
                <LoginScreen /> :
                <View style={{ flex: 1 }}>
                  <Header />
                  <MainTabNavigator />
                </View>
          }
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'cereal-medium': require('./assets/fonts/AirbnbCereal-Medium.ttf'),
        'cereal-book': require('./assets/fonts/AirbnbCereal-Book.ttf'),
        'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf')
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loadingStyle: {
    textAlign: 'center',
    color: '#00bfa5'
  },
});
