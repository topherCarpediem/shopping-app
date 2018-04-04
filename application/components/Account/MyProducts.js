import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    AsyncStorage,
    FlatList,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    Alert
} from "react-native";

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
            product: {
                productPrice: "",
                productName: "",
                stocks: 0,
                isActive: 0,
                productDescription: ""
            },
            loading: false

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
        //console.log(item)
        this.setState({
            product: {
                ...item
            },
            modalVisible: true
        })
    }

    _onTextChange(key, value) {
        const product = this.state.product
        switch (key) {

            case "productName":
                product.productName = value
                break;
            
            case "productDescription":
                product.productDescription = value
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


        this.setState({
            product: {
                ...product
            }
        })
        //console.log(product)

    }

    _onConfirm() {
        const product = this.state.product
        let isValidInput = true
        let errorMessage = ""

        if (product.productName === "") {
            isValidInput = false
            errorMessage = "Product name cannot be null"
        } else if (product.productPrice === "") {
            isValidInput = false
            errorMessage = "Product price name cannot be null"
        } else if (product.stocks === "") {
            isValidInput = false
            errorMessage = "Stocks cannot be null"
        } else if (product.isActive === "") {
            isValidInput = false
            errorMessage = "Active cannot be null"
        }  else if (product.productDescription === "") {
            isValidInput = false
            errorMessage = "Product description cannot be null"
        }

        if (isValidInput) {
            Alert.alert('Update product info', 'This action will update the product info based on the fields provided, Continue?',
                [
                    {
                        text: 'YES', onPress: () => {
                            const { isActive, productName, productPrice, stocks, productDescription } = this.state.product
                            this.setState({ loading: true })
                            axios.put(`${apiUri}/product/edit/${this.state.product.id}`,
                                {
                                    productName,
                                    productPrice,
                                    stocks,
                                    isActive,
                                    productDescription
                                }, {
                                    headers: {
                                        "Content-type": "application/json",
                                        "Authorization": `Bearer ${this.state.token}`
                                    }
                                }).then(result => {
                                    
                                    this.setState({ loading: true, modalVisible: false })
                                }).catch(err => {
                                    Alert.alert('Oops! Somethings wrong', err.response.data.message)
                                })
                        }
                    },
                    { text: 'NO' }
                ])
        } else {
            Alert.alert('Oops! Somethings wrong', errorMessage)
        }

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
                                    style={{ width: 120, height: 120 }}
                                />
                                <View style={{ margin: 10, flexWrap: "nowrap" }}>
                                    <Text style={{  }}>{item.productName}</Text>
                                    <Text>Stocks: {item.stocks} piece(s)</Text>
                                    <Text>&#8369; {item.productPrice}</Text>
                                    <TouchableOpacity
                                        onPress={() => { this._onEditPress(item) }}
                                        style={{
                                            backgroundColor: "#e74c3c",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            padding: 5,
                                            borderRadius: 5,
                                            marginTop: 5,
                                            alignSelf: "flex-start"
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
                    {/* <View style={{ flex: 0, backgroundColor: "black", opacity: 0.6 }}></View> */}
                    <View style={{ backgroundColor: "white", flex: 1 }}>
                        <View style={{ padding: 10 }}>

                            <View >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ flex: 1 }}>Product name</Text>
                                    <TextInput
                                        style={{ flex: 2 }}
                                        value={this.state.product.productName}
                                        onChangeText={(text) => { this._onTextChange("productName", text) }}
                                    />

                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ flex: 1 }}>Product name</Text>
                                    <TextInput
                                        multiline={true}
                                        
                                        style={{ flex: 2, minHeight: 60, maxHeight: 100 }}
                                        value={this.state.product.productDescription}
                                        onChangeText={(text) => { this._onTextChange("productDescription", text) }}
                                    />

                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ flex: 1 }}>Price</Text>
                                    <TextInput
                                        style={{ flex: 2 }}
                                        keyboardType="numeric"
                                        value={this.state.product.productPrice.toString()}
                                        onChangeText={(text) => { this._onTextChange("productPrice", text) }}
                                    />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>

                                    <Text style={{ flex: 1 }}>Stocks</Text>
                                    <TextInput
                                        style={{ flex: 2 }}
                                        keyboardType="numeric"
                                        value={this.state.product.stocks.toString()}
                                        onChangeText={(text) => { this._onTextChange("stocks", text) }}
                                    />

                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ flex: 1 }}>Active</Text>
                                    <TextInput
                                        style={{ flex: 2 }}
                                        keyboardType="numeric"
                                        value={this.state.product.isActive.toString()}
                                        onChangeText={(text) => { this._onTextChange("isActive", text) }}
                                    />
                                </View>
                            </View>


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
                                <TouchableOpacity
                                    onPress={() => { this._onConfirm() }}
                                    style={{ padding: 18 }}
                                >
                                    <Text style={{ color: "white", fontSize: 15 }}>CONFIRM</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                {this.state.loading &&
                    <View style={styles.loading}>
                        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 5 }}>
                            <ActivityIndicator size={80} color="#e74c3c" />
                        </View>
                    </View>
                }
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.8,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})