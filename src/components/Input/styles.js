import styled from 'styled-components/native';

export const Container = styled.View` 
  height: 46px; 
  flex-direction: row;
  align-items: center ;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; 
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#ccc',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px; 
`;

export const ErrorText = styled.Text`
font-family: 'kalam';
color:red;
font-size:12px;
margin-top:-10px;
margin-bottom:10px;`