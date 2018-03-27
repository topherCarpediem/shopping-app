import React, { Component } from "react";
import { ToastAndroid, AsyncStorage, BackHandler, View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

import { StackNavigator } from "react-navigation";

import SearchBar from "./SearchBar/SearchBar";
import Banner from "./Banner/Banner";
import Nav from "./Nav/Nav";
import Category from "../Category/Category"
import Card from "../Card/Card";
import Product from "../Product/Product";


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            token: ""
        }

        AsyncStorage.getItem("token").then(token => {
            
            this.setState({ token: token })
            return fetch("http://10.24.254.71:3001/product/page/1", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(result => {
                return result.json()
            })
        }).then(result => {
            this.setState({
                data: [
                    ...this.state.data,
                    ...result
                ]
            })
            
            //console.log(this.state)
        }).catch(err => {
            //console.log(err)
            ToastAndroid.show(err.message, ToastAndroid.SHORT)
        })

    }

    cardPress(eto, title) {

        this.props.navigation.navigate("Product", {
            productId: eto,
            title
        })
    }

    render() {
        let i = 0
        return (

            <View style={{ flex: 1, }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, marginBottom: 10 }}>
                        <View style={{ height: 250, backgroundColor: "white" }}>
                            <Banner />
                        </View>
                        <View style={{ height: 250 }}>
                            <Category />
                        </View>
                        <View style={{ marginTop: 38 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5, color: "#e74c3c", fontWeight: "bold" }}>DISCOVER PRODUCTS</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                                {this.state.data.map(card => {
                                    return (
                                        <TouchableOpacity key={i++}
                                            onPress={this.cardPress.bind(this, card.id, card.productName)}>
                                            <Card key={i++}
                                                cardTitle={card.productName}
                                                cardPrice={card.productPrice}
                                                cardRating={50}
                                                cardImage={card.imageCover}
                                                cardCredentials={this.state.token}
                                            />
                                        </TouchableOpacity>
                                    )
                                })}

                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Product")}
                            style={styles.seeMoreButton}
                        >
                            <Text style={{ color: "#e74c3c", fontSize: 18, padding: 10 }}>SEE MORE</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <SearchBar />

            </View>
        )
    }
}


export default StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null,
            },
        },
        Product: {
            screen: Product,
            navigationOptions: {
                gesturesEnabled: false,
                tabBarVisible: false
            }
        }
    }, {
        // transitionConfig: () => ({ screenInterpolator: () => null }),
    })

const styles = StyleSheet.create({
    seeMoreButton: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        margin: 10
    }
})

