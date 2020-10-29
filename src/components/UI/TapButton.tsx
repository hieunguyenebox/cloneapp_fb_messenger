import React from 'react'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { and, block, cond, eq, set, useCode } from 'react-native-reanimated'
import { useTapGestureHandler, useValue } from 'react-native-redash'

const TapButton: React.FC<{ onPress: Animated.Node<number>, children: React.ReactElement<Animated.View> }> = ({ onPress, children }) => {

  const { state, gestureHandler } = useTapGestureHandler()
  const pressed = useValue(0)

  useCode(() => block([
    cond(
      eq(state, State.BEGAN),
      set(pressed, 1)
    ),
    cond(
      and(
        eq(state, State.END),
        pressed,
      ),
      [
        set(pressed, 0),
        onPress
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
