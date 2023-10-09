import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
    width: 80px;
    height: 46px;
    background:${({ primary }) => (primary ? '#4fd1c5' : '#ccc')};
    border-radius: 4px;

    align-items: center;
    justify-content: center;
    margin-left:10px;
    padding:10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`; 