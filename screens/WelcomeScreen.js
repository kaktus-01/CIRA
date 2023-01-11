import { StyleSheet, Text, View } from "react-native";

function WelcomeScreen() {
    return (
        <View>
            <Text style={styles.rootContainer}> Welcome</Text>
            <Text style={styles.title}>You authed succesfully</Text>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
    },
});
