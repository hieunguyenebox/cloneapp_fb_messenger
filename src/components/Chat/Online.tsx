import styled from "styled-components"
import Circle from "~/components/UI/Circle"

 const OnLine = styled(Circle) <{ bottom?: number, right?: number }>`
background-color: #00c230;
position: absolute;
bottom: ${p => p.bottom !== undefined ? p.bottom : 0}px;
right: ${p => p.right !== undefined ? p.right : 0}px;
border: 2px solid #fff;
`

export default OnLine