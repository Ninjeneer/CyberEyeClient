import cronParser from 'cron-parser'
import { addMonths, isAfter } from 'date-fns'
import { Probe } from '../models/Probe'

export const probeNameMapping = {
    'probe-nmap': 'Scanner de vulnérabilités des services ouverts',
    'probe-nikto': 'Scanner de domaines sensibles exposés',
    'probe-dummy': 'Dummy probe for dev',
}

export const calculateCreditUsageForPeriod = (periodicity: string, renewalDate: Date, nbCreditsForProbe): number => {
    if (!periodicity) {
        return 0
    }

    if (periodicity === 'ONCE') {
        return nbCreditsForProbe
    }

    // Protection against infinite loop
    let iteration = 0

    const occurrences = []
    const interval = cronParser.parseExpression(periodicity)
    while (interval.hasNext() && iteration < 100) {
        const occurrence = interval.next()
        if (isAfter(occurrence.toDate(), renewalDate)) {
            break;
        }
        occurrences.push(occurrence)
        iteration++
    }
    return occurrences.length * nbCreditsForProbe
}

export const getAllCreditsUsedByProbesForMonth = (probes: Probe[], periodicity: string): number => {
    return probes?.reduce((sum, probe) => sum + calculateCreditUsageForPeriod(periodicity, addMonths(new Date(), 1), probe.price), 0) || 0
}   