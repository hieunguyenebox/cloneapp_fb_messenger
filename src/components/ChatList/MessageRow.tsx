import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import hexToRgba from 'hex-to-rgba'
import React, { useMemo } from 'react'
import Animated, { block, call, set } from "react-native-reanimated"
import { interpolateColor, useClock, useValue, useValues } from 'react-native-redash'
import { Message } from 'types'
import runTiming from '~/modules/animation/runTiming'
import Avatar from "~/components/UI/Avatar"
import Box from "~/components/UI/Box"
import TapButton from "~/components/UI/TapButton"
import Text from '~/components/UI/Text'
import OnLine from './Online'


const MessageRow: React.FC<{ message: Message }> = ({ message }) => {
  const navigation = useNavigation()
  const [value, dest] = useValues<number>(0, 0)
  const clock = useClock()
  const onPressIn = useMemo(() => block([
    set(dest, 1)
  ]), [])

  const onPressOut = useMemo(() => block([
    runTiming({
      value: new Animated.Value(0),
      dest: new Animated.Value(1),
      clock: new Animated.Clock,
      duration: 150,
      onFinish: block([
        set(value, 0),
        set(dest, 0)
      ])
    })
  ]), [])

  const onPress = block([
    call([], () => {
      navigation.navigate('chat')
    }),
  ])

  const bgColor = useMemo(() => interpolateColor(runTiming({
    value,
    dest,
    clock,
    duration: 150
  }), {
    inputRange: [0, 1],
    outputRange: ['transparent', hexToRgba('#000', 0.1)],
  }), []) as any as Animated.Node<string>

  return (
    <TapButton onPress={onPress} onPressOut={onPressOut} onPressIn={onPressIn}>
      <Box
        as={Animated.View}
        style={{ backgroundColor: bgColor }}
        row align='center' p='0 20px' height={80}>
        <Box m='0 10px 0 0' >
          <Avatar border='0.5px solid rgba(0,0,0,0.1)' size={60} source={{ uri: message.avatar }} />
          <OnLine size={16} />
        </Box>
        <Box style={{ flex: 1 }} >
          <Text style={{ marginBottom: 8 }} size={16} bold='500' numberOfLines={1}>
            {message.name}
          </Text>
          <Box row justify='space-between' align='center'>
            <Text style={{ flex: 1 }} color={hexToRgba('#000', 0.5)} size={16} numberOfLines={1}>
              {message.message}
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
}

export default MessageRow