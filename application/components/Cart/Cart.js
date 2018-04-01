import React, { Component } from "react";
import { View, Text, FlatList, Image, AsyncStorage, TouchableWithoutFeedback, TouchableHighlight, StyleSheet, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
//delete-empty
import { apiUri } from "../../../config";
import axios from "axios";

export default class Cart extends Component {
    constructor(props) {
        super(props)


        this.state = {
            token: "",
            data: [],
            subTotal: 0,

        }
    }

    componentWillMount() {
        AsyncStorage.getItem("token").then(token => {
            this.setState({
                token
            })

            this.getCartItem()



        })
    }

    _onPress(item, status) {
        let copyOfCart = this.state.data.map(cart => {
            if (cart.cid === item.cid) {
                if (status) {
                    cart.check = true

                } else {
                    cart.check = false

                }
            }
            return cart
        })


        this.setState({
            data: [
                ...copyOfCart
            ]
        })

        let subTotal = 0

        this.state.data.forEach(cart => {
            if (cart.check) {
                subTotal = subTotal + cart.totalPrice
            }
        })

        this.setState({
            subTotal: subTotal
        })
    }

    getCartItem() {
        axios.get(`${apiUri}/cart/all`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(result => {

            const data = result.data.map(cart => {
                cart.check = true
                cart.totalPrice = cart.quantity * cart.product.productPrice
                return cart
            })

            let subTotal = 0

            data.forEach(cart => {
                if (cart.check) {
                    subTotal = subTotal + cart.totalPrice
                }
            })

            this.setState({
                data: [
                    ...this.state.data,
                    ...data,
                ],
                subTotal: subTotal
            })

            console.log(this.state.data)
        }).catch(err => {
            console.log(err)
        })
    }

    incrementQuantity(cid) {

        console.log(cid)

        let productPrice = 0
        let subTotal = 0

        const copyCart = this.state.data.map(cart => {
            if (cart.check) {
                if (cart.cid === cid) {
                    if (cart.quantity <= cart.product.stocks - 1 ) {
                        cart.quantity += 1
                        productPrice = cart.product.productPrice
                        cart.totalPrice += productPrice
                    }
                }
                subTotal = subTotal + cart.totalPrice
            }

            return cart
        })

        this.setState({
            data: [
                ...copyCart
            ],
            subTotal: subTotal
        })

        console.log(copyCart)
    }

    decrementQuantity(cid) {

        console.log(cid)

        let productPrice = 0
        let subTotal = 0

        const copyCart = this.state.data.map(cart => {


            if (cart.check) {
                if (cart.cid === cid) {
                    if (cart.quantity >= 2) {
                        cart.quantity -= 1
                        productPrice = cart.product.productPrice
                        cart.totalPrice -= productPrice
                    }

                }
                subTotal = subTotal + cart.totalPrice
            }


            return cart
        })

        this.setState({
            data: [
                ...copyCart
            ],
            subTotal: subTotal
        })

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ marginBottom: 100 }}
                    keyExtractor={(item) => item.cid}
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: "white", marginBottom: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ justifyContent: "center", alignItems: "center", }}>
                                    {item.check === true
                                        ?
                                        <TouchableWithoutFeedback style={{ padding: 5 }} onPress={() => { this._onPress(item, false) }}>
                                            <MaterialCommunityIcons name="checkbox-marked" size={25} color="#e74c3c" />
                                        </TouchableWithoutFeedback>
                                        :
                                        <TouchableWithoutFeedback style={{ padding: 5 }} onPress={() => { this._onPress(item, true) }}>
                                            <MaterialCommunityIcons name="checkbox-blank-outline" size={25} color="#e74c3c" />
                                        </TouchableWithoutFeedback>
                                    }
                                </View>
                                <View style={{ width: 100, height: 100, flex: 1 }}>
                                    <Image
                                        source={{
                                            uri: item.product.imageCover,
                                            headers: {
                                                "Content-type": `Bearer ${this.state.token}`
                                            }
                                        }}
                                        style={{ width: 100, height: 100 }}
                                    />
                                </View>
                                <View style={{ padding: 10, flex: 1.5 }}>
                                    <Text>{item.product.productName}</Text>
                                    <Text>Stocks: {item.product.stocks}</Text>

                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity onPress={() => { this.decrementQuantity(item.cid) }}>
                                            <MaterialCommunityIcons style={{ padding: 5, color: "#e74c3c" }} name="minus" size={20} />
                                        </TouchableOpacity>
                                        <Text style={{ padding: 5, fontSize: 18 }}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => { this.incrementQuantity(item.cid) }}>
                                            <MaterialCommunityIcons style={{ padding: 5, color: "#e74c3c" }} name="plus" size={20} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontWeight: 'bold', color: "#e74c3c" }}>Price: &#8369; {item.product.productPrice}</Text>
                                </View>

                                <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableHighlight >
                                        <Ionicons color="#e74c3c" name="ios-trash-outline" size={30} />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    }
                />

                <View style={styles.container}>
                    <View style={{ flex: 1, padding: 15, flexDirection: "row" }}>
                        <Text style={{ fontSize: 14, color: "black", flex: 1 }}>Total</Text>
                        <Text style={{ fontSize: 20, color: "#e74c3c", alignSelf: "flex-end", fontWeight: "bold" }}>&#8369;
                            {
                                this.state.subTotal
                            }</Text>
                    </View>


                    <TouchableOpacity
                        style={{ backgroundColor: "#e74c3c" }}>
                        <View style={styles.items}>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 15, color: "white", padding: 7 }}>PROCEED TO CHECKOUT</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>


            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {

        flexDirection: "column",
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
    },
    items: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
        padding: 7,

    },
    modalContainer: {
        flex: 1,
        //marginTop: Dimensions.get("window").height / 2,
        backgroundColor: "white",

    },
    modalButtonContainer: {
        flexDirection: "row",
        flex: 1,
        position: 'absolute',
        bottom: 0,
    },
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