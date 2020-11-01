import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import MyHeader from '../UI/Header'
import Avatar from '../UI/Avatar'
import faker from 'faker'
import Button from '../UI/Button'
import Icon from '../UI/Icon'
const ChatListHeader: React.FC<StackHeaderProps> = ({ }) => {

  return (
    <MyHeader
      title='Chats'
      style={{ position: 'absolute', backgroundColor: 'transparent' }}
      left={(
        <Button background='transparent'>
          <Avatar size={32} source={{ uri: faker.image.avatar() }} />
        </Button>
      )}
      right={(
        <Button background='transparent'>
          <Icon name='create-outline' size={30} />
        </Button>
      )}
      titleStyle={{ bold: true, size: 22 }}
    />
  )
}

export default ChatListHeader