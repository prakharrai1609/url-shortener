const REDIS_PREFIX = 'SHORTNER_';
const TOKEN_PREFIX = 'TOKEN_';
const USED_PREFIX = 'USED_TOKEN_';

export const createRedisKey = (key) => {
	return REDIS_PREFIX + key;
};

export const tokenKey = (key) => {
	return REDIS_PREFIX + TOKEN_PREFIX + key;
};

export const usedToken = (key) => {
	return REDIS_PREFIX + USED_PREFIX + key;
};
