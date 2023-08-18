import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from './actions/notificationActions';

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notifications);

  const handleNotificationPress = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
    // Handle the notification interaction here
  };

  return (
    <View>
      {notifications.map((notification) => (
        <Text
          key={notification.id}
          onPress={() => handleNotificationPress(notification.id)}
          style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
          {notification.message}
        </Text>
      ))}
    </View>
  );
};

export default NotificationScreen;
