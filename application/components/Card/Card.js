import React, { Component } from "react";
import { View, Text, Image, ToastAndroid, Dimensions, TouchableOpacity } from "react-native";

import styles from "../../styles/Card"

export default class CardView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "This is the long card title that needs to be cut if nejhdd sjd jhdfjh ad djdhd djdhd d",
            cardContainer: {
                flex: 1,
                margin: 2.5,
                backgroundColor: "white",
                height: ((Dimensions.get("window").width / 2) - 7.5) + 65,
                width: (Dimensions.get("window").width / 2) - 7.5
            },
            image: {
                width: (Dimensions.get("window").width / 2) - 7.5,
                height: (Dimensions.get("window").width / 2) - 7.5
            }
        }
        console.log(this.props.cardImage)

    }


    render() {
        return (

            <View style={this.state.cardContainer}>
                <Image
                    source={{
                        uri: "http://10.24.254.71:3001/product/images/633028c0b86b6d66b147885937990738.png",
                        headers: {
                            "Authorization": `Bearer ${this.props.cardCredentials}`
                        }
                    }}
                    style={this.state.image}
                />
                <Text style={{margin: 5, marginBottom: 0, fontSize: 16, color: "#171717",}}>{this.state.title.length > 57 ? this.state.title.slice(0, 54) + "..." : this.state.title}</Text>
                <View style={{ flexDirection: "row", position: "absolute", bottom: 0, margin: 5  }}>
                    <Text style={{ flex:1, color: "#e74c3c"}}>&#8369; {this.props.cardPrice}</Text>
                    <Text style={{ flex:1, textAlign: "right" }}>{this.props.cardRating}</Text>
                </View>
            </View>

        )
    }


}