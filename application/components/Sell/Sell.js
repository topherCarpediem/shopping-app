import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Picker,
    KeyboardAvoidingView,
    ScrollView,
    Input,
    ToastAndroid,
    AsyncStorage,
    Alert,
    ActivityIndicator,
    BackHandler,
    FlatList
} from "react-native";

import { NavigationActions } from "react-navigation";
import uuid from "uuid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { apiUri } from "../../../config";
import axios from "axios";

export default class Sell extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productName: null,
            productPrice: null,
            imageURI: null,
            productDescription: null,
            productWeight: null,
            stocks: null,
            productFeatures: [],
            token: null,
            featureName: null,
            featureValue: null,
            productFeaturesTextField: [],
            category: "",
            condition: "",
            hashtagText: "",
            hashtags: [],
            categories: [],
            loading: false
        }

        AsyncStorage.getItem("token").then(token => {
            //console.log(token)
            this.setState({
                token: token
            })
        })

        this.sendRequests = sendRequests.bind(this)

    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            tabBarVisible: false
        }
    };
    componentWillMount() {
        this.setState({
            imageURI: this.props.navigation.state.params.uri
        })

    }

    componentWillUnmount() {
        //ToastAndroid.show("unmounting", ToastAndroid.SHORT)
        //BackHandler.removeEventListener('hardwareBackPress');
        this.backHandler.remove()
    }

    componentDidMount() {
        axios.get(`${apiUri}/category`).then(result => {
            this.setState({
                categories: result.data
            })
            //console.log(this.state.categories)
        }).catch(err => {
            //console.log(err)
            Alert.alert('Error', 'Unable to load categories')
        })


        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            //console.log("back handler clicked")
            //let exit = false
            Alert.alert(
                `Oops!, Continue?`,
                `You're not done editing your ads.`,
                [
                    {
                        text: 'Yes', onPress: () => {

                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: 'Home',
                                    })
                                ],
                                key: null
                            });

                            this.props.navigation.dispatch(resetAction);
                        }

                    },
                    { text: 'No', onPress: () => { } },
                ],
                { cancelable: false }
            )

            return true;

        })
    }



    removeHashTags(id) {
        let removingIndex = null
        let hashtagsCopy = this.state.hashtags

        this.state.hashtags.map((tags, index) => {
            if (tags.id === id) {
                removingIndex = index
            }
        })

        hashtagsCopy.splice(removingIndex, 1)

        this.setState({
            hashtags: [
                ...hashtagsCopy
            ]
        })
    }


    updateText(id, type, text){
        const tempValue = this.state.productFeatures.map(feature => {
            if (type === "name"){
                if(feature.id === id ){
                    feature.name = text
                }
            } else if(type === "value"){
                if(feature.id === id ){
                    feature.value = text
                }
            }
            return feature
        })

        this.setState({
            productFeatures: tempValue
        })
    }

    removeField(id){
        const tempValue = this.state.productFeatures.filter(feature => feature.id !== id)
        alert(JSON.stringify(tempValue))
        this.setState({
            productFeatures: [
                ...tempValue
            ]
        })
    }

    render() {

        const { params } = this.props.navigation.state

        return (
            <View style={{ flex: 1 }}>

                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="always"
                    style={{ flex: 1, backgroundColor: "white" }}>

                    <View style={{ flexDirection: "row", marginBottom: 10, alignItems: "center", justifyContent: "center", paddingTop: 10 }}>
                        <View style={{ width: 200, height: 200 }}>
                            <Image
                                source={{
                                    uri: params.uri
                                }}
                                style={{ flex: 1, borderColor: "#e74c3c", borderWidth: 2 }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "column", padding: 10, paddingTop: 0 }}>
                        <View style={{}}>
                            <TextInput
                                onChangeText={text => { this.setState({ productName: text }) }}
                                placeholder="Product name"
                                style={{
                                    flex: 2,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    margin: 5,
                                    paddingLeft: 20,
                                    borderColor: "#e74c3c",
                                }}
                                underlineColorAndroid="transparent" />
                            <TextInput
                                placeholder="Description"
                                onChangeText={text => { this.setState({ productDescription: text }) }}
                                multiline={true}
                                style={{
                                    flex: 1,
                                    maxHeight: 200,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    margin: 5,
                                    paddingLeft: 20,
                                    textAlignVertical: "top",
                                    borderColor: "#e74c3c",
                                }}
                                underlineColorAndroid="transparent" />
                        </View>

                        {/* Hashtag  */}
                        <View style={{ flexDirection: "row", padding: 5, flexWrap: "wrap" }}>
                            {this.state.hashtags.map(tags => {
                                return (
                                    <TouchableOpacity
                                        key={tags.id}
                                        onPress={this.removeHashTags.bind(this, tags.id)}
                                        style={{ borderWidth: 1, borderRadius: 5, borderColor: "#e74c3c", margin: 5, padding: 5 }}>
                                        <Text key={tags.id} style={{ color: "#e74c3c" }}>{tags.tag}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                value={this.state.hashtagText}
                                style={{ flex: 1 }}
                                placeholder="Tags #example"
                                onChangeText={(text) => {

                                    let match = /#\w+\s/g.exec(text)
                                    if (match !== null) {
                                        match.forEach((match, groupIndex) => {

                                            this.setState({
                                                hashtagText: "",
                                                hashtags: [
                                                    ...this.state.hashtags,
                                                    {
                                                        id: this.state.hashtags.length,
                                                        tag: match
                                                    }
                                                ]
                                            })
                                        })
                                    } else {
                                        this.setState({
                                            hashtagText: text
                                        })
                                    }
                                }}
                            />
                        </View>
                        {/* Hashtag */}


                        <View style={{ borderColor: "#e74c3c", borderWidth: 1, borderRadius: 5, margin: 5 }}>
                            <Picker
                                prompt="Category"
                                selectedValue={this.state.category}
                                onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
                                {this.state.categories.map(category => {
                                    return (
                                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                                    )
                                })}

                            </Picker>
                        </View>

                        {this.state.productFeatures.map(feature => {
                            return (
                                <View style={{ margin: 5, flexDirection: "row" }}>
                                    <TextInput
                                        value={feature.name}
                                        onChangeText={(text) => { this.updateText(feature.id, "name", text) }}
                                        placeholder="Name"
                                        style={{
                                            flex: 1,
                                            borderWidth: 1,
                                            borderColor: "#e74c3c",
                                            marginRight: 5,
                                            borderRadius: 5,
                                            paddingLeft: 10
                                        }}
                                        underlineColorAndroid="transparent" />
                                    <TextInput
                                        value={feature.value}
                                        onChangeText={(text) => { this.updateText(feature.id, "value", text) }}
                                        placeholder="Value"
                                        style={{
                                            flex: 1,
                                            borderWidth: 1,
                                            borderColor: "#e74c3c",
                                            marginRight: 5,
                                            borderRadius: 5,
                                            paddingLeft: 10
                                        }}
                                        underlineColorAndroid="transparent" />
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.removeField(feature.id)
                                        }}
                                        style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Entypo name="squared-cross" size={30} color="#e74c3c" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}


                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    productFeatures: [
                                        ...this.state.productFeatures,
                                        {
                                            id: uuid.v4(),
                                            name: "",
                                            value: ""
                                        }
                                    ]
                                })
                            }}
                            style={styles.addFeatureContainer}>
                            <Text style={{ textAlign: "center", color: "white" }}>Add Feature</Text>
                        </TouchableOpacity>


                        <View style={styles.inputContainer}>
                            <MaterialIcons name="attach-money" size={20} color="#e74c3c" />
                            <Text style={{ flex: 2, marginLeft: 20 }}>Price</Text>
                            <TextInput
                                placeholder="0 peso(s)"
                                keyboardType="numeric"
                                style={{ flex: 2 }}
                                onChangeText={text => { this.setState({ productPrice: text }) }}
                                underlineColorAndroid="transparent" />
                        </View>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="format-line-weight" size={20} color="#e74c3c" />
                            <Text style={{ flex: 2, marginLeft: 20 }}>Stock</Text>
                            <TextInput
                                placeholder="0 piece(s)"
                                onChangeText={text => { this.setState({ stocks: text }) }}
                                keyboardType="numeric"
                                style={{ flex: 2 }}
                                underlineColorAndroid="transparent" />
                        </View>

                    </View>
                    <View >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#e74c3c",
                                borderRadius: 5,
                                margin: 15,
                                marginTop: 0,
                                marginBottom: 40
                            }}
                            onPress={this.sendRequests}>
                            <Text style={styles.textCenter}>Post Ads</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView>

                {this.state.loading &&
                    <View style={styles.loading}>
                        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 5 }}>
                            <ActivityIndicator size={80} color="#e74c3c" />
                        </View>
                    </View>
                }
            </View>


        )
    }
}







