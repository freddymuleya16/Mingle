import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../ConfirmationModal';
import { logout } from '../../firebase/auth';
import { isSubscribed } from '../../utils/helpers';
import { Octicons } from '@expo/vector-icons';

const GradientContainer = styled(LinearGradient)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const SafeArea = styled.SafeAreaView`
  height: 130px;
  justify-content: center;
`;

const ProfileImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 50px;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%; 
`;

const TextContainer = styled.View`
  flex-direction: row;
  flex: auto;
  align-items: center;
`;

const Username = styled.Text`
  font-family: 'kalam';
  color: white;
  font-size: 20px;
  margin-left: 10px;
`;

const IconContainer = styled.TouchableOpacity` 
  justify-self: flex-end; 
  margin-right: 10px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 10px;
`;

const App = () => {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <GradientContainer
      colors={['#319795', '#4fd1c5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <SafeArea style={{ flex: 1 }}>
        <Content>
          <ProfileImage
            source={{ uri: user?.pictures[0] }}
            resizeMode="cover"
            resizeMethod="resize"
          />
          <TextContainer>
            <Username>{user?.firstName} {user?.lastName}</Username>
            {isSubscribed(user) && (
              <Octicons name="verified" size={20} color="#fff" style={{ marginLeft: 4 }} />
            )}
          </TextContainer>
          <IconContainer onPress={() => { setIsModalVisible(true) }}>
            <Icon icon={faSignOut} size={25} color='#fff' />
          </IconContainer>
        </Content>
        <ConfirmationModal
          isVisible={isModalVisible}
          onConfirm={() => {
            setIsModalVisible(false)
            dispatch(logout())
          }}
          onCancel={() => {
            setIsModalVisible(false)
          }}
        />
      </SafeArea>
    </GradientContainer>
  );
};

export default App;
