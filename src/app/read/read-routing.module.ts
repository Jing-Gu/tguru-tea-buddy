import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadPage } from './read.page';

const routes: Routes = [
  {
    path: '',
    component: ReadPage
  },
  {
    path: 'tea-details',
    loadChildren: () => import('./tea-details/tea-details.module').then( m => m.TeaDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadPageRoutingModule {}
