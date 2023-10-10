import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrophone, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
import { isSubscribed } from '../../utils/helpers';

const VoiceRecorderContainer = styled(View)`  
  padding: 5px;
  flex-direction: row;
  align-items: center; 
`;

const IconWrapper = styled(TouchableOpacity)`
  margin: 0 10px;
`;

const TimerText = styled(Text)`
  color: white;
`;

const VoiceRecorder = ({ recording, setRecording, sendVN, user }) => {
    const audioRef = useRef(null);
    const maxRecordingDuration = isSubscribed(user) ? 120 : 30; // 10 minutes or 2 minutes in milliseconds
    const [timer, setTimer] = useState(0);
    const timerInterval = useRef(null);
    const recordingOptions = {
        android: {
            extension: '.wav',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
        },
        ios: {
            extension: '.wav',
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
        },
    };

    useEffect(() => {
        // Set the audio mode to allow recording on iOS
        Audio.setAudioModeAsync({
            allowsRecording: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
        });
    }, []);

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            }); 
            console.log(audioRef)
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();

            setRecording(true);

            timerInterval.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer >= maxRecordingDuration) {
                        // Automatically stop recording when the maximum duration is reached
                        stopRecording();
                    }
                    return prevTimer + 1;
                });
            }, 1000);

            audioRef.current = recording;
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = async () => {
        if (audioRef.current) {
            clearInterval(timerInterval.current);

            try {
                await audioRef.current.stopAndUnloadAsync();
                setRecording(false);
                setTimer(0);

                const uri = audioRef.current.getURI();
                sendVN({ uri });
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
        }
    };
    const deleteRecording = async () => {
        if (audioRef.current) {
            clearInterval(timerInterval.current);

            try {
                await audioRef.current.stopAndUnloadAsync();
                setRecording(false);
                setTimer(0);

                 
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
        }
    };

    // Customize the styles and components as needed

    return (
        <VoiceRecorderContainer>
            {recording ? (
                <>
                    <IconWrapper onPress={deleteRecording}>
                        <FontAwesomeIcon 
                            icon={faTrash}
                            size='30' 
                            color="red"/>
                    </IconWrapper>

                    <TimerText>{timer} seconds</TimerText>
                    <IconWrapper onPress={stopRecording}>
                        <FontAwesomeIcon
                        onClick={stopRecording}
                        icon={faStop}
                        size='30' 
                        color='#319795'/>
                    </IconWrapper>
                    

                </>
            ) : (
                <IconWrapper onPress={startRecording}>
                    <FontAwesomeIcon icon={faMicrophone} size={30} color="#6b7280" />
                </IconWrapper>
            )}
        </VoiceRecorderContainer>
    );
};

export default VoiceRecorder;
