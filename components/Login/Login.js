import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet
} from "react-native";

import LoginForm from "./LoginForm"

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../../src/assets/images/logo.png")} />
                    <Text style={styles.heading}>SECOND CHANCES</Text>
                    <Text style={styles.subHeading}>Buy and Sell Great Quality Items</Text>
                </View>
                <LoginForm />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e74c3c"

    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1
    },
    logo: {
        width: 150,
        height: 150, 
        tintColor: "white"

    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 10,
        color: "white",
        opacity: 0.8
    },
    subHeading: {
        fontSize: 20,
        color: "white",
        opacity: 0.8
    }
}) 