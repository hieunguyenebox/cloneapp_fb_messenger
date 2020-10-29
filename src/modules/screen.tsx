import { Dimensions } from 'react-native'
const { height: h, width: w } = Dimensions.get('window')
export const getWidth: (percentage: number) => number = (percentage) => (w * percentage) / 100
export const getHeight: (percentage: number) => number = (percentage) => (h * percentage) / 100
export const isXSWidth = () => getWidth(100) < 400
