import { Scan } from "./Scan";

export type ProbeStatus = 'PENDING' | 'RUNNING' | 'FINISHED'

export type Probe = {
	name: string;
	description: string;
	type: string;
	price: number
}

export type SupabaseProbe = {
	id: string
	scanId: string
	status: ProbeStatus
	name: string
	settings?: Record<string, any>
}

export type ProbeWithScan = SupabaseProbe & {
	scans: Scan
}