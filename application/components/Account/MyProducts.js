import React, { Component } from "react";
import { View, Text, Image, AsyncStorage, FlatList, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, TextInput } from "react-native";

import axios from "axios";
import { apiUri } from "../../../config";

import Icon from 'react-native-vector-icons/FontAwesome';

export default class MyProducts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
            refreshing: false,
            data: [],
            modalVisible: false,
            editItem: [],
            productName: "",
            productPrice: "",
            stocks: 0,
            isActive: 0,
            product: []

        }
    }



    componentWillMount() {
        const { params } = this.props.navigation.state

        AsyncStorage.getItem('token').then(token => {
            this._fetchProducts(token)
        })

    }

    static navigationOptions = () => {

        return {
            title: "My Products",
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

    _onRefresh() {
        this._fetchProducts()
    }

    _fetchProducts(token) {
        this.setState({ refreshing: true });

        token = token === null || token === undefined ? this.state.token : token

        axios.get(`${apiUri}/product/seller`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(result => {
            this.setState({
                token: token,
                data: [
                    ...result.data
                ],
                //orderId: result.data.id
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

    _onEditPress(item) {
        console.log(item)
        this.setState({
            product: [
                item
            ],
            modalVisible: true
        })
    }

    _onTextChange(key, value) {
        const resutlt = this.state.product.map(product => {
            switch (key) {
                case "productName":
                    product.productName = value
                    break;

                case "productPrice":
                    product.productPrice = value
                    break;

                case "stocks":
                    product.stocks = value
                    break;

                case "isActive":
                    product.isActive = value
                    break;


                default:
                    break;
            }
            return product
        })
        this.setState({
            product: [
                ...resutlt
            ]
        })
        console.log(resutlt)

    }

    render() {
        let i = 0
        return (
            <View style={{}}>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={() => { this._onRefresh() }}
                    keyExtractor={(item) => item.id}
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, margin: 5 }}>
                            <View style={{ flexDirection: "row", backgroundColor: "white" }}>
                                <Image
                                    source={{
                                        uri: item.imageCover
                                    }}
                                    style={{ width: 100, height: 100 }}
                                />
                                <View style={{ margin: 10 }}>
                                    <Text>{item.productName}</Text>
                                    <Text>Stocks: {item.stocks} piece(s)</Text>
                                    <Text>&#8369; {item.productPrice}</Text>
                                    <TouchableOpacity
                                        onPress={() => { this._onEditPress(item) }}
                                        style={{
                                            backgroundColor: "#e74c3c",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 5,
                                            borderRadius: 5,
                                            marginTop: 5
                                        }} >
                                        <Icon name="edit" size={16} color="white" />
                                        <Text style={{ color: "white" }}> Edit</Text>

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    }
                />

                <Modal
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => { }}
                    visible={this.state.modalVisible}>
                    <View style={{ flex: 0.8, backgroundColor: "black", opacity: 0.6 }}></View>
                    <View style={{ backgroundColor: "white", flex: 1 }}>
                        <View style={{ padding: 10 }}>
                            {this.state.product.map(product => {
                                return (
                                    <View >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text>Product name</Text>
                                            <TextInput
                                                value={product.productName}
                                                onChangeText={(text) => { this._onTextChange("productName", text) }}
                                            />

                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text>Price</Text>
                                            <TextInput
                                                keyboardType="numeric"
                                                value={product.productPrice.toString()}
                                                onChangeText={(text) => { this._onTextChange("productPrice", text) }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                                            <Text>Stocks</Text>
                                            <TextInput
                                                keyboardType="numeric"
                                                value={product.stocks.toString()}
                                                onChangeText={(text) => { this._onTextChange("stocks", text) }}
                                            />

                                        </View>

                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text>Status</Text>
                                            <TextInput
                                                keyboardType="numeric"
                                                value={product.isActive.toString()}
                                                onChangeText={(text) => { this._onTextChange("isActive", text) }}
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                flex: 1,
                                position: 'absolute',
                                bottom: 0,
                            }}>
                            <View style={{ backgroundColor: '#1abc9c', flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ modalVisible: false }) }}
                                    style={{ padding: 18 }} >
                                    <Text style={{ color: "white", fontSize: 15 }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ backgroundColor: '#e74c3c', flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity style={{ padding: 18 }} >
                                    <Text style={{ color: "white", fontSize: 15 }}>CONFIRM</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>


                </Modal>
            </View>
        )
    }
}