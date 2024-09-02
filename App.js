import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import MessageScreen from './src/screens/MessageScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/components/Notification';
import ChatScreen from './src/screens/ChatScreen';
import {actionIcons} from './src/Constant/constants';
import {ChatProvider} from './src/ChatContext';
import GoPremiumTab from './src/components/GoPremiumTab';
import Activity from './src/components/Activity';
import AccountPrivacyTab from './src/components/AccountPrivacyTab';
import ProfessionalDetailsTab from './src/components/ProfessionalDetailsTab';
import SettingsTab from './src/components/SettingsTab';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Categories"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconSource;

          if (route.name === 'Categories') {
            iconSource = actionIcons.Categories;
          } else if (route.name === 'Messages') {
            iconSource = actionIcons.Messages;
          } else if (route.name === 'Profile') {
            iconSource = actionIcons.Profile;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: focused ? '#000000' : '#8e8e8e',
              }}
            />
          );
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8e8e8e',
        tabBarStyle: {
          height: 85,
          paddingTop: 10,
        },
      })}>
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ChatProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name=" "
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            options={{headerTitle: 'Notifications'}}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="GoPremium" component={GoPremiumTab} />
          <Stack.Screen name="Account Activity" component={Activity} />
          <Stack.Screen name="Account Privacy" component={AccountPrivacyTab} />
          <Stack.Screen
            name="Professional Details"
            component={ProfessionalDetailsTab}
          />
          <Stack.Screen name="Settings" component={SettingsTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChatProvider>
  );
}
