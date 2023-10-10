import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import { decryptMessage, getChatDocumentWithoutCreating } from '../../utils/helpers';
import { getAuth } from 'firebase/auth';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../firebase.config';
import { useSelector } from 'react-redux';

const Container = styled.TouchableOpacity`
  background-color: transparent;
  padding: 12px;
  flex-direction: row;
  width: 100%;
  height: 60px;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.Image`
  width: 58px;
  height: 58px;
  border-radius: 34px;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const SenderName = styled.Text`
  font-family: 'kalam';
  font-size: 16px;
  color: #000;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

const MessageText = styled.Text`
  font-family: 'kalam';
  font-size: 14px;
  color: #555;
  justify-content: space-between;
`;

const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Icons = styled(FontAwesome5)`
    margin-right: 10px;
    padding: 5px;
`

const Sender = ({ data, onClick, isSubscribed }) => {
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState(null);
  const user = useSelector(state => state.user.userData); 

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getChatDocumentWithoutCreating(
        user?.uid,
        data.id,
        'sender.js'
      );
      setChatId(response);
    }
    fetchData();
  }, [data.id]);

  // Listen for changes in messages when a chat is opened
  useEffect(() => {
    if (chatId) {
      // Use onSnapshot to listen for changes in the messages collection for this chat
      const unsubscribe = onSnapshot(
        query(
          collection(FIREBASE_DB, `chats/${chatId}/messages`),
          orderBy('timestamp', 'desc'),
          limit(1)
        ),
        (querySnapshot) => {
          const messages = [];
          // Loop through each document in the messages collection and add it to the messages array
          querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id, message: decryptMessage(doc.data().message) });
          });
     
          setMessage(messages[0] ?? '-');     console.log(messages[0].message,message === null || message == '-')
        }
      );
      return () => unsubscribe();
    }
  }, [chatId]);

  if (message === null || message == '-') { 
    return <></>;
  }

  return (
    <Container onPress={() => onClick()}>
      <ProfileImage source={{ uri: data.pictures[0] }} />
      <ContentContainer>
        <SenderName>
          {data.name} {data.surname}{' '}
          {isSubscribed && (
            
            <Octicons name="verified" size={16} color="#319795" style={{ marginLeft: 4 }} />
          )}
        </SenderName>
        <MessageText>
          {message == null ? 'Loading...' : message.videos && message.videos.length > 0 ? (
            <>
              {message.sender == user?.uid && (
                <Icons name="reply" size={16} color="#319795" style={{ marginRight: 4 }} />
              )}
              {" "}
              <Icons name="video" size={16} color="#319795"   />
              {message?.message ? message?.message : ' Video'}
            </>
          ) : message.images && message.images.length > 0 ? (
            <>
              {message.sender == user?.uid && (
                <Icons name="reply" size={16} color="#319795" style={{ marginRight: 4 }} />
              )}
              {" "}
              <Icons name="image" size={16} color="#319795" style={{ marginRight: 4 }} />
              {message?.message ? message?.message : ' Image'}
            </>
          ) : message.audio ? (
            <>
              {message.sender == user?.uid && (
                <Icons name="reply" size={16} color="#319795" style={{ marginRight: 4 }} />
              )}
              <Icons name="microphone" size={16} color="#319795" style={{ marginRight: 4 }} />
              Audio
            </>
          ) : (
            <>
              {message.sender == user?.uid && (
                <Icons name="reply" size={16} color="#319795" />
              )}
              {' '}{message?.text}{message?.message}
            </>
          )}
        </MessageText>
      </ContentContainer>
    </Container>
  );
};

export default Sender;
