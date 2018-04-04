import React, { Component } from "react";
import { View, FlatList, Text, Alert, TouchableOpacity, RefreshControl, StatusBar } from "react-native";

import Card from "../Card/Card";

import { apiUri } from "../../../config";
import axios from "axios";

export default class ProductList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            
            id: "",
            refreshing: false
        }


    }


    componentWillMount() {
        
    }

    componentDidMount() {

        axios.get(`${apiUri}/product/page/1`, {
            headers: {
                "Content-type": "application/json",
            }
        }).then(result => {
            this.setState({
                data: [
                    ...this.state.data,
                    ...result.data
                ]
            })
        }).catch(err => {
            //console.log(err.response)
            Alert.alert(err.response.data.message, err.response.data.reason)
        })
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.title,
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
         
            //tabBarVisible: false
        }
    };

    _onPress(item) {
        console.log(item)
        this.props.navigation.navigate("Product", {
            productId: item.id,
            title: item.productName
        })
    }

    render() {
        return (
            <View >
                <StatusBar
                backgroundColor="#e74c3c"/>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => { console.log("refresh the list")}}
                        title="Pull to refresh"
                        tintColor="#e74c3c"
                        titleColor="#e74c3c"
                        
                    />
                }
                //refreshing={this.state.refreshing}
                //onRefresh={() => { this.setState({ refreshing: true }); console.log("refresh the list"); }}
                onEndReached={(info) => { console.log(info) }}
                numColumns={2}
                data={this.state.data}
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
            </View>
        )
    }
}




