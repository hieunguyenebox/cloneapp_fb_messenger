import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Chat from '~/components/Chat/Chat';
import People from '~/components/People/People';
import BottomTabBar from './components/BottomTabBar';
import { createStackNavigator } from '@react-navigation/stack'
import ChatHeader from '~/components/Chat/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import appStore from './modules/stores/app_store';
enableScreens();

const Tab = createBottomTabNavigator()
const ChatNavigation = createStackNavigator()

const ChatStack = () => {

  const { top } = useSafeAreaInsets()

  if (!appStore.HeaderHeight) {
    appStore.setHeaderHeight(top + 40)
  }

  return (
    <ChatNavigation.Navigator
    >
      <ChatNavigation.Screen
        component={Chat}
        options={{ title: 'Chats', header: ChatHeader }}
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