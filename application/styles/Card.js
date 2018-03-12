import { StyleSheet } from "react-native";
export default StyleSheet.create({
    mainContainer: {
        flexDirection: "row", 
        flexWrap: "wrap",
    },
    
    metaData: {
        flexDirection: "row",
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
    },
    metaContainer: {
        flex: 1,
        padding: 5
    }
})