import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default class Account extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Text>asdasdASd</Text>
                <ActivityIndicator size="small" color="#00ff00" animating={true}/>
            </View>
        )
    }
}