import React, { Component } from "react";
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { AsyncStorage } from "react-native";


export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            reciever: ""
        }

        this.socket = new WebSocket('ws://192.168.8.103:8080?serialnumber=imtopher')
        this.socket.onopen = this.socketOpen.bind(this)
        this.socket.onmessage = this.socketMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    socketOpen() {
        //alert('connected pa dion')
    }

    socketMessage(message) {
        //alert(message.data)
        //GiftedChat.a
        this.setState(previousState => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: message.data,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        avatar: 'https://cdn.movieweb.com/img.news.tops/NEF2TArJYNFmJL_1_a/Avatar-2-Sequels-Underwater-Scenes-Motion-Capture.jpg',
                    },
                })
            }
        })

        //console.log(this.state.messages)
    }

    sendMessage(message) {
        this.socket.send(JSON.stringify(message))
    }




    componentWillMount() {
        
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))

        AsyncStorage.mergeItem("chat", JSON.stringify(this.state.messages)).then(result => {
            this.sendMessage({
                to: "imanotherone",
                message: "hello"
            })
        })
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'yellow',
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'red',
                    },
                }}
            />
        )
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: {
                                    color: 'white',
                                },
                                left: {
                                    color: "#e74c3c"
                                }
                            }}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: 'white',
                                },
                                right: {
                                    backgroundColor: "#e74c3c"
                                }
                            }}
                        />
                    );
                }}
            />
        )
    }
}