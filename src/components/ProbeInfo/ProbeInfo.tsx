import { useState } from "react"
import { Probe } from "../../models/Probe"
import Button from "../Button/Button"
import cx from 'classnames'
import { probeNameMapping } from "../../utils/probe.utils"
import { IoDiamond } from "react-icons/io5"

type Props = {
	probe: Probe,
	selectable?: boolean
	onChange?: (probe: Probe) => void
	isSelected?: boolean
	disabled?: boolean
}

const ProbeInfo = ({ probe, selectable, onChange, isSelected, disabled }: Props) => {
	return (
		<div className={cx(
			"p-2 border-2 rounded w-full flex flex-col gap-4 justify-between",
			isSelected && 'border-l-primary border-l-4',
		)}>
			<div className="flex flex-col gap-2">
				<header>
					<h2 className="text-xl">{probeNameMapping[probe.name]}</h2>
				</header >

				<div className="ml-2 text-gray-900">
					<p>{probe.description ?? 'Aucune description disponible'}</p>
				</div>
			</div>

			<footer className="flex justify-between items-center">
				{
					selectable ? (
						<>
							<span className="flex items-center gap-2">
								<IoDiamond className="text-primary" /> {probe.price} crédits
							</span>

							<Button
								type='primary'
								onClick={() => {
									onChange && onChange(probe)
								}}
								disabled={disabled}
							>
								{isSelected ? 'Supprimer' : 'Ajouter'}
							</Button>
						</>
					) : null
				}
			</footer >
		</div >
	)
}

export default ProbeInfo