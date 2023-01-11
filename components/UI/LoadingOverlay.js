import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay() {
    <View>
        <ActivityIndicator
            style={styles.container}
            size="large"
            color="white"
        />
    </View>;
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});
