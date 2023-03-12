import ProbeNmapResult from "./ProbeNmapResult/ProbeNmapResult"

const mapping = {
    'probe-nmap': ProbeNmapResult
}

export const getProbeResultComponent = (probeName: string) => {
    return mapping[probeName]
}