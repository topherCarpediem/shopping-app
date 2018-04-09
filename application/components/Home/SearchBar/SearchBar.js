import React, { Component } from "react";
import { View, StyleSheet, TextInput, Alert, Text, Dimensions, FlatList, TouchableOpacity, Keyboard } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Axios from "axios";
import { apiUri } from "../../../../config";

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    _search(text) {
        if (text === "") {
            this.setState({
                results: []
            })
        } else {
            //Alert.alert('asdasd', text)
            Axios.get(`${apiUri}/search/${text}`).then(result => {
                this.setState({
                    results: result.data
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }

    _searchButtonClicked(text){
        
        if(text === ""){

        } else {
            this.setState({
                results: []
            })

            this.props.navigation.navigate('Search', {
                keyword: text
            })
            //Alert.alert('asdasd', text)
        }    
    }

    _onResultClick(text){
        //Alert.alert('Result clicked', text)
        this.setState({
            results: []
        })

        this.props.navigation.navigate('Search', {
            keyword: text
        })
    }
    render() {
        return (
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Icon style={styles.emailIcon} name="search" size={20} color="#e74c3c" />
                    <TextInput
                        returnKeyType="search"
                        onSubmitEditing={(text) => { this._searchButtonClicked(text.nativeEvent.text) }}
                        onChangeText={(text) => { this._search(text) }}
                        placeholder="Search product"
                        style={styles.input}
                        underlineColorAndroid='transparent'
                    />
                </View>

                <View style={{ maxHeight: 280 }}>
                {this.state.results.length > 0 &&

                   <FlatList
                        keyExtractor={(item) => item.id} 
                        data={this.state.results}
                        renderItem={({item}) => 
                        <View style={{  borderTopWidth: 1 }}>
                            <TouchableOpacity 
                                onPress={() => { this._onResultClick(item.productName) }}
                                style={{  padding: 15 }}>
                                <Text>{item.productName}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                   />
                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {

        position: "absolute",
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 15,
        backgroundColor: "white",
        width: Dimensions.get("window").width - 10

    },
    input: {
        flex: 1,
        height: 35,
        padding: 10
    },
})