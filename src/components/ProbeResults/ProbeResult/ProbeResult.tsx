import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { Probe } from "../../../models/Probe"
import { ProbeResult as ProbeResultContainer, Report } from "../../../models/report"
import { probeNameMapping } from "../../../utils/probeUtils"
import { useState } from "react"
import cx from 'classnames'

type ProbeInfoProps = {
	name: string
	value: string
}
const ProbeInfo = ({ name, value }) => {
	return (
		<div className="flex flex-col">
			<label className="uppercase">{name}</label>
			<p className="text-lg text-primary">{value}</p>
		</div>
	)
}

type Props = {
	result: ProbeResultContainer
	children?: React.ReactNode
}
const ProbeResultContainer = ({ result, children }: Props) => {
	const [show, setShow] = useState(true)
	const iconSize = 20

	const toggle = () => {
		setShow(!show)
	}

	return (
		<div className="border p-2 px-4">
			<header className={cx("flex flex-row justify-between items-center", show && 'border-b')}>
				<div className="flex flex-[2] flex-col lg:flex-row justify-between gap-4 lg:gap-0">
					<ProbeInfo name="Sonde" value={probeNameMapping[result.context.probeName]} />
					<ProbeInfo name="Cible" value={result.context.target} />
				</div>
				<span onClick={toggle} className="hover:cursor-pointer flex flex-1 justify-end">
					{show ? <BsChevronUp size={iconSize} /> : <BsChevronDown size={iconSize} />}
				</span>
			</header>

			{show ? (
				<div className="p-2">
					{children}
				</div>
			) : null}
		</div>
	)
}

export default ProbeResultContainer