import styled from 'styled-components/native'

export interface CustomTextProps {
  size?: number
  color?: string
  margin?: string
  padding?: string
  bold?: boolean | string | number
  centered?: boolean
}

// Font weight không work trên Android. Sử dụng font family.
const Text = styled.Text<CustomTextProps>`
  font-size: ${(p) => p.size || 14}px;
  font-family: OpenSans-Regular;
  font-weight: ${p => typeof p.bold === 'boolean' ? 'bold' : p.bold || 'normal'};
  color: ${(p) => p.color || '#000'};
  margin: ${(p) => p.margin || '0'};
  padding: ${(p) => p.padding || '0'};
  text-align: ${(p) => (p.centered ? 'center' : 'left')};
`

Text.defaultProps = {
  allowFontScaling: false,
}

export default Text
