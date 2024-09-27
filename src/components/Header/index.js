import { View, Text, Platform, Image } from "react-native";
import { appName, primaryColor } from "../../includs/variables";
import styles from './style';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const tagLine = Platform.OS === 'ios' ? 'for IOS' : 'for Android';
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                {/* <Ionicons name="logo-octocat" size={40} color={primaryColor} /> */}

                <Image
                    style={{ width: 40, height: 40, resizeMode: 'stretch'}}
                    source={require('./../../../assets/CatIcon.jpg')}
                />
                <Text style={styles.title}>
                    {appName}
                </Text>
            </View>
            <Text style={styles.tagLine}>
                {tagLine}
            </Text>
        </View>
    );
}