import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Alert,
    Modal,
    Dimensions,
    TextInput,
    ActivityIndicator,
    StatusBar,
    FlatList,
    RefreshControl
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from "react-native-swiper";
import axios from "axios";



import { apiUri } from "../../../config";
import Card from "../Card/Card";

export default class Product extends Component {
    constructor(prop) {
        super(prop)

        this.state = {
            data: {},
            token: "",
            id: "",
            modalVisible: false,
            quantity: 1,
            price: 0,
            loading: false,
            recommendation: []
        }

        this.incrementQuantity = this.incrementQuantity.bind(this)
        this.decrementQuantity = this.decrementQuantity.bind(this)
        this.setLoadingVisible = this.setLoadingVisible.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }



    componentWillMount() {
        const { params } = this.props.navigation.state
        this.setState({
            loading: true
        })
        AsyncStorage.getItem("token")
            .then(token => {
                this.setState({
                    token,
                    id: params.productId
                })

                axios.get(`${apiUri}/product/${this.state.id}`, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${this.state.token}`
                    }
                }).then(result => {
                    this.setState({
                        data: {
                            ...this.state.data,
                            ...result.data
                        }
                    })
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        })
                    }, 2000)

                    return axios.get(`${apiUri}/product/recommendation/${this.state.id}`, {
                        headers: {
                            "Content-type": "application/json",
                        }
                    })

                }).then(result => {
                    this.setState({
                        recommendation: [...result.data]
                    })

                    // return axios.get(`${apiUri}/feedback/${this.state.id}`, {
                    //     headers: {
                    //         "Content-type": "application/json",
                    //     }
                    // })

                }).catch(err => {
                    Alert.alert(`Oops! Somethings wrong!`, `Error code: ${err.response.status}. ${err.response.data.message}`)
                })
            })
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        console.log(params)
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.title,
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

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setLoadingVisible(visible) {
        this.setState({ loading: visible });
    }

    addToCart() {
        Alert.alert('Continue?', 'Do you want to add product to the cart?',
            [
                {
                    text: 'OK', onPress: () => {
                        this.setModalVisible(false)
                        this.setLoadingVisible(true)

                        axios.post(`${apiUri}/cart/add`,
                            {
                                quantity: this.state.quantity,
                                productId: this.state.data.id
                            },
                            {
                                headers: {
                                    "Content-type": "application/json",
                                    "Authorization": `Bearer ${this.state.token}`
                                },
                            }).then(result => {
                                //console.log(result)
                                setTimeout(() => {
                                    this.setLoadingVisible(false)
                                    Alert.alert('Success!', result.data.message,
                                        [{
                                            text: 'OK',
                                        },
                                        {
                                            text: 'VIEW CART', onPress: () => {
                                                this.props.navigation.navigate('Cart')
                                            }
                                        }],
                                        {
                                            cancelable: false
                                        }
                                    )
                                }, 1000)


                            }).catch(err => {


                                setTimeout(() => {
                                    this.setLoadingVisible(false)
                                    Alert.alert('Oops!, Somethings wrong!', err.response.data.message)
                                }, 1000)
                            })
                    }
                },
                { text: 'Cancel' }

            ])
    }

    incrementQuantity() {

        let currentQuantity = this.state.quantity
        if (currentQuantity <= this.state.data.stocks - 1) {
            currentQuantity++
            this.setState({
                quantity: currentQuantity,
                price: (this.state.quantity + 1) * this.state.data.productPrice
            })
        }
    }

    decrementQuantity() {

        if (this.state.quantity >= 2) {
            this.setState({
                quantity: this.state.quantity - 1,
                price: (this.state.quantity - 1) * this.state.data.productPrice
            })
        }
    }

    _onPress(item) {
        //console.log(item)
        this.props.navigation.navigate("Product", {
            productId: item.id,
            title: item.productName
        })
    }



    render() {
        const { params } = this.props.navigation.state

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#e74c3c" />
                <ScrollView

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={{ height: 350 }}>
                        <View style={{ flex: 1 }}>
                            <Swiper
                                activeDotColor="#e74c3c">
                                <View style={{ flex: 1 }}>
                                    <Image source={{
                                        uri: this.state.data.imageCover,
                                        headers: {
                                            "Authorization": `Bearer ${this.state.token}`
                                        }
                                    }}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                            </Swiper>
                        </View>
                    </View>

                    <View style={{ padding: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 18, color: "black" }}>{this.state.data.productName}</Text>
                        <Text style={{ fontSize: 18, color: "#e74c3c", fontWeight: "bold" }}>&#8369; {this.state.data.productPrice}</Text>
                    </View>

                    <View style={{ padding: 10, marginTop: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Description: {"\n"}</Text>
                        <Text style={{ fontSize: 15 }}>{this.state.data.productDescription}</Text>
                    </View>

                    <View style={{ padding: 10, marginTop: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Feedbacks {"\n"}</Text>
                        {/* {
                            this.state.token !== null &&
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                
                                <TextInput style={{ flex: 4 }} />
                                <TouchableOpacity
                                    style={{ flex: 1, alignItems: "center", backgroundColor: "#e74c3c", padding: 10 }} >
                                    <Text style={{ color: "white" }}>Post</Text>
                                </TouchableOpacity>
                            </View>
                        } */}
                    </View>

                    <View style={{ padding: 10, marginTop: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>You might also like {"\n"}</Text>
                    </View>
                    <View style={{ marginBottom: 70 }}>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => { console.log("refresh the list") }}
                                    title="Pull to refresh"
                                    tintColor="#e74c3c"
                                    titleColor="#e74c3c"

                                />
                            }
                            onEndReached={(info) => { console.log(info) }}
                            horizontal={true}
                            data={this.state.recommendation}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <TouchableOpacity

                                    onPress={() => this._onPress(item)}>
                                    <Card
                                        cardTitle={item.productName}
                                        cardPrice={item.productPrice}
                                        cardRating={50}
                                        cardImage={item.imageCover}
                                    />
                                </TouchableOpacity>
                            }
                        />
                    </View>

                </ScrollView>





                <View style={styles.container}>
                    <View style={styles.items}>
                        <TouchableOpacity>
                            <Icon name="comments" size={25} color="#e74c3c" />
                            <Text style={{ fontSize: 13, color: "#e74c3c" }}>CHAT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: "center", justifyContent: "center", backgroundColor: "#e74c3c" }}>
                        <Text style={{ fontSize: 13, color: "white" }}>BUY NOW</Text>
                    </View>
                    <View style={styles.items}>
                        <TouchableOpacity
                            onPress={() => { this.setModalVisible(true) }}>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Icon name="shopping-cart" size={25} color="#e74c3c" />
                                <Text style={{ fontSize: 13, color: "#e74c3c" }}>ADD TO CART</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* MODAL FOR ADDING TO CART */}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <View style={{ flex: 1, backgroundColor: "black", opacity: 0.6 }}>
                    </View>
                    <View style={styles.modalContainer}>

                        <View style={{ flexDirection: "row", margin: 20 }}>
                            <View style={{ flex: 1 }}>
                                <Image source={{
                                    uri: this.state.data.imageCover,
                                    headers: {
                                        "Authorization": `Bearer ${this.state.token}`
                                    }
                                }}
                                    style={{ width: 140, height: 150, borderRadius: 10, }}
                                />

                                <Text>{this.state.data.productName}</Text>
                                <Text >Price: &#8369; {this.state.data.productPrice}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text >Stocks: </Text>
                                    <Text >{this.state.data.stocks}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }}>

                                <View style={{ alignItems: "center" }}>
                                    <Text>Quantity</Text>
                                    <TouchableOpacity onPress={this.incrementQuantity}>
                                        <Entypo name="chevron-thin-up" size={30} color="#e74c3c" />
                                    </TouchableOpacity >

                                    <Text style={{ textAlign: "center", fontSize: 30 }}>{this.state.quantity}</Text>
                                    <TouchableOpacity onPress={this.decrementQuantity}>
                                        <Entypo name="chevron-thin-down" size={30} color="#e74c3c" />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 20 }}>Total   </Text>
                                        <Text style={{ color: "#e74c3c", fontSize: 30, fontWeight: "bold" }} >&#8369; {this.state.price === 0 ? this.state.data.productPrice : this.state.price}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        {/* Buttons add to Cart and Cancel */}
                        <View style={styles.modalButtonContainer}>
                            <View style={{ backgroundColor: '#1abc9c', flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity style={{ padding: 18 }} onPress={() => { this.setModalVisible(false) }}>
                                    <Text style={{ color: "white", fontSize: 15 }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ backgroundColor: '#e74c3c', flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity style={{ padding: 18 }} onPress={this.addToCart}>
                                    <Text style={{ color: "white", fontSize: 15 }}>ADD TO CART</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {/* End of Buttons add to Cart and Cancel */}

                    </View>

                </Modal>

                {this.state.loading &&
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

        flexDirection: "row",
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
        backgroundColor: "white"
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