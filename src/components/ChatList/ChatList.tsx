import React, { useCallback, useRef } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler';
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
import { getWidth } from '~/modules/screen';
import { BlurView } from '@react-native-community/blur';
import Animated, { event, interpolate, multiply } from 'react-native-reanimated';
import { useValue } from 'react-native-redash';
import hexToRgba from 'hex-to-rgba';
import Icon from '../UI/Icon';

const MyContainer = styled.View`
`

const AnimatedFlatList: typeof FlatList = Animated.createAnimatedComponent(FlatList)

const InputContainer = styled(Box)`
  height: 35px;
  background-color: ${hexToRgba('#000', 0.1)};
  width: 90%;
  margin: 0 20px;
  padding: 0 8px;
  border-radius: 8px;
  overflow: hidden;
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

  const renderItem = ({ item }: { item: User }) => {
    return (
      <Button height='auto' width={70} activeOpacity={1} p='0'>
        <Box align='center' justify='center' width='100%'>
          <Box>
            <Avatar border='0.5px solid rgba(0,0,0,0.1)' size={50} source={{ uri: item.avatar }} />
            <OnLine
              size={16}
            />
          </Box>
          <Text bold='500' size={13} style={{ marginTop: 5, width: '70%' }} centered numberOfLines={2}>
            {item.name}
          </Text>
        </Box>
      </Button>
    )
  }

  const renderItemChat = ({ item }: { item: Message }) => {
    return (
      <MessageRow message={item} />
    )
  }

  const keyExtractor = useCallback((item: User) => item.id, [])
  const keyExtractorChat = useCallback((item: Message) => item.id, [])
  const HeaderList = () => {

    return (
      <Box>

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
      </Box>
    )
  }

  const scrollY = useValue<number>(0)

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

  const height = scrollY.interpolate({
    inputRange: [0, 45 + appStore.HeaderHeight],
    outputRange: [45 + appStore.HeaderHeight, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  })

  const ref = useRef<any>()



  return (
    <MyContainer
      style={{ backgroundColor: '#fff', flex: 1 }}>
      <Animated.View
        style={{
          overflow: 'hidden',
          position: 'absolute',
          width: getWidth(100),
          paddingTop: appStore.HeaderHeight + 5,
          height,
          zIndex: 10
        }}>
        <InputContainer
          align='center'
          as={Animated.View}
          row
          style={{
            opacity: scrollY.interpolate({
              inputRange: [0, 35],
              outputRange: [1, 0],
              extrapolate: Animated.Extrapolate.CLAMP
            }),
            height: scrollY.interpolate({
              inputRange: [0, 35],
              outputRange: [35, 0],
              extrapolate: Animated.Extrapolate.CLAMP
            })
          }}
        >
          <Icon color={hexToRgba('#000', 0.5)} name='search-outline' size={22} />
          <TextInput
            allowFontScaling={false}
            placeholder='Search for people or businesses'
            placeholderTextColor={hexToRgba('#000', 0.5)}
            style={{ fontSize: 16, marginLeft: 5, height: '100%', flex: 1 }} />
        </InputContainer>
      </Animated.View>

      <AnimatedFlatList
        ref={ref}
        onScroll={onScroll}
        removeClippedSubviews
        scrollEventThrottle={1}
        ListHeaderComponent={HeaderList}
        data={fakeChatUsers}
        renderItem={renderItemChat}
        keyExtractor={keyExtractorChat}
        contentContainerStyle={{
          paddingBottom: appStore.BottomTabHeight,
          paddingTop: appStore.HeaderHeight + 50
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