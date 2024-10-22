import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrewPage } from './brew.page';

describe('BrewPage', () => {
  let component: BrewPage;
  let fixture: ComponentFixture<BrewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
