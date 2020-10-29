import React from 'react'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import styled from 'styled-components/native'

interface Props {
  size?: number
}
const Container = styled.View<Props>`
  width: ${(p) => p.size || 30}px;
  height: ${(p) => p.size || 30}px;
  border-radius: ${(p) => (p.size || 30) / 2}px;
  overflow: hidden;
`

const Avatar: React.FC<Props & FastImageProps> = ({ size, style, ...rest }) => {
  return (
    <Container size={size} style={style}>
      <FastImage resizeMode="cover" style={{ width: '100%', height: '100%' }} {...rest} />
    </Container>
  )
}
export default Avatar
