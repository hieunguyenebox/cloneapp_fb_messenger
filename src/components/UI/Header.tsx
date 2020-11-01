import hexToRgba from 'hex-to-rgba'
import React, { useCallback } from 'react'
import { TextProps, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import Icon from './Icon'
import Box from './Box'
import Text, { CustomTextProps } from './Text'
import { getWidth } from '~/modules/screen'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'
import appStore from '~/modules/stores/app_store'

interface Props {
  align?: string
  borderBottom?: boolean
  title?: string | React.ReactElement
  titleStyle?: TextProps & CustomTextProps
  right?: React.ReactElement | null
  left?: React.ReactElement | null
  pressBack?: () => void
}
const StyledHeader = styled.View<Props>`
  flex-direction: row;
  position: relative;
  align-items: center;
  width: ${getWidth(100)}px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom-width: ${p => p.borderBottom ? '0.5px' : '0px'};
  border-bottom-color: rgba(0,0,0,0.2);
  z-index: 100;
`
const MyHeader: React.FC<Props & ViewProps> = ({
  title, titleStyle, right, left, pressBack,
  style,
  ...rest
}) => {

  const { top } = useSafeAreaInsets()
  const navigation = useNavigation()
  const onPress = () => {
    if (pressBack) {
      pressBack()
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
    }
  }

  return (
    <StyledHeader
      style={[{ height: appStore.HeaderHeight, paddingTop: top }, style]}
      {...rest}
    >
      <Box
        width={getWidth(15)}
        height='100%' align='center' justify='center'>
        {left !== undefined ? left : (
          <Button style={{ paddingLeft: 20 }} onPress={onPress}>
            <Icon name='chevron-back' size={30} />
          </Button>
        )}
      </Box>
      <Box
        height='100%'
        style={{
          flex: 1,
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
      <Box width={getWidth(15)} height='100%' align='center' justify='center'>
        {right}
      </Box>
    </StyledHeader>
  )
}

export default MyHeader
