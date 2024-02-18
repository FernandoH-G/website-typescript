// React
import { useEffect, useState } from "react"

// External Imports
// import Container from "react-bootstrap/Container"
import { Grid, Typography } from "@mui/material"
import YouTube from 'react-youtube';
import { VideoInfoItem, YoutubeApi } from "./Types/types";

type VideosProps = {
  handleSettingHeaderMessage: (title: string, subtitle: string) => void
}
const Videos = (props: VideosProps) => {
  const {
    handleSettingHeaderMessage
  } = props

  const [videoIds, setVideoIds] = useState<string[]>([])
  const title = "Videos"
  const message = "Recent uploads."

  useEffect(() => {
    handleSettingHeaderMessage(title, message)
  }, [handleSettingHeaderMessage])

  useEffect(() => {
    const controller = new AbortController()
    async function getVideos() {
      const apiToken = process.env.REACT_APP_YT_API_TOKEN
      const playlistId = process.env.REACT_APP_YT_PLAYLIST_ID
      const playlistItemsUrl = `playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&key=${apiToken}`
      const url = `https://youtube.googleapis.com/youtube/v3/${playlistItemsUrl}`
      const resp = await fetch(
        url,
        {
          signal: controller.signal
        }
      )
      if (!resp.ok) {
        throw new Error("Error fetching youtube video data.")
      }
      const data: YoutubeApi = await resp.json()
      const items = data.items
      const videoIds = []
      for (const item of items) {
        const videoId = item.contentDetails.videoId
        videoIds.push(videoId)
      }
      const videoInfoItems: VideoInfoItem[] = items.map((item) => {
        return {
          videoId: item.contentDetails.videoId,
          title: item.snippet.title,
          hashtags: item.snippet.description,
          publishedAtISO: item.snippet.publishedAt
        }
      })
      return {
        videoIds: videoIds
      }
    }
    getVideos()
      .then(result => {
        setVideoIds(result.videoIds)
      })
      .catch((err) => {
        console.error(err)
      })
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <Grid
      container
      spacing={2}
    >
      {
        videoIds.length === 0
          ?
          <Grid
            item
            xs={12}
            textAlign="center"
          >
            <Typography>
              No Videos...
            </Typography>
          </Grid>
          :
          videoIds.map((videoId) => {
            return (
              <Grid
                key={videoId}
                item
                xs={4}
              >
                <div
                  style={{
                    padding: "8px"
                  }}
                >
                  <YouTube
                    key={videoId}
                    videoId={videoId}
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
              </Grid>
            )
          })
      }
    </Grid>
  )
}
export default Videos