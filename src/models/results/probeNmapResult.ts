export type ProbeNmapResult = NmapService[]

export interface NmapService {
  protocol: string;
  port: number;
  name: string;
  product: string;
  version: string;
  extrainfo?: any;
  cves: Cve[];
}

interface Cve {
  id: string;
  sourceIdentifier: string;
  published: string;
  vulnStatus: string;
  descriptions: string;
  metrics: Metrics;
}

interface Metrics {
  cvssMetricV30?: CvssMetricV30[];
  cvssMetricV2: CvssMetricV2[];
  cvssMetricV31?: CvssMetricV30[];
}

interface CvssMetricV2 {
  source: string;
  type: string;
  cvssData: CvssData2;
  baseSeverity: string;
  exploitabilityScore: number;
  impactScore: number;
  acInsufInfo: boolean;
  obtainAllPrivilege: boolean;
  obtainUserPrivilege: boolean;
  obtainOtherPrivilege: boolean;
  userInteractionRequired: boolean;
}

interface CvssData2 {
  version: string;
  vectorString: string;
  accessVector: string;
  accessComplexity: string;
  authentication: string;
  confidentialityImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
  baseScore: number;
}

interface CvssMetricV30 {
  source: string;
  type: string;
  cvssData: CvssData;
  exploitabilityScore: number;
  impactScore: number;
}

interface CvssData {
  version: string;
  vectorString: string;
  attackVector: string;
  attackComplexity: string;
  privilegesRequired: string;
  userInteraction: string;
  scope: string;
  confidentialityImpact: string;
  integrityImpact: string;
  availabilityImpact: string;
  baseScore: number;
  baseSeverity: string;
}