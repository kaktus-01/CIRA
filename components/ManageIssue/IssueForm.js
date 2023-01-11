import { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import LoadingOverlay from "../UI/LoadingOverlay";
import { ActivityIndicator } from "@react-native-material/core";
import DropDownPicker from "react-native-dropdown-picker";
import DropdownMenu from "../UI/DropdownMenu";

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
        picture: "",
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
            picture: "",
        };

        onSubmit(issueData);
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.title}>New Report</Text>
                <ActivityIndicator style={styles.image}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Penis_asiatischer_Elefant.JPG",
                        }}
                    />
                </ActivityIndicator>
                <View style={styles.inputsRow}>
                    <Input
                        style={styles.rowInput}
                        label="Title"
                        TextInputConfig={{
                            onChangeText: inputChangedHandler.bind(
                                this,
                                "title"
                            ),
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
                            onChangeText: inputChangedHandler.bind(
                                this,
                                "date"
                            ),
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
                        onChangeText: inputChangedHandler.bind(
                            this,
                            "description"
                        ),
                        value: inputValues.description,
                    }}
                />
                <Text style={styles.categoryTitle}>Category</Text>
                <View style={styles.rowButtonInput}>
                    <DropdownMenu zIndex={100000} autoScroll={true} />
                </View>
                <View style={styles.buttons}>
                    <Button
                        style={styles.button}
                        mode={"flat"}
                        onPress={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button style={styles.button} onPress={sumbitHandler}>
                        {submitButtonLabel}
                    </Button>
                </View>
            </View>
        </ScrollView>
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
        paddingBottom: 10,
        paddingTop: 10,
    },
    categoryButton: {
        padding: 4,
        marginVertical: 4,
        minWidth: 150,
        alignSelf: "center",
    },
    categoryTitle: {
        fontFamily: "Futura",
        fontSize: 16,
        color: GlobalStyles.colors.primary100,
    },
    image: {
        height: 600,
        width: 330,
        alignSelf: "center",
        borderRadius: 10,
        paddingBottom: 700,
    },
});
