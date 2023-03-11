import { useLocation, useNavigate } from "react-router-dom"
import Page from "../../components/Page/Page"
import Button from "../../components/Button/Button"
import ProbeInfo from "../../components/ProbeInfo/ProbeInfo"
import Section from "../../components/Section/Section"
import { ScanSettings } from "../../models/Scan"
import { getPeriodicityLabelByValue } from "../../utils/cronUtils"
import { useState } from "react"
import api from "../../api/api"

type FooterProps = {
    data: ScanSettings
    disabled: boolean
}
const Footer = ({ data, disabled }: FooterProps) => {
    const navigate = useNavigate()
    const confirm = () => {
        api.scans.sendScanRequest(data).then((response) => {
            navigate('/scans', { state: { id: response.id } })
        })
    }

    return (
        <div className="flex justify-center w-full">
            <Button text="Valider" type="primary" onClick={confirm} disabled={disabled} />
        </div>
    )
}

const ConfirmScanPage = () => {
    const [agree, setAgree] = useState(false)
    const { state: scanSettings } = useLocation() as { state: ScanSettings }

    return (
        <Page
            pageTitle="Confirmer le scan"
            footer={
                <Footer data={scanSettings} disabled={!agree} />
            }
        >
            <p><b>Cible du scan : </b>{scanSettings.target}</p>
            <p><b>Périodicité : </b>{getPeriodicityLabelByValue(scanSettings.periodicity)}</p>

            <Section name="Sondes séléctionnées">
                <div className="flex flex-col gap-2 lg:flex-row">
                    <ProbeInfo
                        probe={{
                            description: 'bla bla',
                            displayName: 'aaaaaa',
                            name: 'aaaaa',
                            type: 'bbbbb',
                        }}
                    />

                    <ProbeInfo
                        probe={{
                            description: 'bla bla',
                            displayName: 'bbbbb',
                            name: 'bbbbb',
                            type: 'bbbbb'
                        }}
                    />
                </div>
            </Section>

            <div className="w-full text-center">
                <label>
                    <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} className="mr-2" />
                    En cochant cette case, je confirme que je suis le propriétaire de la cible et/ou que je suis autorisé à effectuer des scans sur celle-ci.
                </label>
            </div>
        </Page>
    )
}

export default ConfirmScanPage