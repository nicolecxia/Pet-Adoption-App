import { StyleSheet } from "react-native";
import { primaryColor, secondColor } from "../../includs/variables";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderBottomColor: primaryColor,
        alignItems: 'center'
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 7,
        paddingBottom: 5
    },
    title: {
        fontSize: 27,
        color: primaryColor,
        fontWeight: 'bold',
        paddingLeft: 5,
        letterSpacing: -1.3
    },
    tagLine: {
        paddingRight: 10,
        color: secondColor
    }
});