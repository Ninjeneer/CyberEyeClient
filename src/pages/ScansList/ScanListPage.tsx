import { useEffect, useMemo, useState } from "react"
import Page from "../../components/Page/Page"
import { Scan } from "../../models/Scan"
import api from "../../api/api"
import { useAuth } from "../../contexts/Auth"
import Table from "../../components/Table/Table"

const ScanListPage = () => {
    const [scans, setScans] = useState<Scan[]>([])
    const session = useAuth()

    useEffect(() => {
        api.authenticated(session).scans.getScans().then((res) => {
            if (res.data) {
                setScans(res.data as Scan[])
            }
        })
    }, [])

    const tableHeaders = useMemo(() => [
        { Header: 'Cible', accessor: 'target' },
        { Header: 'Dernier scan', accessor: 'lastRun'},
        { Header: 'Nombre de sondes', accessor: 'nbProbes'},
    ], [])

    return (
        <Page pageTitle="Mes scans" additionalStyle="p-0 md:p-0">
            <Table columns={tableHeaders} data={scans} style={{ headerStyle: 'bg-primary text-white' }}/>
        </Page>
    )
}

export default ScanListPage