import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    Image,
} from "react-native";

import LoginForm from "./LoginForm"
import styles from "../../styles/Login"

import ImagePicker from "react-native-image-picker";

export default class Login extends Component {
    constructor(props){
        super(props)

        this.onButtonPress = this.onButtonPress.bind(this)
    }

    onButtonPress () {
        var options = {
            title: 'Select Avatar',
            customButtons: [
              {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source
              });
            }
          });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../../../src/assets/images/logo.png")} />
                    <Text style={styles.heading}>SECOND CHANCES</Text>
                    <Text style={styles.subHeading}>Buy and Sell Great Quality Items</Text>
                    <Button 
                        title="Asdasd"
                        onPress={() => this.props.navigation.navigate("Home")}
                    />
                    <Button 
                        title="Hey"
                        onPress={this.onButtonPress}
                    />
                </View>
                <LoginForm />
            </View>
        )
    }
}

