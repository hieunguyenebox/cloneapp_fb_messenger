import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Chat from '~/components/Chat/Chat';
import People from '~/components/People/People';
import TabBar from './components/TabBar';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

enableScreens();

const Tab = createBottomTabNavigator()
const ChatNavigation = createNativeStackNavigator()

const ChatStack = () => {
  return (
    <ChatNavigation.Navigator
      screenOptions={{
        headerTranslucent: true,
        headerStyle: {
          backgroundColor: 'transparent',
          blurEffect: 'systemUltraThinMaterialLight'
        }
      }}
    >
      <ChatNavigation.Screen
        component={Chat}
        options={{ title: 'Chats', headerHideShadow: true }}
        name='chat'
      />
    </ChatNavigation.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
      >
        <Tab.Screen name='tab_chat' component={ChatStack} />
        <Tab.Screen name='tab_people' component={People} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}