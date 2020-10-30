import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Chat from '~/components/Chat/Chat';
import People from '~/components/People/People';
import BottomTabBar from './components/BottomTabBar';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import ChatHeader from '~/components/Chat/Header'
enableScreens();

const Tab = createBottomTabNavigator()
const ChatNavigation = createStackNavigator()

const ChatStack = () => {
  return (
    <ChatNavigation.Navigator
    >
      <ChatNavigation.Screen
        component={Chat}
        options={{ title: 'Chats', header: ChatHeader}}
        name='chat'
      />
    </ChatNavigation.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
      >
        <Tab.Screen name='tab_chat' component={ChatStack} />
        <Tab.Screen name='tab_people' component={People} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}