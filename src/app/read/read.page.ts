import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';
import * as teaBrewData from '../../data/teaBrewData.json';

@Component({
  selector: 'app-read',
  templateUrl: 'read.page.html',
  styleUrls: ['read.page.scss']
})
export class ReadPage implements OnInit {

  allTeas = Array.from(teaBrewData);
  teas$;
  selectedIndex;
  currentTeaCategory;
  firstBtnActive = true;

  constructor(
    private router: Router,
    private contentfulService: ContentfulService
    ) {}

  ngOnInit() {
    this.teas$ = this.contentfulService.getTeaByCategory('whiteTea');
    this.currentTeaCategory = 'Thé Blanc';
  }

  getTeaList(category: string, label: string, i) {
    this.selectedIndex = i;
    this.firstBtnActive = false;
    this.currentTeaCategory = label;
    this.teas$ = this.contentfulService.getTeaByCategory(category);
  }


  goToTeaDetail(tea) {
    // is it better to getEntry() by id?
    this.router.navigateByUrl('/tabs/read/detail', { state: tea});
  }

}
