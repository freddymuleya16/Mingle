import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const GradientContainer = styled(LinearGradient)`
  elevation: 4; /* Add elevation to create a shadow */
  width: 100%;
`;

const SafeArea = styled.SafeAreaView`
  height: 130px;
  justify-content: center;
  width: 100%;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center; 
  width: 100%;
`;

const ProfileImage = styled.Image`
  width: 15%;
  aspect-ratio: 1;
  border-radius: 50px;
  margin-left: 10px;
  background-color: white;
`;

const Username = styled.Text`
  color: gray;
  font-family: 'kalam';
  font-size: 18px;
  margin-left: 10px;
`;

const IconBox = styled.TouchableOpacity`
width: 15%;
border: 2px solid #6b7280;
padding: 10px;
border-radius: 9999px;

margin-left: 10px;
`
const XIcon = styled(FontAwesomeIcon)` 
`
const ChatHeader = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <GradientContainer
      colors={['lightgray', 'lightgray']} // Add your gradient colors here
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <SafeArea>
        <Content>
          <ProfileImage source={{ uri: user?.pictures[0] }} resizeMode="cover" />
          <View style={{ width: '62%' }}>
            <Username>You matched with Glen Quagmire on 2023/08/27 20:58</Username>
            <Username>Last Seen</Username>
          </View>
          <IconBox>
            
          <XIcon icon={faXmark} size={40}  color='#6b7280'/>
          </IconBox>
        </Content>
      </SafeArea>
    </GradientContainer>
  );
};

export default ChatHeader;
