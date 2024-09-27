import { StyleSheet, Platform } from "react-native";
import { primaryColor, secondColor } from '../../includs/variables';


export default StyleSheet.create({
    container: {
        padding: 10
    },
    label: {
        fontSize: 17,
        color: secondColor
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff'
    },


    //Styles for Items
    itemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemsLabel: {
        flex: 4
    },
    itemsInput: {
        flex: 4,
    },
    itemsButton: {
        flex: 1.5,
        marginLeft: 10
    },
    itemsButtonText: {
        backgroundColor: primaryColor,
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 38,
    }
});