// import hexToRgba from 'hex-to-rgba'
//#region
import hexToRgba from 'hex-to-rgba'
import React from 'react'
import { Platform, TouchableOpacityProps, TouchableOpacity as TouchableOpacityOrigin } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import Box, { BoxProps } from './Box'

interface Props {
  height?: number | string
  width?: number
  primary?: boolean
  background?: string
  p?: string//padding
  border?: boolean | string
  borderColor?: string
  boxProps?: BoxProps
}

interface RootProps {
  m?: string
  shadow?: boolean
  shadowColor?: string
}
const Touch = Platform.select({ ios: TouchableOpacity, android: TouchableOpacityOrigin })!
const Root = styled(Touch) <RootProps & TouchableOpacityProps>`
  margin: ${(p) => p.m || '0'};
  ${(p) => (p.shadow ? `box-shadow: 0 4px 10px ${p.shadowColor || hexToRgba('#87a7ab', 0.5)}` : '')};
`

const StyledButton = styled(Box) <Props>`
  overflow: hidden;
  border-radius: 6px;
  height: ${(p) => typeof p.height === 'string' ? p.height : `${(p.height || 48)}px`};
  width: ${(p) => (p.width ? `${p.width}px` : 'auto')};
  padding: ${p => p.p || '5px 8px'};
  justify-content: center;
  align-items: center;
  border: ${p => typeof p.border === 'string' ? p.border : (p.border ? '0.5px solid rgba(0,0,0,0.3)' : 'none')};
  border-color: ${p => p.borderColor || 'rgba(0,0,0,0.3)'};
`

const DefaultButton = styled(StyledButton)`
  background-color: ${(p) => p.background || '#fff'};
`
//#endregion

const Button: React.FC<Props & RootProps & TouchableOpacityProps> = ({
  background,
  primary,
  border,
  height,
  width,
  children,
  style,
  borderColor,
  p,
  boxProps,
  disabled,
  ...rest
}) => {
  if (primary) {
    return (
      <Root disabled={disabled} {...rest}>
        {/* <StyledButton
          as={LinearGradient}
          {...boxProps}
          height={height}
          borderColor={borderColor}
          width={width}
          border={border}
          p={p}
          colors={disabled ? [COLORS.light_gray, COLORS.light_gray] : ['#0092ff', COLORS.primary]}
          style={[style]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          {children}
        </StyledButton> */}
      </Root>
    )
  }

  return (
    <Root disabled={disabled} {...rest}>
      <DefaultButton
        {...boxProps}
        height={height}
        width={width}
        p={p}
        border={border}
        borderColor={borderColor}
        background={background}
        style={[style]}
      >
        {children}
      </DefaultButton>
    </Root>
  )
}

export default Button
