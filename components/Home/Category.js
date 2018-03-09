import React, { Component } from "react"
import { ScrollView, Text, View, StyleSheet, TouchableWithoutFeedback, ToastAndroid } from "react-native"

import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Category extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Category</Text>

                <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "column",
                    flexWrap: 'wrap'
                }}
                >

                <TouchableWithoutFeedback 
                    onPress={() => ToastAndroid.show("Hello mens apparel", ToastAndroid.SHORT)}
                >
                    <View style={styles.items}>
                        
                        <Icon name="male" size={50} color="#e74c3c" />
                        <Text style={styles.itemText}>Men's Apparel</Text>
                    </View>
                </TouchableWithoutFeedback>
                
                <View style={styles.items}>
                    <Icon name="female" size={50} color="#e74c3c" />
                    <Text style={styles.itemText} > Women's Apparel</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="mobile" size={50} color="#e74c3c" />
                    <Text style={styles.itemText} >Mobiles & Accessories</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="heartbeat" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Health & Personal Care</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="tv" size={50} color="#e74c3c" />
                    <Text style={styles.itemText} >Consumer Electronics</Text>
                </View>
                <View style={styles.items}>
                    <Icon name="child" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Babies & Kids</Text>
                </View>
                <View style={styles.items}>
                    <MaterialIcon name="fridge" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Home Appliances</Text>
                </View>

                <View style={styles.items}>
                    <Icon name="eye" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Makeup & Fragrances</Text>
                </View>

                <View style={styles.items}>
                    <Icon name="gamepad" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Games & Collection</Text>
                </View>

                <View style={styles.items}>
                    <Icon name="flask" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Hobbies & Stationary</Text>
                </View>

                <View style={styles.items}>
                    <Icon name="shopping-bag" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Women's Bags</Text>
                </View>
                
                <View style={styles.items}>
                    <MaterialIcon name="glasses" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Women's Accessories</Text>
                </View>

                <View style={styles.items}>
                    <MaterialIcon name="watch" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Men's Bags & Accessories</Text>
                </View>

                <View style={styles.items}>
                    <Icon name="motorcycle" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Motor</Text>
                </View>


                <View style={styles.items}>
                    <Icon name="soccer-ball-o" size={50} color="#e74c3c" />
                    <Text style={styles.itemText}>Sports & Travel</Text>
                </View>
                
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: "white"
    },
    title: {
        fontSize: 20,
        padding: 10
    },
    items: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    itemText: {
        marginTop: 15,
        fontSize: 15,
        marginBottom: 15
    }
})