import { HttpService, Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NestConfigService } from '../services/nest-config.service';

import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {

    constructor(
        private _httpService: HttpService,
        private _nestConfigService: NestConfigService,
        private _logger: Logger
    ) {
        this._logger = new Logger('TelegramService');
    }

    private config = {
        api: this._nestConfigService.telegram.api,
        token: this._nestConfigService.telegram.token,
        chatId: this._nestConfigService.telegram.chatId
    };

    public _bot: TelegramBot;

    private requestUrl = this.config.api + this.config.token + '/';

    public initWebhook() {

        const options = {
            webHook: {
                port: 8443,
                key: `certs/privkey.pem`, // Path to file with PEM private key
                cert: `certs/cert.pem`, // Path to file with PEM certificate
                ca: `certs/syno-ca-cert.pem`
            }
        };

        this._bot = new TelegramBot(this.config.token, options);

        // this._bot.setWebHook(`https://ickletom.synology.me:8443/bot`, {
        //     certificate: options.webHook.cert
        // });

        // this._bot.on('message', function onMessage(msg) {
        //     console.log('msg from svc');
        //     this._bot.sendMessage(msg.chat.id, 'I am alive!');
        // });

        this._bot.on('webhook_error', (error) => {
            console.log(error.code);
        });

        this._bot.sendMessage(this.config.chatId, 'Init*!');
        this._logger.log('Webhook initialised');

        this._bot.getWebHookInfo().then((msg) => {
            console.log(JSON.stringify(msg));
        });
    }

    public sendMessage(message: string): Observable<any> {
        const config: AxiosRequestConfig = { params: { chat_id: this.config.chatId, text: message } };

        return this._httpService.get(this.requestUrl + 'sendMessage', config).pipe(
            catchError((axiosError: AxiosError) => {
                this._logger.error('Error sending message ' + axiosError.response.data.error_code + ' - ' + axiosError.response.data?.description);
                return []; // TODO: This is wrong
            }),
            map((axiosResponse: AxiosResponse) => {
                this._logger.log('Message ' + !!axiosResponse.data['ok'] ? 'sent successfully' : 'failed');
            })
        );
    }
}
