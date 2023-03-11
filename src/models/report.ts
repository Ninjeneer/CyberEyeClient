export type ProbeResult<T> = {
	context: {
		probeName: string;
		probeUid: string;
		target: string;
		timestampStart: number;
		timestampStop: number;
	},
	result: T;
}

export type Report = {
	nbProbes: number;
	target: string;
	totalTime: number;
	endedAt: number;
	results: ProbeResult<any>[];
}