import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	const port = app.get<ConfigService>(ConfigService).get('PORT') || 8080;
	await app.listen(port);
}
bootstrap();
