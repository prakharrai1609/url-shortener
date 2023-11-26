import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Redirect,
} from '@nestjs/common';
import ShortnerService from './shortner.service';
import { CreateShortUrlDto } from './dto/shortner.dto';

@Controller('shortner')
export default class ShortnerController {
	constructor(private shortnerService: ShortnerService) {}

	@Post('create')
	async createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto) {
		try {
			const data = await this.shortnerService.createShortUrl(
				createShortUrlDto,
			);
			return {
				status: HttpStatus.OK,
				message: 'Short code created',
				shortCode: data,
			};
		} catch (e) {
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'Unable to create short url',
				error: e.message,
			};
		}
	}

	@Get(':shortCode')
	@Redirect()
	async redirect(@Param('shortCode') shortCode: string) {
		try {
			const originalUrl = await this.shortnerService.getOriginalUrl(
				shortCode,
			);
			return { url: originalUrl };
		} catch (e) {
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				message: `Redirection to short code "${shortCode}" failed`,
				error: e.message,
			};
		}
	}

	@Get(':shortCode/stats')
	async getStatistics(@Param('shortCode') shortCode: string) {
		try {
			return await this.shortnerService.getStatistics(shortCode);
		} catch (e) {
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				message: `Fetching stats for short code "${shortCode}" failed`,
				error: e.message,
			};
		}
	}
}
