import { useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import Button from "../../components/Button/Button"
import { Probe } from "../../models/Probe"
import { useNavigate } from "react-router-dom"
import { ScanSettings } from "../../models/Scan"
import api from "../../api/api"
import { StatusCodes } from "http-status-codes"
import { useAuth } from "../../contexts/Auth"
import ScanEdit from "../../components/ScanEdit/ScanEdit"
import { isScanSettingValid } from "../../utils/scan.utils"

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
			<Button type="primary" onClick={goToConfirm} disabled={disabled}>Suivant</Button>
		</div>
	)
}

const NewScanPage = () => {
	const [availableProbes, setAvailableProbes] = useState<Probe[]>([])
	const [scanSettings, setScanSettings] = useState<ScanSettings>({} as ScanSettings)
	const { session } = useAuth()

	useMemo(() => {
		api.authenticated(session).probes.getAvailableProbes().then(async (res) => {
			if (res.status === StatusCodes.OK) {
				setAvailableProbes(await res.json())
			}
		})
	}, [])


	const isSettingsValid = useMemo(() => isScanSettingValid(scanSettings), [scanSettings])

	return (
		<Page
			pageTitle="Nouveau scan"
			footer={
				<Footer
					disabled={!isSettingsValid}
					data={scanSettings}
				/>
			}
		>
			<ScanEdit availableProbes={availableProbes} onChange={setScanSettings} />
		</Page>
	)
}

export default NewScanPage