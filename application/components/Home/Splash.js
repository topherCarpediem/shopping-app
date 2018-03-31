import React, { Component } from "react";
import { View, Text, AsyncStorage, ActivityIndicator, ToastAndroid } from "react-native";

import { NavigationActions } from "react-navigation";

export default class Splash extends Component {
    constructor(props) {
        super(props)

        setTimeout(() => {
            AsyncStorage.getItem("token").then(result => {
                let route = null;

                if (result === null) {
                    //console.log(this.props.navigation.state)
                    route = "Login"
                    //this.props.navigation.navigate("Login")
                } else {
                    //this.props.navigation.navigate("Home")
                    route = "Home"
                }

                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: route,
                      })
                    ]
                  });
                  
                  this.props.navigation.dispatch(resetAction);
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