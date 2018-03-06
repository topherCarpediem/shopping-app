/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  Image,
  ImageBackground
} from 'react-native';

import Login from "./components/Login/Login";

export default class App extends Component {
  render() {
    return (
      <Login />
    );
  }
}


