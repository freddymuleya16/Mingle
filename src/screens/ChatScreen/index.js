import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { faImage, faMicrophone, faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: #fff; 
`;

const MessageBox = styled.View`
  background-color: #e5e7eb;
  height: 80px;
  padding: 10px;
  flex-direction: row;
  
  align-items: center; /* Center items vertically within the MessageBox */
  justify-content: space-between; /* Add space between icons and input */
  border-top-width:2px;
  border-top-style: solid;
  border-top-color:  #9ca3af;
`;

const InputContainer = styled.View`
  flex: 1; /* Take up all horizontal space within the MessageBox */ 
  margin-left: 10px;
  border-radius: 25px; /* Rounded corners for input */ 
  align-items: center; /* Center items horizontally within InputContainer */
  flex-direction: row; /* Make input and icon align horizontally */
`;

const Input = styled.TextInput`
  flex: 1; /* Take up all available width within InputContainer */
  margin-left: 10px; /* Add some space between icon and input text */
`;

const ChatsBox = styled.ScrollView`
  flex: 1;
  background-color: #e5e7eb;
  border-bottom: 5px solid #4b5563;
`

const GradientButton = styled.TouchableOpacity`
border-radius: 9999px;
padding: 1px; 
margin-left: 10px;
`

const Gradient = styled(LinearGradient)`
border-radius: 9999px;
padding: 18px;
height: 100%;
align-items: center;
`

const ChatScreen = ({route}) => {
  const match = route.params.match;
  return (
    <Container>
      {/* Your chat content goes here */}
      <ChatsBox>
        {/* Messages */}
      </ChatsBox>

      {/* Message box at the bottom */}
      <MessageBox>
        <FontAwesomeIcon icon={faImage} size={30} color="#6b7280" />
        <InputContainer>
          <TextInput
            placeholder='Type a message...'
            placeholderTextColor='#6b7280'
            multiline={true}

            style={{ flex: 1, fontFamily: 'kalam' }} // Ensure the TextInput takes up all available width
          />
          <FontAwesomeIcon icon={faMicrophone} size={30} color="#6b7280" />
        </InputContainer>
        <GradientButton>
          <Gradient
            colors={['#319795', '#4fd1c5']} // Add your gradient colors here
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >

            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Send</Text>
          </Gradient>
        </GradientButton>
      </MessageBox>
    </Container>
  );
};

export default ChatScreen;
