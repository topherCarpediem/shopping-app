import React, { Component } from "react";
import { View, Text, AsyncStorage, Image, FlatList, Alert } from "react-native";
import axios from "axios";
import { apiUri } from "../../../config";

import QRCode from 'react-native-qrcode';
import Icon from "react-native-vector-icons/Ionicons";

export default class Track extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
            refreshing: false,
            data: [],
            orderId: ""
        }
    }

    _onRefresh() {
        this._fetchOrder()
    }

    componentWillMount() {
        const { params } = this.props.navigation.state

        AsyncStorage.getItem('token').then(token => {
            this._fetchOrder(params.orderId, token)
        })

    }

    _fetchOrder(orderId, token){
        this.setState({ refreshing: true });
        
        orderId = orderId === null || orderId === undefined ? this.state.orderId : orderId
        token = token === null || token === undefined ? this.state.token : token

        axios.get(`${apiUri}/order/${orderId}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(result => {
            this.setState({
                token: token,
                data: [result.data],
                orderId: result.data.id
            })
            this.setState({ refreshing: false });
            
        }).catch(err => {

            switch (err.response) {
                case null:
                    Alert.alert('Error', err.message)
                    break;            
                default:
                    Alert.alert('Error', err.response.data.message)
                    break;
            }
            this.setState({ refreshing: false });
        })
    }

    static navigationOptions = () => {

        return {
            title: "Track",
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
            <View>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={() => { this._onRefresh() }}
                    keyExtractor={(item) => item.id}
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", backgroundColor: "white" }}>
                                <Image
                                    source={{
                                        uri: item.product.imageCover,
                                        headers: {
                                            "Authorization": `Bearer ${this.state.token}`
                                        }
                                    }}
                                    style={{ width: 100, height: 100 }}
                                />
                                <View style={{ margin: 10 }}>
                                    <Text>{item.product.productName}</Text>
                                    <Text>Quantity: {item.quantity} piece(s)</Text>
                                    <Text>&#8369; {item.product.productPrice * item.quantity}</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 50 }}>
                                {
                                    item.orderStatus === "Processing" || item.orderStatus === "Shipped" || item.orderStatus === "Delivered"
                                        ?
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Icon name="ios-checkmark-circle" size={80} color="#e74c3c" />
                                            <Text>Processing</Text>
                                        </View>
                                        :
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Icon name="ios-checkmark-circle-outline" size={80} />
                                            <Text>Processing</Text>
                                        </View>
                                }

                                {
                                    item.orderStatus === "Shipped" || item.orderStatus === "Delivered"
                                        ?
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Icon name="ios-checkmark-circle" size={80} color="#e74c3c" />
                                            <Text>Shipped</Text>
                                        </View>
                                        :
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Icon name="ios-checkmark-circle-outline" size={80} />
                                            <Text>Shipped</Text>
                                        </View>
                                }

                                {
                                    item.orderStatus === "Delivered"
                                        ?
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Icon name="ios-checkmark-circle" size={80} color="#e74c3c" />
                                            <Text>Delivered</Text>
                                        </View>
                                        :
                                        <View style={{ flex: 1, alignItems: "center" }}>
                                            <Icon name="ios-checkmark-circle-outline" size={80} />
                                            <Text>Delivered</Text>
                                        </View>
                                }

                            </View>
                            <View style={{ marginTop: 50, alignItems: "center" }}>
                                <QRCode
                                    value={item.id}
                                    size={200}
                                    bgColor='black'
                                    fgColor='white' />
                            </View>

                        </View>
                    }

                />

                <Text style={{ textAlign: "center" }}>Present this QRCode when the item delivered to you. {"\n"} Take a screenshot for faster transaction.</Text>

            </View>
        )
    }
}