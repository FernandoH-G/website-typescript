import React from 'react'

// External Imports
import YouTube from 'react-youtube';
import { VideoInfoItem } from '../Types/types';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';

type VideoCardProps = {
  item: VideoInfoItem
}
const VideoCard = (props: VideoCardProps) => {
  const {
    item
  } = props

  const dateTime = DateTime.fromISO(item.publishedAtISO)
  const dateStr = dateTime.toLocaleString(DateTime.DATE_MED)

  console.log("video container")

  return (
    <div
      style={{
        // padding: "8px",
        // borderRadius: "8px"
      }}
    >
      <YouTube
        videoId={item.videoId}
        opts={{
          width: "100%",
          height: "250px"
        }}
      />
      <div
        style={{
          minHeight: "85px",
          padding: "5px",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          backgroundColor: "#343a40",
          textAlign:"center"
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize="1.5rem"
        >
          {item.title}
        </Typography>
        <Typography>
          {dateStr}
        </Typography>
        <Typography>
          {item.hashtags}
        </Typography>
      </div>
    </div>
  )
}

export default VideoCard