import React from 'react'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { and, block, cond, eq, set, useCode } from 'react-native-reanimated'
import { useValue, useTapGestureHandler } from 'react-native-redash'

const TapButton: React.FC<{
  onPress?: Animated.Node<number>,
  onPressIn?: Animated.Node<number>,
  children: React.ReactElement<Animated.View>
}> = ({ onPress, onPressIn, children }) => {

  const { state, gestureHandler } = useTapGestureHandler()
  const pressed = useValue(0)

  useCode(() => block([
    cond(
      eq(state, State.BEGAN),
      set(pressed, 1),
      onPressIn ? onPressIn : 0
    ),
    cond(
      and(
        eq(state, State.END),
        pressed,
      ),
      [
        set(pressed, 0),
        onPress ? onPress : 0
      ]
    )
  ]), [onPress])

  return (
    <TapGestureHandler {...gestureHandler}>
      {children}
    </TapGestureHandler>
  )
}

export default TapButton
