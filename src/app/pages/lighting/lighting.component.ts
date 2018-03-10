import { Component, OnInit } from '@angular/core';

import {PageService} from '../../services/page/page.service';

@Component({
  selector: 'app-lighting',
  templateUrl: './lighting.component.html',
  styleUrls: ['./lighting.component.scss']
})
export class LightingComponent implements OnInit {

    constructor(
        private pageService: PageService
    ) {}

  ngOnInit() {
      this.pageService.setPageTitle('Lighting');
  }

}
