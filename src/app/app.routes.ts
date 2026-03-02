import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/auth/home/home')
        .then(c => c.HomeComponent)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(c => c.Login)
  },

  {
    path: 'cruises',
    loadComponent: () =>
      import('./features/cruises/cruise-list/cruise-list')
        .then(c => c.CruiseListComponent)
  },

  {
    path: 'cruises-detail/:id',
    loadComponent: () =>
      import('./features/cruises/cruise-detail/cruise-detail')
        .then(c => c.CruiseDetailComponent)
  },

  {
    path: 'my-bookings',
    loadComponent: () =>
      import('./features/my-booking/my-booking')
        .then(m => m.MyBooking)
  },

  {
    path: 'offers',
    loadComponent: () =>
      import('./features/offers/offers')
        .then(m => m.Offers)
  },

  {
    path: 'signin',
    loadComponent: () =>
      import('./features/auth/signin/signin')
        .then(m => m.Signin)
  }

];