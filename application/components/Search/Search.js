import React, { Component } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Picker } from "react-native";
import axios from "axios";
import { apiUri } from "../../../config";

import Card from "../Card/Card";

export default class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            originalCopy: [],
            result: [],
            top1: "",
            top2: "",
            filters: [],
            filter1: "",
            filter2: "",
            filter3: "",
            filter1Array: [],
            filter2Array: [],
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        axios.get(`${apiUri}/search/${params.keyword}`).then(result => {

            this.setState({
                originalCopy: result.data,
                result: result.data
            })

            const top2 = this.filterTop2(result.data)

            this.setState({ top1: top2[0], top2: top2[1] })

            const tempVarForFilter1 = []
            const tempVarForFilter2 = []

            this.state.filters.forEach(filter => {
                if (filter.featureName === top2[0]) {
                    tempVarForFilter1.push(filter.featureValue)
                }

                if (filter.featureName === top2[1]) {
                    tempVarForFilter2.push(filter.featureValue)
                }
            })

            this.setState({
                filter1Array: tempVarForFilter1,
                filter2Array: tempVarForFilter2
            })

            //alert(JSON.stringify(this.state.filter2Array))

        }).catch(err => {

        })

    }

    filterTop2(data) {
        const filters = []
        const keys = {}
        const filteredKeys = []

        data.forEach(feature => {
            feature.productFeatures.forEach(filter => {
                filters.push(filter)
            })
        })

        filters.forEach(feature => {
            if (feature.featureName in keys) {
                keys[feature.featureName] += keys[feature.featureName]
            } else {
                keys[feature.featureName] = 1
            }
        })

        this.setState({
            filters
        })

        for (const key in keys) {
            if (keys.hasOwnProperty(key)) {
                const element = keys[key];
                if (filteredKeys.length < 2) {
                    filteredKeys.push(key)
                }
            }
        }

        //alert(JSON.stringify(filteredKeys))
        return filteredKeys

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

    _onFilter1Change(text) {
        if (text === "") {
            this.setState({
                result: this.state.originalCopy,
                filter1: `Filter by ${this.state.top1}`
            })
        } else {
            const tempVar = []
            this.state.originalCopy.forEach(feature => {
                feature.productFeatures.forEach(filter => {
                    if (filter.featureValue === text) {
                        tempVar.push(feature)
                    }
                })
            })

            this.setState({ filter1: text, filter2: `Filter by ${this.state.top2}`, result: tempVar })
        }

    }

    _onFilter2Change(text) {
        if (text === "") {
            this.setState({
                result: this.state.originalCopy,
                filter2: `Filter by ${this.state.top2}`
            })
        } else {
            const tempVar = []
            this.state.originalCopy.forEach(feature => {
                feature.productFeatures.forEach(filter => {
                    if (filter.featureValue === text) {
                        tempVar.push(feature)
                    }
                })
            })
            this.setState({ filter2: text, filter1: `Filter by ${this.state.top2}`, result: tempVar })
        }

      
    }

    _onPriceRangeChange(text) {

    }


    render() {
        return (
            <View>
                <View style={{ flexDirection: "row" }}>
                    {
                        this.state.top1 !== "" &&
                        <View style={{ flex: 1 }}>
                            <Picker
                                selectedValue={this.state.filter1}
                                onValueChange={(itemValue, itemIndex) => { this._onFilter1Change(itemValue) }}>
                                <Picker.Item label={`Filter by ${this.state.top1}`} value="" />
                                {
                                    this.state.filter1Array.map(filter => {
                                        return (
                                            <Picker.Item label={filter} value={filter} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                    }

                    {
                        this.state.top2 !== "" &&
                        <View style={{ flex: 1 }}>
                            <Picker
                                selectedValue={this.state.filter2}
                                onValueChange={(itemValue, itemIndex) => { this._onFilter2Change(itemValue) }}>
                                <Picker.Item label={`Filter by ${this.state.top2}`} value="" />
                                {
                                    this.state.filter2Array.map(filter => {
                                        return (
                                            <Picker.Item label={filter} value={filter} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                    }

                    {/* <View style={{ flex: 1 }}>
                        <Picker
                            selectedValue={this.state.filter3}
                            onValueChange={(itemValue, itemIndex) => this.setState({ filter3: itemValue })}>
                            <Picker.Item label="Price range..." value="" />
                            <Picker.Item label="LOW TO HIGH" value="low-to-high" />
                            <Picker.Item label="HIGH TO LOW" value="high-to-low" />
                        </Picker>
                    </View> */}

                </View>
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
            </View>
        )
    }
}