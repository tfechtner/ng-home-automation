import { Body, Controller, Post } from '@nestjs/common';
import { TelegramMessageDto } from './dto/telegramMessage.dto';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
    constructor(
        private readonly _telegramService: TelegramService
    ) {}

    @Post('send-message')
    async save(@Body() message: TelegramMessageDto): Promise<any> {
        return this._telegramService.sendMessage(message.message);
    }
}
