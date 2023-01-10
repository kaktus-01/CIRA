import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageIssues from "./screens/ManageIssues";
import RecentIssues from "./screens/RecentIssues";
import AllIssues from "./screens/AllIssues";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import IssuesContextProvider from "./store/issues-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

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
