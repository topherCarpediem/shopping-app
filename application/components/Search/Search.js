import React, { Component } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import axios from "axios";
import { apiUri } from "../../../config";

import Card from "../Card/Card";

export default class Search extends Component {
    constructor(props){
        super(props)

        this.state = {
            result: []
        }
    }

    componentDidMount(){
        const { params } = this.props.navigation.state;
        axios.get(`${apiUri}/search/${params.keyword}`).then(result => {
            this.setState({
                result: result.data
            })
        }).catch(err => {
            
        })

    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: `Search for "${params.keyword}"`,
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

    _onPress(item) {
        console.log(item)
        this.props.navigation.navigate("Product", {
            productId: item.id,
            title: item.productName
        })
    }


    render(){
        return(
            <FlatList
                refreshControl={
                    <RefreshControl
                        
                        title="Pull to refresh"
                        tintColor="#e74c3c"
                        titleColor="#e74c3c"
                        
                    />
                }
                //refreshing={this.state.refreshing}
                //onRefresh={() => { this.setState({ refreshing: true }); console.log("refresh the list"); }}
                onEndReached={(info) => { console.log(info) }}
                numColumns={2}
                data={this.state.result}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => this._onPress(item)}>
                        <Card
                            cardTitle={item.productName}
                            cardPrice={item.productPrice}
                            cardRating={50}
                            cardImage={item.imageCover}
                            //cardCredentials={this.state.token}
                        />
                    </TouchableOpacity>
                }
            />
        )
    }
}