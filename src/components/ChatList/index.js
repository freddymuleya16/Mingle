import React from 'react';
import styled from 'styled-components/native';
import Chat from '../ChatBox';
import { FlatList } from 'react-native';
 

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; 
`;

const DateText = styled.Text` 
  height: auto;
  padding: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-family: 'kalam';
  margin-bottom: 10px;
`;

function ChatGroup({ date, chats, receiver, currentUser, chatRef }) {
  return (
    <Container>
      <DateText>{date}</DateText>
      {chats.map((message, index) => (
        <Chat
          key={index}
          data={{
            pictures: receiver.pictures,
            ...message,
            isCurrent: message.sender === currentUser.id,
            gender: message.sender === currentUser.id ? currentUser.gender : receiver.gender,
            chatRef,
          }}
        />
      ))}
    </Container>
  );
}

const ChatListContainer = styled.View``;

function ChatList({ groupedChats, receiver, currentUser, chatRef }) {
  const chatGroups = Object.entries(groupedChats).map(([date, chats]) => ({
    date,
    chats,
  }));

  const renderItem = ({ item }) => (
    <ChatGroup
      date={item.date}
      chats={item.chats}
      receiver={receiver}
      currentUser={currentUser}
      chatRef={chatRef}
    />
  );

  return (
    <FlatList
      data={chatGroups}
      keyExtractor={(item) => item.date}
      renderItem={renderItem}
    />
  );
}

export default ChatList;
