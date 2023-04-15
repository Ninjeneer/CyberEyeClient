import { useEffect, useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import api from "../../api/api"
import { useAuth } from "../../contexts/Auth"
import Table from "../../components/Table/Table"
import { Report, SupabaseReport } from "../../models/report"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

const ReportListPage = () => {
    const [reports, setReports] = useState<SupabaseReport[]>([])
    const session = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        api.authenticated(session).reports.getReports().then((res) => {
            if (res.data) {
                setReports(res.data)
            }
        })
    }, [])

    const tableData = useMemo(() => {
        return reports.map((report) => ({
            ...report,
            createdAt: format(new Date(report.createdAt), 'dd / MM / yyyy - HH:mm'),
            onClick: () => navigate(`/reports/${report.id}`),
        }))
    }, [reports])

    const tableHeaders = useMemo(() => [
        { Header: 'Cible du scan', accessor: 'scans.target' },
        { Header: 'Date du rapport', accessor: 'createdAt'},
    ], [])

    return (
        <Page pageTitle="Mes rapports">
            <Table 
                columns={tableHeaders} 
                data={tableData} 
                style={{ headerStyle: 'bg-primary text-white' }}
            />
        </Page>
    )
}

export default ReportListPage