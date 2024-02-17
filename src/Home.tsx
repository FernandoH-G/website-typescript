// React
import { useEffect } from "react"

// Internal
import { GET_PINNED_REPOS } from "./Util/query"
import { PinnedRepoEdge } from "./Types/types";

// External Library
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

	console.log("Home")

	useEffect(() => {
		handleSettingHeaderMessage(title, message)
	}, [])

	if (error) {
		return (
			<Typography>Error when loading Github API.</Typography>
		)
	}

	if (loading) {
		return (
			<Typography>Loading...</Typography>
		)
	}

	return data
		?
		<main >
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
		</main>
		:
		<Typography>
			No Data
		</Typography>
}

{/* I'm passing standard props to this test component as if
			this component is a div, p, section etc.*/}
{/* <Jumbo onClick={() => console.log("hi")} style={{color: "white"}} /> */ }

export default Home;