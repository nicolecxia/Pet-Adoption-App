import { View, Text,TextInput,Pressable, } from "react-native";
import styles from "./styles";
import * as database from './../../database';
import { useDispatch } from "react-redux";
import { setPosts } from "../../redux/postsSlice";
import { useEffect, useState } from "react";

export default function SignUp({ navigation, route }) {
    const dispatch = useDispatch();
    const [userUID, setUserUID] = useState(database.userUID);
    const [email, setEmail] = useState(database.userEmail);
    const [password, setPassword] = useState('');
    const [reEnterpassword, setReEnterpassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const handleSignUpPress = async () => {
        const validate = [];
        if (email === '') {
            validate.push('The email is required.');
        }

        if (password === '') {
            validate.push('The password is required.');
        }

        if (reEnterpassword === '') {
            validate.push('Please re-enter you password.');
        }

        if(reEnterpassword != password){
            validate.push('Please keep your password consistent.');
        }

        if (validate.length > 0) {
            setErrorMessages(validate);
        } else {
            setErrorMessages([]);
            // "123@qq.com", "123456"
            await database.userSignUp(email, password)
                .then((userCredential) => {
                    // Signed up success
                    // database.userSignIn(email, password).then((userSignInCredential) => {
                        const user = userCredential.user;
                        setUserUID(database.userUID);
                    // })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    validate.push('Login up error:', errorMessage);
                    setErrorMessages(validate);
                });

                if(database.userUID){
                    navigation.goBack({
                        params:{update: true},
                    });
                }
        }
    }

    return (
        <>
            {/*conditionally display the error message */}
            {errorMessages.length > 0 && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorMessageTitle}>Invalid data:</Text>
                    {errorMessages.map((errMsg, index) => (
                        <Text key={index} style={styles.errorMessageItem}>
                            - {errMsg}
                        </Text>
                    ))}
                </View>
            )}
            <View style={styles.itemsContainer}>
                <Text style={[styles.label, styles.itemsLabel]}>Email:</Text>
                <View style={styles.itemsInput}>
                    <TextInput style={styles.textInput}
                        value={email}
                        onChangeText={setEmail}>
                    </TextInput>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <Text style={[styles.label, styles.itemsLabel]}>Password:</Text>
                <View style={styles.itemsInput}>
                    <TextInput secureTextEntry={true} style={styles.textInput}
                        value={password}
                        onChangeText={setPassword}>
                    </TextInput>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <Text style={[styles.label, styles.itemsLabel]}>ReEnter Password:</Text>
                <View style={styles.itemsInput}>
                    <TextInput secureTextEntry={true} style={styles.textInput}
                        value={reEnterpassword}
                        onChangeText={setReEnterpassword}>
                    </TextInput>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.button}>
                    <Pressable onPress={handleSignUpPress}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
            <Text></Text></>
    )
}