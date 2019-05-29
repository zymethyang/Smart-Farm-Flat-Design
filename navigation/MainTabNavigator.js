import { createAppContainer, createStackNavigator } from 'react-navigation';

import InfoScreen from '../screens/InfoScreen';
import AutoScreen from '../screens/AutoScreen';
import ManualScreen from '../screens/ManualScreen';
import ListTrees from '../screens/ListTrees';


export default createAppContainer(createStackNavigator({
  InfoScreen,
  AutoScreen,
  ManualScreen,
  ListTrees
}));
