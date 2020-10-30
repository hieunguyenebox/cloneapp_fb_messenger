import React, { useCallback } from 'react'
import { FlatList, ScrollView, TapGestureHandler } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from "styled-components/native";
import Box from '~/components/UI/Box';
import Text from '~/components/UI/Text';
import faker from 'faker'
import { Message, User } from 'types';
import Circle from '~/components/UI/Circle';
import FastImage from 'react-native-fast-image';
import Avatar from '~/components/UI/Avatar';
import Button from '~/components/UI/Button';
import hexToRgba from 'hex-to-rgba';
import dayjs from 'dayjs';
import TapButton from '~/components/UI/TapButton'
import Animated, { block } from 'react-native-reanimated';
import OnLine from './Online';
import MessageRow from './MessageRow';

const MyContainer = styled(SafeAreaView)`
`

const fakeUsers: User[] = []

Array.from({ length: 30 }).forEach(() => fakeUsers.push({
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
  id: faker.random.uuid()
}))

const fakeChatUsers: Message[] = []

Array.from({ length: 30 }).forEach(() => fakeChatUsers.push({
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
  id: faker.random.uuid(),
  message: faker.lorem.sentence()
}))


const Chat = () => {
  const { top, bottom } = useSafeAreaInsets(); // inset of the status bar
  const renderItem = ({ item }: { item: User }) => {
    return (
      <Button height='auto' width={80} p='0'>
        <Box align='center' justify='center' width='100%'>
          <Box>
            <Avatar border='0.5px solid rgba(0,0,0,0.1)' size={60} source={{ uri: item.avatar }} />
            <OnLine
              size={16}
            />
          </Box>
          <Text size={13} style={{ marginTop: 5, width: '70%' }} centered numberOfLines={2}>
            {item.name}
          </Text>
        </Box>
      </Button>
    )
  }

  const renderItemChat = useCallback(({ item }: { item: Message }) => {

    return (
      <MessageRow message={item} />
    )
  }, [])

  const keyExtractor = useCallback((item: User) => item.id, [])
  const keyExtractorChat = useCallback((item: Message) => item.id, [])
  const HeaderList = () => {
    return (
      <FlatList
        style={{
          maxHeight: 100,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 10,
          marginBottom: 20
        }}
        decelerationRate={0.991}
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        horizontal
        data={fakeUsers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    )
  }
  return (
    <MyContainer style={{ backgroundColor: '#fff', flex: 1 }}>
      <FlatList
        removeClippedSubviews
        style={{ paddingTop: top }}
        ListHeaderComponent={HeaderList}
        data={fakeChatUsers}
        renderItem={renderItemChat}
        keyExtractor={keyExtractorChat}
      />
    </MyContainer>
  )
}

export default Chat