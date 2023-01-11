import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function IssueForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
    const [inputValues, setInputValues] = useState({
        title: defaultValues ? defaultValues.title : "",
        date: defaultValues
            ? defaultValues.date.toISOString().slice(0, 10)
            : "",
        description: defaultValues ? defaultValues.description : "",
        category: defaultValues ? defaultValues.category : "",
        geolocation: defaultValues ? defaultValues.geolocation : "",
        status: defaultValues ? defaultValues.status : "",
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    function sumbitHandler() {
        const issueData = {
            title: inputValues.title,
            date: new Date(inputValues.date),
            description: inputValues.description,
            category: inputValues.category,
            geolocation: "Next to the bin under the bridge. Obviously",
            status: "reported",
        };

        onSubmit(issueData);
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>New Report</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Title"
                    TextInputConfig={{
                        onChangeText: inputChangedHandler.bind(this, "title"),
                        value: inputValues.title,
                        placeholder: "Garbage on street",
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label="Date"
                    TextInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, "date"),
                        value: inputValues.date,
                    }}
                />
            </View>
            <Input
                label="Description"
                TextInputConfig={{
                    multiline: true,
                    placeholder:
                        "Found very smelly garbage on the streets of Prague",
                    onChangeText: inputChangedHandler.bind(this, "description"),
                    value: inputValues.description,
                }}
            />
            <Text style={styles.categoryTitle}>Category</Text>
            <Button style={styles.categoryButton}>Road</Button>
            <Button style={styles.categoryButton}>Garbage</Button>
            <Button style={styles.categoryButton}>Traffic</Button>
            <Button style={styles.categoryButton}>Nature</Button>
            <Button style={styles.categoryButton}>Other</Button>
            <View style={styles.buttons}>
                <Button style={styles.button} mode={"flat"} onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={sumbitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
}

export default IssueForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontFamily: "Futura",
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center",
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
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
    rowButtonInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 12,
    },
    categoryButton: {
        //        padding: 4,
        //        marginVertical: 4,
        minWidth: 150,
        alignSelf: "center",
    },
    categoryTitle: {
        fontFamily: "Futura",
        fontSize: 16,
        color: GlobalStyles.colors.primary100,
    },
});
