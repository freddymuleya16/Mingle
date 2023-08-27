import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const useImagePicker = (multiple = false) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: !multiple,
            aspect: [16, 9],
            quality: 1,
            allowsMultipleSelection: multiple,
        });

        if (!result.canceled) {
            const res = result.assets.map((asset) => {
                return {
                    uri: asset.uri,
                    filename: asset.fileName
                }
            })
            if (multiple) {
                setImage(res)
            }
            else {
                setImage(res[0])
            }
        }
    };

    return { image, pickImage, setImage };
};

export default useImagePicker;
