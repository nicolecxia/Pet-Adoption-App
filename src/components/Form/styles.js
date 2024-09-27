import { StyleSheet, Platform } from "react-native";
import { primaryColor, secondColor } from '../../includs/variables';


export default StyleSheet.create({
    container: {
        padding: 10
    },
    label: {
        fontSize: 17,
        color: secondColor,
        marginTop: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff'
    },
    textInputDescription: {
        height: 80,
        textAlignVertical: 'top'
    },
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 10 : 0
    },
    switchText: {
        color: '#444',
        marginLeft: Platform.OS === 'ios' ? 10 : 0
    },
    errorMessageTitle: {
        color: '#c00',
        fontWeight: 'bold',
        paddingTop: 10
    },
    errorMessageItem: {
        color: '#f00'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: '#444',
        fontSize: 21,
        marginTop: 10
    },

    //Styles for Items
    itemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemsLabel: {
        flex: 1,
    },
    itemsInput: {
        flex: 3,
        marginTop: 10
    }
});