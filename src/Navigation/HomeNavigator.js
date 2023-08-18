import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
// import MatchesScreen from '../screens/MatchesScreen';
// import NotificationsScreen from '../screens/NotificationsScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Matches') {
            iconName = 'heart';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Matches" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={HomeScreen} />
      <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={TabNavigator} />
      {/* Other drawer screens if needed */}
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