function prepareFormData(params) {

    const tags = params.hashtags.map(tag => {
        return tag.tag.replace(" ", "")
    })

    const formData = new FormData()
    formData.append("productName", params.productName);
    formData.append("productPrice", params.productPrice);
    formData.append("avatar", { uri: params.imageURI, name: 'avatar.png', type: 'image/png' });
    formData.append("productDescription", params.productDescription);
    formData.append("categoryId", params.category)
    formData.append("stocks", params.stocks);
    formData.append("tags", JSON.stringify(tags))
    formData.append("features", JSON.stringify(params.productFeatures))
    return formData
}

function sendRequests() {

    let errorMessage = ""
    if (this.state.productName === null || this.state.productName === "") {
        errorMessage = "Product name is not provided."
    } else if (this.state.productDescription === null || this.state.productDescription === "") {
        errorMessage = "Description is not provided"
    } else if (this.state.stocks === null || this.state.stocks === "") {
        errorMessage = "Stocks is not provided"
    } else if (this.state.productPrice === null || this.state.productPrice === "") {
        errorMessage = "Price is not provided"
    } else if (this.state.category === null || this.state.category === "") {
        errorMessage = "Category is not provided"
    } else if (this.state.hashtags.length === 0) {
        errorMessage = "Hashtag is not provided"
    } else if(this.state.productFeatures.length === 0){
        errorMessage = "Empty feature of product. Please add one."
    } else {
        this.state.productFeatures.forEach(feature => {
            if(feature.name === "" || feature.value === ""){
                errorMessage = "There is a blank feature of the product."
            }
        })
    }
    
    if (errorMessage !== "") {
        Alert.alert(
            'Oops! Somethings wrong!',
            errorMessage,
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        )

        return
    }
    this.setState({
        loading: true
    })
    const formData = prepareFormData(this.state)
    //console.log(formData)
    axios({
        url: `${apiUri}/product/add`,
        method: "POST",
        headers: {
            "Content-type": "  'multipart/form-data",
            "Authorization": `Bearer ${this.state.token}`
        },
        data: formData,
        onUploadProgress: progress => {
            //console.log(progress)
        }
    }).then(result => {
        //console.log(result)
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)

        this.backHandler.remove()

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Home',
                })
            ],
            key: null
        });

        this.props.navigation.dispatch(resetAction);

    }).catch(err => {
        //console.log(err.response)
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
        Alert.alert('Error', err.response.data.message)
    })

    // ToastAndroid.show(this.state.imageURI, ToastAndroid.SHORT)
    // ToastAndroid.show(this.state.token, ToastAndroid.SHORT)
}


