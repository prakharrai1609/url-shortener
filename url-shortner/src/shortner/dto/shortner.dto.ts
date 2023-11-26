import { IsUrl, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateShortUrlDto {
	@IsUrl({}, { message: 'Invalid URL format' })
	originalUrl: string;

	@IsOptional()
	@IsString({ message: 'Custom short code must be a string' })
	customShortCode?: string;

	@IsNumber()
	@IsOptional()
	hitCount?: number;
}
