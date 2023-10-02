import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0;
  flex-direction: row;
`;

const Sidebar = styled.View`
  display: none;
  @media (min-width: 640px) {
    display: flex;
    flex-basis: 25%;
    background: linear-gradient(to right, #ff007f, #ff5c83);
    padding: 24px;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const ProfileHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: 2px solid #fff;
`;

const ProfileInfo = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const DisplayName = styled.Text`
  font-family: 'Poppins';
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const StatusIcon = styled.View`
  background-color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const MenuButtons = styled.View`
  display: flex;
  flex-direction: column;
`;

const MenuButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding: 12px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    font-size: 24px;
  }
`;

const MainContent = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  overflow-y: auto;
`;

const ChatItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  cursor: pointer;
`;

const ChatImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 2px solid #fff;
`;

const ChatDetails = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const ChatName = styled.Text`
  font-family: 'Poppins';
  font-weight: bold;
  font-size: 16px;
`;

const ChatDescription = styled.Text`
  font-family: 'Poppins';
  font-size: 12px;
  color: #777;
`;

const ChatDate = styled.Text`
  font-family: 'Poppins';
  font-size: 12px;
  color: #777;
`;

const MessageContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
`;

const MessageAudio = styled.View`
  background-color: #007bff;
  max-width: 70%;
  border-radius: 20px;
  padding: 8px;
`;

const AudioPlayer = styled.Audio`
  width: 100%;
  outline: none;
`;

const HeartButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 20px;
  margin-left: auto;
`;

const HeartIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const ChatScreen = () => {
  return (
    <Container>
      <Sidebar>
        <ProfileHeader>
          <ProfileImage
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/pictures%252F1686913708735-2661049_cokakolakao_meg-griffin.png?alt=media&token=9301b40a-81fc-4099-a352-845af6eb8e75',
            }}
          />
          <ProfileInfo>
            <DisplayName>Meg Griffin</DisplayName>
            <StatusIcon></StatusIcon>
          </ProfileInfo>
        </ProfileHeader>
        <MenuButtons>
          <MenuButton>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="house-chimney"
              class="svg-inline--fa fa-house-chimney fa-lg "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              {/* Your SVG content here */}
            </svg>
          </MenuButton>
          <MenuButton>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="comments"
              class="svg-inline--fa fa-comments fa-w-18 fa-lg "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              {/* Your SVG content here */}
            </svg>
          </MenuButton>
          <MenuButton>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="cogs"
              class="svg-inline--fa fa-cogs fa-w-16 fa-lg "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              {/* Your SVG content here */}
            </svg>
          </MenuButton>
          <MenuButton>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user-friends"
              class="svg-inline--fa fa-user-friends fa-w-20 fa-lg "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              {/* Your SVG content here */}
            </svg>
          </MenuButton>
          <MenuButton>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="ellipsis-v"
              class="svg-inline--fa fa-ellipsis-v fa-w-6 fa-lg "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512"
            >
              {/* Your SVG content here */}
            </svg>
          </MenuButton>
        </MenuButtons>
      </Sidebar>
      <MainContent>
        <ChatItem>
          <ChatImage
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/pictures%252F1686913708735-2661049_cokakolakao_meg-griffin.png?alt=media&token=9301b40a-81fc-4099-a352-845af6eb8e75',
            }}
          />
          <ChatDetails>
            <ChatName>Meg Griffin</ChatName>
            <ChatDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              consequat.
            </ChatDescription>
            <ChatDate>2h ago</ChatDate>
          </ChatDetails>
          <HeartButton>
            <HeartIcon
              source={{
                uri:
                  'https://www.iconfinder.com/data/icons/love-valentine-3/24/147-512.png',
              }}
            />
          </HeartButton>
        </ChatItem>
        <MessageContainer>
          <MessageAudio>
            <AudioPlayer controls>
              <source
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </AudioPlayer>
          </MessageAudio>
        </MessageContainer>
      </MainContent>
    </Container>
  );
};

export default ChatScreen;
