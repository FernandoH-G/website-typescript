// React
import { useEffect, useState } from "react"

// Internal 
import { VideoInfoItem, YoutubeApi } from "./Types/types";
import VideoCard from "./Component/VideoCard";

// External Imports
import { Grid, Typography } from "@mui/material"
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

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

  const [sortType, setSortType] = useState('date');

  function handleSortType(
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) {
    setSortType(newOption);
  };

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
            <article
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Typography
                marginRight="8px"
              >
                Sort Type:
              </Typography>
              <ToggleButtonGroup
                value={sortType}
                color="flair"
                exclusive
                onChange={handleSortType}
                aria-label="Set sort type"
              >
                <ToggleButton
                  value="date"
                  aria-label="Date"
                >
                  <Typography>
                    Date
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value="title"
                  aria-label="Title"
                >
                  <Typography>
                    Title
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </article>
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