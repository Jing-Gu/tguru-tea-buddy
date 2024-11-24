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
          {
            path: '',
            loadComponent: () => import('../brew/brew.page').then(p => p.BrewPage)
          },
          {
            path: ':name',
            loadComponent: () => import('../brew/components/timer/timer.component').then(c => c.TimerComponent)
          }
        ]
      },
      {
        path: 'note',
        children: [
          {
            path: '',
            loadComponent: () => import('../note/note-list/note-list.component').then(c => c.NoteListComponent)
          },
          {
            path: ':uuid',
            loadComponent: () => import('../note/note-details/note-details.component').then(c => c.NoteDetailsComponent)
          }
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
        loadComponent: () => import('../more/more.page').then(p => p.MorePage)
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
