import ProbeResultContainer from "../ProbeResult/ProbeResult"
import { ProbeDummyResult } from "../../../models/results/probeDummyResult"
import { ProbeResult } from "../../../models/report"


type Props = {
	result: ProbeResult<ProbeDummyResult>
}
const ProbeDummyResult = ({ result }: Props) => {

	return (
		<ProbeResultContainer result={result}>
			<p>{result.result}</p>
		</ProbeResultContainer>
	)
}

export default ProbeDummyResult