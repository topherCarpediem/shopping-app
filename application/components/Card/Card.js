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
        console.log(this.props.cardImage)
        //this.cardPress = this.cardPress.bind(this)

    }

    // componentWillMount() {
    //     ToastAndroid.show(this.props.data.length.toString(), ToastAndroid.SHORT)
    // }

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
                <Text>{this.props.cardTitle}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text >{this.props.cardPrice}</Text>
                    <Text >{this.props.cardRating}</Text>
                </View>
            </View>

        )
    }


}