import React, { Component } from 'react';

import { StackNavigator } from "react-navigation";
import { View, Text, Animated, Easing } from "react-native";

import Login from "./application/components/Login/Login";

import Nav from './application/components/Home/Nav/Nav';
import Product from './application/components/Product/Product';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}


const RootStack = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Home: {
      screen: Nav
    },
    Product: {
      screen: Product,
    }
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
)


export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}


