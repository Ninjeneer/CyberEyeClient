import constants from "../constants";

export const isProd = (): boolean => constants.nodeEnv === 'production'

export const isDefined = (o): boolean => o !== undefined && o !== null