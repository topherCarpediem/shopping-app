import React, { Component } from "react";
import { View, Text, AsyncStorage, FlatList, TouchableOpacity, BackHandler } from "react-native";

import { NavigationActions } from "react-navigation";

import axios from "axios";
import { apiUri } from "../../../config";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
            data: []
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
        axios.get(`${apiUri}/user/profile`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(result => {
            this.setState({
                data: [result.data]
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
                    <View style={{ flex: 1 }}>

                        <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>Full name</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.firstName} {item.lastName}</Text>
                        </View>


                        <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>Email Address</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.emailAddress}</Text>
                        </View>


                       <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>Phone number</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.address.phoneNumber}</Text>
                        </View>


                       <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>Line 1</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.address.line1}</Text>
                        </View>


                       <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>Line 2</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.address.line2}</Text>
                        </View>


                       <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>Barangay</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.address.barangay}</Text>
                        </View>


                       <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>City</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.address.city}</Text>
                        </View>


                       <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18, flex: 1, fontWeight: "bold" }}>Province</Text>
                            <Text style={{ fontSize: 18, flex: 2 }}>{item.address.province}</Text>
                        </View>


                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem("token").then(removed => {
                                    BackHandler.exitApp()
                                })
                            }}
                            style={{
                                backgroundColor: "#e74c3c",
                                borderRadius: 5,
                                margin: 20,
                                padding: 15,
                                flex: 1,
                            }}>
                            <Text style={{ fontSize: 18, textAlign: "center", color: "white", fontSize: 18 }}>Logout</Text>
                        </TouchableOpacity>

                    </View>
                } />
        )
    }
}
