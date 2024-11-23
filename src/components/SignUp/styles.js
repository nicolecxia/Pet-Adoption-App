import { StyleSheet } from "react-native";
import { primaryColor } from "../../includs/variables";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    account: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 56,
    },
    button: {
        backgroundColor: primaryColor,
        width: '80%',
        marginTop: 10,
        alignItems: 'center'
    },
    buttonText: {
        width: 100,
        height: 60,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 56,
    },
    addButtonContainer: {
        backgroundColor: primaryColor,
        borderRadius: 30,
        position: 'absolute',
        right: 15,
        bottom: 15,
        elevation: 2,
        shadowOpacity: 0.25,
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    addButtonText: {
        width: 60,
        height: 60,
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 56,
    },
    //Styles for Items
    itemsContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemsLabel: {
        flex: 1,
        marginLeft: '10%',
    },
    itemsInput: {
        flex: 3,
        marginRight: '10%',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff'
    },
    // Error message style
    errorContainer:{
        width: '80%',
        marginLeft: '10%',
        marginTop: 10,
        textAlign:'left'
    },
    errorMessageTitle: {
        color: '#c00',
        fontWeight: 'bold',
        paddingTop: 10
    },
    errorMessageItem: {
        color: '#f00'
    },
})