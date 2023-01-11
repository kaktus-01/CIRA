import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useState } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CameraScreen = () => {
    const navigation = useNavigation();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ fontFamily: "Futura", fontSize: 17 }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Use Camera" />
            </View>
        );
    }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    return (
        <View
            style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
            }}
        >
            <Camera type={type} flashMode={flash} style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        alignSelf: "flex-end",
                        justifyContent: "flex-start",
                        marginTop: 70,
                        marginRight: 10,
                    }}
                >
                    <TouchableOpacity onPress={() => toggleCameraType()}>
                        <IconComponentProvider
                            IconComponent={MaterialCommunityIcons}
                        >
                            <Icon
                                name="eye-refresh"
                                size={40}
                                color="#0E7AFE"
                            />
                        </IconComponentProvider>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setFlash(
                                flash === Camera.Constants.FlashMode.off
                                    ? Camera.Constants.FlashMode.torch
                                    : Camera.Constants.FlashMode.off
                            );
                        }}
                    >
                        <IconComponentProvider
                            IconComponent={MaterialCommunityIcons}
                        >
                            <Icon name="flash" size={40} color="yellow" />
                        </IconComponentProvider>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        flexDirection: "row",
                        flex: 1,
                        width: "100%",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            alignSelf: "center",
                            flex: 1,
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: "#fff",
                            }}
                        />
                    </View>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default CameraScreen;
