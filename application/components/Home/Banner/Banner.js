import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import Swiper from "react-native-swiper";

export default class Banner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Swiper
                    activeDotColor="#e74c3c"
                    autoplay={!__DEV__?true:false}
                    autoplayTimeout={5}
                 >
                    <View style={{ flex: 1}}>
                        <Image source={{ uri: "https://www.nature.org/cs/groups/webcontent/@web/@caribbean/documents/media/caribbean-diver-640x400.jpg" }}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={{ flex: 1}}>
                        <Image source={{ uri: "http://www.123mobilewallpapers.com/wp-content/uploads/2014/07/danbo_in_forest.jpg" }}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={{ flex: 1}}>
                        <Image source={{ uri: "http://www.123mobilewallpapers.com/wp-content/uploads/2014/07/beautiful_fantasy_girl.jpg" }}
                            style={{ flex: 1 }}
                        />
                    </View>
                </Swiper>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})