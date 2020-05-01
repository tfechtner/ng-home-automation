import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NestConfigService {
    constructor(
        private _configService: ConfigService
    ) { }

    get host(): string {
        return this._configService.get('HOST');
    }

    get port(): number {
        return this._configService.get('PORT');
    }

    get mysqlHost(): string {
        return this._configService.get('MYSQL_HOST');
    }

    get mysqlPort(): number {
        return this._configService.get('MYSQL_PORT');
    }

    get mysqlUsername(): string {
        return this._configService.get('MYSQL_USERNAME');
    }

    get mysqlPassword(): string {
        return this._configService.get('MYSQL_PASSWORD');
    }

    get mysqlDatabase(): string {
        return this._configService.get('MYSQL_DATABASE');
    }

    get telegramApi(): string {
        return this._configService.get('TELEGRAM_API');
    }

    get telegramToken(): string {
        return this._configService.get('TELEGRAM_TOKEN');
    }

    get telegramChatId(): number {
        return this._configService.get('TELEGRAM_CHAT_ID');
    }
}
