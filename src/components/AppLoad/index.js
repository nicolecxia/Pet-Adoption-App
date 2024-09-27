import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import * as database from '../../database';
import { setPosts } from '../../redux/postsSlice';
import { setBreeds } from '../../redux/breedsSlice';
import { getBreed } from '../../api/callAPI';

export default function AppLoader() {
    const dispatch = useDispatch();

    //dependencies is null, only execute once
    useEffect(() => {
        // IIFE - Immediately Invoked Function Expression
        (async () => {
            const data = await database.load();
            dispatch(setPosts(data));

            const catBreeds = await getBreed();
            // console.log("catBreeds:", catBreeds);
            dispatch(setBreeds(catBreeds));

            //Hides the SplashScreen that was prevented to auto hide.
            SplashScreen.hideAsync();
        })();

    }, [])
}