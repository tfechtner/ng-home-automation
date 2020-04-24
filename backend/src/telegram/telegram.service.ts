import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TelegramService {
    constructor(
        private httpService: HttpService
    ) {}

    private config = {
        api: 'https://api.telegram.org/bot',
        token: '1078670399:AAFzLPPd9kL3yDTH0tCS29S78jYdc_ggPNs',
        chatId: '866503527'
    };

    private requestUrl = this.config.api + this.config.token + '/';

    public sendMessage(message: string): Observable<any> {
        const config: AxiosRequestConfig = { params: { chat_id: this.config.chatId, text: message } };

        return this.httpService.get(this.requestUrl + 'sendMessage', config).pipe(
            map(axiosResponse => {
                console.log(axiosResponse.data);
            })
        );
    }
}
