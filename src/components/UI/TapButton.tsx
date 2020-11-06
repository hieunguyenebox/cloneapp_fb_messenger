import React from 'react'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { and, block, call, cond, eq, set, useCode } from 'react-native-reanimated'
import { useValue, useTapGestureHandler, contains } from 'react-native-redash'

const TapButton: React.FC<{
  onPress?: Animated.Node<number>,
  onPressIn?: Animated.Node<number>,
  onPressOut?: Animated.Node<number>,
  children: React.ReactElement<Animated.View>
}> = ({ onPress, onPressOut, onPressIn, children }) => {

  const { state, gestureHandler } = useTapGestureHandler()
  const pressed = useValue(0)

  useCode(() => block([
    cond(
      eq(state, State.BEGAN),
      [
        onPressIn ? onPressIn : 0,
        set(pressed, 1),

      ]
    ),
    cond(
      contains([State.FAILED, State.CANCELLED, State.END], state),
      [
        onPressOut ? onPressOut : 0
      ]
    ),
    cond(
      and(
        eq(state, State.END),
        pressed,
      ),
      [
        onPress ? onPress : 0,
        set(pressed, 0),
      ]
    )
  ]), [])

  return (
    <TapGestureHandler {...gestureHandler}>
      {children}
    </TapGestureHandler>
  )
}

export default TapButton
