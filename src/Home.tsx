// React
import { useState, useEffect } from "react"

// Internal
// import Commits from "../Component/Commits"
// import Info from "../Component/Info"
// import Loading from "../Component/Loading"
import { parseDate } from "./Util/helpers"
import { GET_PINNED_REPOS } from "./Util/query"
import { ReactComponent as BackIcon } from "./Images/arrow_back_black_24dp.svg"
import { ReactComponent as ForwardIcon } from "./Images/arrow_forward_black_24dp.svg"

// External Library
import Typography from '@mui/material/Typography';
import { useQuery } from '@apollo/client'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type HomeProps = {
	handleSettingHeaderMessage: (title: string, subtitle: string) => void
}
function Home(props: HomeProps) {
	const { handleSettingHeaderMessage } = props
	const title = "Projects"
	const message = "Projects fetched from Github using their GQL API."
	const { data } = useQuery(GET_PINNED_REPOS);
	const [repos, setRepos] = useState(null)
	const [repoIndex, setRepoIndex] = useState(0)
	const [currentRepo, setCurrentRepo] = useState(null)
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	// function forwardRepo() {
	// 	const tmpIndex = (repoIndex + 1) % repos.length
	// 	const absIndex = Math.abs(tmpIndex)
	// 	const currentRepo = repos[absIndex].node
	// 	setRepoIndex(tmpIndex)
	// 	setCurrentRepo(currentRepo)
	// }

	// function backwardRepo() {
	// 	const tmpIndex = (repoIndex - 1) % repos.length
	// 	const absIndex = Math.abs(tmpIndex)
	// 	const currentRepo = repos[absIndex].node
	// 	setRepoIndex(tmpIndex)
	// 	setCurrentRepo(currentRepo)
	// }

	useEffect(() => {
		handleSettingHeaderMessage(title, message)
	}, [])

	useEffect(() => {
		if (data !== undefined) {
			const pinEdges = data.user.pinnedItems.edges
			const repoArr = pinEdges
			setRepos(repoArr)
			const currentRepo = repoArr[0].node
			setCurrentRepo(currentRepo)
		}
	}, [data])

	if (!currentRepo) return (
		<main className="project-info-style">
			<section className="column-style">
				{/* <Loading /> */}
				<Typography>Loading...</Typography>
			</section>
		</main>
	)

	{/* Outer div to hold info | commits */ }
	{/* I'm passing standard props to this test component as if
			this component is a div, p, section etc.*/}
	{/* <Jumbo onClick={() => console.log("hi")} style={{color: "white"}} /> */ }
	return (
		<main >
		</main>
	);
}

export default Home;