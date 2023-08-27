import { SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import TextInput from '../../components/Input';
import Butto from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RadioButton } from 'react-native-paper';




export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const StyledScrollView = styled(ScrollView)`
  flex: 1;
  padding: 16px;
`;

export const Content = styled.View`
  flex: 1;
`;


export const Title = styled.Text`
  font-size: 34px;
  text-align: center;
  margin: 16px 0;
`;

export const Form = styled(ScrollView)`  
  margin-bottom: 1px;
  
  flex: 1;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: bold;
  margin-bottom: 4px;
  margin-top: 16px;
`;


export const RadioContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin:12px 12px 12px 0px;
`;

export const RadioRow = styled.View`
flex-direction: row;
`

export const RadioInput = styled.View` 
  background-color: ${props => (props.checked ? "#000" : "transparent")};
  width: 12px;
  height: 12px;
  border-radius: 10px;
`;

export const RadioBoarder = styled.TouchableOpacity`
  width: 20px;
  height: 20px; 
  padding: 0; 
  overflow: hidden;
  border-radius: 10px;
  border-width: 2px;
  border-color: #000;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

export const RadioLabel = styled.Text`
  font-size: 16px;
`;

export const Input = styled(TextInput)` 
  border-width: 1px; 
  margin-bottom: 16px;
  margin-top:8px;
`;

export const DoubleInputContainer = styled.View`
  flex-direction: row;
`;

export const DoubleInput = styled(TextInput)`
  flex: 1; 
  border-width: 1px; 
  margin-bottom: 16px;
  margin-top:8px;
  margin-right: 8px;
`;

export const TextArea = styled(TextInput)` 
  border-width: 1px; 
  margin-bottom: 16px;
  margin-top:8px;
  height: 100px; 
  margin-bottom: 16px;
`;


export const Button = styled(Butto)`
  margin-top: 20px;
  border-radius: 16px;
`;

export const ButtonText = styled.Text`
  color: white; 
`;

export const SignOutLink = styled.TouchableOpacity`
  margin: 28px 0;
  align-self: center;
`;

export const SignOutText = styled.Text`
  color: #007bff;
  font-size: 16px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #ccc;
  margin: 10px 0px;
`

export const ImageContainer = styled.View`
  border-radius: 10px;
  margin-top: 16px;
  margin-bottom: 4px;
`

export const Icon = styled.TouchableOpacity`
  margin-bottom: -35px;
  margin-right: 5px;
  z-index: 10;
  align-self: flex-end; 
`