import { Probe } from "./Probe"

export type ScanSettings = {
	target: string
	probes: Probe[]
	periodicity: string
}

export type Scan = {
	target: string;
	createdAt: string;
	id: string;
	status: ScanStatus;
	notification: boolean;
	reportId?: string;
}

export enum ScanStatus {
	PENDING = 'PENDING',
	RUNNING = 'RUNNING',
	FINISHED = 'FINISHED',
}