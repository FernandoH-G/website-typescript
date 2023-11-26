// Internal
// It's easier to down size a png if it's big to begin with.
// Doesn't lose quality, at least to my eyes.
import { Grid } from "@mui/material";
import ic_my_pig from "./../Images/ic_my_pig_512x512.png"

// External Imports
import Typography from '@mui/material/Typography';
import { Link, NavLink } from "react-router-dom";

type NavigationProps = {
	headerMessage: {
		title: string
		subtitle: string
	}
}
const Navigation = (props: NavigationProps) => {
	const normalStyle = {
		color: "white",
		marginRight: "8px"
	}
	const activeStyle = {
		color: "#00818A",
		marginRight: "8px",
		textShadow: "1px 1px 2px #00818A",
	}

	return (
		<section
			style={{
				display: "flex",
				flexWrap: "wrap",
				marginBottom: "15px",
				padding: "1rem 1rem",
				backgroundColor: "#343a40",
				boxShadow: "0px 2px 4px"
			}}
		>
			<Grid
				container
			>
				<Grid
					item
					xs={12}
					sm={1}
				>
					<Link to="/">
						<img
							src={ic_my_pig}
							width="80px"
							height="80px"
							alt="FH-G logo"
							style={{ borderRadius: "50px" }}
						/>
					</Link>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							height: "100%"
						}}
					>
						<NavLink
							to="/home"
							style={({ isActive }) => isActive ? activeStyle : normalStyle}
						>
							<Typography
								variant="button"
							>
								Home
							</Typography>
						</NavLink>
						<NavLink
							to="/about"
							style={({ isActive }) => isActive ? activeStyle : normalStyle}
						>
							<Typography
								variant="button"
							>
								About
							</Typography>
						</NavLink>
						<NavLink
							to="videos"
							style={({ isActive }) => isActive ? activeStyle : normalStyle}
						>
							<Typography
								variant="button"
							>
								Videos
							</Typography>
						</NavLink>

					</div>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
				>
					{/* Title and Subtitle placed inside right of Navigation. */}
					<div style={{
						display: "flex",
						flexDirection: "column",
					}}>
						<Typography
							variant="h2"
						>
							{props.headerMessage.title}
						</Typography>
						<Typography
							style={{ color: "white" }}
						>
							{props.headerMessage.subtitle}
						</Typography>
					</div>
				</Grid>

			</Grid>
		</section>
	)
}

export default Navigation