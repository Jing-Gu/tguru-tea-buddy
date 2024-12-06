import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { BrewPage } from '../brew/brew.page';
import { TimerComponent } from '../brew/components/timer/timer.component';
import { CustomizeFormComponent } from '../brew/components/customize-form/customize-form.component';
import { NoteListComponent } from '../note/note-list/note-list.component';
import { NoteDetailsComponent } from '../note/note-details/note-details.component';
import { MorePage } from '../more/more.page';

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
            component: BrewPage
          },
          {
            path: 'customize',
            component: CustomizeFormComponent
          },
          {
            path: ':timer',
            component: TimerComponent
          },
          {
            path: ':name',
            component: TimerComponent
          }
        ]
      },
      {
        path: 'note',
        children: [
          {
            path: '',
            component: NoteListComponent
          },
          {
            path: 'add',
            component: NoteDetailsComponent
          },
          {
            path: ':uuid',
            component: NoteDetailsComponent
          }
        ]
      },
      {
        path: 'more',
        component: MorePage
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
