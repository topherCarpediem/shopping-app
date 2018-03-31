import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from "react-native-swiper";

export default class Product extends Component {
    constructor(prop) {
        super(prop)

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state

        console.log(params)
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.title,
            //tabBarVisible: true
        }
    };

    render() {
        const { params } = this.props.navigation.state

        return (
            <View style={{ flex: 1, backgroundColor: "#d9d9d9" }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={{ height: 350 }}>
                        {/* <Text>{params.productId}</Text>
                <Text>{params.sup}</Text> */}
                        <View style={{ flex: 1 }}>
                            <Swiper
                                activeDotColor="#e74c3c"
                            >
                                <View style={{ flex: 1 }}>
                                    <Image source={{ uri: "https://www.nature.org/cs/groups/webcontent/@web/@caribbean/documents/media/caribbean-diver-640x400.jpg" }}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Image source={{ uri: "http://www.123mobilewallpapers.com/wp-content/uploads/2014/07/danbo_in_forest.jpg" }}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Image source={{ uri: "http://www.123mobilewallpapers.com/wp-content/uploads/2014/07/beautiful_fantasy_girl.jpg" }}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                            </Swiper>
                        </View>
                    </View>

                    <View style={{ padding: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 18, color: "black" }}>Title</Text>
                        <Text style={{ fontSize: 18, color: "#e74c3c", fontWeight: "bold" }}>Price</Text>

                    </View>

                    <View style={{ padding: 10, marginTop: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                    </View>

                    <View style={{ padding: 10, marginTop: 10, backgroundColor: "white" }}>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                        <Text style={{ fontSize: 15 }}>Product Description</Text>
                    </View>

                </ScrollView>

                <View style={styles.container}>
                    <View style={styles.items}>
                        <TouchableOpacity>
                            <Icon name="comments" size={25} color="white" />
                            <Text style={{ fontSize: 13, color: "white" }}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: "center", justifyContent: "center", backgroundColor: "#e74c3c" }}>
                        <Text style={{ fontSize: 13, color: "white" }}>BUY NOW</Text>
                    </View>
                    <View style={styles.items}>
                        <Icon name="shopping-cart" size={25} color="white" />
                        <Text style={{ fontSize: 13, color: "white" }}>Add to Cart</Text>
                    </View>
                </View>

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
        backgroundColor: "#1abc9c"
    }
})