const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        borderColor: "#e74c3c",
        backgroundColor: "white",
        paddingLeft: 20,
    },
    addFeatureContainer: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#e74c3c",
        borderColor: "#e74c3c",
        flex: 1,
        padding: 10,
        margin: 10
    },
    textCenter: {
        justifyContent: "center",
        textAlign: "center",
        padding: 15,
        color: "white",
        fontSize: 18
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.8,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})



//#region  temporryh not available features
// <View style={styles.inputContainer}>
//                         <MaterialCommunityIcons name="weight-kilogram" size={20} />
//                         <Text style={{ flex: 2, marginLeft: 20, }}>Weight</Text>
//                         <TextInput
//                             placeholder="0 kg(s)"
//                             keyboardType="numeric"
//                             style={{ flex: 2 }}
//                             underlineColorAndroid="transparent" />
//                     </View>
//                     <View style={styles.inputContainer}>
//                         <MaterialCommunityIcons name="truck-fast" size={20} />
//                         <Text style={{ flex: 2, marginLeft: 20, }}>Shipping Service</Text>
//                         <Text style={{ flex: 2, padding: 15 }}>LBC Express</Text>
//                     </View>
//                     <View style={styles.inputContainer}>
//                         <MaterialIcons name="monetization-on" size={20} />
//                         <Text style={{ flex: 2, marginLeft: 20, }}>Shipping Fee</Text>
//                         <TextInput
//                             placeholder="0 pesos"
//                             keyboardType="numeric"
//                             style={{ flex: 2 }}
//                             underlineColorAndroid="transparent" />
//                     </View>



{/* <View style={{
flex: 1,
backgroundColor: "white",
borderTopWidth: 0.5,}}>


<View key={uuid.v4()}
    style={{
        flex: 1,
        flexDirection: "row",
        margin: 5,

    }}>
    <TextInput
        placeholder="Feature Name"
        style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#e74c3c",
            marginRight: 5,
            borderRadius: 5
        }}
        underlineColorAndroid="transparent"
        key={textFieldLength++} />
    <TextInput
        placeholder="Feature Description"
        style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#e74c3c",
            marginLeft: 5,
            borderRadius: 5
        }}
        underlineColorAndroid="transparent"
        key={textFieldLength++} />
    <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={removeField.bind(this, this.state.productFeaturesTextField.length)}>
        <Entypo name="squared-cross" size={30} color="#e74c3c" />
    </TouchableOpacity>
</View>

<TouchableOpacity
    style={styles.addFeatureContainer}
    onPress={this.addTextField}>
    <Text style={styles.textCenter}>Add Feature</Text>
</TouchableOpacity>
</View> */}

//#endregion