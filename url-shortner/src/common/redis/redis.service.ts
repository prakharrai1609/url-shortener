import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';

@Injectable()
export default class RedisService {
	private client: Redis.Cluster | Redis.default;
	private isClientConnected = false;
	enableCache = true;
	ENABLE_DISABLE_KEY = 'CACHE_ENABLE_DISABLE_KEY';
	ENABLE_DISABLE_CHANNEL = 'CACHE_ENABLE_DISABLE_CHANNEL';
	ENABLE_MESSAGE = 'CACHE_ENABLE_MESSAGE';
	DISABLE_MESSAGE = 'CACHE_DISABLE_MESSAGE';

	constructor(private configService: ConfigService) {
		this.connect();
	}

	private async connect() {
		const redisConfig = this.configService.get('redis');
		const retryStrategy = (times) => {
			if (times > 5) {
				console.debug('maximum retry exceeded');
				return null;
			} else {
				console.debug('retrying... ' + times);
				return times;
			}
		};
		if (redisConfig?.url) {
			this.client = new Redis.default(redisConfig.url, {
				retryStrategy: retryStrategy,
			});
		} else if (redisConfig?.nodes) {
			this.client = new Redis.Cluster(redisConfig.nodes, {
				clusterRetryStrategy: retryStrategy,
			});
		} else return;
		this.client.on('error', (err) => {
			console.error('Redis Client Error: ', { err });
			this.isClientConnected = false;
		});
		this.client.on('ready', async () => {
			this.isClientConnected = true;
			console.debug('Redis Client Connected Successfully');
			if (this.client.isCluster) {
				console.debug('Redis Cluster mode is enabled');
			}
			try {
				//check whether cache is disabled
				const message = await this.client.get(this.ENABLE_DISABLE_KEY);
				if (message == this.DISABLE_MESSAGE) {
					this.enableCache = false;
					console.debug('Cache is Disabled');
				} else if (this.enableCache) {
					console.debug('Cache is Enabled');
				}
			} catch (error) {
				console.error(error.message || error);
			}
		});
	}

	async get(key: string) {
		console.log(`checking key in redis: ${key}`);
		const res = await this.client.get(key);
		if (!res) {
			console.log(`key ${key} not found`);
		}
		console.log(`${key} found in redis.`);

		return res;
	}

	async set(key: string, value: any) {
		console.log(`setting key in redis : ${key}`);
		const res = await this.client.set(key, value);
		return res;
	}
}
