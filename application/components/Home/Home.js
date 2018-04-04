import React, { Component } from "react";
import {
    ToastAndroid,
    AsyncStorage,
    BackHandler,
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    Easing,
    Animated,
    Alert
} from "react-native";

import { apiUri } from "../../../config";
import { StackNavigator } from "react-navigation";
import axios from "axios";

import SearchBar from "./SearchBar/SearchBar";
import Banner from "./Banner/Banner";
import Nav from "./Nav/Nav";
import Category from "../Category/Category"
import Card from "../Card/Card";
import Product from "../Product/Product";
import Splash from "./Splash";
import ProductList from "../Product/ProductList";
import Cart from "../Cart/Cart";


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
        }

        axios.get(`${apiUri}/product/page/1`,
            {
                headers: {
                    "Content-type": "application/json",
                }
            })
            .then(result => {

                this.setState({
                    data: [
                        ...this.state.data,
                        ...result.data
                    ],

                })
            }).catch(err => {
                Alert.alert('Error', err.response.data.message)
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

            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#e74c3c" />
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
                                {
                                    this.state.data.map(card => {
                                        return (
                                            <TouchableOpacity key={i++}
                                                onPress={this.cardPress.bind(this, card.id, card.productName)}>
                                                <Card key={i++}
                                                    cardTitle={card.productName}
                                                    cardPrice={card.productPrice}
                                                    cardRating={50}
                                                    cardImage={card.imageCover}
                                                    //cardCredentials={this.state.token}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View >

                        </View>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("ProductList", {
                                title: "Discover"
                            })}
                            style={styles.seeMoreButton}>

                            <Text style={{ color: "#e74c3c", fontSize: 18, padding: 10 }}>SEE MORE</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <SearchBar />


            </View>
        )
    }
}

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            })

            return { transform: [{ translateX }] }
        },
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
            }
        },
        ProductList: {
            screen: ProductList
        },
        CartStack: {
            screen: Cart
        }
    }, {
        transitionConfig: transitionConfig,
    })

const styles = StyleSheet.create({
    seeMoreButton: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        margin: 10
    }
})

