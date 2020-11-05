import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import appStore from '~/modules/stores/app_store'
import Box from '../UI/Box'

const MyContainer = styled(Box)`
`
const Chat = () => {

  const { top } = useSafeAreaInsets()

  if (!appStore.HeaderHeight) {
    appStore.setHeaderHeight(top + 40)
  }
  return (
    <MyContainer>

    </MyContainer>
  )
}

export default Chat

