import { useEffect } from "react"

// Me
import { GET_PINNED_REPOS } from "./Util/query"
import { PinnedRepoEdge } from "./Types/types";

// External Imports
import { useQuery } from '@apollo/client'
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { DateTime } from "luxon";
import HTMLTooltip from "./Component/HTMLTooltip";
import RepoCard from "./Component/RepoCard";

type HomeProps = {
	handleSettingHeaderMessage: (title: string, subtitle: string) => void
}
function Home(props: HomeProps) {
	const {
		handleSettingHeaderMessage
	} = props

	const title = "Projects"
	const message = "Projects fetched from Github using their GQL API."
	const { data, loading, error } = useQuery(GET_PINNED_REPOS);

	useEffect(() => {
		handleSettingHeaderMessage(title, message)
	}, [handleSettingHeaderMessage])

	if (error) {
		return (
			<main
				style={{
					display: "flex",
					justifyContent: "center"
				}}
			>
				<Typography>
					Error when loading Github API.
				</Typography>
			</main>
		)
	}

	if (loading) {
		return (
			<main
				style={{
					display: "flex",
					justifyContent: "center"
				}}
			>
				<Typography>
					Loading...
				</Typography>
			</main>
		)
	}

	function getDateStr(iso: string) {
		const dT = DateTime.fromISO(iso)
		return dT.toLocaleString(DateTime.DATETIME_MED)
	}

	// Look to Jumbo component in js version of Website for spread props example.
	return data
		?
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
					{
						data.user.pinnedItems.edges.map((edge: PinnedRepoEdge) => {
							return (
								<Grid
									key={edge.node.name}
									item
									xs={12}
									sm={4}
								>
									{
										edge.node.description === null
											?
											<RepoCard
												name={edge.node.name}
												updatedStr={getDateStr(edge.node.pushedAt)}
												description={edge.node.description}
											/>
											:
											<HTMLTooltip
												html={
													<Typography>
														{edge.node.description}
													</Typography>
												}
											>
												<div
													className="repo-card"
												>
													<Typography
													>
														{edge.node.name}
													</Typography>
													<Typography>
														Updated: {getDateStr(edge.node.pushedAt)}
													</Typography>
													<Typography>
														{edge.node.description}
													</Typography>
												</div>
											</HTMLTooltip>
									}
								</Grid>
							)
						})
					}
				</Grid>
			</section>
		</main>
		:
		<Typography>
			No Data.
		</Typography>
}

export default Home;