import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';

@Controller()
export class AppController {

    constructor(
        private appService: AppService,
        private _logger: Logger,
        private _telegramService: TelegramService
    ) {
        this._logger = new Logger('AppController');
    }

    @Get('state')
    getState(): object {
        return {
            data: 'ok xx'
        };
    }

    @Get('hello')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('bot')
    getBot(): string {
        console.log('getBotGot');
        return 'getBotGot';
    }

    @Post('bot')
    async postBot(@Body() body) {
        console.log('postBot' + JSON.stringify(body));
        this._telegramService._bot.processUpdate(body);
        return 'postBot';
    }
}
