import { Component, OnInit } from '@angular/core';
import { NestService } from '../../services/nest/nest.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

    public favourites: string[];

    constructor(
        private _nestService: NestService
    ) {
    }

    ngOnInit() {
        this._nestService.getSonosRoomFavourites().subscribe( favourites => {
            this.favourites = favourites;
        });
    }
}
