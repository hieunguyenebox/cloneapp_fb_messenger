import React, { useCallback } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import styled from "styled-components/native";
import Box from '~/components/UI/Box';
import Text from '~/components/UI/Text';
import faker from 'faker'
import { Message, User } from 'types';
import Avatar from '~/components/UI/Avatar';
import Button from '~/components/UI/Button';
import OnLine from './Online';
import MessageRow from './MessageRow';
import appStore from '~/modules/stores/app_store';
import { observer } from 'mobx-react-lite';
import { useHeaderHeight } from '@react-navigation/stack';
import { getWidth } from '~/modules/screen';
import { BlurView } from '@react-native-community/blur';
import Animated, { block, event } from 'react-native-reanimated';
import { useValue } from 'react-native-redash';

const MyContainer = styled.View`
`

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

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

  const headerHeight = useHeaderHeight()
  console.log(headerHeight)

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

  const scrollY = useValue(0)

  const onScroll = event([
    {
      nativeEvent: {
        contentOffset: {
          y: scrollY,
        },
      },
    },
  ], { useNativeDriver: true })

  const opacity = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP
  })

  return (
    <MyContainer
      style={{ backgroundColor: '#fff', flex: 1 }}>
      <AnimatedFlatList
        onScroll={onScroll}
        removeClippedSubviews
        ListHeaderComponent={HeaderList}
        data={fakeChatUsers}
        renderItem={renderItemChat}
        keyExtractor={keyExtractorChat}
        contentContainerStyle={{
          paddingBottom: appStore.BottomTabHeight,
          paddingTop: appStore.HeaderHeight + 10
        }}
      />
      <Animated.View style={{
        position: 'absolute',
        height: appStore.HeaderHeight,
        width: getWidth(100),
        opacity

      }}>
        <BlurView
          style={{
            width: '100%',
            height: '100%'
          }}
          blurType='ultraThinMaterialLight'
          blurAmount={10}
        />
      </Animated.View>
    </MyContainer>
  )
}

export default observer(Chat)