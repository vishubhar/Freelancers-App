import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

const Tab = createBottomTabNavigator();

const WrapperScreen = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          padding: 8,
        },
      }}>
      <Tab.Screen name="Welcome">
        {() => (
          <WrapperScreen>
            <WelcomeScreen />
          </WrapperScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Categories">
        {() => (
          <WrapperScreen>
            <CategoriesScreen />
          </WrapperScreen>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});

export default TabNavigator;
