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
        .then(c => c.CruiseList)
  },

  {
    path: 'cruises-detail/:id',
    loadComponent: () =>
      import('./features/cruises/cruise-detail/cruise-detail')
        .then(c => c.CruiseDetail)
  },

  {
    path: 'my-booking',
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
  },

  {
    path:'booking/:cruiseId',
    loadComponent: () =>
      import('./features/pages/booking/select-cabin/select-cabin')
        .then(m => m.SelectCabin)
  },

  {
    path:'booking/:cruiseId/passengers',
    loadComponent: () =>
      import('./features/pages/booking/passengers/passengers')
        .then(m => m.Passengers)
  },

  {
     path:'booking/:cruiseId/confirm',
     loadComponent: () =>
       import('./features/pages/booking/confirm/confirm')
         .then(m => m.Confirm)
  },

  {
    path: 'ticket/:id',
    loadComponent: () =>
      import('./features/pages/booking/ticket/ticket')
        .then(m => m.Ticket)
  },

{
  path: 'admin',
  loadChildren: () =>
    import('./Admin/admin/admin-routing-module')
      .then(m => m.AdminRoutingModule)
},
{
  path: 'admin/checkin',
  loadComponent: () =>
    import('./Admin/admin/checkin/checkin')
      .then(m => m.Checkin)
}
];