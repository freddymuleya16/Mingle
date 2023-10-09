import React from 'react';
import styled from 'styled-components/native';
import Chat from '../ChatBox';
 

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
  return (
    <ChatListContainer>
      {Object.entries(groupedChats).map(([date, chats]) => (
        <ChatGroup
          key={date}
          date={date}
          chats={chats}
          receiver={receiver}
          currentUser={currentUser}
          chatRef={chatRef}
        />
      ))}
    </ChatListContainer>
  );
}

export default ChatList;
