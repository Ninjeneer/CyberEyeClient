import { Probe } from "./Probe"

export type ScanSettings = {
	target: string
	probes: Probe[]
	periodicity: string
	notification?: boolean
}

export type Scan = {
	target: string;
	createdAt: string;
	id: string;
	status: ScanStatus;
	notification: boolean;
	lastReportId?: string;
	periodicity: string
}

export enum ScanStatus {
	PENDING = 'PENDING',
	RUNNING = 'RUNNING',
	FINISHED = 'FINISHED',
}

export type ScanWithProbes = Scan & {
    probes: Probe[];
}