import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './screens/Search';
import BT from './screens/BTs';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction:{screen:BT},
  Search:{screen:Search}
})
const AppContainer = createAppContainer(TabNavigator)