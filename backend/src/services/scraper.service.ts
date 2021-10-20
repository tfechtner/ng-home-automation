import { HttpService, Injectable, Logger } from '@nestjs/common';
import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { TelegramService } from '../telegram/telegram.service';

const Axios = axios.default;

@Injectable()
export class ScraperService {

    constructor(
        private _httpService: HttpService,
        private _telegramService: TelegramService,
        private _logger: Logger
    ) {
        this._logger = new Logger('ScraperService');
    }

    private getImportIoExtractorData(url: string) {
        return this._httpService.get(url);

            // .toPromise()
            // .then((axiosResponse: AxiosResponse) => {
            //     if (axiosResponse && axiosResponse.data && axiosResponse.data.success === true) {
            //         return axiosResponse.data;
            //     } else {
            //         this._logger.log('No data in Axios response')
            //         return axiosResponse;
            //     }
            // }).catch((axiosError: AxiosError) => {
            //     this._logger.log('AxiosError: ', axiosError);
            // });
    }

    public taskAoSageCoffeeMachine() {
        const time = new Date();
        this._logger.log(time.getHours() + ':' + time.getMinutes() + ' Sage Coffee AO.com');

        const url = 'https://extraction.import.io/query/extractor/f4220d1e-2334-4654-bcec-0b05ee25df65?_apikey=aaf54bdb43c84159aa2f251e9ed64e823a7c099da69c806b92ce9fd5723a9125cffc21f713db8d190b703e11594f7b7e6f1af1568a91306ff5232117be2042c99d79225613d858baf69407e3f742b3c4&url=https%3A%2F%2Fao.com%2Fproduct%2Fses500btr-sage-the-bambino-plus-espresso-coffee-machine-black-74367-66.aspx';
        const textAvailability = 'Back in stock soon';
        const textPrice = '£399';

        this._httpService.get(url).pipe(
                catchError((error) => {
                    this._logger.log('Error: ' + error['message']);
                    return [];
                }),
                map((response: AxiosResponse) => {
                    return response.data;
                })
            ).subscribe(response => {
                if (response['extractorData']) {
                    const data = response['extractorData']['data'][0]['group'];

                    let column = data.find(item => {
                        return item.hasOwnProperty('availability');
                    })['availability'];

                    if (!!column[0]['text']) {
                        const text = column[0]['text'];
                        if (text !== textAvailability) {
                            const msg = 'Sage Bambino availability changed to: ' + text;
                            this._logger.log(msg);
                            // this._telegramService.sendMessage(msg).subscribe();
                        }
                    }

                    column = data.find(item => {
                        return item.hasOwnProperty('price');
                    })['price'];

                    if (!!column[0]['price']) {
                        const text = column[0]['price'];
                        if (text !== textPrice) {
                            const msg = 'Sage Bambino price changed to: ' + text;
                            this._logger.log(msg);
                            // this._telegramService.sendMessage(msg).subscribe();
                        }
                    }
                }
            });
    }
}
