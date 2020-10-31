import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import MyHeader from '../UI/Header'

const ChatHeader: React.FC<StackHeaderProps> = ({ }) => {

  return (
    <MyHeader
      title='Chats'
      style={{ position: 'absolute', backgroundColor: 'transparent' }}
      left={null}
      titleStyle={{ bold: true }}
    />
  )
}

export default ChatHeader