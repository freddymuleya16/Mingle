import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { Audio, ResizeMode, Video } from 'expo-av';
import { useState } from 'react';
import AudioPlayer from '../AudioPlayer';
import { FIREBASE_DB } from '../../../firebase.config';
import VoiceNotePlayer from '../VoiceNotePlayer';

const Container = styled.View`
  width: 100%;
  height: auto;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.isCurrent ? 'flex-end' : 'flex-start'};
`;

const ProfileImage = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-right: ${(props) => props.isCurrent ? '0' : '10px'};
`;

const LikeButton = styled.TouchableOpacity`
  width: 10%;
  aspect-ratio: 1;
  border-radius: 12px; 
  align-items: center;
  justify-content: center; 
  margin-left: 10px;
  margin-right: ${(props) => !props.isCurrent ? '0px' : '0'};
`;

const LikedIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
  color: red;
  margin-right: -20px;
  margin-top: -45px;
  z-index: 10;
`;

const MessageContainer = styled.View`   
  flex:1;
  flex-direction: row;
  align-items: center; 
  justify-content: ${(props) => props.isCurrent ? 'flex-end' : 'flex-start'};
`;
const ImageContainer = styled.View`  
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => props.isCurrent ? 'flex-end' : 'flex-start'};
`;

const MessageImage = styled(Image)`  
  align-self: ${(props) => props.isCurrent ? 'flex-end' : 'flex-start'}; 
  margin:10px 0;
  width: 85%;
  aspect-ratio: 4/5;
  border-radius: ${(props) => props.isCurrent ? '20px 20px 0px 20px' : '0 20px 20px 20px'};
`;


const MessageVideo = styled(Video)`
   align-self: ${(props) => props.isCurrent ? 'flex-end' : 'flex-start'}; 
  margin:10px 0;
  width: 85%;
  aspect-ratio: 4/5;
  border-radius: ${(props) => props.isCurrent ? '20px 20px 0px 20px' : '0 20px 20px 20px'};
`;

const MessageAudio = styled(AudioPlayer)` 
  margin:10px 0;
  width: 85%;
  aspect-ratio: 4/5;
  border-radius: ${(props) => props.isCurrent ? '20px 20px 0px 20px' : '0 20px 20px 20px'};
`;

const TextBox = styled.View`
    overflow: hidden; 
    padding: 10px;
    border-radius: ${(props) => props.isCurrent ? '20px 20px 0px 20px' : '0 20px 20px 20px'};
    background-color: ${(props) => props.gender === 'woman' ? '#FF69B4' : props.gender === 'man' ? '#0000FF' : 'transparent'};
    max-width: ${(props) => props.isCurrent ? '85%' : '100%'};
    align-self: ${(props) => props.isCurrent ? 'flex-end' : 'flex-start'};
`


const MessageText = styled.Text` 
  font-size: 16px;
  color: white; 
  border-radius: 30px;
  margin: 3px;
  overflow: hidden;
`;

const HeartIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${(props) => props.liked ? 'red' : '#c2c2c2'};
`;

function Chat({ data }) {
  const like = async (id, reaction) => {
    const messageRef = doc(FIREBASE_DB, `chats/${data.chatRef}/messages/${id}`);

    await updateDoc(messageRef, {
      liked: !reaction
    });
  }
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <Container isCurrent={data.isCurrent}>
      {!data.isCurrent && <ProfileImage source={{ uri: data.pictures[0] }} resizeMode="cover" />}

      <MessageContainer isCurrent={data.isCurrent}>
        {data.isCurrent && data.liked && (
          <LikedIcon liked={data.liked} icon={faHeart} />
        )}
        <ImageContainer>
          {data.images &&
            data.images.map((attachment, i) => (
              <MessageImage
                key={i}
                source={{ uri: attachment }}
                resizeMode="cover"
                isCurrent={data.isCurrent}
              />

            ))}

          {data.videos &&
            data.videos.map((attachment, i) => (
              <MessageVideo
                ref={video}

                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                key={i}
                source={{ uri: attachment }}
                isCurrent={data.isCurrent}
                controls
                paused
                repeat
              />
            ))}

        </ImageContainer>

        {/* {data.audio && (
          <VoiceNotePlayer
          sourceUri={data.audio}
            isCurrent={data.isCurrent}
            controls
            paused
          />
        )} */}
        {data.message !== '' && (
          <TextBox isCurrent={data.isCurrent}
            gender={data.gender}>
            <MessageText
              gender={data.gender}
              isCurrent={data.isCurrent}
            >
              {data.message} {data.text}
            </MessageText>
          </TextBox>

        )}
        {!data.isCurrent && (
          <LikeButton liked={data.liked} onPress={() => like(data.id, data.liked)}>
            <HeartIcon liked={data.liked} icon={faHeart} size={30} color={`${data.liked ? 'red' : '#c2c2c2'}`} />
          </LikeButton>
        )}
      </MessageContainer>

    </Container>
  );
}

export default Chat;
