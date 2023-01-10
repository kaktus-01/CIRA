import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function IssueItem({ id, description, date, resolved }) {
    const navigation = useNavigation();

    function issuePressHandler() {
        navigation.navigate("ManageIssues", {
            issueId: id,
        });
    }

    return (
        <Pressable
            onPress={issuePressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.issueItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
                <View style={styles.resolvedContainer}>
                    <Text style={styles.resolved}>{resolved}</Text>
                </View>
            </View>
        </Pressable>
    );
}
export default IssueItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    issueItem: {
        flexDirection: "row",
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        justifyContent: "space-between",
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
        fontFamily: "Futura",
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
        fontFamily: "Futura",
    },
    resolvedContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        minWidth: 80,
    },
    resolved: {
        color: GlobalStyles.colors.primary500,
        fontWeight: "bold",
        fontFamily: "Futura",
        //If {RESOLVED} == true then green
        //If {RESOLVED} == false then red
    },
});
