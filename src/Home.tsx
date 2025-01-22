import { useEffect } from "react"

// Me
import { GET_PINNED_REPOS } from "./Util/query"
import { PinnedRepoEdge } from "./Types/types";

// External Imports
import { useQuery } from '@apollo/client'
import Typography from '@mui/material/Typography';

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
			<Typography>
				Error when loading Github API.
			</Typography>
		)
	}

	if (loading) {
		return (
			<Typography>
				Loading...
			</Typography>
		)
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
				{
					data.user.pinnedItems.edges.map((
						edge: PinnedRepoEdge,
						idx: number
					) => {
						return (
							<Typography
								key={idx}
							>
								{edge.node.name}
							</Typography>
						)
					})
				}
			</section>
		</main>
		:
		<Typography>
			No Data.
		</Typography>
}

export default Home;