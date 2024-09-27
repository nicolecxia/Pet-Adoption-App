import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MineLayout from "../../components/MineLayout";
import Form from "../../components/Form";
import PostList from "../../components/PostList";

const Stack = createNativeStackNavigator();

export default function MineScreen({ navigation }) {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MineLayout} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={Form} options={{ title: 'Add a new post' }} />
            <Stack.Screen name="MyLikes" options={{ title: 'My likes' }} >
                {(props) => (
                    <PostList showDelete={false} showLike={true} />
                )}
            </Stack.Screen>
            <Stack.Screen name="MyPosts" options={{ title: 'My posts' }} >
                {(props) => (
                    <PostList showDelete={true} showLike={false} />
                )}
            </Stack.Screen>

        </Stack.Navigator>


    )
}