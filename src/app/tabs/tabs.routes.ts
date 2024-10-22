import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'brew',
        children: [
          { path: '',
            loadComponent: () => import('../brew/brew.page').then(m => m.BrewPage)
          },
        ]
      },
      {
        path: 'note',
        children: [
          { path: '',
          loadComponent: () => import('../note/note.page').then(m => m.NotePage)
          },
/*           {
            path: 'detail/:id',
            loadComponent: () => import('../note/note-details/note-details.module').then(m => m.NoteDetailsPageModule)
          } */
        ]
      },
/*       {
        path: 'read',
        children: [
          {
            path: '',
            loadComponent: () => import('../read/read.module').then(m => m.ReadPageModule)
          },
          {
            path: 'detail',
            loadComponent: () => import('../read/tea-details/tea-details.module').then(m => m.TeaDetailsPageModule)
          }
        ]
      }, */
      {
        path: 'more',
        loadComponent: () => import('../more/more.page').then(m => m.MorePage)
      },
      {
        path: '',
        redirectTo: '/tabs/brew',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/brew',
    pathMatch: 'full',
  },
];
