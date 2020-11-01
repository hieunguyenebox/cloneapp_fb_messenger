import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatList from '~/components/ChatList/ChatList';
import People from '~/components/People/People';
import BottomTabBar from './components/BottomTabBar';
import { createStackNavigator } from '@react-navigation/stack'
import ChatListHeader from '~/components/ChatList/ChatListHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import appStore from './modules/stores/app_store';
import Chat from './components/Chat/Chat';
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
        component={ChatList}
        options={{ title: 'Chats', header: ChatListHeader }}
        name='chat_list'
      />
    </ChatNavigation.Navigator>
  )
}

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
    >
      <Tab.Screen name='tab_chat' component={ChatStack} />
      <Tab.Screen name='tab_people' component={People} />
    </Tab.Navigator>
  )
}

const RootStack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name='bottom_tab'
          options={{ headerShown: false }}
          component={BottomTabStack}
        />
        <RootStack.Screen
          name='chat'
          component={Chat}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}