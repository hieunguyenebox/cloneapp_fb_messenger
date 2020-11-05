import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import MyHeader from '~/components/UI/Header'
import Avatar from '~/components/UI/Avatar'
import faker from 'faker'
import Button from '~/components/UI/Button'
import Icon from '~/components/UI/Icon'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import hexToRgba from 'hex-to-rgba'
import Box from '../UI/Box'
import ReAnimated from 'react-native-reanimated'
import { TextInput } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'

const avatar = faker.image.avatar()

const InputContainer = styled(Box)`
  height: 35px;
  background-color: ${hexToRgba('#000', 0.1)};
  width: 90%;
  margin: 0 20px;
  padding: 0 8px;
  border-radius: 8px;
  overflow: hidden;
`

const ChatListHeader: React.FC<StackHeaderProps> = ({ }) => {

  // const progress = Animated.add(scene.progress.current, scene.progress.next || 0);

  // const opacity = progress.interpolate({
  //   inputRange: [0, 1, 2],
  //   outputRange: [0, 1, 0],
  // });

  // const height = progress.interpolate({
  //   inputRange: [0, 1, 2],
  //   outputRange: [0, 35, 0],
  // })

  const { t } = useTranslation()

  return (
    <MyHeader
      title={t('Chats')}
      style={{ position: 'absolute', backgroundColor: 'transparent' }}
      left={(
        <Button style={{ paddingLeft: 20 }} background='transparent'>
          <Avatar size={32} source={{ uri: avatar }} />
        </Button>
      )}
      right={(
        <Button style={{ paddingRight: 20 }} background='transparent'>
          <Icon name='create-outline' size={30} />
        </Button>
      )}
      titleStyle={{ bold: true, size: 22 }}
    />
  )
}

export default ChatListHeader