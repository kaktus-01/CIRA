import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import IssuesList from "./IssuesList";

function IssuesOutput({ issues, IssuesPeriod, fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (issues.length > 0) {
        content = <IssuesList issues={issues} />;
    }
    return <View style={styles.container}>{content}</View>;
}

export default IssuesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Futura",
        textAlign: "center",
        marginTop: 32,
    },
});
