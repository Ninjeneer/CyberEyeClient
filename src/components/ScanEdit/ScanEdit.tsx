import { useState, useMemo, useEffect, useCallback } from "react"
import { Probe } from "../../models/Probe"
import Periodicity from "../Periodicity/Periodicity"
import ProbeInfo from "../ProbeInfo/ProbeInfo"
import Section from "../Section/Section"
import { ScanSettings } from "../../models/Scan"
import { useAuth } from "../../contexts/Auth"
import { pluralWord } from "../../utils/utils"

type Props = {
    onChange: (scanSettings: ScanSettings) => void
    availableProbes: Probe[]
    value?: ScanSettings
}
const ScanEdit = ({ onChange, availableProbes = [], value }: Props) => {
    const { credits } = useAuth()

    const [target, setTarget] = useState(value?.target || '')
    const [selectedProbes, setSelectedProbes] = useState<Partial<Probe>[]>(value?.probes || [])
    const [periodicity, setPeriodicity] = useState(value?.periodicity || '')

    const nbProbesRemaning = useMemo<number>(() => {
        const userCredits = credits.remaningCredits
        return userCredits - selectedProbes.length
    }, [credits, selectedProbes, value])

    const onProbeChange = useCallback((probe: Probe) => {
        if (selectedProbes.find((selectedProbe) => selectedProbe.name === probe.name)) {
            // Remove the probe
            setSelectedProbes(selectedProbes.filter((selectedProbe) => selectedProbe.name !== probe.name))
        } else {
            // Add the probe
            if (nbProbesRemaning > 0) {
                setSelectedProbes([...selectedProbes, { name: probe.name }])
            }
        }
    }, [selectedProbes, nbProbesRemaning])

    useEffect(() => {
        onChange({ target, periodicity, probes: selectedProbes })
    }, [target, selectedProbes, periodicity])

    return (
        <div>
            <div className="flex justify-end">
                <p className="text-sm">Encore {nbProbesRemaning} {pluralWord('sonde', 's', nbProbesRemaning)} {pluralWord('disponible', 's', nbProbesRemaning)} pour le mois courant</p>
            </div>
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

            <Section name={`Sondes disponibles (${availableProbes.length})`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                    {availableProbes.map((probe) => {
                        const isProbeSelected = selectedProbes.map((p) => p.name).includes(probe.name)
                        return (
                            <ProbeInfo
                                probe={probe}
                                key={probe.name}
                                selectable={true}
                                onChange={onProbeChange}
                                isSelected={isProbeSelected}
                                disabled={!isProbeSelected && nbProbesRemaning <= 0}
                            />
                        )
                    })}

                </div>
            </Section>

            <Section name="Périodicité">
                <Periodicity onChange={setPeriodicity} value={periodicity} />
            </Section>
        </div>
    )
}

export default ScanEdit