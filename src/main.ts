import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode()
}

const ionicStorageProviders = IonicStorageModule.forRoot({
  name: '_tguru_notes',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
}).providers

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: IonicModule, useValue: IonicModule.forRoot({ mode: 'md' }) },
    provideHttpClient(),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    ...(ionicStorageProviders || [])
  ]
}).catch(err => console.error(err));
