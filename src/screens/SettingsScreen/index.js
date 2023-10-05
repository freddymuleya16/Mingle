import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase.config';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Card from '../../components/Card';
import { useNavigation } from '@react-navigation/core';


const Tab = createMaterialTopTabNavigator();

const SettingsScreen = ({ navigation }) => {


  return (
    <Container>
      <TouchableOpacity onPress={() => { navigation.push('ProfileScreen') }}>
        <Card />
      </TouchableOpacity>
    </Container>
  );
};

const SettingTab = () => {
  return (<Tab.Navigator
    screenOptions={{
      tabBarIndicatorStyle: {
        backgroundColor: '#4fd1c5',
      }
    }} >
    <Tab.Screen name="Setting" component={SettingsScreen} />
  </Tab.Navigator>
  )
}

export default SettingTab;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff; /* Set your desired background color */
  padding: 20px;
`;

const SettingItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: transparent; /* Set your desired background color */
  padding: 10px;
  margin-top: 10px; 
  margin-bottom: 10px;
`;

const SettingIcon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.read ? '#ccc' : '#4FD1C5')};
  margin-right: 10px;
`;

const SettingContent = styled.View`
  flex: 1;
`;

const SettingTitle = styled.Text`
  font-family: 'kalam';  
  font-size: 16px;
  font-weight: bold;
  color: #333; /* Set your desired text color */
`;

const SettingMessage = styled.Text`
font-family: 'kalam';  font-size: 12px;
  color: #888; /* Set your desired text color */
`;


