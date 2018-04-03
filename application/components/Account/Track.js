import React, { Component } from "react";
import { View, Text, AsyncStorage, Image } from "react-native";
import axios from "axios";
import { apiUri } from "../../../config";


import Icon from "react-native-vector-icons/Ionicons";

export default class Track extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: "",
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state

        AsyncStorage.getItem('token').then(token => {
            axios.get(`${apiUri}/order/${params.orderId}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(result => {
                this.setState({
                    token: token,
                    data: result.data

                })
                //console.log(result.data)
                console.log(this.state.data)
            }).catch(err => {
                console.log(err.response)
            })
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
                {this.state.data &&
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={{
                                    uri: this.state.data.product.imageCover,
                                    headers: {
                                        "Authorization": `Bearer ${this.state.token}`
                                    }
                                }}
                                style={{ width: 100, height: 100 }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text>{this.state.data.product.productName}</Text>
                                <Text>Quantity: {this.state.data.quantity} piece(s)</Text>
                                <Text>&#8369; {this.state.data.product.productPrice}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 100 }}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Icon name="ios-checkmark-circle" size={65} color="#e74c3c"/>
                                <Text>Processing</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Icon name="ios-checkmark-circle-outline" size={65} />
                                <Text>Shipped</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Icon name="ios-checkmark-circle-outline" size={65} />
                                <Text>Delivery</Text>
                            </View>

                        </View>
                    </View>
                }

            </View>
        )
    }
}