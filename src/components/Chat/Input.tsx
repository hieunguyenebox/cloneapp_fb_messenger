import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { getWidth } from '~/modules/screen'
import Box from '../UI/Box'
import Button from '../UI/Button'
import Colors from '../UI/Colors'
import Icon from '../UI/Icon'

const MyContainer = styled(Box)`
  border: 1px solid;
  padding: 0 10px;
`

const InputContainer = styled(Box)`
  border-radius: 18px;
  height: 35px;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0,0,0,0.05);
  padding-left: 12px;
  padding-right: 5px;
  width: 100px;
  flex: 1;
`

const StyledTextInput = styled(TextInput)`
  height: 100%;
  margin-right: 10px;
  flex: 1;
  font-size: 16px;
`


const IconStyled = ({ name }: { name: string }) => (
  <Button background='transparent' height='100%' width={48} style={{ paddingRight: 0, paddingLeft: 0 }}>
    <Icon name={name} color={Colors.blue} size={30} />
  </Button>
)

const Input = () => {

  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  return (
    <MyContainer
      align='center'
      justify='space-between'
      row
      style={{ paddingBottom: bottom, position: 'absolute', bottom: 0 }}
      width='100%'
      height={48 + bottom}
    >
      <BlurView
        style={{
          position: 'absolute',
          width: getWidth(100),
          height: bottom + 48
        }}
        blurType='ultraThinMaterialLight'
        blurAmount={10}
      />
      <IconStyled name='gift' />
      <IconStyled name='camera' />
      <IconStyled name='image' />
      <IconStyled name='mic' />
      <InputContainer>
        <StyledTextInput
          placeholder={t('Aa')}
          allowFontScaling={false}
          selectionColor={Colors.blue}
        />
        <TouchableOpacity>
          <Icon name='happy' color={Colors.blue} size={30} />
        </TouchableOpacity>
      </InputContainer>
      <IconStyled name='menu' />

    </MyContainer>
  )
}

export default Input