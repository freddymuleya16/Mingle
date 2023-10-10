import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';
import Matcher from '../../components/Matcher';
import { useSelector } from 'react-redux';
import { Dimensions, FlatList, View } from 'react-native';
import { useState } from 'react';
import { doc, onSnapshot, query } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase.config';
import { getUsers } from '../../firebase/auth';
import Sender from '../../components/Sender';
import { isSubscribed } from '../../utils/helpers';

const Tab = createMaterialTopTabNavigator();
const StyledContainer = styled.View`
  flex: 1; 
  padding: 10px;
`;

const StyledText = styled.Text`
  font-family: 'kalam';  
  font-size: 24px;
  font-weight: bold;
`;

const MatchesScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.userData);
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (FIREBASE_AUTH.currentUser) {
      const unsubscribe = onSnapshot(
        query(
          doc(FIREBASE_DB, `users`, user.uid),
        ),
        (querySnapshot) => {
          const data = querySnapshot.data();
          getUsers(data.matches?.map((match) => {
            if (match.matchId) {
              return match.matchId
            } else if (match.userId) {
              return match.userId
            } else {
              return match
            }
          })).then((users) => {

            const usersWitchMatchdate = users.map(obj1 => {
              const match = data.matches.find(obj2 => obj1.id === obj2.matchId ||obj1.id === obj2.userId );
 
              return { ...obj1, ...match };
            }); 
            setMatches([...usersWitchMatchdate])
          })
        }
      );
      return () => unsubscribe();
    }

  }, [])
  return (
    <StyledContainer>
      <FlatList
        contentContainerStyle={{}}
        numColumns={2}
        data={matches}
        renderItem={({ item }) => (
          <Matcher data={{ pictures: item.pictures, name: item.firstName, surname: item.lastName, id: item.id }} onClick={() => { navigation.push('ChatScreen',{match:item}) }} />
        )}
      />
    </StyledContainer>
  );
};

const MessagesScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.userData);
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (FIREBASE_AUTH.currentUser) {
      const unsubscribe = onSnapshot(
        query(
          doc(FIREBASE_DB, `users`, user.uid),
        ),
        (querySnapshot) => {
          const data = querySnapshot.data();
          getUsers(data.matches?.map((match) => {
            if (match.matchId) {
              return match.matchId
            } else if (match.userId) {
              return match.userId
            } else {
              return match
            }
          })).then((users) => {

            const usersWitchMatchdate = users.map(obj1 => {
              const match = data.matches.find(obj2 => obj1.id === obj2.matchId);
              return { ...obj1, ...match };
            });

            setMatches([...usersWitchMatchdate])
          })
        }
      );
      return () => unsubscribe();
    }

  }, [])
  return (
    <StyledContainer>
      <FlatList 
        numColumns={1}
        data={matches}
        renderItem={({ item }) => (
          <Sender onClick={() => { navigation.push('ChatScreen',{match:item}) }} data={{ pictures: item.pictures, name: item.firstName, surname: item.lastName, id: item.id }}  isSubscribed={isSubscribed(item)}/>
        )}
      />
    </StyledContainer>
  );
};

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontFamily: 'kalam' },
        tabBarIndicatorStyle: {
          backgroundColor: '#4fd1c5',
        }
      }} >
      <Tab.Screen name="Matches" options={{ tabBarLabelStyle: { fontFamily: 'kalam' } }} component={MatchesScreen} />
      <Tab.Screen name="Messages"  options={{ tabBarLabelStyle: { fontFamily: 'kalam' } }}  component={MessagesScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
