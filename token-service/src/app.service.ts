import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './schemas/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  private PARTITION_SIZE = 1_00_000;
  constructor(@InjectModel(Token.name) private tokenStore: Model<Token>) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getToken() {
    // const token = await this.tokenStore.findOne({});
    const token = await this.tokenStore
      .findOneAndDelete({})
      .sort({ createdAt: -1 });

    let start = 0,
      end = this.PARTITION_SIZE;

    if (token && token.expired) {
      start = token.start + this.PARTITION_SIZE;
      end = token.end + this.PARTITION_SIZE;
    }

    await this.tokenStore.create({
      start: start,
      end: end,
      expired: true,
    });

    return { start, end };
  }
}
