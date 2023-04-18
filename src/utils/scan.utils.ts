import { Scan, ScanSettings } from "../models/Scan";

export const sortByDate = (a: Scan, b: Scan): number => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
}

export const isScanSettingValid = (scanSetting: ScanSettings): boolean => {
    return scanSetting && !!scanSetting.target && scanSetting.probes?.length > 0 && !!scanSetting.periodicity
}