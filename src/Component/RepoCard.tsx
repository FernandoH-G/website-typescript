
// External Imports
import { Typography } from '@mui/material'

type RepoCardProps = {
  name: string
  updatedStr: string
  description: string | null
  url: string
}
const RepoCard = (props: RepoCardProps) => {
  const {
    name,
    updatedStr,
    description,
    url
  } = props

  return (
    <div
      className="repo-card"
    >
      <Typography
        fontSize="3rem"
      >
        <a
          href={url}
          target='_blank'
        >
          {name}
        </a>
      </Typography>
      <Typography
        fontSize="1.5rem"
        fontStyle="italic"
      >
        Updated: {updatedStr}
      </Typography>
      {
        description === null
          ?
          <Typography
            fontSize="2rem"
          >
            No Description.
          </Typography>
          :
          <Typography
            fontSize="2rem"
          >
            {description}
          </Typography>
      }
    </div>
  )
}

export default RepoCard