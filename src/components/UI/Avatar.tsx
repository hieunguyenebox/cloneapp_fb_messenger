import React from 'react'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import styled from 'styled-components/native'

interface Props {
  size?: number
  border?: string
  m?: string
}
const Img = styled(FastImage) <Props>`
  width: ${(p) => p.size || 30}px;
  height: ${(p) => p.size || 30}px;
  border-radius: ${(p) => (p.size || 30) / 2}px;
  overflow: hidden;
  border: ${p => p.border || '0'};
  margin: ${p => p.m || '0'};
`

const Avatar: React.FC<Props & FastImageProps> = ({ size, ...rest }) => {
  return (
    <Img
      resizeMode="cover"
      size={size}
      {...rest}
    />
  )
}
export default Avatar
