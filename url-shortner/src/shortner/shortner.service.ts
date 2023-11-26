import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/shortner.dto';
import { ShortnerUtils } from './utils/shortner.utils';
import RedisService from '../common/redis/redis.service';
import { createRedisKey, tokenKey, usedToken } from './utils/shortner.mapper';
import { InjectModel } from '@nestjs/mongoose';
import ShortUrl from './schema/shortner.schema';
import { Model } from 'mongoose';
import * as crypto from 'crypto';

@Injectable()
export default class ShortenerService {
	constructor(
		@InjectModel(ShortUrl.name) private urlStore: Model<ShortUrl>,
		private shortnerUtils: ShortnerUtils,
		private redisService: RedisService,
	) {}

	hash(input: string): string {
		const md5sum = crypto.createHash('md5');
		md5sum.update(input);
		return md5sum.digest('hex');
	}

	async createShortUrl(
		createShortUrlDto: CreateShortUrlDto,
	): Promise<string> {
		try {
			const { originalUrl, customShortCode } = createShortUrlDto;

			const res = await this.urlStore.findOne({
				originalUrl: originalUrl,
			});

			if (customShortCode && res?.customShortCode === customShortCode) {
				throw new Error('Custom short code is already in use.');
			}

			// const shortCode = customShortCode || this.hash(originalUrl);
			let shortCode = '';

			const start = parseInt(
				await this.redisService.get('SHORTNER_TOKEN_START'),
			);
			const end = parseInt(
				await this.redisService.get('SHORTNER_TOKEN_END'),
			);

			for (let i = start; i < end; i++) {
				const hash = this.hash(i.toString()).substring(0, 7);
				const isUsed = await this.redisService.get(
					createRedisKey(hash),
				);

				if (!isUsed) {
					await this.redisService.set(usedToken(hash), '1');
					console.log(`Generated hash for ${i}: ${hash}`);
					shortCode = hash;
					break;
				}
			}

			await this.redisService.set(createRedisKey(shortCode), originalUrl);

			await this.urlStore.create({
				customShortCode: shortCode,
				originalUrl: originalUrl,
				hitCount: 0,
			});

			return shortCode;
		} catch (e) {
			throw e;
		}
	}

	async getOriginalUrl(shortCode: string): Promise<string> {
		try {
			let res = await this.redisService.get(createRedisKey(shortCode));
			let entry = await this.urlStore.findOne({
				customShortCode: shortCode,
			});

			if (!res) {
				entry = await this.urlStore.findOne({
					customShortCode: shortCode,
				});
				if (!entry) {
					throw new Error('Short URL not found.');
				}
				res = entry.originalUrl;
			}

			await this.urlStore.updateOne({
				customShortCode: shortCode,
				hitCount: entry.hitCount + 1,
			});

			return res;
		} catch (e) {
			throw e;
		}
	}

	async getStatistics(
		shortCode: string,
	): Promise<{ originalUrl: string; hitCount: number }> {
		const entry = await this.urlStore.findOne({
			customShortCode: shortCode,
		});

		if (!entry) {
			throw new Error('Short URL not found.');
		}

		return {
			originalUrl: entry.originalUrl,
			hitCount: entry.hitCount,
		};
	}
}
