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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios"

export default class Seller extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>

                    <View
                        style={{
                            alignItems: "center",
                            flex: 1, marginTop: 10
                        }}>
                        <TouchableOpacity style={styles.container}
                            onPress={() => { this.props.screenProps.navigate('MyProducts') }}>
                            <Icon name="shopping-cart" size={90} color="white" />
                            <Text style={{ color: "white", fontSize: 17 }}>My Products</Text>
                        </TouchableOpacity >

                    </View>

                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 10
                        }}>
                        <TouchableOpacity style={{
                            marginRight: 10,
                            padding: 40,
                            paddingBottom: 30,
                            paddingTop: 30,
                            borderRadius: 10,
                            backgroundColor: "#e74c3c",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                            onPress={() => { this.props.screenProps.navigate('PickUp') }}>
                            <MaterialCommunityIcons name="truck-delivery" size={90} color="white" />
                            <Text style={{ color: "white", fontSize: 17 }}>Pick Up Item</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={{ flexDirection: "row" }}>

                    <View
                        style={{
                            alignItems: "center",
                            flex: 1, marginTop: 10
                        }}>
                        <TouchableOpacity style={styles.container}
                            onPress={() => { this.props.screenProps.navigate('Purchases') }}>
                            <MaterialIcons name="attach-money" size={90} color="white" />
                            <Text style={{ color: "white", fontSize: 17 }}>Income</Text>
                        </TouchableOpacity >

                    </View>

                </View> */}
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



