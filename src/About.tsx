// React
import { useEffect } from "react"

// External Imports
import Typography from '@mui/material/Typography';

type AboutProps = {
	handleSettingHeaderMessage: (title: string, subtitle: string) => void
}
function About(props: AboutProps) {
	const {
		handleSettingHeaderMessage
	} = props

	const title = "Fernando H-G"
	const message = "Software Developer."

	useEffect(() => {
		handleSettingHeaderMessage(title, message)
	}, [handleSettingHeaderMessage])

	return (
		<section
			// style={{
			// 	display: "flex",
			// 	justifyContent: "center"
			// }}
			className="center-container"
		>
			<article
				className="center-width"
			>
				<Typography variant="h3" gutterBottom>
					Bio
				</Typography>
				<Typography paragraph>
					My name is Fernando Herrera-Gomez. I was born in Fresno, CA. My folks moved a lot to follow their seasonal work. Eventually we settled in Bakersfield CA. Going into <a href="https://www.csub.edu/">California State University Bakersfield</a>, I had it as my goal to eventually become a lawyer. In order to fulfill this goal, I studied and eventually graduated as the outstanding graduate in Philosophy for 2014.
				</Typography>
				<Typography paragraph>
					I met good classmates and even better professors. One classmate turned me on to a <a href="https://law.ucla.edu/life-ucla-law/diversity-inclusion/outreach">UCLA Law Fellows</a> program where I applied to and eventually was a part of. Soon after the program, a professor helped me land an internship in a law firm in Bakersfield. Attending this internship was a pivotal part of my life.
				</Typography>
				<Typography paragraph>
					After some time with the internship, I started to have doubts as to my motivation to become a lawyer. After much introspection, I decided to no longer pursue a career in Law. Cut to 2016, I saw myself attending CSUB once more, but this time, as a computer science student! I knew that after my first year, programming was what I wanted to devote my life to.
				</Typography>
				<Typography variant="h3" gutterBottom>
					Interests
				</Typography>
				<Typography paragraph>
					My last semester of University consisted of me going to classes, then immediatly going <strong className="flair-text"  >bouldering</strong> in the universitie's recreation center. It was physically and mentally challenging and exhausting, but I loved every minute.
				</Typography>
				<Typography paragraph>
					I have commuted to school and home via bus and <strong className="flair-text">cycling</strong> for 4 years. Be it rain or shine, I rode my bike as part of the commute to my university. It was a very fun and healthy time.
				</Typography>
			</article>
		</section>
	);
}

export default About;
