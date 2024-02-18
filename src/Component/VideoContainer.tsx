import React from 'react'

// External Imports
import YouTube from 'react-youtube';
import { VideoInfoItem } from '../Types/types';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';

type VideoContainerProps = {
  item: VideoInfoItem
}
const VideoContainer = (props: VideoContainerProps) => {
  const {
    item
  } = props

  const dateTime = DateTime.fromISO(item.publishedAtISO)
  const dateStr = dateTime.toLocaleString(DateTime.DATE_MED)

  console.log("video container")

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
      />
      <Typography>
        {item.title}
      </Typography>
      <Typography>
        {dateStr}
      </Typography>
      <Typography>
        {item.hashtags}
      </Typography>
    </div>
  )
}

export default VideoContainer