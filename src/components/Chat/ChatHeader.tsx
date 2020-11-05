import React, { useMemo } from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import MyHeader from '~/components/UI/Header'
import Avatar from '~/components/UI/Avatar'
import faker from 'faker'
import Button from '~/components/UI/Button'
import Icon from '~/components/UI/Icon'
import { Animated } from 'react-native'
import Box from '../UI/Box'
import Text from '../UI/Text'

const avatar = faker.image.avatar()

const ChatHeader: React.FC<StackHeaderProps> = ({ scene, navigation }) => {

  const right = useMemo(() => {
    return (
      <Box m='0 20px' justify='flex-end' align='center' height='100%' row>
        <Icon style={{ marginRight: 20 }} name='call' size={24} />
        <Icon name='videocam' size={30} />
      </Box>
    )
  }, [])

  const title = useMemo(() => {
    return (
      <Box align='center' row width='100%'>
        <Avatar source={{ uri: avatar }} size={35} />
        <Box m='0 8px'>
          <Text bold size={16}>
            {faker.name.findName()}
          </Text>
          <Text bold={500} size={12} style={{ opacity: 0.5 }}>
            Active 2h ago
          </Text>
        </Box>

      </Box>
    )
  }, [])

  return (
    <MyHeader
      title={title}
      style={{ position: 'absolute', backgroundColor: '#fff' }}
      right={right}
      titleStyle={{ bold: true, size: 22 }}
    />
  )
}

export default ChatHeader