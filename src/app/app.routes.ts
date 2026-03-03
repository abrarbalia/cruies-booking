import { Routes } from '@angular/router';

export const routes: Routes = [
  
    {
    path: '',
    loadComponent: () =>
      import('./features/auth/home/home')
        .then(c => c.Home)
  },
    {
    path: 'login',
    loadComponent: () =>
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
},
{
  path: 'offers/second-guest-free',
  loadComponent: () =>
    import('./features/offers/features/offers/second-guest-free/second-guest-free').then(
      m => m.SecondGuestFree)
},
{
    path: 'offers/free-beverages',
    loadComponent: () =>
      import('./features/offers/features/offers/free-beverages/free-beverages')
        .then(m => m.FreeBeverages)
  },
{
    path: 'offers/free-wifi',
    loadComponent: () =>
      import('./features/offers/features/offers/free-wifi/free-wifi')
        .then(m => m.FreeWifi)
  },
  {
    path: 'offers/free-wifi',
    loadComponent: () =>
      import('./features/offers/features/offers/onboard-credit/onboard-credit')
        
        .then(m => m.OnboardCredit )
  }
  
];