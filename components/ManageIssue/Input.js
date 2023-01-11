import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, TextInputConfig }) {
    let inputStyles = [styles.input];

    if (TextInputConfig && TextInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...TextInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        fontFamily: "Futura",
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 14,
        fontFamily: "Futura",
        color: GlobalStyles.colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
});
