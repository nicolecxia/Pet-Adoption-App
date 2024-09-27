import { View, Text, Switch, Pressable, Alert, Button, Image } from "react-native";
import styles from "./styles";
import { useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { deletePost, changeStatus, changeLiked } from "../../../redux/postsSlice";
import * as database from '../../../database';
import { primaryColor } from "../../../includs/variables";
import { useState } from "react";

export default function PostItem({ id, name, breed, breedName, imageURL, gender, age, description, adopted, liked, showDelete, showLike }) {
    // const allowDelete = useSelector((state) => state.preference.allowDelete);
    const allowDelete = true;
    const dispatch = useDispatch();

    const [likeStatus, setLikeStatus] = useState(liked);
    const likeName = likeStatus ? 'like1' : 'like2';


    const handelStatusChange = async () => {
        //Assume that the data was updated...
        const data = {
            adopted: !adopted,
            id: id
        }
        //can only send on parameter to payload, if have multiple data, including all of them in an object
        dispatch(changeStatus(data));

        //...then update the data on the database
        const updated = await database.update(id, { adopted: !adopted });

        if (!updated) {
            const data = {
                adopted: !adopted,
                id: id
            }
            //can only send on parameter to payload, if have multiple data, including all of them in an object
            dispatch(changeStatus(data));

            Alert.alert('Error', 'There was an error trying to update the post!', [{ text: 'OK' }]);
        }
    }

    const handleLikeChange = async () => {



        const data = {
            liked: !liked,
            id: id
        }
        console.log('liked:', data);

        //can only send on parameter to payload, if have multiple data, including all of them in an object
        dispatch(changeLiked(data));
        setLikeStatus(!liked);

        //...then update the data on the database
        const updated = await database.update(id, { liked: !liked });


        if (!updated) {
            const data = {
                liked: !liked,
                id: id
            }
            //can only send on parameter to payload, if have multiple data, including all of them in an object
            dispatch(changeLiked(data));
            setLikeStatus(!liked);

            Alert.alert('Error', 'There was an error trying to update the post!', [{ text: 'OK' }]);
        }


    }



    const handleDeletePress = () => {
        Alert.alert(
            'Delete Post',
            `This message will delete the post ${name}. \nAre you sure?`,
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        //Remove from database
                        const deleted = await database.remove(id);
                        if (!deleted) {
                            Alert.alert('Error', 'There is an error trying to delete the post!', [{ text: 'OK' }]);
                        } else {
                            //delete from Redux
                            dispatch(deletePost(id));
                        }
                    }
                },
                {
                    text: 'No',
                }
            ]
        );
    }

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {imageURL && imageURL !== '' && (
                    <Image
                        source={{ uri: imageURL }}
                        style={styles.image}
                    />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text style={styles.breed}>
                    {breedName} / {gender}
                </Text>
                <Text style={styles.description}>
                    {age} year-old
                </Text>
            </View>

            <View style={styles.buttons}>
                <View style={styles.switch}>
                    <Switch
                        value={adopted}
                        onValueChange={handelStatusChange}
                    />
                    <Pressable onPress={handelStatusChange}>
                        <Text style={styles.switchText}>Adopted</Text>
                    </Pressable>
                </View>

                {showDelete && allowDelete && (<AntDesign.Button
                    name="delete"
                    size={24}
                    color="#cc0000"
                    backgroundColor="transparent"
                    underlayColor="#ffdddd"
                    onPress={handleDeletePress}
                >
                    Delete
                </AntDesign.Button>)}

                {showLike && (<AntDesign.Button
                    name={likeName}
                    size={24}
                    color={primaryColor}
                    backgroundColor="transparent"
                    underlayColor="#ffdddd"
                    onPress={handleLikeChange}
                >
                    Like
                </AntDesign.Button>)}

            </View>
        </View>
    );
}