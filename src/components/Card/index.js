import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  shadow-color: #000;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  width: 100%;
  height: 100px;
  margin: 2px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.View`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
`;

const TextContainer = styled.View`
  position: absolute;
  inset: 0; 
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: #fff;
  font-family: 'kalam';
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  color: #fff;
  font-family: 'kalam';
`;

const Card = () => {
  return (
    <Container>
      <Image
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/mingle-7d654.appspot.com/o/SystemImages%2FProfile_Picture.jpg?alt=media&token=851cdf22-4bc0-4dd9-88fe-865e4a5d1cac',
        }}
      />
      <Overlay />
      <TextContainer>
        <Title>Profile Set Up</Title> 
      </TextContainer>
    </Container>
  );
};

export default Card;
