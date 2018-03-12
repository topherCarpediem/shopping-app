import React, { Component } from "react";
import { View, Text, Image, ToastAndroid, Dimensions, TouchableOpacity } from "react-native";

import styles from "../../styles/Card"

export default class CardView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardContainer: {
                margin: 2.5,
                backgroundColor: "white",
                height: ((Dimensions.get("window").width / 2) - 7.5) + 75,
                width: (Dimensions.get("window").width / 2) - 7.5
            },
            image: {
                width: (Dimensions.get("window").width / 2) - 7.5,
                height: (Dimensions.get("window").width / 2) - 7.5
            }
        }

        //this.cardPress = this.cardPress.bind(this)

    }

    // componentWillMount() {
    //     ToastAndroid.show(this.props.data.length.toString(), ToastAndroid.SHORT)
    // }

    render() {
        return (

            <View style={this.state.cardContainer}>
                <Image
                    source={require("../../../src/assets/images/480x270.png")}
                    style={this.state.image}
                />
                <Text>{this.props.cardTitle}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text >{this.props.cardPrice}</Text>
                    <Text >{this.props.cardRating}</Text>
                </View>
            </View>

        )
    }


}