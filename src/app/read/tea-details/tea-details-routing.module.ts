import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeaDetailsPage } from './tea-details.page';

const routes: Routes = [
  {
    path: '',
    component: TeaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeaDetailsPageRoutingModule {}
