import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.styleWrap}>
          <Text style={styles.centerText}>SVTH: Thu Hiền & Trần Quang</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    borderTopColor: '#8A8E8D',
    borderTopWidth: .5,
  },
  centerText: {
    textAlign: 'center',
    fontFamily: 'cereal-book',
    fontSize: 18
  },
  styleWrap: {
    alignSelf: 'center',
    width: '100%'
  }
});
