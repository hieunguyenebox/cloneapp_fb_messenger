import hexToRgba from 'hex-to-rgba'
import React, { useCallback } from 'react'
import { TextProps, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import Icon from './Icon'
import Box from './Box'
import { HEADER_HEIGHT } from './Constants'
import Text, { CustomTextProps } from './Text'
import { getWidth } from '~/modules/screen'
import Button from './Button'

interface Props {
  shadow?: boolean
  as?: any
  align?: string
  shadowColor?: string
  borderBottom?: boolean
  justify?: 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end' | 'baseline'
}
const StyledHeader = styled.View<Props & { safeTop: number }>`
  flex-direction: row;
  position: relative;
  align-items: ${(p) => p.align || 'center'};
  justify-content: ${(p) => p.justify || 'center'};
  height: ${(p) => p.safeTop + HEADER_HEIGHT}px;
  padding: 0px 20px;
  width: ${getWidth(100)};
  padding-top: ${(p) => p.safeTop}px;
  background-color: #fff;
  border-bottom-width: ${p => p.borderBottom ? '0.5px' : '0px'};
  border-bottom-color: rgba(0,0,0,0.2)
  ${(p) =>
    p.shadow
      ? `box-shadow: 0 2px 4px ${p.shadowColor ? p.shadowColor : hexToRgba('#000', 0.1)}`
      : ''};
  z-index: 100;
`

const Header: React.FC<Props & ViewProps> = ({ justify = 'space-between', ...rest }) => {
  const { top } = useSafeAreaInsets()
  return <StyledHeader {...rest} justify={justify} safeTop={top} />
}

export const NavigationBar: React.FC<{
  title?: string | React.ReactElement
  titleStyle?: TextProps & CustomTextProps
  headerStyle?: Props
  componentId?: string
  right?: React.ReactElement | null
  left?: React.ReactElement | null
}> = ({ title, titleStyle, right, componentId, headerStyle, left }) => {

  const onPress = useCallback(() => {
    
  }, [componentId])
  return (
    <Header shadow {...headerStyle} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box align='center' justify='center' style={{ zIndex: 2 }}>
        {left !== undefined ? left : (
          <Button width={48} height='100%' onPress={onPress}>
            <Icon name='back-screen' size={18} />
          </Button>
        )}
      </Box>
      <Box
        height='100%'
        style={{
          position: 'absolute',
          width: getWidth(100),
          bottom: 0
        }}
        justify='center'
        align='center'
      >
        {typeof title === 'string' ?
          <Text numberOfLines={1} style={{ maxWidth: getWidth(60) }} bold size={16} {...titleStyle}>
            {title}
          </Text>
          : title
        }
      </Box>
      <Box align='center' justify='center' style={{ zIndex: 3 }}>
        {right}
      </Box>
    </Header>
  )
}

export default Header
