import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/shorturl'),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
