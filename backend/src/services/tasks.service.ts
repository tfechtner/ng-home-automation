import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScraperService } from './scraper.service';

@Injectable()
export class TasksService {
    constructor(
        private _scraperService: ScraperService
    ) { }

    @Cron(CronExpression.EVERY_5_MINUTES)
    handleCron() {
    //     this._scraperService.taskAoSageCoffeeMachine();
    }
}
