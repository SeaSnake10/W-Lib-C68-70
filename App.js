import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
  Search:{screen:Search},
},
{
  defaultNavigationOptions:({navigation})=> ({
    tabBarIcon:({})=>{
      const rootName = navigation.state.routeName
      if(rootName === "Transaction"){
        return(
          <Image source = {require("./assets/book.png")} style={{width:30, height:30}}/>
        );
      }else if (rootName === "Search"){
        return(
          <Image source = {require("./assets/searchingbook.png")} style={{width:30, height:30}}/>
        );
      }
    }
  })
}
)
const AppContainer = createAppContainer(TabNavigator)