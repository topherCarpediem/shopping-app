import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { View, Text } from "react-native";
import Home from "../Home";
import Account from "../../Account/Account"



export default TabNavigator(
  {
    Home: { screen: Home },
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
        }

        // camera
        // shopping-cart


        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#e74c3c',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
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