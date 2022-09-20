import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'brew',
        children: [
          { path: '',
            loadChildren: () => import('../brew/brew.module').then(m => m.BrewPageModule)
          },
        ]
      },
      {
        path: 'note',
        children: [
          { path: '',
            loadChildren: () => import('../note/note.module').then(m => m.NotePageModule)
          },
          {
            path: 'detail/:id',
            loadChildren: () => import('../note/note-details/note-details.module').then(m => m.NoteDetailsPageModule)
          }
        ]
      },
      {
        path: 'read',
        children: [
          {
            path: '',
            loadChildren: () => import('../read/read.module').then(m => m.ReadPageModule)
          },
          {
            path: 'detail',
            loadChildren: () => import('../read/tea-details/tea-details.module').then(m => m.TeaDetailsPageModule)
          }
        ]
      },
      {
        path: 'more',
        loadChildren: () => import('../more/more.module').then(m => m.MorePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/timer',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/brew',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
