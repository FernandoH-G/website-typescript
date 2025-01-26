// External Imports
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

type HTMLTooltipProps = {
  children: any
  html: any
}
const HTMLTooltip = (props: HTMLTooltipProps) => {
  const {
    children,
    html
  } = props

  // Not sure if this logic works with touchscreens...
  return (
    <HtmlTooltip
      title={html}
      placement='bottom'
    >
      {children}
    </HtmlTooltip>
  )
}

export default HTMLTooltip