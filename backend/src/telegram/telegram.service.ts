import { HttpService, Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
            catchError((axiosError: AxiosError) => {
                console.log('[ TelegramService ] Error:', axiosError.response.data.error_code + ' - ' + axiosError.response.data?.description);
                return [];
            }),
            map((axiosResponse: AxiosResponse) => {
                console.log('[ TelegramService ] Message', !!axiosResponse.data['ok'] ? 'sent successfully' : 'failed');
            })
        );
    }
}
