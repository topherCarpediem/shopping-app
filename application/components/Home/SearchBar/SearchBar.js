import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <Icon style={styles.emailIcon} name="search" size={20} color="#e74c3c" />
                <TextInput
                    placeholder="Search product"
                    style={styles.input}
                    underlineColorAndroid='transparent'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "white",
        paddingLeft: 15,
        position:"absolute",
        
    },
    input: {
        flex: 1,
        height: 35,
        padding: 10
    },
})