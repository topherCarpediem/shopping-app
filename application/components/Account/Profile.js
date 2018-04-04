import React, { Component } from "react";
import { View, Text, AsyncStorage, FlatList, TouchableOpacity } from "react-native";

import axios from "axios";
import { apiUri } from "../../../config";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
            data: [{
                hello: "asdasd"
            }]
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state

        AsyncStorage.getItem('token').then(token => {
            this._fetchData(token)
        })

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

    _fetchData(token) {
        axios.get(`${apiUri}/user/info`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(result => {
            this.setState({
                data: [
                    ...result.data
                ]
            })
        }).catch(err => {
            console.log(err)
        })
    }



    render() {
        return (
            <FlatList
                
                keyExtractor={(item) => item.id}
                data={this.state.data}
                renderItem={({ item }) =>
                    <View>
                        <Text>Fullname</Text>
                        <Text>Email</Text>
                        <Text>Phone number</Text>
                        <Text>Billing/Shipping Address</Text>
                        <Text>Logout</Text>
                    </View>
                } />
        )
    }
}
