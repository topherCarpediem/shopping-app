import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import Swiper from "react-native-swiper";

export default class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{flex: 1,backgroundColor: "#d9d9d9"}}>
                <View style={styles.inputContainer}>
                    <Icon style={styles.emailIcon} name="search" size={20} color="#e74c3c" />
                    <TextInput 
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        />
                </View>
                
            </View>
        )
    }
}



const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 30,
        alignItems: 'center',
        flexGrow: 1,

        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        position: "absolute",
        backgroundColor: "white"
    },
    input: {
        flex: 1,
        height: 35,
        
    },
})