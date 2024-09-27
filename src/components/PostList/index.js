import { Pressable, ScrollView, Text, View, Button, Modal } from "react-native";
import PostItem from "./PostItem";
import styles from "./styles";
import { useSelector } from "react-redux";
import { useState } from 'react';


export default function PostList({ navigation, route, showDelete, showLike }) { //当Array作为一个props传递，用{}去destructure
    const posts = useSelector((state) => state.post.posts);
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [breedName, setBreedName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');

    const handleAddPostPress = () => {
        navigation.navigate('Add');
    }

    const handleGoBackPress = () => {
        navigation.goBack();
    }

    const handlePostPress = (post) => {
        //Show detial in Modal
        setName(post.name)
        setBreed(post.breed);
        setBreedName(post.breedName);
        setGender(post.gender);
        setAge(post.age);
        setDescription(post.description);

        setShowModal(true);

        // navigation.navigate('Detail', post);
    }

    const handleModalToggle = () => {
        setShowModal(!showModal);
    }

    //gets a random number between 0 and max number provided to the function
    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    return (
        <>
            <ScrollView>
                {posts.map((post, index) => {
                    return (//must return JSX
                        <Pressable key={index} onPress={() => handlePostPress(post)}>
                            <PostItem
                                {...post} showDelete={showDelete} showLike={showLike}
                            />
                        </Pressable>
                    )
                })}
                <View style={{ height: 10 }}></View>
            </ScrollView>

            {/* <View style={styles.addButtonContainer}>
                <Pressable onPress={handleAddPostPress}>
                    <Text style={styles.addButtonText}>+</Text>
                </Pressable>
            </View> */}



            <Modal visible={showModal} animationType="none" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTextTitle}>Pet Details</Text>
                        <Text style={styles.modalText}>Name: {name}</Text>
                        <Text style={styles.modalText}>Breed: {breedName}</Text>
                        <Text style={styles.modalText}>Gender: {gender}</Text>
                        <Text style={styles.modalText}>Age: {age}</Text>
                        <Text style={styles.modalText}>Description: {description}</Text>

                        <Button title="Close" onPress={handleModalToggle}></Button>
                    </View>
                </View>
            </Modal>

        </>
    );
}