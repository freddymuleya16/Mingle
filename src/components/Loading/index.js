import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Loading = () => {
  const loading = useSelector((state) => state.auth.isLoading);
  if (loading) return (

    <Container>
      <ActivityIndicator size="large" color="#db5353" />
    </Container>


  );
};

export default Loading;
