import React, { Component } from "react";
import { BackHandler,View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

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
            data: [
                {
                    id: 6,
                    title: "The first title adslfkj asdfaj sldkfjlaksdfalksdfj asdlfj asdflksdf lkasdjf lk ",
                    price: 100,
                    rating: "5 stars"
                },
                {
                    id: 4,
                    title: "The 2nd title",
                    price: 100,
                    rating: "5 stars"
                },
                {
                    id: 213,
                    title: "The 3tf title",
                    price: 100,
                    rating: "5 stars"
                },
                {
                    id: 6656,
                    title: "The 4th title",
                    price: 100,
                    rating: "5 stars"
                },
                {
                    id: 6554546,
                    title: "The 5th title",
                    price: 100,
                    rating: "5 stars"
                }
            ]
        }

        this._handleBackPress = this._handleBackPress.bind(this)
       
    }

    
    cardPress(eto, title) {
        console.log(eto)
        this.props.navigation.navigate("Product", {
            productId: eto,
            title
        })
    }
    
    

    render() {
        let i = 0
        return (
            
            <View style={{ flex: 1, backgroundColor: "#d9d9d9" }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, marginBottom: 70 }}>
                        <View style={{ height: 250, backgroundColor: "white" }}>
                            <Banner />
                        </View>
                        <View style={{ height: 250 }}>
                            <Category />
                        </View>
                        <View style={{ marginTop: 48 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5, color: "#e74c3c", fontWeight: "bold" }}>DISCOVER PRODUCTS</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                                {this.state.data.map(card => {
                                    return (
                                        <TouchableOpacity key={i++}
                                            onPress={this.cardPress.bind(this, card.id, card.title)}>
                                            <Card key={i++}
                                                cardTitle={card.title}
                                                cardPrice={card.price}
                                                cardRating={card.rating}

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


export default StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
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

