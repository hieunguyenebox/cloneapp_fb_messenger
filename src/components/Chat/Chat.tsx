import React, { useCallback } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import appStore from '~/modules/stores/app_store'
import Box from '~/components/UI/Box'
import Animated from 'react-native-reanimated'
import Input from './Input'
import { getWidth } from '~/modules/screen'
import Text from '../UI/Text'

const AnimatedFlatList: typeof FlatList = Animated.createAnimatedComponent(FlatList)

const MyContainer = styled(Box)`
  flex: 1;
`

const messages = [
  '1', '2', '3', '234',
  '132', '31', '2341', 'sdf', 'gn'
]

const Chat = () => {

  const { top } = useSafeAreaInsets()

  if (!appStore.HeaderHeight) {
    appStore.setHeaderHeight(top + 40)
  }
  const { bottom } = useSafeAreaInsets()

  const renderItem = useCallback(({ item }) => <Box height={100} bg='red' width={getWidth(100)}><Text>{item}</Text></Box>, [])
  const keyExtractor = useCallback((item) => item, [])
  return (
    <MyContainer width={getWidth(100)} bg='#fff'>
      <AnimatedFlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: bottom + 48 }}
        inverted
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <Input />
    </MyContainer>
  )
}

export default Chat

