import React from 'react'
import Bar from 'react-native-progress/Bar'
import Colors from '~/constant/Colors'

type Props = {
  progress: number
}

export const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <Bar
      progress={progress}
      width={null}
      height={4}
      borderRadius={0}
      unfilledColor={Colors.iceBlue}
      borderWidth={0}
    />
  )
}
