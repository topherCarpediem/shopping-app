import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    AsyncStorage,
    Alert,
    TouchableOpacity,
    Image,
    Modal
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios"
import { apiUri } from "../../../config";
import QRCode from 'react-native-qrcode';

export default class PickUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            refreshing: false,
            token: "",
            modalVisible: false,
            qrCodeValue: 'initialValue'
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

                const cleanCopy = []

                result.data.forEach(product => {
                    let unique = true
                    cleanCopy.forEach(copy => {
                        if(product.product.id === copy.product.id){
                            unique = false
                        }
                    })
                    if(unique){
                        cleanCopy.push(product)
                    }
                })

                this.setState({
                    data: [
                        ...cleanCopy
                    ]
                })
                //console.log(cleanCopy)
            }).catch(err => {
                Alert.alert('Error', err.response.data.message)
            })
        })
    }

    static navigationOptions = () => {

        return {
            title: "Pick up",
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

                                <View style={{ width: 100, height: 100, flex: 1.3 }}>
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

                                <View style={{ padding: 10, flex: 2 }}>
                                    <Text>{item.product.productName}</Text>
                                    <Text>Stocks: {item.product.stocks}</Text>
                                    <Text style={{ fontWeight: 'bold', color: "#e74c3c" }}>Price: &#8369; {item.product.productPrice}</Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                modalVisible: true,
                                                qrCodeValue: item.product.id
                                            })
                                        }}
                                        style={{
                                            alignSelf: "flex-end",
                                            alignItems: "center",
                                            padding: 10
                                        }}>
                                        <Icon name="qrcode" color="#e74c3c" size={50} />
                                        <Text style={{ textAlign: "center" }}>View QRCode</Text>
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
                    <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.6 }}></View>
                    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", justifyContent: "center" }}>
                        <QRCode
                            value={this.state.qrCodeValue}
                            size={200}
                            bgColor='black'
                            fgColor='white' />

                        <TouchableOpacity
                            style={{
                                alignSelf: "center",
                                marginTop: 25,
                                padding: 30,
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: "#e74c3c",
                                
                            }}
                            onPress={() => [
                                this.setState({
                                    modalVisible: false
                                })
                            ]}>
                            <Text style={{ color: "white"}}>Close</Text>
                        </TouchableOpacity>
                    </View>




                </Modal>
            </View>
        )
    }
}
