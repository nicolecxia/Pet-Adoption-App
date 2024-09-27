import { Button, View, TextInput, Pressable, Text } from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { loadByConditions } from "../../database/read";
import * as database from './../../database';
import { useDispatch } from "react-redux";
import { setPosts } from '../../redux/postsSlice';

export default function SelectorBar() {
    const dispatch = useDispatch();
    const [selectedType, setSelectedType] = useState('breed');
    const [inputValue, setInputValue] = useState('');


    const hanleLabelPress = async () => {
        var data = [];
        if (selectedType == '' || inputValue == '') {
            data = await database.load();
        } else {
            data = await database.loadByConditions(selectedType, inputValue);
        }
        console.log("data:", data);

        dispatch(setPosts(data));
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.itemsContainer}>
                    {/* <Text style={[styles.label, styles.itemsLabel]}>Breed</Text> */}
                    <View style={[styles.itemsLabel, styles.label]}>
                        <Picker
                            selectedValue={selectedType}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedType(itemValue)
                            }>
                            <Picker.Item label="Breed" value="breed" />
                            <Picker.Item label="Gender" value="gender" />
                            <Picker.Item label="Age" value="age" />
                            <Picker.Item label="Description" value="description" />
                        </Picker>
                    </View>
                    <TextInput
                        style={[styles.itemsInput, styles.textInput]}
                        // value={inputValue}
                        onChangeText={(input) => setInputValue(input.toLowerCase())}>
                    </TextInput>
                    <View style={styles.itemsButton}>
                        <Pressable onPress={hanleLabelPress}>
                            <Text style={styles.itemsButtonText}>Search</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
}