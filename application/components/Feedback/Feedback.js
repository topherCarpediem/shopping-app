import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, AsyncStorage } from "react-native";

import axios from "axios";
import { apiUri } from "../../../config";

import moment from "moment";

export default class Feedback extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feedbacks: [],
            token: "",
            comment: "",
            productId: "",
            feedback: false
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state

        AsyncStorage.getItem("token").then(token => {
            this.setState({
                token: token,
                productId: params.productId,
                feedback: params.feedback
            })

            axios.get(`${apiUri}/feedback/getall/${params.productId}`, {
                headers: {
                    "Content-type": "application/json",
                }
            }).then(result => {
                this.setState({
                    feedbacks: result.data
                })
            }).catch(err => {

            })
        })


    }

    _addFeedBack() {
        if (this.state.comment !== "") {
            const comment = this.state.comment
            this.setState({
                comment: ""
            })
            axios.post(`${apiUri}/feedback/add/${this.state.productId}`,
                {
                    message: comment
                },
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${this.state.token}`
                    }
                }).then(result => {
                    return axios.get(`${apiUri}/feedback/getall/${this.state.productId}`, {
                        headers: {
                            "Content-type": "application/json",
                        }
                    })
                }).then(result => {
                    this.setState({
                        feedbacks: result.data
                    })
                })
                .catch(err => {

                })
        }
    }


    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params.title,
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{
                        marginBottom: 70
                    }}
                    keyExtractor={(item) => item.id}
                    data={this.state.feedbacks}
                    renderItem={({ item }) =>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontWeight: "bold", color: "#e74c3c" }}>{item.user.firstName} {item.user.lastName}</Text>
                            <Text>{item.message}</Text>
                            <Text style={{ fontSize: 12 }}>{moment(item.created_at).fromNow()}</Text>
                            {/* <Text style={{ fontWeight: "bold" }}>{feedback.user.firstName} {feedback.user.lastName}</Text>
                            <Text>{feedback.message}</Text>
                            <Text style={{ fontSize: 12 }}>{moment(feedback.created_at).fromNow()}</Text> */}
                        </View>
                    }
                />
                {
                    this.state.feedback === true &&
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        position: "absolute",
                        bottom: 0,
                        borderWidth: 1,
                        margin: 10,
                        borderRadius: 15,
                        borderColor: "#e74c3c",

                    }}>
                        <TextInput
                            placeholder="Write comment"
                            multiline={true}
                            value={this.state.comment}
                            onChangeText={(text) => { this.setState({ comment: text }) }}
                            underlineColorAndroid="transparent"
                            style={{
                                flex: 1,
                                maxHeight: 100,
                                marginLeft: 10
                            }} />
                        <TouchableOpacity
                            onPress={() => {
                                this._addFeedBack()
                            }}
                            style={{
                                justifyContent: "center",
                                alignContent: "center",
                                padding: 10,
                                paddingLeft: 15,
                                paddingRight: 15,
                            }}>
                            <Text style={{
                                color: "#e74c3c"
                            }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}