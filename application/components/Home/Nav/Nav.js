import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import { View, Text, AsyncStorage, Dimensions } from "react-native";
import Home from "../Home";
import Account from "../../Account/Account"
import Sell from "../../Sell/Sell"

import ImagePicker from "react-native-image-picker";
import Crop from 'react-native-image-crop-picker';
import Cart from "../../Cart/Cart";

export default TabNavigator(
  {
    Home: { screen: Home },
    Sell: { screen: Sell },
    Cart: { screen: Cart },
    Account: { screen: Account },

  },
  {

    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Account') {
          iconName = `user-circle`;
        } else if (routeName === 'Sell') {
          iconName = `camera`;
        } else if (routeName === 'Cart') {
          iconName = `shopping-cart`;
        }


        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#e74c3c',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: ({ jumpToIndex, ...props }) => (
      <TabBarBottom
        {...props}
        jumpToIndex={ async (index) => {
          
          let token = null

          try {
            token = await AsyncStorage.getItem("token")  
          } catch (error) {
            console.log(error)
          }
          

          if (token !== null) {
            if (index === 1) {
              console.log(`Index ${index}`)

              let options = {
                title: 'Select Photo of Product',
                takePhotoButtonTitle: "Take photo",
                chooseFromLibraryButtonTitle: "Choose from Library",
                storageOptions: {
                  skipBackup: true,
                  path: 'images',
                }
              };

              ImagePicker.showImagePicker(options, (response) => {

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

                  Crop.openCropper({
                    path: response.uri,
                    width: Dimensions.get("window").width,
                    height: 300
                  }).then(image => {
                    let source = { uri: image.path };
                    //console.log(image);
                    let navigationAction = NavigationActions.navigate({
                      routeName: "Sell",
                      params: source
                    })
                    props.navigation.dispatch(navigationAction)
                  });
                }
              });
            } else {
              currentIndex = index
              jumpToIndex(index)
            }
          } else {
            let navigationAction = NavigationActions.navigate({
              routeName: "Login"
            })
            props.navigation.dispatch(navigationAction)
          }

        }}
      />
    ),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);





















// export default class Nav extends Component {
//     render(){
//         return(
//             <View style={styles.container}>

//                     <View style={styles.items}>
//                     <TouchableOpacity>
//                         <Icon name="home" size={25} color="#e74c3c" />
//                         <Text style={{ fontSize: 13}}>Home</Text>
//                         </TouchableOpacity>
//                     </View>

//                 {/* <View style={styles.items}>
//                     <Icon name="th" size={25} color="#e74c3c" />
//                     <Text style={{ fontSize: 13}}>Category</Text>
//                 </View> */}

//                 <View style={styles.items}>
//                     <Icon name="camera" size={25} />
//                     <Text style={{ fontSize: 13}}>Sell</Text>
//                 </View>
//                 <View style={styles.items}>
//                     <Icon name="shopping-cart" size={25}  />
//                     <Text style={{ fontSize: 13}}>Cart</Text>
//                 </View>
//                 <View style={styles.items}>
//                     <Icon name="user-circle" size={25} />
//                     <Text style={{ fontSize: 13}}>Account</Text>
//                 </View>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         flex: 1,
//         position: 'absolute', 
//         left: 0, 
//         right: 0, 
//         bottom: 0,
//         backgroundColor: "white",
//         padding: 7
//     },
//     items: {
//         alignItems: "center",
//         justifyContent: "center",
//         flex: 1,
//         flexDirection: "column"
//     }
// })