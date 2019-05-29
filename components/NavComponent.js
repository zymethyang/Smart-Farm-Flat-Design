import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class NavComponent extends React.Component {
  render() {
    return (
      <View style={styles.navStyle}>
        <TouchableOpacity style={styles.wrapTextNav} onPress={() => this.props.onPress('InfoScreen')}>
          <Text style={styles.textNavStyle}>Thông số</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapTextNav} onPress={() => this.props.onPress('AutoScreen')}>
          <Text style={styles.textNavStyle}>Tự động</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapTextNav} onPress={() => this.props.onPress('ManualScreen')}>
          <Text style={styles.textNavStyle}>Thủ công</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navStyle: {
    height: 40,
    flexDirection: 'row'
  },
  wrapTextNav: {
    flex: 1
  },
  textNavStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'cereal-medium',
    color: '#9e9e9e'
  }
});
