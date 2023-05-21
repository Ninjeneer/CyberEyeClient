import { useLocation, useNavigate } from "react-router-dom"
import Page from "../../components/Page/Page"
import ScanEdit from "../../components/ScanEdit/ScanEdit"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useAuth } from "../../contexts/Auth"
import api from "../../api/api"
import { Scan, ScanSettings, ScanWithProbes } from "../../models/Scan"
import { Probe } from "../../models/Probe"
import { StatusCodes } from "http-status-codes"
import Button from "../../components/Button/Button"
import { isScanSettingValid } from "../../utils/scan.utils"
import isEqual from 'lodash.isequal'
import { toast } from "react-toastify"

type FooterProps = {
	disabled: boolean
	data: { id: string, settings: ScanSettings }
	onUpdate: Function
	onDelete: Function
}
const Footer = ({ disabled, data, onUpdate, onDelete }: FooterProps) => {
	const { session } = useAuth()

	const updateScan = useCallback(() => {
		api.authenticated(session).scans.updateScan(data.id, data.settings).then((res) => {
			if (res.status === StatusCodes.OK) {
				onUpdate()
			}
		})
	}, [data])

	const deleteScan = useCallback(() => {
		if (confirm('Voulez-vous vraiment supprimer ce scan ? (Cela ne supprimera pas l\'historique de vos rapports)')) {
			api.authenticated(session).scans.deleteScan(data.id).then((res) => {
				onDelete()
			})
		}
	}, [data])

	return (
		<div className="flex justify-center w-full gap-4">
			<Button type="primary" onClick={updateScan} disabled={disabled}>Modifier</Button>
			<Button type="danger" onClick={deleteScan}>Supprimer</Button>
		</div>
	)
}

const EditScanPage = () => {
	const { session } = useAuth()
	const location = useLocation()
	const navigate = useNavigate()

	const [scan, setScan] = useState<ScanWithProbes>(null)
	const [scanSettings, setScanSettings] = useState<ScanSettings>({} as ScanSettings)
	const [availableProbes, setAvailableProbes] = useState<Probe[]>([])

	const scanId = useMemo(() => location.pathname?.split('/').at(-1), [])

	const fetchScan = useCallback(() => {
		api.authenticated(session).scans.getScanWithProbes(scanId, true).then((res) => {
			if (res.data) {
				setScan(res.data as ScanWithProbes)
				setScanSettings(res.data as ScanSettings)
			}
		})
	}, [scanId])

	useEffect(() => fetchScan(), [scanId])

	useEffect(() => {
		api.authenticated(session).probes.getAvailableProbes().then(async (res) => {
			if (res.status === StatusCodes.OK) {
				setAvailableProbes(await res.json())
			}
		})
	}, [])

	const updateScanSettings = useCallback((newSettings: ScanSettings) => {
		setScanSettings({
			...scanSettings,
			target: newSettings.target,
			probes: newSettings.probes,
			periodicity: newSettings.periodicity
		})
	}, [scanSettings])

	const isChanged = useMemo(() => {
		for (const key of Object.keys(scanSettings)) {
			if (!isEqual(scanSettings[key], scan[key])) {
				return true
			}
		}
		return false
	}, [scanSettings, scan])

	return scan ? (
		<Page
			pageTitle="Modifier un scan"
			canGoPrevious
			footer={<Footer
				disabled={!isScanSettingValid(scanSettings) || !isChanged}
				data={{ id: scanId, settings: scanSettings }}
				onUpdate={() => {
					toast('Scan mis à jour !', {
						type: 'success',
					})
					fetchScan()
				}}
				onDelete={() => {
					toast('Scan supprimé !', {
						type: 'success'
					})
					navigate('/scans')
				}}
			/>}>
			<ScanEdit value={scanSettings} availableProbes={availableProbes} onChange={updateScanSettings} />
		</Page>
	) : null
}

export default EditScanPage