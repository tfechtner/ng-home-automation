import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestConfigService } from '../services/nest-config.service';

@Injectable()
export class TelegramService {
    constructor(
        private _httpService: HttpService,
        private _nestConfigService: NestConfigService
    ) {
        console.log('TelegramService.constructor');
    }

    private config = {
        api: this._nestConfigService.telegramApi,
        token: this._nestConfigService.telegramToken,
        chatId: this._nestConfigService.telegramChatId
    };

    private requestUrl = this.config.api + this.config.token + '/';

    public sendMessage(message: string): Observable<any> {
        const config: AxiosRequestConfig = { params: { chat_id: this.config.chatId, text: message } };

        return this._httpService.get(this.requestUrl + 'sendMessage', config).pipe(
            map(axiosResponse => {
                console.log('TelegramService.sendMessage response', axiosResponse.data);
            })
        );
    }
}
