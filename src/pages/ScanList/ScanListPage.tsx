import { useEffect, useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import Section from "../../components/Section/Section"
import api from "../../api/api"
import { Scan, ScanStatus } from "../../models/Scan"
import { format } from 'date-fns'
import { BsChevronRight } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import cx from 'classnames'
import { Link, useNavigate } from "react-router-dom"
import { sortByDate } from "../../utils/scan.utils"
import style from './Style.module.css'
import { useAuth } from "../../contexts/Auth"
import { BiLinkExternal } from 'react-icons/bi'
import cronParser from 'cron-parser'
import PulseLoader from 'react-spinners/PulseLoader'


type ScanEntryProps = {
	scan: Scan
}
const ScanEntry = ({ scan }: ScanEntryProps) => {
	const navigate = useNavigate()
	const session = useAuth()

	const goToReport = () => {
		if (scan.notification) {
			api.authenticated(session).scans.liteUpdateScan(scan.id, { notification: false }).then()
		}
		navigate(`/scans/${scan.id}`)
	}

	const nextScan = useMemo(() => {
		if (scan.periodicity === 'ONCE') {
			return 'Jamais'
		}
		const interval = cronParser.parseExpression(scan.periodicity)
		const nextDate = interval.next().toDate()
		return format(nextDate, 'dd / MM / yyyy')
	}, [scan])

	return (
		<div
			className={
				cx(
					"border rounded mb-2 p-2 flex flex-col lg:flex-row justify-between items-center",
					scan.status === ScanStatus.FINISHED && "hover:cursor-pointer hover:bg-bgLight",
					scan.status === ScanStatus.FINISHED && scan.notification && style.flash
				)
			}
			onClick={scan.status === ScanStatus.FINISHED ? goToReport : null}
		>
			<h2 className="flex-1 flex flex-col">
				<label className="styled-label">Cible</label>
				{scan.target}
			</h2>

			<div className="flex-1 flex flex-col">
				<label className="styled-label">Prochain lancement</label>
				{nextScan}
			</div>

			<div className="flex flex-1 justify-end">
				{
					scan.status === ScanStatus.FINISHED ? (
						<span className="flex items-center gap-6">
							<Link to={`/reports/${scan.lastReportId}`} className="link" onClick={(e) => e.stopPropagation()}>
								Voir le dernier rapport <BiLinkExternal className="inline" />
							</Link>
							<BsChevronRight />
						</span>
					) : scan.status === ScanStatus.PENDING ? (
						<GiSandsOfTime />
					) : (
						<PulseLoader color="#0094FF" speedMultiplier={0.5} size={10} className="mr-2"/>
					)
				}
			</div>
		</div>
	)
}


const ScanListPage = () => {
	const [scans, setScans] = useState<Record<string, Scan>>({})
	const session = useAuth()

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
		return [pending.sort(sortByDate), running.sort(sortByDate), finished.sort(sortByDate)]
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
		api.authenticated(session).scans.getScans().then((res) => {
			const resScans = res.data as Scan[]
			if (resScans) {
				setScans(resScans.reduce((res, scan) => {
					res[scan.id] = scan
					return res
				}, {}))
			}
		})
	}, [])

	api.authenticated(session).scans.listenForScans((change) => {
		if (change.eventType === 'INSERT' || change.eventType === 'UPDATE') {
			handleUpsertScan(change.new)

		} else if (change.eventType === 'DELETE') {
			handleDelete(change.old.id)
		}
	})

	return (
		<Page pageTitle="Mes scans">
			<Section name={`En cours (${runningScans.length})`}>
				{(runningScans || []).map((scan) => <ScanEntry scan={scan} key={`running_${scan.id}`} />)}
			</Section>

			<Section name={`En attente (${pendingScans.length})`}>
				{(pendingScans || []).map((scan) => <ScanEntry scan={scan} key={`pending_${scan.id}`} />)}
			</Section>

			<Section name={`Terminés (${finishedScans.length})`}>
				{(finishedScans || []).map((scan) => <ScanEntry scan={scan} key={`finished_${scan.id}`} />)}
			</Section>
		</Page>
	)
}

export default ScanListPage