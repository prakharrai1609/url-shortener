import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

export default () => ({
	mongo: {
		uri: process.env.DB_URI,
		name: process.env.DB_NAME,
	},
	redis: {
		url: process.env.REDIS_URI,
		nodes: process.env.REDIS_NODES?.split(',') || [],
	},
	port: process.env.PORT,
});
