import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Icon, Slider } from 'react-native-elements';
import styled from 'styled-components/native';

const VoiceNoteContainer = styled.View`
  background-color: ${(props) => props.gender === 'woman' ? '#FF69B4' : props.gender === 'man' ? '#0000FF' : 'transparent'};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VoiceNotePlayer = ({ sourceUri,gender }) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSound = async () => {
    if (sound) {
        console.log('first')
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else {
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: sourceUri },
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => { 
        setIsPlaying(status.isPlaying)
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        }

        if(!status.isPlaying){
            setDuration(0);
            setSound(null)
            setPosition(0)
        }
      }); 
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <VoiceNoteContainer gender={gender}>
      <TouchableOpacity onPress={playSound}>
        <Icon
          name={isPlaying ? 'pause' : 'play-arrow'}
          type="material"
          size={30}
          color="white"
        />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={stopSound}>
        <Icon name="stop" type="material" size={30} color="white" />
      </TouchableOpacity> */}
      <Slider
        value={position}
        maximumValue={duration}
        thumbTintColor="white"
        maximumTrackTintColor="lightgray"
        minimumTrackTintColor="white"
        thumbStyle={{ height: 40, width: 40, backgroundColor: 'transparent' }}
        style={{ width: 200 }}
      />
    </VoiceNoteContainer>
  );
};

export default VoiceNotePlayer;
