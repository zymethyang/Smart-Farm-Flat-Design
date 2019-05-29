import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const data = {
  rau_can: {
    name: 'Rau cần',
    phMin: 6,
    phMax: 8,
    ecMin: 2,
    ecMax: 3,
    image: require('../assets/images/vegetables/rau_can.jpg'),
    description:'Rau cần chứa  tinh dầu, acid hữu cơ, caroten, vitamin P, C, đạm, đường, canxi, phôtpho, sắt... có tác dụng giảm ho, chống viêm, long đờm, kháng nấm, hạ huyết áp, giảm đường và mỡ máu. Nhiệt độ lý tưởng cho cây phát triển từ 15 đến 20 độ C. Thời gian thu hoạch rau từ 100 đến 120 ngày sau khi lên giàn.'
  },
  su_su: {
    name: 'Xà lách',
    phMin: 6,
    phMax: 8,
    ecMin: 5,
    ecMax: 6,
    image: require('../assets/images/vegetables/xa_lach.jpg'),
    description:'Xà lách là một loại cây ăn lá, rễ cọc. Nhiệt độ lý tưởng cho cây phát triển từ 18 đến 27 độ C, cây cần 10 đến 14 giờ ánh sáng huỳnh quang mỗi ngày. Thời gian thu hoạch rau từ 24 đến 30 ngày sau khi lên giàn.'
  }
}

export default class ListTrees extends React.Component {
  static navigationOptions = {
    header: null,
  }

  renderTree = (treesList) => {
    let result = null;
    result = treesList.map((tree, index) => {
      return (
        <TouchableOpacity style={styles.wrapSelection} key={index} onPress={() => this.props.navigation.navigate('AutoScreen', tree)}>
          <View style={styles.alignCenter}>
            <Image source={tree.image} style={styles.wrapImage} />
          </View>
          <View style={styles.wrapName}>
            <Text style={styles.nameStyle}>{tree.name}</Text>
          </View>
        </TouchableOpacity>
      );
    })
    return result;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTree(Object.values(data))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapSelection: {
    height: 80,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  wrapImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  nameStyle: {
    fontSize: 25,
    fontFamily: 'cereal-medium',
    color: '#00bfa5'
  },
  wrapName: {
    marginLeft: 20,
    alignSelf: 'center'
  },
  alignCenter: {
    alignSelf: 'center'
  }
});
