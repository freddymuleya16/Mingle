import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import Header from '../components/Header';
import MatchesScreen from '../screens/MatchesScreen';
import NotificationsScreen from '../screens/NotificationScreen';
import withAuth from '../utils/withAuth';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
// import MatchesScreen from '../screens/MatchesScreen';
// import NotificationsScreen from '../screens/NotificationsScreen';
// import SettingsScreen from '../screens/SettingsScreen';
 
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MatchesStack = () => {
  (<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="MatchesScreen" component={HomeScreen} /> 
</Stack.Navigator>)
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor:'#4fd1c5',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home1') {
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
      <Tab.Screen name="Home1" component={MatchesStack} options={{header:()=>{
        return <Header/>
      }}}/>
      <Tab.Screen name="Matches" component={MatchesScreen}  options={{headerShown:false}}/>
      <Tab.Screen name="Notifications" component={NotificationsScreen}  options={{header:()=>{
        return <Header/>
      }}}/>
      <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const HomeNavigator = () => {

  return <TabNavigator/>
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={TabNavigator} />
      {/* Other drawer screens if needed */}
    </Drawer.Navigator>
  );
};

export default withAuth(HomeNavigator);
