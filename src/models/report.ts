import { Scan } from "./Scan";

export type ProbeResult<T = any> = {
	context: {
		probeName: string;
		probeUid: string;
		target: string;
		timestampStart: number;
		timestampStop: number;
	},
	result: T;
}

export type Report<T = any> = {
	nbProbes: number;
	target: string;
	totalTime: number;
	endedAt: number;
	results: ProbeResult<T>[];
}

export type SupabaseReport = {
	id: string;
	reportId: string;
	scanId: string;
	userId: string;
	scans?: Scan
	createdAt: Date
}