import React, { Component } from "react";
import { View, Text, AsyncStorage, ActivityIndicator, ToastAndroid } from "react-native";


export default class Splash extends Component {
    constructor(props){
        super(props)

        fetch("http://10.24.254.71:3001/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                emailAddress: "topher.carpediem@gmail.com",
                password: "mypass"
            })
        })
        .then(result => result.json())
        .then(data => {
            AsyncStorage.setItem("token", data.token)
            setTimeout(() => {
                AsyncStorage.getItem("isLogin").then(result => {
                    if (result === null) {
                        console.log(this.props.navigation.state)
                        this.props.navigation.navigate("Login")
                    } else {
                        
                        AsyncStorage.getItem("token").then(token => {
                            ToastAndroid.show(token, ToastAndroid.SHORT)
                            this.props.navigation.navigate("Home")
                        })
                    }
                })
            }, 2000)
        })
        .catch(err => {
            console.log(err)
        })
        

       
        
    }

    render(){
        return(
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator size={80} color="#e74c3c" />
            </View>
        )
    }
}