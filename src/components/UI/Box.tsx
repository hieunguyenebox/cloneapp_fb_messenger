import { View } from 'react-native'
import styled from 'styled-components/native'
import { getWidth } from '~/modules/screen'

export interface BoxProps {
  height?: number | string
  width?: number | string
  shadow?: boolean
  zIndex?: number
  bg?: string

  shadowColor?: string

  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'baseline'
  align?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'baseline'
  row?: boolean

  // padding
  p?: string

  // margin
  m?: string
}

const Box = styled(View)<BoxProps>`
  height: ${(p) =>
    p.height ? (typeof p.height === 'string' ? p.height : `${p.height}px`) : 'auto'};
  width: ${(p) => (p.width ? (typeof p.width === 'string' ? p.width : `${p.width}px`) : 'auto')};
  justify-content: ${(p) => p.justify || 'flex-start'};
  flex-direction: ${(p) => (p.row ? 'row' : 'column')};
  align-items: ${(p) => p.align || 'flex-start'};
  background-color: ${p => p.bg ? p.bg : (p.shadow ? '#fff' : 'transparent')};
  padding: ${(p) => p.p || '0'};
  margin: ${(p) => p.m || '0'};
  ${p => p.shadow ? `box-shadow: 0 2px 4px ${p.shadowColor || 'rgba(0,0,0,0.1)'}` : ''};
  ${p => p.zIndex ? `z-index: ${p.zIndex}` : ''};
  max-width: ${getWidth(100)}px;
  elevation: ${p => p.shadow ? 5 : 0};
`

export default Box
