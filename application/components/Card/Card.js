import React, { Component } from "react";
import { View, Text, Image, ToastAndroid, Dimensions, TouchableOpacity } from "react-native";

import styles from "../../styles/Card"

export default class CardView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "This is the long card title that needs to be cut if nejhdd sjd jhdfjh ad djdhd djdhd d",
            cardContainer: {
                //backgroundColor: "green",
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
    }


    render() {
        return (

            <View style={this.state.cardContainer}>
                <Image
                    source={{
                        uri: this.props.cardImage,
                    }}
                    style={this.state.image}
                />
                <Text style={{margin: 5, marginBottom: 0, fontSize: 16, color: "#171717",}}>{this.props.cardTitle.length > 57 ? this.props.cardTitle.slice(0, 54) + "..." : this.props.cardTitle}</Text>
                <View style={{ flexDirection: "row", position: "absolute", bottom: 0, margin: 5  }}>
                    <Text style={{ flex:1, color: "#e74c3c"}}>&#8369; {this.props.cardPrice}</Text>
                    {/* <Text style={{ flex:1, textAlign: "right" }}>{this.props.cardRating}</Text> */}
                </View>
            </View>

        )
    }
}