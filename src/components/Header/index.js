import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';

const GradientContainer = styled(LinearGradient)`
 
`;

const SafeArea = styled.SafeAreaView`
   height: 130px;
    justify-content: center;
`
const Content = styled.View` 
    flex-direction: row; 
    align-items: center; 
`;

const ProfileImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  margin-left: 10px;
`;

const Username = styled.Text`
font-family: 'kalam';  color: white;
  font-size: 20px;
  margin-left: 10px;
`;

const App = () => {
    const user = useSelector((state) => state.user.userData);
   
    return (<GradientContainer
        colors={['#319795', '#4fd1c5']} // Add your gradient colors here
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
    >
        <SafeArea  >

            <Content>
                <ProfileImage
                    source={ {uri:user?.pictures[0]}}
                    resizeMode="cover"
                />
                <Username>{user?.firstName} {user?.lastName}</Username>
            </Content>
        </SafeArea>
    </GradientContainer>
    );
};

export default App;
