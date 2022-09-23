import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';

@Component({
  selector: 'app-read',
  templateUrl: 'read.page.html',
  styleUrls: ['read.page.scss']
})
export class ReadPage implements OnInit {

  teas$;

  constructor(
    private router: Router,
    private contentfulService: ContentfulService
    ) {}

  ngOnInit() {
    this.teas$ = this.contentfulService.getTeaInfo();

    this.contentfulService.getTeaInfo().subscribe(res => console.log(res));
  }

  goToTeaDetail(tea) {
    this.router.navigateByUrl('/tabs/read/detail', { state: tea});
  }

}
