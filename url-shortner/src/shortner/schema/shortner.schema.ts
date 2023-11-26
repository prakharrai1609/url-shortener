import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, _id: true })
export default class ShortUrl {
	@Prop({
		type: String,
	})
	originalUrl: string;

	@Prop({
		type: String,
	})
	customShortCode?: string;

	@Prop({
		type: Number,
	})
	hitCount?: number;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
