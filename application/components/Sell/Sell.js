import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Picker, KeyboardAvoidingView, ScrollView, Input } from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";






export default class Sell extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.navigation.state)
    }

    render() {
        const { params } = this.props.navigation.state

        return (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ width: 130, height: 130 }}>
                        <Image
                            source={{
                                uri: params.uri
                            }}
                            style={{ flex: 1 }}
                        />
                    </View>

                </View>
                <View style={{ flexDirection: "column" }}>
                    <View style={{ backgroundColor: "white", marginBottom: 10 }}>
                        <TextInput
                            placeholder="Product name"
                            style={{ flex: 2, borderTopWidth: 0.5 }}
                            underlineColorAndroid="transparent" />
                        <TextInput
                            placeholder="Description"
                            multiline={true}
                            style={{ flex: 1, maxHeight: 200,borderTopWidth: 0.5, }}
                            underlineColorAndroid="transparent" />
                    </View>


                    <View style={styles.inputContainer}>
                        <MaterialIcons name="attach-money" size={20} />
                        <Text style={{ flex: 2 ,marginLeft: 20}}>Price</Text>
                        <TextInput
                            placeholder="0 pesos"
                            keyboardType="numeric"
                            style={{ flex: 2 }}
                            underlineColorAndroid="transparent" />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="format-line-weight" size={20} />
                        <Text style={{ flex: 2, marginLeft: 20}}>Stock</Text>
                        <TextInput
                            placeholder="0 piece"
                            keyboardType="numeric"
                            style={{ flex: 2 }}
                            underlineColorAndroid="transparent" />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="weight-kilogram" size={20} />
                        <Text style={{ flex: 2, marginLeft: 20, }}>Weight</Text>
                        <TextInput
                            placeholder="0 kg"
                            keyboardType="numeric"
                            style={{ flex: 2 }}
                            underlineColorAndroid="transparent" />
                    </View>                    
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="truck-fast" size={20} />
                        <Text style={{ flex: 2, marginLeft: 20, }}>Shipping Service</Text>
                        <Text style={{ flex: 2, padding: 15 }}>LBC Express</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="monetization-on" size={20} />
                        <Text style={{ flex: 2, marginLeft: 20, }}>Shipping Fee</Text>
                        <TextInput
                            placeholder="0 pesos"
                            keyboardType="numeric"
                            style={{ flex: 2 }}
                            underlineColorAndroid="transparent" />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}



const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 0.5,
        backgroundColor: "white",
        paddingLeft: 20
    }
})