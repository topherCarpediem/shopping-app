import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Nav extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.items}>
                    <Icon name="home" size={25} color="#e74c3c" />
                    <Text style={{ fontSize: 13}}>Home</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="th" size={25} color="#e74c3c" />
                    <Text style={{ fontSize: 13}}>Category</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="camera" size={25} color="#e74c3c" />
                    <Text style={{ fontSize: 13}}>Sell</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="shopping-cart" size={25} color="#e74c3c" />
                    <Text style={{ fontSize: 13}}>Cart</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="user-circle" size={25} color="#e74c3c" />
                    <Text style={{ fontSize: 13}}>Account</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: "white",
        padding: 7
    },
    items: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column"
    }
})