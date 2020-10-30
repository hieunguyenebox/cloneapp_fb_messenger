import React from 'react'
import { StackHeaderProps, useHeaderHeight } from '@react-navigation/stack'
import Box from '~/components/UI/Box'
import { Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ChatHeader: React.FC<StackHeaderProps> = ({ scene, previous, navigation }) => {

  const height = useSafeAreaInsets().top + 48

  return (
    <Box
      height={height}
      as={Animated.View}
      bg='#fff'
      style={{borderWidth: 1}}
    >

    </Box>
  )
}

export default ChatHeader