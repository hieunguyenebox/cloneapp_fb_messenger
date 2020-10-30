import React, { useMemo } from 'react'
import { BottomTabBarOptions, BottomTabBarProps } from "@react-navigation/bottom-tabs"
import Box from "~/components/UI/Box"
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from './UI/Icon'
import Text from './UI/Text'
import { getWidth } from '~/modules/screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView, VibrancyView } from '@react-native-community/blur'
import hexToRgba from 'hex-to-rgba'

const TabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({
  state,
  navigation,
  descriptors
}) => {

  const { bottom } = useSafeAreaInsets()

  const tabs = useMemo(() => {

    return state.routes.map((route, index) => {

      // const { options } = descriptors[route.key]
      const isFocused = state.index === index
      const color = isFocused ? '#000' : hexToRgba('#000', 0.5)


      let label = ''
      let icon = null
      switch (route.name) {
        case 'tab_chat':
          label = 'Chats'
          icon = <Icon size={26} color={color} name='chatbubble' />
          break;
        case 'tab_people':
          label = 'People';
          icon = <Icon size={26} color={color} name='people' />
          break;
      }
      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };


      return (
        <TouchableOpacity onPress={onPress} activeOpacity={1} key={route.name}>
          <Box height='100%' align='center' justify='center' width={getWidth(50)}>
            {icon}
            <Text size={12} color={color}>
              {label}
            </Text>
          </Box>
        </TouchableOpacity>
      )
    })

  }, [state, navigation, descriptors])

  const height = 50 + bottom
  return (
    <Box
      style={{ position: 'absolute', bottom: 0 }}
      p='10px 0' width={getWidth(100)} height={height}
      row
    >
      <BlurView
        style={{
          position: 'absolute',
          width: getWidth(100),
          height
        }}
        blurType='materialLight'
        blurAmount={10}
      />
      {tabs}
    </Box>
  )

}

export default TabBar
