import { Button, StyleSheet } from "react-native";
import { primaryColor, secondColor } from './../../../includs/variables'

export default StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: secondColor
    },
    description: {
        fontSize: 14,
        color: secondColor,
        maxHeight: 36,
    },
    breed: {
        fontSize: 16,
        fontWeight: 'bold',
        color: primaryColor,
        maxHeight: 50,
        textTransform: 'uppercase'
    },
    switch: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    switchText: {
        fontSize: 12,
        opacity: 0.5,
        marginLeft: 5
    },
    textContainer: {
        marginRight: 20,
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10
    },
    imageContainer: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
      }
});