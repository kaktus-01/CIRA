import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as FileSystem from "expo-file-system";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const CameraScreen = () => {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyA38KWleQXz95u_WDRICUX-8ZTaz-jJmDs",
        authDomain: "cira-copy.firebaseapp.com",
        storageBucket: "cira-copy.appspot.com",
    };
    firebase.initializeApp(firebaseConfig);

    const storage = firebase.storage();

    async function uploadImage(base64) {
        // Create a storage reference
        const storageRef = storage.ref();

        // Create a timestamp for the image file name
        const timestamp = new Date().getTime();

        // Create the image file in the storage bucket
        const imageRef = storageRef.child(`images/${timestamp}.jpg`);
        console.log("created storage file");

        // Convert the base64 string to a Blob
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = reject;
            xhr.open("GET", `data:image/jpeg;base64,${base64}`, true);
            xhr.send();
            console.log("created blob");
        });

        // Upload the image to Firebase Storage
        const snapshot = await imageRef.put(blob);
        console.log("uploaded image");

        // Get the image URL
        const imageUrl = await snapshot.ref.getDownloadURL();

        return imageUrl;
    }

    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    function toggleCameraType() {
        setCameraType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 0.5,
                base64: true,
                skipProcessing: true,
            };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data.uri;
            if (source) {
                // await cameraRef.current.pausePreview();
                // setIsPreview(true);
                // console.log("picture source: ", source);
                // TODO: navigate to new issue screen, pass parameter with picture source
                navigation.navigate("ManageIssues", { source });
                const base64 = await FileSystem.getContentUriAsync(source, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                console.log(base64);
            }
        }
    };

    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
        setVideoSource(null);
    };

    const renderCancelPreviewButton = () => (
        <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
            <View
                style={[
                    styles.closeCross,
                    { transform: [{ rotate: "45deg" }] },
                ]}
            />
            <View
                style={[
                    styles.closeCross,
                    { transform: [{ rotate: "-45deg" }] },
                ]}
            />
        </TouchableOpacity>
    );

    function toggleCameraType() {
        setCameraType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    const renderCaptureControl = () => (
        <>
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
                        <Icon name="eye-refresh" size={40} color="#0E7AFE" />
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
                        disabled={!isCameraReady}
                        onPress={() => takePicture() && uploadImage()}
                        style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: "#fff",
                            opacity: 0.5,
                        }}
                    />
                </View>
            </View>
        </>
    );

    if (hasPermission === null) {
        // Camera permissions are still loading
        return <View />;
    }

    if (hasPermission === false) {
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
                <Button onPress={setHasPermission} title="Use Camera" />
            </View>
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
            <Camera
                ref={cameraRef}
                type={cameraType}
                flashMode={flash}
                style={{ flex: 1 }}
                onCameraReady={onCameraReady}
            >
                <View style={styles.container}>
                    {!isPreview && renderCaptureControl()}
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
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default CameraScreen;
