import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { IssuesContext } from "../store/issues-context";

function ManageIssues({ route, navigation }) {
    const issuesCtx = useContext(IssuesContext);

    const editedIssueId = route.params?.issueId;

    const isEditing = !!editedIssueId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Issue" : "Add Issue",
        });
    }, [navigation, isEditing]);

    function deleteIssueHandler() {
        issuesCtx.deleteIssue(editedIssueId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            issuesCtx.updateIssue(editedIssueId, {
                description: "test!!!!",
                date: new Date("2022-05-21"),
                resolved: "false",
            });
        } else {
            issuesCtx.addIssue({
                description: "test",
                date: new Date("2022-05-19"),
                resolved: "true",
            });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button
                    style={styles.button}
                    mode={"flat"}
                    onPress={cancelHandler}
                >
                    Cancel
                </Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
            <IconButton />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteIssueHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageIssues;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
