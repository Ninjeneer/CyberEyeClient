import { useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import Section from "../../components/Section/Section"
import { useLocation, useParams } from "react-router-dom"
import api from "../../api/api"
import { StatusCodes } from "http-status-codes"
import { Report } from "../../models/report"
import { Scan } from "../../models/Scan"
import { format, intervalToDuration } from "date-fns"
import { secondsToTimeString } from "../../utils/timeUtils"

type SummaryEntryProps = {
    name: string
    value: any
}
const SummaryEntry = ({ name, value }: SummaryEntryProps) => {
    return (
        <div className="flex flex-row lg:flex-col gap-2">
            <label className="uppercase">{name}</label>
            <p className="text-lg text-primary">{value}</p>
        </div>
    )
}

const ScanResult = () => {
    const [report, setReport] = useState<Report>(null)
    const { state: scan } = useLocation() as { state: Scan }

    useMemo(() => {
        if (!scan) {
            return
        }
        api.reports.getReportById(scan.reportId).then(async (res) => {
            if (res.status === StatusCodes.OK) {
                setReport(await res.json())
            }
        })
    }, [scan])

    return scan && report ? (
        <Page pageTitle="Rapport de scan">
            <Section name="Résumé">
                <div className="flex flex-col lg:flex-row justify-around">
                    <SummaryEntry name="Nombre de sondes" value={report?.nbProbes} />
                    <SummaryEntry name="Durée" value={secondsToTimeString(report.totalTime * 1000)} />
                    <SummaryEntry name="Demandé le" value={format(new Date(scan?.createdAt), 'dd / MM / yyy - hh:mm:ss')} />
                </div>
            </Section>

            <Section name="Résultats">
                <p>lol</p>
            </Section>
        </Page>
    ) : null
}

export default ScanResult