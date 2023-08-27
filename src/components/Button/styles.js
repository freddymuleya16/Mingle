import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import config from "../../../default.config.json";
export const ButtonContainer = styled.View`
  border-radius: 10px;   
  align-self: center;
  overflow: hidden; 
  text-align: right;
`;
export const Container = styled(RectButton).attrs({
  style:{borderRadius:15,borderTopRightRadius:15}
})`
  height: 46px;
  background-color: ${config.primaryColor};  
  padding: 0 16px;    
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
