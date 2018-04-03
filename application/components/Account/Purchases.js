import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    AsyncStorage,
    Alert,
    TouchableOpacity,
    Image,
} from "react-native";


import axios from "axios"
import { apiUri } from "../../../config";

export default class Purchases extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            refreshing: false,
            token: ""
        }
    }


    componentWillMount() {
        AsyncStorage.getItem("token").then(token => {
            this.setState({
                token
            })

            axios.get(`${apiUri}/order/purchases`, {
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
                console.log(result.data)
            }).catch(err => {
                console.log(err)
            })
        })
    }

    static navigationOptions = () => {

        return {
            title: "Purchases",
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





    render() {
        return (
            <View style={{ flex: 1 }}><Text>Purchases</Text>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={() => { }}
                    keyExtractor={(item) => item.id}
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: "white", marginBottom: 10 }}>
                            <View style={{ flexDirection: "row" }}>

                                <View style={{ width: 100, height: 100, flex: 1 }}>
                                    <TouchableOpacity>
                                        <Image
                                            source={{
                                                uri: item.product.imageCover,
                                                headers: {
                                                    "Content-type": `Bearer ${this.state.token}`
                                                }
                                            }}
                                            style={{ width: 100, height: 100 }}
                                        />
                                    </TouchableOpacity>
                                </View>



                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}
