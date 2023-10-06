import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase.config';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  // Listen for changes in notifications
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(FIREBASE_DB, `notification/${FIREBASE_AUTH.currentUser.uid}/notifications`),
        orderBy('timestamp', 'asc')
      ),
      (querySnapshot) => {
        const notifications = [];
        querySnapshot.forEach((doc) => {
          notifications.push({ ...doc.data(), id: doc.id });
        });
        console.log(notifications)
        setNotifications([...notifications]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleRead = (id) => {
    //dispatch(markAsRead(id));
  };

  return (
    <Container>
      {notifications.length === 0 && (
        <NotificationItem  >
          <NotificationIcon icon={faBell} size={50} read={true} />
          <NotificationContent>
            <NotificationTitle>No notifications</NotificationTitle>
            <NotificationMessage>You currently have no notifications</NotificationMessage>
          </NotificationContent>
        </NotificationItem>
      )}

      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          onPress={() => handleRead(notification.id)}
        >
          <NotificationIcon
            icon={faBell}
            size={50}
            read={notification.read}
          />
          <NotificationContent>
            <NotificationTitle>{notification.title}</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
          </NotificationContent>
        </NotificationItem>
      ))}
    </Container>
  );
};

const NotificationTab = () => {
  return (<Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontFamily: 'kalam' },
      tabBarIndicatorStyle: {
        backgroundColor: '#4fd1c5',
      }
    }} > 
    <Tab.Screen name="Notification" component={NotificationsScreen} />
  </Tab.Navigator>
  )
}

export default NotificationTab;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff; /* Set your desired background color */
  padding: 20px;
`;

const NotificationItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: transparent; /* Set your desired background color */
  padding: 10px;
  margin-top: 10px; 
  margin-bottom: 10px;
`;

const NotificationIcon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.read ? '#ccc' : '#4FD1C5')};
  margin-right: 10px;
`;

const NotificationContent = styled.View`
  flex: 1;
`;

const NotificationTitle = styled.Text`
  font-family: 'kalam';  
  font-size: 16px;
  font-weight: bold;
  color: #333; /* Set your desired text color */
`;

const NotificationMessage = styled.Text`
font-family: 'kalam';  font-size: 12px;
  color: #888; /* Set your desired text color */
`;
