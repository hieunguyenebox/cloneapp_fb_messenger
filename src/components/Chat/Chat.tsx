import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components/native";
import Box from '~/components/UI/Box';
import Text from '../UI/Text';


const MyContainer = styled(ScrollView)`
`

const Chat = () => {
  return (
    <MyContainer style={{ backgroundColor: '#000', flex: 1, borderWidth: 1 }}>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text size={70}>
        hehe
      </Text>
      <Text color='#fff' size={70}>
        hehe
      </Text>
      <Text color='#fff' size={70}>
        hehe
      </Text>
      <Text color='#fff' size={70}>
        hehe
      </Text>
      <Text color='#fff' size={70}>
        hehe
      </Text>
      <Text color='#fff' size={70}>
        hehe
      </Text>
      
    </MyContainer>
  )
}

export default Chat