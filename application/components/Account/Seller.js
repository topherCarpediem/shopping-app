import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    Image,
    FlatList,
    
} from "react-native";

import { TabNavigator, StackNavigator } from "react-navigation";

export default class Buyer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                
                <Text>Seller</Text>
                <ActivityIndicator size="small" color="#00ff00" animating={true} />
            </View>
        )
    }
}




