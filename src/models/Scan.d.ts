import { Probe } from "./Probe"

export type ScanSettings = {
    target: string
    probes: Probe[]
    periodicity: string
}