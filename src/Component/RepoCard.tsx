import { useRef } from 'react'

// Me
import { useIsOverflow } from '../hooks/useIsOverflow'
import HTMLTooltip from './HTMLTooltip'

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

  const ref = useRef(null)
  const isOverflow = useIsOverflow(ref)

  // function isOverflown(element: any) {
  //   console.log('element: ', element)
  //   return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  // }

  // Check whether to have HTMLTooltip by checking if the description
  // is overflowing.
  return isOverflow
    ?
    <HTMLTooltip
      html={
        <Typography>
          {description}
        </Typography>
      }
    >
      <div
        className="repo-card"
        ref={ref}
      >
        <Typography
        >
          {name}
        </Typography>
        <Typography>
          Updated: {updatedStr}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </div>
    </HTMLTooltip>
    :
    <div
      className="repo-card"
      ref={ref}
    >
      <Typography
      >
        {name}
      </Typography>
      <Typography>
        Updated: {updatedStr}
      </Typography>
      <Typography>
        {description}
      </Typography>
    </div>
}

export default RepoCard