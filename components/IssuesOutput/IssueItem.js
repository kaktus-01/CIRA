import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function IssueItem({ id, title, date, geolocation, status }) {
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
                    <Text style={[styles.textBase, styles.title]}>{title}</Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
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
    title: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
        fontFamily: "Futura",
    },
});
