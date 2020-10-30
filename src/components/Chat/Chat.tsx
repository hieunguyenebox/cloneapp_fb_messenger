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

const OnLine = styled(Circle) <{ bottom?: number, right?: number }>`
  background-color: #00c230;
  position: absolute;
  bottom: ${p => p.bottom !== undefined ? p.bottom : 0}px;
  right: ${p => p.right !== undefined ? p.right : 0}px;
  border: 2px solid #fff;
`

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
      <TapButton onPressIn={block([])}>
        <Box as={Animated.View} style={{ borderWidth: 1 }} row align='center' p='0 20px' height={80}>
          <Box m='0 10px 0 0' >
            <Avatar border='0.5px solid rgba(0,0,0,0.1)' size={60} source={{ uri: item.avatar }} />
            <OnLine size={16} />
          </Box>
          <Box style={{ flex: 1 }} >
            <Text style={{ marginBottom: 8 }} size={16} bold numberOfLines={1}>
              {item.name}
            </Text>
            <Box row justify='space-between' align='center'>
              <Text style={{ flex: 1 }} color={hexToRgba('#000', 0.5)} size={16} bold numberOfLines={1}>
                {item.message}
              </Text>
              <Text>
                {" "}
              </Text>
              <Text color={hexToRgba('#000', 0.5)}>
                {dayjs().format('MMM DD')}
              </Text>
            </Box>
          </Box>
        </Box >
      </TapButton>
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