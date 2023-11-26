// React
import { useEffect, useState } from "react"

// External Imports
// import Container from "react-bootstrap/Container"
// import YouTube from 'react-youtube';

type VideosProps = {
  handleSettingHeaderMessage: (title: string, subtitle: string) => void
}
const Videos = (props: VideosProps) => {
  const { handleSettingHeaderMessage } = props

  const [videoIds, setVideoIds] = useState<string[]>([])
  const title = "Videos"
  const message = "Recent uploads."

  useEffect(() => {
    handleSettingHeaderMessage(title, message)
  }, [])

  useEffect(() => {
    async function getVideos() {
      const apiToken = process.env.REACT_APP_YT_API_TOKEN
      const playlistId = process.env.REACT_APP_YT_PLAYLIST_ID
      const playlistItemsUrl = `playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&key=${apiToken}`
      const url = `https://youtube.googleapis.com/youtube/v3/${playlistItemsUrl}`
      const resp = await fetch(url)
      if (!resp.ok) {
        throw new Error("Error fetching youtube video data.")
      }
      const data = await resp.json()
      const videos = data.items
      const videoIds = []
      for (const video of videos) {
        const videoId = video.snippet.resourceId.videoId
        videoIds.push(videoId)
      }
      return {
        videoIds: videoIds
      }
    }
    getVideos()
      .then(result => {
        console.log("videoIds: ", result.videoIds)
      })
      .catch((err) => {
        console.error(err)
      })

  }, [])

  return (
    <div>
      {
        // videoIds
        //   ?
        //   videoIds.map((videoId) => {
        //     return (
        //       <YouTube
        //         key={videoId}
        //         videoId={videoId}
        //         onReady={onReady}
        //         opts={{width: "200px", height: "200px"}}
        //       />
        //     )
        //   })
        //   :
        //   <Loading />
      }
    </div>
  )
}
export default Videos