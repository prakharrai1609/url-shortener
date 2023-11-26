import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortnerUtils {
  generateBase62ShortCode(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 7;

    let shortCode = '';
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortCode += characters.charAt(randomIndex);
    }

    return shortCode;
  }
}
