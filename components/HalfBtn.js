import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Button, Text } from 'native-base';


export default class HalfBtn extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    let { title ,color} = this.props;
    return (
      <Button full style={{ height: 50, backgroundColor: color }} onPress={() => this.props.onPress()}>
        <Text style={styles.btnTextStyle}>{title}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  btnTextStyle: {
    fontSize: 16,
    fontFamily: 'cereal-medium',
    color: 'white'
  }
});
