import { Routes } from '@angular/router';
import { CruiseListComponent } from './cruise-list/cruise-list';
import { CruiseDetailComponent } from './cruise-detail/cruise-detail';

export const CRUISES_ROUTES: Routes = [
  {
    path: '',
    component: CruiseListComponent
  },
  {
    path: ':id',
    component: CruiseDetailComponent
  }
];