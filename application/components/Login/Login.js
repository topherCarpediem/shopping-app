import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    Image,
    AsyncStorage
} from "react-native";

import LoginForm from "./LoginForm"
import styles from "../../styles/Login"

import ImagePicker from "react-native-image-picker";

export default class Login extends Component {
    constructor(props) {
        super(props)

      


    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../../../src/assets/images/logo.png")} />
                    <Text style={styles.heading}>SECOND CHANCES</Text>
                    <Text style={styles.subHeading}>Buy and Sell Great Quality Items</Text>
                </View>
                <LoginForm navigation={this.props.navigation}/>
            </View>
        )
    }
}

