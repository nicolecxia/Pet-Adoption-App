import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from "./src/styles/structure";
import { primaryColor } from './src/includs/variables';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './src/components/Header';
import AppLoad from "./src/components/AppLoad";
import HomeScreen from "./src/screens/HomeScreen";
import MineScreen from "./src/screens/MineScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import * as Notifications from 'expo-notifications';


SplashScreen.preventAutoHideAsync();

// Handle notification display
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  }),
  handleSuccess: (notificationId) => {
    console.log('Handle Success:', notificationId);
  },
  handleError: (notificationId, error) => {
    console.log('Handle Error:', error);
  }

});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <AppLoad />
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Header />
          <Tab.Navigator screenOptions={{
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: primaryColor
            },
            tabBarActiveTintColor: primaryColor,
            size: 24
          }}>
            <Tab.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{
                title: 'Home',
                headerShown: false,
                unmountOnBlur: true,
                tabBarIcon: (props) => {
                  const name = props.focused ? 'home' : 'home-outline';
                  return (
                    <Ionicons name={name} size={props.size} color={props.color} />
                  )
                },
              }}>
            </Tab.Screen>
            <Tab.Screen
              name='MineScreen'
              component={MineScreen}
              options={{
                title: 'My Space',

                tabBarIcon: (props) => {
                  const name = props.focused ? 'account-details' : 'account-details-outline';
                  return (
                    <MaterialCommunityIcons name={name} size={props.size} color={props.color} />
                  )
                },
              }}
            >
            </Tab.Screen>
            <Tab.Screen
              name='SettingsScreen'
              component={SettingsScreen}
              options={{
                title: 'Settings',
                tabBarIcon: ({ focused, color, size }) => {
                  const name = focused ? 'settings' : 'settings-outline';
                  return (<Ionicons name={name} size={size} color={color} />)
                }
              }}
            >
            </Tab.Screen>

          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </Provider>


  );
}

