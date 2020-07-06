import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface IMySqlConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export interface IFibaroConfig {
    api: string;
    username: string;
    password: string;
}

export interface ITelegramConfig {
    api: string;
    token: string;
    chatId: number;
}

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

    get mysql(): IMySqlConfig {
        return {
            host: this._configService.get('MYSQL_HOST'),
            port: this._configService.get('MYSQL_PORT'),
            username: this._configService.get('MYSQL_USERNAME'),
            password: this._configService.get('MYSQL_PASSWORD'),
            database: this._configService.get('MYSQL_DATABASE')
        };
    }

    get sonosApi(): string {
        return this._configService.get('SONOS_API');
    }

    get fibaro(): IFibaroConfig {
        return {
            api: this._configService.get('FIBARO_API'),
            username: this._configService.get('FIBARO_USERNAME'),
            password: this._configService.get('FIBARO_PASSWORD')
        };
    }

    get telegram(): ITelegramConfig {
        return {
            api: this._configService.get('TELEGRAM_API'),
            token: this._configService.get('TELEGRAM_TOKEN'),
            chatId: this._configService.get('TELEGRAM_CHAT_ID')
        };
    }
}
