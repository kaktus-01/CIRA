import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function IssuesSummary({ periodName, issues }) {
    const issuesSum = issues.reduce((sum, issue) => {
        return sum + issue.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text>${issuesSum.toFixed(2)}</Text>
        </View>
    );
}
export default IssuesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
        fontFamily: "Futura",
    },
});
