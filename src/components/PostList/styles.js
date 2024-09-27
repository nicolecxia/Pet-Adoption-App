import { StyleSheet, Platform } from "react-native";
import { primaryColor, secondColor } from "../../includs/variables";

export default StyleSheet.create({
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
    modalContainer: {
        flex: 1,
        alignItems: 'center', //水平居中
        justifyContent: 'center', //垂直居中
        backgroundColor: 'rgba(0,0,0,0.25)', //用rgba改变背景透明度
    },
    modalBox: {
        backgroundColor: 'white',
        padding: 30,
        width: '70%',
        borderRadius: 15,
        marginBottom: 10,

        // Android
        elevation: 5, //shadow on the background

        //ios
        shadowOpacity: 0.25, //shadow on the background
        shadowRadius: 4,

        shadowColor: "#000",//both Android and ios
        shadowOffset: {
            width: 0,
            height: 4
        },

    },
    modalTextTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: primaryColor,
        marginBottom: 10
    },
    modalText: {
        fontSize: 15,
        color: secondColor,
        marginBottom: 10
    }
})