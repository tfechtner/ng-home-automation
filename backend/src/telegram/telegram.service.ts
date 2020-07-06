import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NestConfigService } from '../services/nest-config.service';

@Injectable()
export class TelegramService {
    constructor(
        private _httpService: HttpService,
        private _nestConfigService: NestConfigService
    ) { }

    private config = {
        api: this._nestConfigService.telegram.api,
        token: this._nestConfigService.telegram.token,
        chatId: this._nestConfigService.telegram.chatId
    };

    private requestUrl = this.config.api + this.config.token + '/';

    public sendMessage(message: string): Observable<any> {
        const config: AxiosRequestConfig = { params: { chat_id: this.config.chatId, text: message } };

        return this._httpService.get(this.requestUrl + 'sendMessage', config).pipe(
            take(1),
            map(axiosResponse => {
                console.log('[ TelegramService ] Message sent response ok: ', axiosResponse.data['ok']);
            })
        );
    }
}
