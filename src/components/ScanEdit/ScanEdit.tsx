import { useState, useMemo, useEffect, useCallback } from "react"
import { Probe } from "../../models/Probe"
import Periodicity from "../Periodicity/Periodicity"
import ProbeInfo from "../ProbeInfo/ProbeInfo"
import Section from "../Section/Section"
import { ScanSettings } from "../../models/Scan"
import { useAuth } from "../../contexts/Auth"
import { pluralWord } from "../../utils/utils"
import { getAllCreditsUsedByProbesForMonth } from "../../utils/probe.utils"
import { availablePeriodicities } from "../../utils/cronUtils"

type Props = {
    onChange: (scanSettings: ScanSettings) => void
    availableProbes: Probe[]
    value?: ScanSettings
}
const ScanEdit = ({ onChange, availableProbes = [], value }: Props) => {
    const { credits } = useAuth()

    const [target, setTarget] = useState(value?.target || '')
    const [selectedProbes, setSelectedProbes] = useState<Probe[]>(value?.probes || [])
    const [periodicity, setPeriodicity] = useState(value?.periodicity || '')

    const [creditCostEstimation, setCreditCostEstimation] = useState<Record<string, { active: boolean, reason?: string }>>({})

    const nbProbesRemaning = useMemo<number>(() => {
        const userCredits = credits.remainingCredits
        return userCredits - getAllCreditsUsedByProbesForMonth(selectedProbes, periodicity)
    }, [credits, selectedProbes, value, periodicity])

    const onProbeChange = useCallback((probe: Probe) => {
        if (selectedProbes.find((selectedProbe) => selectedProbe.name === probe.name)) {
            // Remove the probe
            setSelectedProbes(selectedProbes.filter((selectedProbe) => selectedProbe.name !== probe.name))
        } else {
            // Add the probe
            if (nbProbesRemaning > 0) {
                setSelectedProbes([...selectedProbes, probe as Probe])
            }
        }
    }, [selectedProbes, nbProbesRemaning])

    // If no probe is selected, remove periodicity value
    useEffect(() => {
        if (selectedProbes.length === 0) {
            setPeriodicity(null)
        }
    }, [selectedProbes])

    useEffect(() => {
        const res: Record<string, { active: boolean, reason?: string }> = {}
        for (const periodicity of availablePeriodicities) {
            const cost = getAllCreditsUsedByProbesForMonth(selectedProbes, periodicity.cron)
            if (cost > credits.remainingCredits) {
                // User doesn't have enough credits to run the probe on that given periodicity
                res[periodicity.cron] = { active: false, reason: 'Pas assez de crédits' }
            } else {
                res[periodicity.cron] = { active: true }
            }
        }
        setCreditCostEstimation(res)
    }, [selectedProbes, credits.remainingCredits, periodicity])

    useEffect(() => {
        onChange({ target, periodicity, probes: selectedProbes })
    }, [target, selectedProbes, periodicity])

    return (
        <div>
            <div className="flex justify-end">
                <p className="text-sm">{nbProbesRemaning} {pluralWord('crédit', 's', nbProbesRemaning)} restant pour le mois courant</p>
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
                                disabled={!isProbeSelected && (nbProbesRemaning < probe.price)}
                            />
                        )
                    })}

                </div>
            </Section>

            <Section name="Périodicité">
                <Periodicity
                    onChange={setPeriodicity}
                    value={periodicity}
                    massDisable={
                        selectedProbes.length === 0 ? (
                            availablePeriodicities.reduce((res, perio) => {
                                res[perio.cron] = { active: false, reason: 'Vous devez sélectionner au moins une sonde' }
                                return res
                            }, {})
                        ) : (
                            creditCostEstimation
                        )
                    }
                />
            </Section>
        </div>
    )
}

export default ScanEdit