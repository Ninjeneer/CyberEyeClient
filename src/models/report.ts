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