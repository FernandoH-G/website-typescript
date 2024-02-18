import React, { useState } from 'react'

// External Imports
import { Typography } from '@mui/material'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

type ToggleInputProps = {
  label: string
  options: string[]
  option: string
}
const ToggleGroupInput = (props: ToggleInputProps) => {
  const {
    label,
    options,
    option
  } = props

  const [sortType, setSortType] = useState(option);

  function handleSortType(
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) {
    setSortType(newOption);
  }

  return (
    <article
      style={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <Typography
        marginRight="8px"
      >
        {/* Sort Type: */}
        {label}:
      </Typography>
      <ToggleButtonGroup
        value={sortType}
        color="flair"
        exclusive
        onChange={handleSortType}
        aria-label="Set type"
      >
        {
          options.map((option) => {
            return (
              <ToggleButton
                value={option}
                aria-label={option}
              >
                <Typography>
                  {option}
                </Typography>
              </ToggleButton>
            )
          })
        }
        {/* <ToggleButton
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
        </ToggleButton> */}
      </ToggleButtonGroup>
    </article>
  )
}

export default ToggleGroupInput