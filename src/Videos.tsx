// React
import { useEffect, useState } from "react"

// Internal 
import { VideoInfoItem, YoutubeApi } from "./Types/types";
import VideoCard from "./Component/VideoCard";

// External Imports
import { Grid, Typography } from "@mui/material"
import ToggleGroupInput from "./Component/ToggleGroupInput";

type VideosProps = {
  handleSettingHeaderMessage: (title: string, subtitle: string) => void
}
const Videos = (props: VideosProps) => {
  const {
    handleSettingHeaderMessage
  } = props

  const [videoInfoItems, setVideoInfoItems] = useState<VideoInfoItem[]>([])
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
        videoInfoItems
      }
    }
    getVideos()
      .then(result => {
        setVideoInfoItems(result.videoInfoItems)
      })
      .catch((err) => {
        console.error(err)
      })
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <main
      className="center-container"
    >
      <section
        className="center-width"
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              <ToggleGroupInput
                label="Sort Type"
                options={["date", "title"]}
                option="date"
              />
              <ToggleGroupInput
                label="Sort"
                options={["asc", "desc"]}
                option="asc"
              />
            </div>
          </Grid>

          {
            videoInfoItems.length === 0
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
              videoInfoItems.map((videoInfoItem) => {
                return (
                  <Grid
                    key={videoInfoItem.videoId}
                    item
                    xs={12}
                    sm={4}
                  >
                    <VideoCard
                      item={videoInfoItem}
                    />
                  </Grid>
                )
              })
          }
        </Grid>
      </section>
    </main>
  )
}
export default Videos