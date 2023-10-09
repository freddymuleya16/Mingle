import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/core';
import { format, formatRelative } from 'date-fns';
import ConfirmationModal from '../ConfirmationModal';
import { logout } from '../../firebase/auth';

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
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50px;
  margin-left: 10px;
  background-color: white;
`;

const Touchable = styled.TouchableOpacity`
     flex-direction: row; 
     width: 15%;
     margin-right: 10px;
`

const Username = styled.Text`
  color: gray;
  font-family: 'kalam';
  font-size: 16px;
  margin-left: 10px;
`;

const LastSeen = styled.Text`
color: gray;
font-family: 'kalam';
font-size: 12px;
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
const ChatHeader = ({ match}) => {
    const user = useSelector((state) => state.user.userData);
    const navigation = useNavigation()

    return (
        <GradientContainer
            colors={['lightgray', 'lightgray']} // Add your gradient colors here
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
        >
            <SafeArea>
                <Content>
                    <Touchable onPress={() => { navigation.push('UserDetails', { match }) }} >
                        <ProfileImage source={{ uri: match?.pictures[0] }} resizeMode="cover" />
                    </Touchable >
                    <View style={{ width: '62%' }}>
                        <Username>You matched with {match.firstName} {match.lastName} on {format(match.matchDate?.toDate(), 'yyyy/MM/dd HH:mm ')}</Username>
                        <LastSeen>Last Seen {match.lastSeen?formatRelative(match.lastSeen?.toDate(), new Date()):'Unknown'}</LastSeen>
                    </View>


                    <IconBox onPress={()=>{navigation.pop()}}>

                        <XIcon icon={faXmark} size={40} color='#6b7280' />
                    </IconBox>
                </Content>
                
            </SafeArea>
        </GradientContainer>
    );
};

export default ChatHeader;
