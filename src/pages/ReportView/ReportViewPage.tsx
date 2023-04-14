import { useEffect, useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import Section from "../../components/Section/Section"
import { useLocation, useParams } from "react-router-dom"
import api from "../../api/api"
import { StatusCodes } from "http-status-codes"
import { Report } from "../../models/report"
import { Scan } from "../../models/Scan"
import { format, intervalToDuration } from "date-fns"
import { secondsToTimeString } from "../../utils/timeUtils"
import { getProbeResultComponent } from "../../components/ProbeResults/probeSelector"
import React from "react"
import { useAuth } from "../../contexts/Auth"

type SummaryEntryProps = {
    name: string
    value: any
}
const SummaryEntry = ({ name, value }: SummaryEntryProps) => {
    return (
        <div className="flex flex-col lg:gap-2">
            <label className="uppercase">{name}</label>
            <p className="text-lg text-primary">{value}</p>
        </div>
    )
}

const ReportViewPage = () => {
    const [report, setReport] = useState<Report>(null)
    const session = useAuth()
    const location = useLocation()

    const reportId = useMemo(() => location.pathname?.split('/').at(-1), [])

    // useEffect(() => {
    //     if (scan.notification) {
    //         api.authenticated(session).scans.updateScan(scan.id, { notification: false }).then()
    //     }
    // }, [scan])

    useMemo(() => {
        // Pull the Supabase Report to get the MongoDB reportId
        api.authenticated(session).reports.getReportById(reportId).then(async (res) => {
            if (res.data) {
                api.authenticated(session).reports.getReportResultsById(res.data.reportId).then(async (resultRes) => {
                    if (res.status === StatusCodes.OK) {
                        setReport(await resultRes.json())
                    }
                })
            }
        })
    }, [])

    return report ? (
        <Page pageTitle="Rapport de scan" canGoPrevious>
            <Section name="Résumé">
                <div className="flex flex-col lg:flex-row justify-around gap-4 lg:gap-0">
                    <SummaryEntry name="Nombre de sondes" value={report?.nbProbes} />
                    <SummaryEntry name="Durée" value={secondsToTimeString(report.totalTime * 1000)} />
                    <SummaryEntry name="Demandé le" value={format(new Date(), 'dd / MM / yyy - hh:mm')} />
                </div>
            </Section>

            <Section name="Résultats">
                <div className="flex flex-col gap-2">
                    {report.results.map((result) => {
                        const element = getProbeResultComponent(result.context.probeName)
                        return React.createElement(element, {
                            result,
                            key: result.context.probeUid
                        })
                    })}
                </div>
            </Section>
        </Page>
    ) : null
}

export default ReportViewPage