import { styled } from "styled-components/native"; import { KeyboardAvoidingView } from 'react-native';
import config from '../../../default.config.json'


export const Label = styled.Text`
  font-family: 'kalam';  
  font-size: 16px;
  color: black;
  font-weight: 200;
  margin-bottom: 4px;
  margin-top: 16px;
`;
export const BackgroundImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.SafeAreaView.attrs({
    keyboardShouldPersistTaps: "handled"
})` 
  align-items: center;
  justify-items:center; 
  padding: 20px;
  background-color: #fff;
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center; 
  padding: 30px;
`;

export const FormContainer = styled(KeyboardAvoidingView).attrs({
    behavior: "padding",
    keyboardShouldPersistTaps: "handled"
})`
  width: 100%;
  
`;

export const HeaderText = styled.Text`
font-family: 'kalam';  font-size: 30px;
  margin-bottom: 12px;
  font-weight: bold;
  font-variant: small-caps;
  text-align: center;
  color: ${config.primaryColor}; /* Change color as needed */
`;

// export const Input = styled.TextInput`
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   width: 100%;
//   background-color: #ccc;
// `;



export const ButtonText = styled.Text`
font-family: 'kalam';  color: white;
  font-weight: bold;
`;

export const LinkText = styled.Text`
font-family: 'kalam';  color: ${config.secondaryColor};  
  text-align: right;
  margin-top: 0px;
  margin-bottom: 10px;
`;
export const TCText = styled.Text` 
  font-family: 'kalam';
  text-align: center;
  margin: 30px 10px 10px 10px; 
`;

export const SocialButtonContainer = styled.View`
  flex-direction: row; 
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px; 
  padding-top: 30px;
  border-top-width: 1px;
  border-top-color: #ccc;  
`;

export const SocialButton = styled.TouchableOpacity`
  margin: 0 10px;
  align-self: flex-start;
`;