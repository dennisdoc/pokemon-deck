import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent)
//   .catch((err) => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule, { ngZoneEventCoalescing: true } )
  .then(success => console.log('Pokemon-deck Bootstrap Success!'))
  .catch(err => console.error(err));
