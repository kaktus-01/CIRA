import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IssueForm from "../components/ManageIssue/IssueForm";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { IssuesContext } from "../store/issues-context";
import { deleteIssue, storeIssue, updateIssue } from "../util/http";

function ManageIssues({ route, navigation }) {
    const issuesCtx = useContext(IssuesContext);

    const editedIssueId = route.params?.issueId;

    const isEditing = !!editedIssueId;

    const selectedIssue = issuesCtx.issues.find(
        (issue) => issue.id === editedIssueId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Issue" : "Add Issue",
        });
    }, [navigation, isEditing]);

    async function deleteIssueHandler() {
        await deleteIssue(editedIssueId);
        issuesCtx.deleteIssue(editedIssueId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(issueData) {
        if (isEditing) {
            issuesCtx.updateIssue(editedIssueId, issueData);
            await updateIssue(editedIssueId, issueData);
        } else {
            const id = await storeIssue(issueData);
            issuesCtx.addIssue({ ...issueData, id: id });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <IssueForm
                submitButtonLabel={isEditing ? "Update" : "Add"}
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedIssue}
            />

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
    deleteContainer: {
        marginTop: 85,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
