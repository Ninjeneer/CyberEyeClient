import { useState } from "react"
import { Probe } from "../../models/Probe"
import Button from "../Button/Button"
import cx from 'classnames'
import { probeNameMapping } from "../../utils/probeUtils"

type Props = {
	probe: Probe,
	selectable?: boolean
	onChange?: (probe: Probe) => void
}

const ProbeInfo = ({ probe, selectable, onChange }: Props) => {
	const [isSelected, setIsSelected] = useState(false)

	return (
		<div className={cx(
			"p-2 border-2 rounded w-full flex flex-col justify-between",
			isSelected && 'border-l-primary border-l-4',
		)}>
			<div>
				<header>
					<h2 className="text-xl">{probeNameMapping[probe.name]}</h2>
				</header >

				<div className="ml-2 text-gray-900">
					<p>{probe.description ?? 'Aucune description disponible'}</p>
				</div>
			</div>

			<footer className="flex justify-end items-center">
				{
					selectable ? (
						<Button
							type='primary'
							text={isSelected ? 'Supprimer' : 'Ajouter'}
							onClick={() => {
								setIsSelected(!isSelected)
								onChange && onChange(probe)
							}}
						/>
					) : null
				}
			</footer >
		</div >
	)
}

export default ProbeInfo