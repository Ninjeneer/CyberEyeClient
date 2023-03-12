import { Scan } from "../models/Scan";

export const sortByDate = (a: Scan, b: Scan): number => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
}