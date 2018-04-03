import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    Image,
    FlatList,
    ScrollView,
    Animated,
    Easing,
} from "react-native";

import { TabNavigator, StackNavigator } from "react-navigation";

import axios from "axios";
import { apiUri } from "../../../config";

import Buyer from "./Buyer";
import Seller from "./Seller"
import Purchases from "./Purchases";
import Profile from "./Profile";
import Track from "./Track";


const AccountTab = TabNavigator(
    {
        Buying: { screen: Buyer },
        Selling: { screen: Seller },
    }, {
        
        tabBarOptions: {
            activeTintColor: '#e74c3c',
            inactiveTintColor: 'black',
            indicatorStyle: {
                backgroundColor: "#e74c3c"
            },
            style: {
                backgroundColor: 'white',
              }
        },
        swipeEnabled: true,
        animationEnabled: true
    })

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: "",
            data: [{
                id: "",
                sd: "asdasd"
            }]
        }
    }

    componentWillMount() {
        AsyncStorage.getItem("token").then(token => {
            this.setState({
                token
            })
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                
                    <View style={{ backgroundColor: "black", height: 140 }}>
                        <Image />
                    </View>
                    <AccountTab screenProps={this.props.navigation} />
                
            </View>
        )
    }
}

export default AccountStack = StackNavigator({
    Account: {
        screen: Account,
        navigationOptions: {
            header: null,
        },
    },
    Purchases: {
        screen: Purchases
    },
    Profile: {
        screen: Profile
    },
    Track: {
        screen: Track
    }
},{
    transitionConfig: () => ({ screenInterpolator: () => null }),
})








