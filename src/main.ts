import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';   // ✅ IMPORTANT
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    )
  ]
}).catch(err => console.error(err));