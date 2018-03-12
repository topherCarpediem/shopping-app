import React, { Component } from "react";
import { View } from "react-native";
import Card from "./Card"

export default class CardContainer extends Component {
    constructor(props) {
        super(props)   
    }
    render() {
        return (
            <View>
            {this.props.data.map(cardItem => {
                <Card 
                    id={cardItem.id}
                    title={cardItem.title}
                    price={cardItem.price}
                    training={cardItem.training}
                />
            })}
            </View>
        )
    }
}
