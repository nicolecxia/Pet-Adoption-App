import { Text } from "react-native";
import PostList from "../../components/PostList";
import SelectorBar from "../../components/SelectorBar";
import { useDispatch } from "react-redux";
import { setPosts } from "../../redux/postsSlice";
import { useEffect } from 'react';
import * as database from '../../database';

export default function HomeScreen({ navigation }) {

    const dispatch = useDispatch();

    //dependencies is null, only execute once
    useEffect(() => {
        // IIFE - Immediately Invoked Function Expression
        (async () => {
            const data = await database.load();
            dispatch(setPosts(data));
        })();

    }, [])

    return (
        <>
            <SelectorBar />
            <PostList showDelete={false} showLike={true} />
        </>
    )
}