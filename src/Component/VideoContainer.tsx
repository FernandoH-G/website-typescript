import React from 'react'

// External Imports
import YouTube from 'react-youtube';
import { VideoInfoItem } from '../Types/types';

type VideoContainerProps = {
  item: VideoInfoItem
}
const VideoContainer = (props: VideoContainerProps) => {
  const {
    item
  } = props
  return (
    <div
      style={{
        padding: "8px"
      }}
    >
      <YouTube
        videoId={item.videoId}
        opts={{
          width: "100%",
          height: "250px"
        }}
      // style={{
      //   height: "100%",
      //   width: "100%"
      // }}

      // onReady={onReady}
      // opts={{ width: "200px", height: "200px" }}
      />
    </div>
  )
}

export default VideoContainer