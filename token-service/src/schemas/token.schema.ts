import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Token {
  @Prop({ type: Number })
  start: number;

  @Prop({ type: Number })
  end: number;

  @Prop({ type: Boolean })
  expired: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
