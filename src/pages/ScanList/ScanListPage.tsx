import { useEffect, useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import Section from "../../components/Section/Section"
import api from "../../api/api"
import { Scan, ScanStatus } from "../../models/Scan"
import { format } from 'date-fns'
import { BsChevronRight } from "react-icons/bs";
import cx from 'classnames'

type ScanEntryProps = {
	scan: Scan
}
const ScanEntry = ({ scan }: ScanEntryProps) => {
	return (
		<div
			className={
				cx(
					"border-2 rounded mb-2 p-2 flex flex-col lg:flex-row justify-between items-center",
					scan.status === ScanStatus.FINISHED && "hover:cursor-pointer hover:bg-bgLight"
				)
			}
		>
			<h2 className="flex-1">{scan.target}</h2>
			<div className="flex-1">
				Créé le : {format(new Date(scan.createdAt), 'dd / MM / yyyy - HH:mm:ss')}
			</div>
			<div className="flex flex-1 justify-end">
				{
					scan.status === ScanStatus.FINISHED && <BsChevronRight />
				}
			</div>
		</div>
	)
}


const ScanListPage = () => {
	const [scans, setScans] = useState<Record<string, Scan>>({})

	const [pendingScans, runningScans, finishedScans] = useMemo(() => {
		const pending = []
		const running = []
		const finished = []
		for (const scan of Object.values(scans)) {
			if (scan.status === ScanStatus.FINISHED) {
				finished.push(scan)
			} else if (scan.status === ScanStatus.PENDING) {
				pending.push(scan)
			} else if (scan.status === ScanStatus.RUNNING) {
				running.push(scan)
			}
		}
		return [pending, running, finished]
	}, [scans])

	const handleUpsertScan = (scan: Scan) => {
		setScans({
			...scans,
			[scan.id]: scan
		})
	}

	const handleDelete = (id: string) => {
		setScans(Object.keys(scans).reduce((res, key) => {
			if (key !== id) {
				res[key] = scans[key]
			}
			return res
		}, {}))
	}

	useEffect(() => {
		api.scans.getScans().then((res) => {
			const scans = res.data as Scan[]
			if (scans) {
				setScans(scans.reduce((res, scan) => {
					res[scan.id] = scan
					return res
				}, {}))
			}
		})


		api.scans.listenForScans((change) => {
			if (change.eventType === 'INSERT' || change.eventType === 'UPDATE') {
				handleUpsertScan(change.new)
			} else if (change.eventType === 'DELETE') {
				handleDelete(change.old.id)
			}
		})
	}, [])

	return (
		<Page pageTitle="Mes scans">
			<Section name={`En cours (${runningScans.length})`}>
				{(runningScans || []).map((scan) => <ScanEntry scan={scan} key={scan.id} />)}
			</Section>

			<Section name={`En attente (${pendingScans.length})`}>
				{(pendingScans || []).map((scan) => <ScanEntry scan={scan} key={scan.id} />)}
			</Section>

			<Section name={`Terminés (${finishedScans.length})`}>
				{(finishedScans || []).map((scan) => <ScanEntry scan={scan} key={scan.id} />)}
			</Section>
		</Page>
	)
}

export default ScanListPage