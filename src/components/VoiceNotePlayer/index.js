import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const VoiceNotePlayer = ({ sourceUri }) => {
    const [sound, setSound] = useState();

    const playSound = async () => {
        console.log(sourceUri)
        const { sound } = await Audio.Sound.createAsync(
            { uri: sourceUri }
        );
        setSound(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <TouchableOpacity onPress={playSound}>
            <Text>Play Voice Note</Text>
        </TouchableOpacity>
    );
};

export default VoiceNotePlayer;
