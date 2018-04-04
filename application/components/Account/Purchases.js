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

import Icon from 'react-native-vector-icons/FontAwesome';
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
                //console.log(result.data)
            }).catch(err => {
                Alert.alert('Error', err.response.data.message)
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
            <View style={{ flex: 1 }}>
                
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

                                <View style={{ padding: 10, flex: 1 }}>
                                    <Text>{item.product.productName}</Text>
                                    <Text>Quantity: {item.quantity}</Text>
                                    <Text style={{ fontWeight: 'bold', color: "#e74c3c" }}>Price: &#8369; {item.product.productPrice * item.quantity}</Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('Track', {
                                                orderId: item.id
                                            })
                                        }}
                                        style={{
                                            alignSelf: "flex-end",
                                            alignItems: "center",
                                            padding: 10
                                        }}>
                                        <Icon name="map-marker" color="#e74c3c" size={50} />
                                        <Text>Track your order</Text>
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
