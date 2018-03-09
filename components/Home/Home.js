import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from "react-native";

import SearchBar from "./SearchBar";
import Banner from "./Banner";
import Nav from "./Nav";
import Category from "./Category"

export default class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{flex: 1,backgroundColor: "#d9d9d9"}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}>
                    <View style={{ height: 250}}>
                        <Banner />
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{ height: 250 }}>
                            <Category />
                        </View>
                    </View>
                    <Text>asasdasd</Text>
                    <Text>asasdasd</Text>
                </ScrollView>

                <SearchBar />
                <Nav />    
            </View>
        )
    }
}