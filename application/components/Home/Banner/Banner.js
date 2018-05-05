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
                        <Image source={ require("../../../../src/assets/images/banner1.jpg") }
                            style={{ flex: 1,  width: undefined, height: undefined }}
                        />
                    </View>
                    <View style={{ flex: 1}}>
                        <Image source={ require("../../../../src/assets/images/banner2.jpg") }
                            style={{ flex: 1,  width: undefined, height: undefined }}
                        />
                    </View>
                    <View style={{ flex: 1}}>
                        <Image source={ require("../../../../src/assets/images/banner3.jpg") }
                            style={{ flex: 1,  width: undefined, height: undefined }}
                        />
                    </View>
                </Swiper>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})