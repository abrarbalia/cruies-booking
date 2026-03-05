import { Routes } from '@angular/router';
import { CruiseList } from './cruise-list/cruise-list';
import { CruiseDetail } from './cruise-detail/cruise-detail';

export const CRUISES_ROUTES: Routes = [
  {
    path: '',
    component: CruiseList
  },
  {
    path: ':id',
    component: CruiseDetail
  }
];