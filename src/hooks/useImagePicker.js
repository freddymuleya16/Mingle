import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const useImagePicker = (multiple = false,both=true) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: both?ImagePicker.MediaTypeOptions.All:ImagePicker.MediaTypeOptions.Images,
            allowsEditing: !multiple,
            aspect: [16, 9],
            quality: 1,
            allowsMultipleSelection: multiple,
        });

        if (!result.canceled) {
            console.log(result.assets)
            const res = result.assets.map((asset) => {
                return {
                    uri: asset.uri,
                    filename: asset.fileName,
                    type: asset.type
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
