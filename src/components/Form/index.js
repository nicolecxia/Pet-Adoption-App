import { useState } from "react";
import { View, Text, TextInput, Switch, Button, Pressable, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../redux/postsSlice";
import * as database from '../../database';
import { primaryColor } from "../../includs/variables";
import { Picker } from "@react-native-picker/picker";
import { getCatImageByBreed } from "../../api/callAPI";

export default function Form({ navigation, route }) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [breedName, setBreedName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [adopted, setAdopted] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [savingData, setSavingData] = useState(false);

    const breeds = useSelector((state) => state.breed.breeds);

    const dispatch = useDispatch();
    const handleSelectBreed = (itemValue, itemIndex) => {
        setBreed(itemValue);
        setBreedName(breeds[itemIndex].name)
    }

    const handleSavePress = async () => {
        const validate = [];

        //validate the date
        if (name === '') {
            validate.push('The name is required.');
        }

        if (breed === '') {
            validate.push('The breed is required.');
        }

        if (gender === '') {
            validate.push('The gender is required.');
        }

        if (age === '') {
            validate.push('The age is required.');
        }

        if (description === '') {
            validate.push('The description is required.')
        }

        let imageURL = await getCatImageByBreed(breed);
        console.log('imageURL:', imageURL);
        if (imageURL === '') {
            validate.push('Can not get the image URL');
        }

        if (validate.length > 0) {
            setErrorMessages(validate);
        } else {
            //add data to state
            const data = {
                name,
                breed,
                breedName,
                imageURL,
                gender,
                age,
                description,
                adopted,
                liked: false,
                userid: database.userUID
            }

            setSavingData(true);
            const id = await database.save(data);
            setSavingData(false);

            console.log('ID:', id);
            if (id) {
                data.id = id;
                console.log('Saved Data:', data);
                dispatch(addPost(data));

                //clear up the form
                setName('');
                setBreed('');
                setGender('');
                setAge('');
                setDescription('');
                setAdopted(false);
                setErrorMessages([]);

                navigation.goBack();
            } else {
                setErrorMessages(['Error on save. Try again later.']);
            }
        }
    }

    const handleTitleChange = (value) => {
        setTitle(value);
    }

    const handleDescriptionChange = (value) => {
        setDescription(value);
        //use callback function when we have more operate
    }


    const hanleLabelPress = () => {
        setAdopted(!adopted);
    }

    if (savingData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} color={primaryColor} />
                <Text style={styles.loadingText}>Saving data!</Text>
                <Text style={styles.loadingText}>Please, wait...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/*conditionally display the error message */}
            {errorMessages.length > 0 && (
                <>
                    <Text style={styles.errorMessageTitle}>Invalid data:</Text>
                    {errorMessages.map((errMsg, index) => (
                        <Text key={index} style={styles.errorMessageItem}>
                            - {errMsg}
                        </Text>
                    ))}
                </>
            )}
            <View style={styles.itemsContainer}>
                <Text style={[styles.label, styles.itemsLabel]}>Name</Text>
                <View style={styles.itemsInput}>
                    <TextInput style={styles.textInput}
                        value={name}
                        onChangeText={setName}>
                    </TextInput>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <Text style={[styles.label, styles.itemsLabel]}>Breed</Text>
                <View style={styles.itemsInput}>
                    <Picker
                        selectedValue={breed}
                        onValueChange={(itemValue, itemIndex) =>
                            handleSelectBreed(itemValue, itemIndex)
                        }>
                        <Picker.Item label="Select a Breed" value="" />
                        {breeds.map((breed, itemIndex) => (
                            <Picker.Item label={breed.name} value={breed.id} />
                        ))}

                        {/* <Picker.Item label="Cat" value="cat" />
                        <Picker.Item label="Dog" value="dog" />
                        <Picker.Item label="Others" value="others" /> */}
                    </Picker>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <Text style={[styles.label, styles.itemsLabel]}>Gender</Text>
                <View style={styles.itemsInput}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }>
                        <Picker.Item label="Select a Gender" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <Text style={[styles.label, styles.itemsLabel]}>Age</Text>
                <View style={styles.itemsInput}>
                    <TextInput style={styles.textInput}
                        value={age}
                        onChangeText={setAge}>
                    </TextInput>
                </View>
            </View>
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={[styles.textInput, styles.textInputDescription]}
                // placeholder="Description"
                multiline={true}
                value={description}
                onChangeText={setDescription}
            />
            <View style={styles.switch}>
                <Switch
                    value={adopted}
                    onValueChange={setAdopted}
                />
                <Pressable onPress={hanleLabelPress}>
                    <Text style={styles.switchText}>Adopted</Text>
                </Pressable>
            </View>


            {/* <UploadImages /> */}


            <Button title="Save" onPress={handleSavePress} />
        </View>
    );
}