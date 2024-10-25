import { Routes } from "@angular/router"
import { BrewPage } from "./brew.page"
import { TimerComponent } from "./components/timer/timer.component"


export const brewRoutes: Routes = [
  {
    path: '',
    component: BrewPage
  },
  {
    path: ':name',
    component: TimerComponent
  }
]
