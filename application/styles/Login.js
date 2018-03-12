import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e74c3c"

    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1
    },
    logo: {
        width: 150,
        height: 150, 
        tintColor: "white"

    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 10,
        color: "white",
        
    },
    subHeading: {
        fontSize: 20,
        color: "white",
        opacity: 0.8
    }
})