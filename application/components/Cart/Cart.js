import React, { Component } from "react";
import {
    Alert,
    ActivityIndicator,
    View,
    Text,
    FlatList,
    Image,
    AsyncStorage,
    TouchableWithoutFeedback,
    TouchableHighlight,
    StyleSheet,
    TouchableOpacity,
    Modal
} from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import { apiUri } from "../../../config";
import axios from "axios";

export default class Cart extends Component {
    constructor(props) {
        super(props)


        this.state = {
            token: "",
            data: [],
            subTotal: 0,
            loading: false,
            modalLoading: false,
            refreshing: false,
            modalVisible: false

        }
    }

    componentWillMount() {
        AsyncStorage.getItem("token").then(token => {
            this.setState({
                token
            })
            this.getCartItem()

            axios.get(`${apiUri}/user/profile`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${this.state.token}`
                }
            }).then(result => {

            }).catch(err => {
                
            })
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
        this.setState({
            refreshing: true
        })
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
                data: data,
                subTotal: subTotal,
                refreshing: false
            })

            console.log(this.state.data)
        }).catch(err => {
            console.log(err)
            this.setState({
                refreshing: false
            })
        })
    }

    incrementQuantity(cid) {

        console.log(cid)

        let productPrice = 0
        let subTotal = 0

        const copyCart = this.state.data.map(cart => {
            if (cart.check) {
                if (cart.cid === cid) {
                    if (cart.quantity <= cart.product.stocks - 1) {
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



    deleteFromCart(productId) {

        Alert.alert('Continue?', 'This action will delete the item in you cart!',
            [
                {
                    text: 'Yes', onPress: () => {
                        this.setState({
                            loading: true
                        })

                        axios.delete(`${apiUri}/cart/delete/${productId}`, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": `Bearer ${this.state.token}`
                            }
                        }).then(result => {


                            let copyCart = this.state.data.filter(cart => cart.product.id !== productId)

                            this.setState({
                                data: [
                                    ...copyCart
                                ]
                            })

                            setTimeout(() => {
                                this.setState({ loading: false })
                                alert(result.data.message)
                            }, 1000)


                        }).catch(err => {
                            setTimeout(() => {
                                this.setState({ loading: false })
                                alert(err.response.data.message)
                            }, 1000)

                        })
                    }
                },
                { text: 'No' }
            ],
            {
                cancelable: false
            })

    }

    checkoutPress() {
        if (this.state.subTotal === 0) {
            Alert.alert('Error', 'Please select an item that you will buy')
        } else {
            this.setModalVisible(true)
        }
    }

    checkoutProcess() {

        this.setState({ modalLoading: true })

        const productDetails = []

        this.state.data.forEach(cart => {
            if (cart.check) {
                productDetails.push({
                    id: cart.product.id,
                    quantity: cart.quantity
                })
            }
        })

        axios.post(`${apiUri}/order/checkout`,
            {
                productDetails: JSON.stringify(productDetails),
            },
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${this.state.token}`
                },
            }).then(result => {
                setTimeout(() => {
                    this.setState({
                        modalLoading: false
                    })
                    Alert.alert('Success', result.data.message)
                }, 1000)


            }).catch(err => {
                setTimeout(() => {
                    this.setState({
                        modalLoading: false
                    })
                    Alert.alert('Error', err.response.data.message)
                }, 1000)
            })

        //console.log(JSON.stringify(JSON.stringify(productDetails)))

        //axios
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        let i = 0;
        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={() => { this.getCartItem() }}
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
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('Product', {
                                                productId: item.product.id,
                                                title: item.product.productName
                                            })
                                        }}>
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
                                    <TouchableOpacity
                                        style={{ padding: 15 }}
                                        onPress={() => { this.deleteFromCart(item.product.id) }}>
                                        <Ionicons color="#e74c3c" name="ios-trash-outline" size={30} />
                                    </TouchableOpacity>
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
                        onPress={() => { this.checkoutPress() }}
                        style={{ backgroundColor: "#e74c3c" }}>
                        <View style={styles.items}>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 15, color: "white", padding: 7 }}>PROCEED TO CHECKOUT</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>

                <Modal
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => { }}
                    visible={this.state.modalVisible}>
                    <View style={{ flex: 0.8, backgroundColor: "black", opacity: 0.6 }}></View>
                    <View style={{ backgroundColor: "white", flex: 1 }}>
                        <View style={{ padding: 10, }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>Order Summary</Text>
                            <View style={{ borderBottomWidth: 1, }}>

                                {this.state.data.map((item, index) => {
                                    if (item.check) {
                                        return (
                                            <View key={i++} style={{ flexDirection: "row", borderRightWidth: 1 }}>
                                                <Text key={i++} style={{ flex: 3, borderTopWidth: 1, borderLeftWidth: 1, paddingLeft: 5 }}>{item.product.productName}</Text>
                                                <Text key={i++} style={{ flex: 1, borderTopWidth: 1, borderLeftWidth: 1, textAlign: "center" }}>&#8369; {item.product.productPrice}</Text>
                                                <Text key={i++} style={{ flex: 1, borderTopWidth: 1, borderLeftWidth: 1, textAlign: "center" }}>{item.quantity}</Text>
                                            </View>
                                        )
                                    }
                                })}
                            </View>


                            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 8 }}>Shipping To</Text>
                            <Text style={{ fontWeight: "bold" }}>Full name</Text>
                            <Text>Christopher Enriquez</Text>
                            <Text style={{ fontWeight: "bold" }}>Billing Address</Text>
                            <Text>Shipping Address</Text>
                            <Text style={{ fontWeight: "bold" }}>Phone number</Text>
                            <Text>09262501012</Text>
                            <Text style={{ fontWeight: "bold" }}>Order type</Text>
                            <Text>Cash on Delivery</Text>
                            <Text>Total  <Text style={{ fontSize: 20, color: "#e74c3c", fontWeight: "bold" }}>&#8369; {this.state.subTotal}</Text></Text>
                        </View>

                        <View style={styles.modalButtonContainer}>
                            <View style={{ backgroundColor: '#1abc9c', flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity style={{ padding: 18 }} onPress={() => { this.setModalVisible(false) }}>
                                    <Text style={{ color: "white", fontSize: 15 }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ backgroundColor: '#e74c3c', flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity style={{ padding: 18 }} onPress={() => { this.checkoutProcess() }}>
                                    <Text style={{ color: "white", fontSize: 15 }}>CONFIRM</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                    {
                        this.state.modalLoading &&
                        <View style={styles.loading}>
                            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 5 }}>
                                <ActivityIndicator size={80} color="#e74c3c" />
                            </View>
                        </View>
                    }
                </Modal>
                {
                        this.state.loading &&
                        <View style={styles.loading}>
                            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 5 }}>
                                <ActivityIndicator size={80} color="#e74c3c" />
                            </View>
                        </View>
                    }
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