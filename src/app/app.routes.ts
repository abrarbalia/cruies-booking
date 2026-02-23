import { Routes } from '@angular/router';

export const routes: Routes = [

  // HOME
  {
    path: '',
    loadComponent: () =>
      import('./features/auth/home/home')
        .then(c => c.Home)
  },

  // LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(c => c.Login)
  },

  // CRUISE LIST
  {
    path: 'cruises',
    loadComponent: () =>
      import('./features/cruises/cruise-list/cruise-list')
        .then(c => c.CruiseListComponent)
  },

  // CRUISE DETAIL
  {
    path: 'cruises/:id',
    loadComponent: () =>
      import('./features/cruises/cruise-detail/cruise-detail')
        .then(c => c.CruiseDetailComponent)
  }

];