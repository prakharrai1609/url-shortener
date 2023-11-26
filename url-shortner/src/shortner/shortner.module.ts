import { Module } from '@nestjs/common';
import ShortnerController from './shortner.controller';
import ShortenerService from './shortner.service';
import { ShortnerUtils } from './utils/shortner.utils';
import { MongooseModule } from '@nestjs/mongoose';
import ShortUrl, { ShortUrlSchema } from './schema/shortner.schema';
import { ConfigService } from '@nestjs/config';
import RedisService from '../common/redis/redis.service';
import { RedisModule } from '../common/redis/redis.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ShortUrl.name, schema: ShortUrlSchema },
		]),
		RedisModule,
	],
	providers: [ShortenerService, ShortnerUtils, ConfigService],
	controllers: [ShortnerController],
})
export class ShortnerModule {}
