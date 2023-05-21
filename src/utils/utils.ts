import constants from "../constants";

export const isProd = (): boolean => constants.nodeEnv === 'production'

export const isDefined = (o): boolean => o !== undefined && o !== null

export const pluralWord = (base: string, suffix: string, crtitera: number): string => {
    return `${base}${crtitera > 1 ? suffix : ''}`
}