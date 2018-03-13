import React, { Component } from "react";
import { View, Text, Image } from "react-native";



export default class Sell extends Component{
    constructor(props){
        super(props)
        console.log(this.props.navigation.state)
    }

    render(){
        const {params} = this.props.navigation.state

        return(
            <View style={{ flex: 1}}>
            <Image 
                source={{
                    uri: params.uri
                }}

                style={{ width: 300, height: 300}}
                
            />
            </View>
            
        )
    }
}