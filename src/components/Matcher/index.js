import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const deviceWidth = Dimensions.get('window').width
const MatcherContainer = styled.View`
  position: relative;
  overflow: hidden;
  border-radius: 10px;  
  width: ${deviceWidth/2-30}px;
  aspect-ratio: 0.7;
  background-color: white;
  margin: 10px; 
`;

const MatcherImage = styled(Image)`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
`;

const Overlay = styled.View`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const CenterContent = styled.View`
    display: inline; 
    width: 100%;
    height: 100%; 
    justify-content: center;
    align-items: center; 
    z-index: 13;
`;

const NameText = styled.Text`
  font-family: 'kalam';  
  color: white; 
  font-size: 18px;
`;

function Matcher({ data, onClick }) {
    return (
        <TouchableOpacity onPress={() => onClick()}>
            <MatcherContainer>
                <Overlay />
                <MatcherImage source={{ uri: data.pictures[0] }} resizeMode="cover" />
                <CenterContent>
                    <NameText>{data.name}  {data.surname}</NameText>
                </CenterContent>
            </MatcherContainer>
        </TouchableOpacity>
    );
}

export default Matcher;
