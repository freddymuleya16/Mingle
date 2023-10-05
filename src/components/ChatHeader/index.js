import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';

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
  background-color: white; 
`;

const Username = styled.Text`  
  color: gray;
  font-size: 18px;
  margin-left: 10px;
`;

const ChatHeader = () => {
    const user = useSelector((state) => state.user.userData);
    
    return (<GradientContainer
        colors={['lightgray', 'lightgray']} // Add your gradient colors here
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
    >
        <SafeArea  >

            <Content>
                <ProfileImage
                    source={{ uri: user?.pictures[0] }}
                    resizeMode="cover"
                />
                <View style={{width:'90%'}}>
                  <Username>
                    You matched with Glen Quagmire on 2023/08/27 20:58
                </Username>
                <Username>
                    Last Seen
                </Username>   
                </View>
               
            </Content>
        </SafeArea>
    </GradientContainer>
    );
};

export default ChatHeader;
