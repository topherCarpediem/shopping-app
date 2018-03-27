import React, { Component } from "react";
import { View, Text, AsyncStorage, ActivityIndicator, ToastAndroid } from "react-native";


export default class Splash extends Component {
    constructor(props) {
        super(props)

        setTimeout(() => {
            AsyncStorage.getItem("token").then(result => {
                if (result === null) {
                    console.log(this.props.navigation.state)
                    this.props.navigation.navigate("Login")
                } else {
                    this.props.navigation.navigate("Home")
                }
            })
        }, 2000)

    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator size={80} color="#e74c3c" />
            </View>
        )
    }
}