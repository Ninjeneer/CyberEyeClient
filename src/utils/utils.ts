import constants from "../constants";

export const isProd = (): boolean => constants.nodeEnv === 'production'