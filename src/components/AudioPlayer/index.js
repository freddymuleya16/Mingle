import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PlayerText = styled.Text`
  font-size: 20px;
`;

const ControlsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ControlButton = styled.TouchableOpacity`
  margin: 0 10px;
`;

const ProgressBarContainer = styled.View`
  width: 80%;
  height: 10px;
  background-color: #ccc;
  border-radius: 5px;
  margin-top: 20px;
`;

const ProgressBar = styled.View`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #007aff;
  border-radius: 5px;
`;

const AudioPlayer = ({source}) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const loadAudio = async () => {
        console.log(source)
      const { sound, status } = await Audio.Sound.createAsync(
        source
      );
      setSound(sound);
      setDuration(status.durationMillis);
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
        setInterval(async () => {
          const { positionMillis } = await sound.getStatusAsync();
          setPosition(positionMillis);
        }, 1000);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Container>
      <PlayerText>{isPlaying ? 'Playing' : 'Paused'}</PlayerText>
      <ControlsContainer>
        <ControlButton onPress={handlePlayPause}>
          <FontAwesome5
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color="#007aff"
          />
        </ControlButton>
      </ControlsContainer>
      <ProgressBarContainer>
        <ProgressBar progress={(position / duration) * 100} />
      </ProgressBarContainer>
    </Container>
  );
};

export default AudioPlayer;
