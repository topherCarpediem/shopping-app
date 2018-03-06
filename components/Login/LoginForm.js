import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button, ToastAndroid, TouchableOpacity, Text } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginForm extends Component {
    constructor() {
        super();
        this.getStarted = getStarted
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Icon style={styles.emailIcon} name="at" size={25} color="white" />
                    <TextInput
                        placeholder="Email address"
                        placeholderTextColor="white"
                        underlineColorAndroid='transparent'
                        style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Icon style={styles.emailIcon} name="lock" size={25} color="white" />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="white"
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        style={styles.input} />
                </View>
                
                <TouchableOpacity
                    style={styles.getStartedButton}
                    onPress={this.getStarted}>
                    <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={{ flex: 1, fontSize: 18, color: "white", paddingLeft: 10}}>Create Account</Text>
                    <Text style={{ flex: 1, fontSize: 18, color: "white", paddingLeft: 60}}>Forgot Password</Text>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={this.getStarted}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function getStarted() {
    ToastAndroid.show("Heloo madlang perople", ToastAndroid.SHORT)
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 20
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        height: 40,
        fontSize: 18,
        flex: 1,
        paddingLeft: 15,
        color: "white"
    },
    emailIcon: {
        paddingLeft: 15
    },
    getStartedButton: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 10
    },
    getStartedText: {
        color: "#e74c3c",
        fontSize: 18,
        padding: 13,
    },
    textContainer: {
        marginTop: 5,
        flexDirection: 'row',
        marginBottom: 30
    },
    skipText: {
        textAlign: 'right',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white'
    },
    skipButton: {
        backgroundColor:'rgba(255,255,255,0)',
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white'
        
    }
})