import ProbeDummyResult from "./ProbeDummyResult/ProbeDummyResult"
import ProbeNmapResult from "./ProbeNmapResult/ProbeNmapResult"

const mapping = {
    'probe-nmap': ProbeNmapResult,
    'probe-dummy': ProbeDummyResult
}

export const getProbeResultComponent = (probeName: string) => {
    return mapping[probeName]
}