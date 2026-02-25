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
  },
  {
    path: 'offers/kids-sail-free',
    loadComponent: () =>
      import('./features/offers/kids-sail-free/kids-sail-free')
        .then(c => c.KidsSailFree)
  }

        import('./features/auth/login/login')
            .then(c => c.Login)
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
    import('./features/auth/signin/signin').then(m => m.Signin)
},
{
  path: 'offers/features/kids-sail-free',
  loadComponent: () =>
    import('./features/offers/features/offers/kids-sail-free/kids-sail-free').then(
      m => m.KidsSailFree
    )
}
];