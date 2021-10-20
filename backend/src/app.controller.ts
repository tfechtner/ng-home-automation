import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

    constructor(
        private readonly appService: AppService
    ) {}

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
}
