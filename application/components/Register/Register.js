import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Picker, AsyncStorage } from "react-native";

import { NavigationActions } from "react-navigation";

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from "axios";
import { apiUri } from "../../../config";

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.lipa = ["Please select barangay...", "Adya", "Anilao", "Anilao~Labac", "Antipolo Del Norte", "Antipolo Del Sur", "Bagong Pook", "Balintawak", "Banaybanay", "Barangay 12 (Pob.)", "Bolbok", "Bugtong Na Pulo", "Bulacnin",
            "Bulaklakan", "Calamias", "Cumba", "Dagatan", "Duhatan", "Halang", "Inosloban", "Kayumanggi", "Latag", "Lodlod", "Lumbang", "Mabini", "Malagonlong", "Malitlit", "Marauoy", "Mataas Na Lupa",
            "Munting Pulo", "Pagolingin Bata", "Pagolingin East", "Pagolingin West", "Pangao", "Pinagkawitan", "Pinagtongulan", "Plaridel", "Poblacion Barangay 1", "Poblacion Barangay 10", "Poblacion Barangay 11",
            "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6", "Poblacion Barangay 7", "Poblacion Barangay 8", "Poblacion Barangay 9",
            "Poblacion Barangay 9~A", "Pusil", "Quezon", "Rizal", "Sabang", "Sampaguita", "San Benito", "San Carlos", "San Celestino", "San Francisco", "San Guillermo", "San Jose", "San Lucas", "San Salvador",
            "San Sebastian (Balagbag)", "Santo Nino", "Santo Toribio", "Sapac", "Sico", "Talisay", "Tambo", "Tangob", "Tanguay", "Tibig", "Tipacan"]

        this.malvar = ["Please select barangay...", "Bagong Pook", "Bilucao (San Isidro Western)", "Bulihan", "Luta Del Norte", "Luta Del Sur", "Poblacion", "San Andres",
            "San Fernando", "San Gregorio", "San Isidro East", "San Juan", "San Pedro I (Eastern)", "San Pedro Ii (Western)", "San Pioquinto", "Santiago"]

        this.tanauan = ["Please select barangay...", "Altura~South", "Altura Bata", "Altura Matanda", "Ambulong", "Bagbag", "Bagumbayan", "Balele", "Banadero", "Banjo East", "Banjo Laurel (Banjo West)", "Bilog~Bilog",
            "Boot", "Cale", "Darasa", "Gonzales", "Hidalgo", "Janopol", "Janopol Oriental", "Laurel", "Luyos", "Mabini", "Malaking Pulo", "Maria Paz", "Maugat", "Montana (Ik~ik)",
            "Natatas", "Pagaspas", "Pantay Bata", "Pantay Matanda", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5",
            "Poblacion Barangay 6", "Poblacion Barangay 7", "Sala", "Sambat", "San Jose", "Santor", "Sulpoc", "Suplang", "Talaga", "Tinurik", "Trapiche", "Ulango", "Wawa"]

        this.stotomas = ["Please select barangay...", "Barangay I (Pob.)", "Barangay Ii (Pob.)", "Barangay Iii (Pob.)", "Barangay Iv (Pob.)", "San Agustin", "San Antonio", "San Bartolome", "San Felix", "San Fernando", "San Francisco",
            "San Isidro Norte", "San Isidro Sur", "San Joaquin", "San Jose", "San Juan", "San Luis", "San Miguel", "San Pablo", "San Pedro", "San Rafael", "San Roque", "Santa Ana", "Santa Anastacia",
            "Santa Clara", "Santa Cruz", "Santa Elena", "Santa Maria", "Santa Teresita", "Santiago", "San Vicente"]

        this.mabini = ["Please select barangay...", "Anilao East", "Anilao Proper", "Bagalangit", "Bulacan", "Calamias", "Calamias", "Estrella", "Gasang", "Laurel", "Ligaya", "Mainaga", "Mainit", "Majuben", "Malimatoc I", "Malimatoc Ii", "Nag-iba", "Pilahan", "Poblacion",
            "Pulang Lupa", "Pulong Anahao", "Pulong Balibaguhan", "Pulong Niogan", "Saguing", "Sampaguita", "San Francisco", "San Jose", "San Juan", "Santa Ana", "Santa Mesa", "San Teodoro", "San Teodoro", "Santo Nino", "Santo Tomas",
            "Solo", "Talaga East", "Talaga Proper"]

        this.talisay = ["Please select barangay...", "Aya", "Balas", "Banga", "Buco", "Caloocan", "Leynes", "Miranda", "Poblacion Barangay 1", "Poblacion Barangay 2", "Poblacion Barangay 3", "Poblacion Barangay 4", "Poblacion Barangay 5", "Poblacion Barangay 6",
                        "Poblacion Barangay 7", "Poblacion Barangay 8", "Quiling", "Sampaloc", "San Guillermo", "Santa Maria", "Tranca", "Tumaway"]

        this.cityList = ["Lipa", "Malvar", "Tanauan", "Sto. Tomas", "Mabini", "Talisay"]

        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            line1: "",
            line2: "",
            city: "",
            state: "",
            barangay: "",
            postalCode: "",
            phoneNumber: "",
            cityList: [],
            barangayList: ["Please select barangay..."]
        }
    }


    _validateInput() {
        let isValidInput = true
        let errorMessage = null

        if (this.state.firstName === "") {
            isValidInput = false
            errorMessage = "First name field is empty"
        } else if (this.state.lastName === "") {
            isValidInput = false
            errorMessage = "Lastname name field is empty"
        } else if (this.state.emailAddress === "") {
            isValidInput = false
            errorMessage = "Email address field is empty"
        } else if (this.state.emailAddress !== "") {
            const isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(this.state.emailAddress)
            if (isValidEmail === null) {
                isValidInput = false
                errorMessage = "Not a valid email address"
            }
        }
        else if (this.state.password === "") {
            isValidInput = false
            errorMessage = "Password field is empty"
        }
        else if (this.state.confirmPassword !== this.state.password) {
            isValidInput = false
            errorMessage = "Does not match to the password specified"
        }
        else if (this.state.line1 === "") {
            isValidInput = false
            errorMessage = "Line 2 field is empty"
        }
        else if (this.state.line2 === "") {
            isValidInput = false
            errorMessage = "Line 2 field is empty"
        }
        else if (this.state.city === "") {
            isValidInput = false
            errorMessage = "City field is empty"
        }
        else if (this.state.state === "") {
            isValidInput = false
            errorMessage = "State field is empty"
        }
        else if (this.state.phoneNumber === "") {
            isValidInput = false
            errorMessage = "Phone number field is empty"
        }

        return { isValidInput, errorMessage }
    }

    _register() {
        const { isValidInput, errorMessage } = this._validateInput()
        if (!isValidInput) {
            Alert.alert('Oops!, Somethings wrong!', errorMessage)
            console.log('Error')
            return
        }

        const registrationPayload = {
            barangay: this.state.barangay,
            city: this.state.city,
            emailAddress: this.state.emailAddress,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            line1: this.state.line1,
            line2: this.state.line2,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            postalCode: this.state.postalCode,
            province: this.state.state
        }

        //console.log(registrationPayload)

        axios.post(`${apiUri}/user/register`, registrationPayload, {
            headers: {
                "Content-type": "application/json"
            }
        }).then(result => {
            return axios.post(`${apiUri}/user/login`,
                {
                    emailAddress: this.state.emailAddress,
                    password: this.state.password
                },
                {
                    headers: {
                        "Content-type": "application/json"
                    }
                })
        }).then(response => {

            AsyncStorage.setItem("token", response.data.token).then(saved => {

                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "Home",
                        })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            })
            //console.log(response.data)

        }).catch(err => {
            Alert.alert('Failed', err.response.data.message)
        })
    }

    _cityChange(itemValue, itemIndex) {
        switch (itemValue) {
            case "Lipa":
                this.setState({
                    barangayList: [
                        ...this.lipa
                    ],
                    city: "Lipa"
                })
                break;

            case "Malvar":
                this.setState({
                    barangayList: [
                        ...this.malvar
                    ],
                    city: "Malvar"
                })
                break;

            case "Tanauan":
                this.setState({
                    barangayList: [
                        ...this.tanauan
                    ],
                    city: "Tanauan"
                })
                break;

            case "Sto. Tomas":
                this.setState({
                    barangayList: [
                        ...this.stotomas
                    ],
                    city: "Sto. Tomas"
                })
                break;

            case "Mabini":
                this.setState({
                    barangayList: [
                        ...this.mabini
                    ],
                    city: "Mabini"
                })
                break;

            case "Talisay":
                this.setState({
                    barangayList: [
                        ...this.talisay
                    ],
                    city: "Talisay"
                })
                break;

            default:
                this.setState({
                    barangayList: ["Please select barangay..."],
                    city: ""
                })
                break;
        }
    }

    _barangayChange(itemValue, itemIndex) {

        if (itemIndex === 0) {
            this.setState({
                barangay: ""
            })
        } else {
            this.setState({
                barangay: itemValue
            })
        }
    }

    _stateChange(itemValue, itemIndex) {

        if (itemValue === "Batangas") {
            this.setState({
                state: itemValue,
                cityList: this.cityList
            })

            console.log(itemValue, itemIndex)
        } else {
            this.setState({
                state: "",
                city: "",
                barangay: "",
                cityList: [],
                barangayList: ["Please select barangay..."],
            })
        }

    }

    render() {
        let i = 0
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"

                style={{ flex: 1 }} >
                <View style={styles.container}>
                    <Text style={{ justifyContent: "center", textAlign: "center", marginBottom: 10, fontSize: 25 }}>Account</Text>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="user" size={16} />
                        <TextInput

                            onChangeText={(text) => { this.setState({ firstName: text }) }}
                            placeholder="First name"


                            underlineColorAndroid='transparent'
                            style={styles.input} />

                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="user" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ lastName: text }) }}
                            placeholder="Last name"

                            //onEndEditing={this.validateInput}
                            underlineColorAndroid='transparent'
                            style={styles.input} />

                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="at" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ emailAddress: text }) }}
                            placeholder="Email address"

                            //onEndEditing={this.validateInput}
                            underlineColorAndroid='transparent'
                            style={styles.input} />

                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="lock" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            placeholder="Password"

                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            style={styles.input} />

                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="lock" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
                            placeholder="Confirm password"

                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            style={styles.input} />

                    </View>

                    <Text style={{ justifyContent: "center", textAlign: "center", marginBottom: 10, fontSize: 25 }}>Shipping Address</Text>


                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="address-card" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ line2: text }) }}
                            placeholder="House number"

                            //onEndEditing={this.validateInput}
                            underlineColorAndroid='transparent'
                            style={styles.input} />
                        <TouchableOpacity
                            onPress={() => { Alert.alert('House number', `The apartment, floor number, etc of the user’s street address (e.g. "Apartment 1A")`) }}
                        >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="address-card" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ line1: text }) }}
                            placeholder="Street"

                            //onEndEditing={this.validateInput}
                            underlineColorAndroid='transparent'
                            style={styles.input} />
                        <TouchableOpacity
                            onPress={() => { Alert.alert('Street', `The first line of the user’s street address (e.g. "123 Fake St")`) }}
                        >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="map" size={16} />

                        <Picker
                            style={{ flex: 1 }}
                            selectedValue={this.state.state}
                            onValueChange={this._stateChange.bind(this)}>
                            <Picker.Item label="Please select province..." value="Please select province..." color="gray" />
                            <Picker.Item label="Batangas" value="Batangas" color="gray" />
                        </Picker>

                        <TouchableOpacity
                            onPress={() => { Alert.alert('Province', `The state in which the user resides (e.g. "Batangas")`) }} >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="map" size={16} />

                        <Picker
                            style={{ flex: 1 }}
                            selectedValue={this.state.city}
                            onValueChange={this._cityChange.bind(this)}>
                            <Picker.Item label="Please select city..." value="" color="gray" />
                            {this.state.cityList.map(city => {
                                return (
                                    <Picker.Item key={i++} label={city} value={city} color="gray" />
                                )
                            })}
                        </Picker>

                        <TouchableOpacity
                            onPress={() => { Alert.alert('State', `The city in which the user resides (e.g. "Lipa")`) }} >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="map" size={16} />

                        <Picker
                            style={{ flex: 1 }}
                            selectedValue={this.state.barangay}
                            onValueChange={this._barangayChange.bind(this)}>
                            {this.state.barangayList.map(barangay => {
                                return (
                                    <Picker.Item key={i++} label={barangay} value={barangay} color="gray" />
                                )
                            })}
                        </Picker>

                        <TouchableOpacity
                            onPress={() => { Alert.alert('State', `The city in which the user resides (e.g. "Lipa")`) }} >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View>


                    {/* <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.emailIcon} name="map" size={16} />

                        <Picker
                            style={{ flex: 1 }}
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) => this.setState({ city: itemValue })}>
                            <Picker.Item label="Batangas" value="Batangas" color="gray" />

                        </Picker>
                        
                        <TouchableOpacity
                            onPress={() => { Alert.alert('City', `The city in which the user resides (e.g. "Malvar")`) }} >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View> */}



                    {/* <View style={styles.inputContainer}>
                        <MaterialIcons style={styles.emailIcon} name="city" size={16} />

                        <Picker
                            style={{ flex: 1 }}
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) => this.setState({ city: itemValue })}>
                            <Picker.Item label="Batangas" value="Batangas" color="gray" />

                        </Picker>

                        <TouchableOpacity
                            onPress={() => { Alert.alert('City', `The city in which the user resides (e.g. "Malvar")`) }} >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View> */}



                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="code" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ postalCode: text }) }}
                            keyboardType="numeric"
                            placeholder="Postal Code"
                            placeholderText
                            //onEndEditing={this.validateInput}
                            underlineColorAndroid='transparent'
                            style={styles.input} />
                        <TouchableOpacity
                            onPress={() => { Alert.alert('Postal Code', `The postal code in which the user resides (e.g. "4220")`) }}
                        >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>

                    </View>



                    <View style={styles.inputContainer}>
                        <Icon style={styles.emailIcon} name="mobile" size={16} />
                        <TextInput
                            onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
                            keyboardType="numeric"
                            placeholder="Phone"
                            placeholderText
                            //onEndEditing={this.validateInput}
                            underlineColorAndroid='transparent'
                            style={styles.input} />
                        <TouchableOpacity
                            onPress={() => { Alert.alert('Phone number', `The phone number of the address (e.g. "09123456789")`) }}
                        >
                            <Icon style={{ padding: 20, paddingTop: 15, paddingBottom: 15, }} name="info" size={16} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.registerButton}
                        onPress={this._register.bind(this)}>
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>



            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    input: {

        flex: 1,
        paddingLeft: 15,
        color: "gray"
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: "gray",
        borderWidth: 1

    },
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    emailIcon: {
        paddingLeft: 15
    },
    registerButton: {
        backgroundColor: '#e74c3c',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 10
    },
    registerText: {
        color: "white",
        fontSize: 18,
        padding: 13,
    },
})


// line1	String	The first line of the user’s street address (e.g. "116 Fake St")
// line2	String	The apartment, floor number, etc of the user’s street address (e.g. "Apartment 1A")
// city	String	The city in which the user resides (e.g. "San Francisco")
// state	String	The state in which the user resides (e.g. "CA")
// postalCode	String	The postal code in which the user resides (e.g. "90210")
// country	String	The ISO country code of the address (e.g. "US")
// phone	String	The phone number of the address (e.g. "8885551212")
// email


    // < View style = { styles.inputContainer } >
    //     <Icon style={styles.emailIcon} name="flag" size={16} color="white" />
    //     <TextInput
    //         placeholder="Country"
    //         placeholderTextColor="white"
    //         //onEndEditing={this.validateInput}
    //         underlineColorAndroid='transparent'
    //         style={styles.input} />

    //                 </View > 