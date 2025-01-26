// It's easier to down size a png if it's big to begin with.
// Doesn't lose quality, at least to my eyes.
import ic_my_pig from "./../Images/ic_my_pig_512x512.png"

// External Imports
import { Link, NavLink } from "react-router-dom";
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import NavOption from "./NavOption";

type NavigationProps = {
	headerMessage: {
		title: string
		subtitle: string
	}
}
const Navigation = (props: NavigationProps) => {

	return (
		<section
			style={{
				display: "flex",
				// flexWrap: "wrap",
				marginBottom: "1rem",
				padding: "1rem 1rem",
				backgroundColor: "#343a40",
				boxShadow: "0px 2px 4px"
			}}
		>
			<Grid
				container
				alignItems={"center"}
			>

				<Grid
					item
					xs={12}
					sm={4}
				>
					<div
						style={{
							display: "flex"
						}}
					>
						<Link
							to="/"
						>
							<img
								src={ic_my_pig}
								alt="FH-G logo"
								// width="80px"
								className="img-logo"
							/>
						</Link>
						<div
							className="nav-items"
						>
							<NavOption
								href="/home"
								label="Home"
							/>
							<NavOption
								href="/videos"
								label="Videos"
							/>
							<NavOption
								href="/about"
								label="About"
							/>
						</div>
					</div>
				</Grid>

				{/* Title and Subtitle placed inside right of Navigation. */}
				<Grid
					item
					xs={12}
					sm={8}
				>
					<div
						className="nav-title"
					>
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