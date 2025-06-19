// import { useRef } from 'react'

// Me
// import { useIsOverflow } from '../hooks/useIsOverflow'
// import HTMLTooltip from './HTMLTooltip'

// External Imports
import { Typography } from '@mui/material'

type RepoCardProps = {
  name: string
  updatedStr: string
  description: string | null
}
const RepoCard = (props: RepoCardProps) => {
  const {
    name,
    updatedStr,
    description
  } = props

  // const ref = useRef(null)
  // const isOverflow = useIsOverflow(ref)


  // Check whether to have HTMLTooltip by checking if the description
  // is overflowing.
  return (
    <div
      className="repo-card"
    // ref={ref}
    >
      <Typography
        fontSize="3rem"
      >
        {name}
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