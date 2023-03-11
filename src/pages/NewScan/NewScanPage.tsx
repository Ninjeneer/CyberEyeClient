import { useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import Section from "../../components/Section/Section"
import ProbeInfo from "../../components/ProbeInfo/ProbeInfo"
import Button from "../../components/Button/Button"
import Periodicity from "../../components/Periodicity/Periodicity"
import { Probe } from "../../models/Probe"
import { useNavigate } from "react-router-dom"
import { ScanSettings } from "../../models/Scan"
import api from "../../api/api"
import { StatusCodes } from "http-status-codes"

type FooterProps = {
	disabled: boolean
	data: ScanSettings
}
const Footer = ({ disabled, data }: FooterProps) => {
	const navigate = useNavigate()
	const goToConfirm = () => {
		navigate('/confirm-scan', { state: data })
	}

	return (
		<div className="flex justify-center w-full">
			<Button text="Suivant" type="primary" onClick={goToConfirm} disabled={disabled} />
		</div>
	)
}

const NewScanPage = () => {
	const [target, setTarget] = useState('')
	const [availableProbes, setAvailableProbes] = useState<Probe[]>([])
	const [selectedProbes, setSelectedProbes] = useState<Probe[]>([])
	const [periodicity, setPeriodicity] = useState('')

	useMemo(() => {
		api.probes.getAvailableProbes().then(async (res) => {
			if (res.status === StatusCodes.OK) {
				setAvailableProbes(await res.json())
			}
		})
	}, [])

	const isSettingsValid = useMemo(() => {
		return target && selectedProbes.length > 0 && periodicity
	}, [target, selectedProbes, periodicity])

	const onProbeChange = (probe: Probe) => {
		if (selectedProbes.find((selectedProbe) => selectedProbe.name === probe.name)) {
			setSelectedProbes(selectedProbes.filter((selectedProbe) => selectedProbe.name !== probe.name))
		} else {
			setSelectedProbes([...selectedProbes, probe])
		}
	}



	return (
		<Page
			pageTitle="Nouveau scan"
			footer={
				<Footer
					disabled={!isSettingsValid}
					data={{
						target, probes: selectedProbes, periodicity
					}}
				/>
			}
		>
			<div className="inputGroup">
				<label>Cible du scan</label>
				<input
					type="text"
					value={target}
					onChange={(e) => setTarget(e.target.value)}
					placeholder="Nom de domaine ou adresse IP"
					className="w-full"
				/>
			</div>

			<Section name="Sondes disponibles">
				<div className="flex flex-col gap-2 lg:flex-row">
					{availableProbes.map((probe) => (
						<ProbeInfo
							probe={probe}
							key={probe.name}
							selectable={true}
							onChange={onProbeChange}
						/>
					))}

				</div>
			</Section>

			<Section name="Périodicité">
				<Periodicity onChange={setPeriodicity} />
			</Section>
		</Page>
	)
}

export default NewScanPage