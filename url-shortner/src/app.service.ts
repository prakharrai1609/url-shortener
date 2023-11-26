import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import axios from 'axios';
import RedisService from './common/redis/redis.service';
import { tokenKey } from './shortner/utils/shortner.mapper';

@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor(private redisService: RedisService) {}

	getHello(): string {
		return 'Hello World!';
	}

	async onApplicationBootstrap() {
		const tokens = await axios.get('http://localhost:4000/token');
		const { start, end } = tokens.data;
		this.redisService.set(tokenKey('START'), start);
		this.redisService.set(tokenKey('END'), end);
	}
}
