import { intervalToDuration } from "date-fns"

export const secondsToTimeString = (nbSeconds: number) => {
    let res = ""
    const duration = intervalToDuration({ start: 0, end: nbSeconds })
    if (duration.hours) {
        res += `${duration.hours}h `
    }
    if (duration.minutes) {
        res += `${duration.minutes}min `
    }
    if (duration.seconds) {
        res += `${duration.seconds}s`
    }
    return res
}