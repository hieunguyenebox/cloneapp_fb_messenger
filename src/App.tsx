import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Chat from '~/components/Chat/Chat';
import People from '~/components/People/People';
import Icon from '~/components/UI/Icon';
import TabBar from './components/TabBar';

enableScreens();

const Tab = createBottomTabNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}

      >
        <Tab.Screen name='chat' component={Chat} />
        <Tab.Screen name='people' component={People} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}