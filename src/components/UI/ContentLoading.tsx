import React from 'react'
import ContentLoader, { Circle, Rect } from "react-content-loader/native"
import { getWidth } from "~/modules/screen"
import Box from "./Box"

const ContentLoading = () => {
  return (
    <Box align='center' width='100%' p='10px 20px'>
      <ContentLoader viewBox={`0 0 ${getWidth(90)} 475`} height={475} width="100%" speed={2}>
        <Circle cx="30" cy="258" r="30" />
        <Rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
        <Rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
        <Rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
        <Rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
      </ContentLoader>
    </Box>
  )
}

export default ContentLoading
