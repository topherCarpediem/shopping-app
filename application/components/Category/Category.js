import React, { Component } from "react"
import { ScrollView, Text, View, StyleSheet, TouchableWithoutFeedback, ToastAndroid } from "react-native"

import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation"
import axios from "axios";
import { apiUri } from "../../../config";


export default class Category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentWillMount() {
        axios.get(`${apiUri}/category`).then(result => {
            this.setState({
                data: result.data
            })
            //console.log(this.state.categories)
        }).catch(err => {
            //console.log(err)
            Alert.alert('Error', 'Unable to load categories')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>CATEGORIES</Text>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "column",
                        flexWrap: 'wrap'
                    }}>
                    {this.state.data.map(category => {
                        return (
                            <View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigation.navigate('CategoryView', {
                                            title: category.name,
                                            id: category.id
                                        })
                                    }}>
                                    <View style={styles.items}>
                                        
                                        { category.icon !== "computer" && category.icon !== "watch" && category.icon !== "foot" && <Icon name={category.icon} size={55} color="#e74c3c" /> }
                                        { category.icon === "watch" &&  <MaterialIcon name={category.icon} size={55} color="#e74c3c" /> }
                                        { category.icon === "computer" &&  <MaterialIcon name={category.icon} size={55} color="#e74c3c" /> }
                                        { category.icon === "foot" &&  <Foundation name={category.icon} size={55} color="#e74c3c" /> }
                                        
                                        <Text style={styles.itemText}>{category.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: "white"
    },
    title: {
        fontSize: 15,
        padding: 10
    },
    items: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    itemText: {
        marginTop: 15,
        fontSize: 12,
    }
})





//   <View style={styles.items}>
//                     <Icon name="heartbeat" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Health & Personal Care</Text>
//                 </View>

//                 <View style={styles.items}>
//                     <Icon name="child" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Babies & Kids</Text>
//                 </View>
//                 <View style={styles.items}>
//                     <MaterialIcon name="fridge" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Home Appliances</Text>
//                 </View>

//                 <View style={styles.items}>
//                     <Icon name="eye" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Makeup & Fragrances</Text>
//                 </View>

//                 <View style={styles.items}>
//                     <Icon name="gamepad" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Games & Collection</Text>
//                 </View>

//                 <View style={styles.items}>
//                     <Icon name="flask" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Hobbies & Stationary</Text>
//                 </View>

//                 <View style={styles.items}>
//                     <MaterialIcon name="glasses" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Women's Accessories</Text>
//                 </View>

//                 <View style={styles.items}>
//                     <Icon name="soccer-ball-o" size={55} color="#e74c3c" />
//                     <Text style={styles.itemText}>Sports & Travel</Text>
//                 </View>



// <TouchableWithoutFeedback
//                                     onPress={() => {
//                                         this.props.navigation.navigate('CategoryView', {
//                                             title: "Shoes and Footwear",
//                                             id: category.id
//                                         })
//                                     }}>
//                                     <View style={styles.items}>
//                                         <Icon name="female" size={55} color="#e74c3c" />
//                                         <Text style={styles.itemText} >Shoes and Footwear</Text>
//                                     </View>
//                                 </TouchableWithoutFeedback>

//                                 <TouchableWithoutFeedback
//                                     onPress={() => {
//                                         this.props.navigation.navigate('CategoryView', {
//                                             title: "Laptops and Computers",
//                                             id: category.id
//                                         })
//                                     }}>
//                                     <View style={styles.items}>
//                                         <Icon name="tv" size={55} color="#e74c3c" />
//                                         <Text style={styles.itemText} >Laptops and Computers</Text>
//                                     </View>
//                                 </TouchableWithoutFeedback>

//                                 <TouchableWithoutFeedback
//                                     onPress={() => {
//                                         this.props.navigation.navigate('CategoryView', {
//                                             title: "Mobiles Phones and Tablets",
//                                             id: category.id
//                                         })
//                                     }}>
//                                     <View style={styles.items}>
//                                         <Icon name="mobile" size={68} color="#e74c3c" />
//                                         <Text style={{ marginTop: 4, fontSize: 12 }} >Mobiles Phones and Tablets</Text>
//                                     </View>
//                                 </TouchableWithoutFeedback>

//                                 <TouchableWithoutFeedback
//                                     onPress={() => {
//                                         this.props.navigation.navigate('CategoryView', {
//                                             title: "Watches and Jewelries",
//                                             id: category.id
//                                         })
//                                     }}>
//                                     <View style={styles.items}>
//                                         <MaterialIcon name="watch" size={55} color="#e74c3c" />
//                                         <Text style={styles.itemText}>Watches and Jewelries</Text>
//                                     </View>
//                                 </TouchableWithoutFeedback>

//                                 <TouchableWithoutFeedback
//                                     onPress={() => {
//                                         this.props.navigation.navigate('CategoryView', {
//                                             title: "Cars and Automotives",
//                                             id: category.id
//                                         })
//                                     }}>
//                                     <View style={styles.items}>
//                                         <Icon name="car" size={55} color="#e74c3c" />
//                                         <Text style={styles.itemText}>Cars and Automotives</Text>
//                                     </View>
//                                 </TouchableWithoutFeedback>

//                                 <TouchableWithoutFeedback
//                                     onPress={() => {
//                                         this.props.navigation.navigate('CategoryView', {
//                                             title: "Women's Bags",
//                                             id: category.id
//                                         })
//                                     }}>
//                                     <View style={styles.items}>
//                                         <Icon name="motorcycle" size={55} color="#e74c3c" />
//                                         <Text style={styles.itemText}>Motorcyle and Motogears</Text>
//                                     </View>
//                                 </TouchableWithoutFeedback>

//                                 <TouchableWithoutFeedback
//                                     onPress={() => {
//                                         this.props.navigation.navigate('CategoryView', {
//                                             title: "Women's Bags",
//                                             id: category.id
//                                         })
//                                     }}>
//                                     <View style={styles.items}>
//                                         <Icon name="shopping-bag" size={55} color="#e74c3c" />
//                                         <Text style={styles.itemText}>Women's Bags</Text>
//                                     </View>
//                                 </TouchableWithoutFeedback>