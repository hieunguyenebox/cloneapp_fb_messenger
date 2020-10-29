import styled from 'styled-components/native'

interface Props {
  size: number
  background?: string
}

const Circle = styled.View<Props>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: ${(p) => p.size / 2}px;
  background-color: ${(p) => p.background || '#fff'};
  overflow: hidden;
`

export default Circle
