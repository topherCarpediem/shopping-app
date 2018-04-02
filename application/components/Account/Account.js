import React, { Component } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    Image,
    FlatList,
    TabBa
} from "react-native";

import { TabNavigator, StackNavigator } from "react-navigation";

import axios from "axios";
import { apiUri } from "../../../config";

 class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: "",
            data: [{
                id: "",
                sd: "asdasd"
            }]
        }
    }

    componentWillMount() {
        AsyncStorage.getItem("token").then(token => {
            this.setState({
                token
            })
        })
    }

    componentDidMount() {
        axios.get(`${apiUri}/user/info`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(result => {
            console.log(result)
        }).then(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <View>
                            <View style={{ backgroundColor: "green", height: 150 }}>
                                <Image />
                            </View>
                        </View>
                    }
                />

                <Text>asdasdASd</Text>
                <ActivityIndicator size="small" color="#00ff00" animating={true} />
            </View>
        )
    }
}


class Topher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: "",
            data: [{
                id: "",
                sd: "asdasd"
            }]
        }
    }

    componentWillMount() {
        AsyncStorage.getItem("token").then(token => {
            this.setState({
                token
            })
        })
    }

    componentDidMount() {
        axios.get(`${apiUri}/user/info`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(result => {
            console.log(result)
        }).then(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <View>
    

                <Text>asdasdASd</Text>
                <ActivityIndicator size="small" color="#00ff00" animating={true} />
            </View>
        )
    }
}





const Style = TabNavigator({
    Buyer: {
        screen: Account
    },
    Sell: {
        screen: Topher
    }
})

export default StackNavigator({
    Account: {
        screen: Style,
        navigationOptions: {
            header: 'None'
        }
    }
})