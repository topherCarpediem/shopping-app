import  React, { Component } from "react";
import { View, Text } from "react-native";


export default class Profile extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = () => {
        
        return {
            title: "Profile",
            tabBarVisible: false,
            headerStyle: {
                backgroundColor: '#e74c3c',
            },
            headerTitleStyle: {
                color: 'white',
            },
            headerBackTitleStyle: {
                color: 'white',
            },
            headerTintColor: 'white',


        }
    };


    render(){
        return(
            <View><Text>Profile</Text></View>
        )
    }
}
