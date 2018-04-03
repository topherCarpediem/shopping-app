import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from "react-native";

import { TabNavigator, StackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from "axios"

export default class Buyer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>

                <View
                    style={{
                        alignItems: "center",
                        flex: 1, marginTop: Dimensions.get("window").height / 20
                    }}>
                    <TouchableOpacity style={styles.container}
                        onPress={() => { this.props.screenProps.navigate('Purchases') }}>
                        <Icon name="shopping-cart" size={90} color="white" />
                        <Text style={{ color: "white", fontSize: 17 }}>Purchases</Text>
                    </TouchableOpacity >

                </View>

                <View
                    style={{
                        alignItems: "center",
                        flex: 1, marginTop: Dimensions.get("window").height / 20
                    }}>
                    <TouchableOpacity style={{
                        marginRight: 10 ,
                        padding: 40,
                        paddingBottom: 30,
                        paddingTop: 30,
                        borderRadius: 10,
                        backgroundColor: "#e74c3c",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => { this.props.screenProps.navigate('Profile') }}>
                        <Icon name="user-circle" size={90} color="white" />
                        <Text style={{ color: "white", fontSize: 17 }}>My Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        //borderWidth: 2,
        padding: 40,
        paddingBottom: 30,
        paddingTop: 30,
        borderRadius: 10,
        backgroundColor: "#e74c3c",
        justifyContent: "center",
        alignItems: "center"
    }
})



