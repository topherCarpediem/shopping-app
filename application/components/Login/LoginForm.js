import React, { Component } from "react";
import { AsyncStorage ,View, TextInput, StyleSheet, Button, ToastAndroid, TouchableOpacity, Text, Animated } from "react-native";

import { NavigationActions } from "react-navigation";


import Icon from 'react-native-vector-icons/FontAwesome';
import { apiUri } from "../../../config";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: "",
            password: "",
            errorMessage: "",
            inputContainer: {
                flexDirection: 'row',
                borderRadius: 30,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                alignItems: 'center',
                marginBottom: 20
            }
        }
        
        this.getStarted = getStarted.bind(this)
        this.validateInput = validateInput.bind(this)
        this.login = login.bind(this)

    }

    

    render() {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                <View style={this.state.inputContainer}>
                    <Icon style={styles.emailIcon} name="at" size={23} color="white" />
                    <TextInput
                        placeholder="Email address"
                        placeholderTextColor="white"
                        onChangeText={(value) => { this.setState({emailAddress: value}) } }
                        //onEndEditing={this.validateInput}
                        underlineColorAndroid='transparent'
                        style={styles.input} />                    
                    
                </View>
                <View style={styles.inputContainer}>
                    <Icon style={styles.emailIcon} name="lock" size={25} color="white" />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="white"
                        onChangeText={(value) => { this.setState({password: value}) } }
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        style={styles.input} />
                </View>
                
                <TouchableOpacity
                    
                    style={styles.getStartedButton}
                    onPress={this.login}>
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


function login(){
    fetch(`${apiUri}/user/login`, {
        method: "POST",
        body: JSON.stringify({
            emailAddress: this.state.emailAddress,
            password: this.state.password
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(result => {
        if(result.status === 200)
            return result.json()
        else
            throw new Error("LoginFailedError")
    }).then(jsonResponse => {
        ToastAndroid.show(jsonResponse.token, ToastAndroid.SHORT)
        AsyncStorage.setItem("token", jsonResponse.token).then(saved => {
            ToastAndroid.show("The token saved", ToastAndroid.SHORT)

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: "Home",
                  })
                ]
              });

              this.props.navigation.dispatch(resetAction);

            //1this.props.navigation.navigate("Home")
        })
    }).catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT)
    })
    // axios.post("http://192.168.8.100:3000/user/login", {
    //     emailAddress: this.state.emailAddress,
    //     password: this.state.password
    // }).then(response => {
    //     return response.json()
    // }).catch(result => {
    //     console.log(result)
    // }).catch(err => {
    //     console.log(err)
    // })
    // fetch("http://192.168.8.100:3000/user/login", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         emailAddress: this.state.emailAddress,
    //         password: this.state.password
    //     }),
    //     headers:{
    //         "content-type": "application/json"
    //     }
    // }).then(response => response.json())
    // .then(jsonResult => {
    //     console.log(jsonResult)
    //     ToastAndroid.show(jsonResult.message, ToastAndroid.SHORT)
    // }).catch(err => {
    //     console.log(err)
    // })
    
}

function validateInput () {
    if(this.state.emailAddress == ""){
        this.setState({ inputContainer: {
            flexDirection: 'row',
            borderRadius: 30,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            alignItems: 'center',
            marginBottom: 20,
            borderColor: 'white',
            borderWidth: 1
        }})
        this.setState({
            errorMessage: "required"
        })
    }
}

function getStarted () {
   //ToastAndroid.show(this.state.emailAddress, ToastAndroid.SHORT)
   AsyncStorage.setItem("isLogin", "true").then(result => {
       console.log(result)
   }).catch(error => {
       console.log(error)
   })
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
        borderWidth: 0.5,
        borderColor: 'white'        
    },
    errorMessage: {
        marginBottom: 5,
        color: "white",
        textAlign: "right",
        paddingRight: 10
    }
})