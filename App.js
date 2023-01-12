import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageIssues from "./screens/ManageIssues";
import RecentIssues from "./screens/RecentIssues";
import AllIssues from "./screens/AllIssues";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import IssuesContextProvider from "./store/issues-context";
import CameraScreen from "./screens/CameraScreen";

import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BottomTabs = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "blue",
                },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "blue" },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

function AuthenticationStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "blue" },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "blue" },
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            /* SCREENS FROM CIRACopy */
        </Stack.Navigator>
    );
}

function Navigation() {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
}

function IssuesOverview() {
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarInactiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="add"
                        size={24}
                        color={tintColor}
                        onPress={() => {
                            navigation.navigate("ManageIssues");
                        }}
                    />
                ),
            })}
        >
            <BottomTabs.Screen
                name="RecentIssues"
                component={RecentIssues}
                options={{
                    title: "Recent Issues",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    title: "Camera",
                    tabBarLabel: "Camera",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="camera" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="AllIssues"
                component={AllIssues}
                options={{
                    title: "All Issues",
                    tabBarLabel: "All Issues",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <IssuesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: GlobalStyles.colors.primary500,
                                headerTintColor: "white",
                            },
                        }}
                    >
                        <Stack.Screen
                            name="IssuesOverview"
                            component={IssuesOverview}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ManageIssues"
                            component={ManageIssues}
                            options={{ presentation: "modal" }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </IssuesContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
