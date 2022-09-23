import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-teareadypopup',
  templateUrl: './teareadypopup.component.html',
  styleUrls: ['./teareadypopup.component.scss'],
})
export class TeareadypopupComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  dismissPopover() {
    this.popoverController.dismiss();
  }

}
