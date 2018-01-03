import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { BreakOutComponent } from './break-out/break-out.component';
import { GoogleRenderComponent } from './google-render/google-render.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../environments/environment';
import { SeoService } from './seo/seo.service';

@NgModule({
  declarations: [
    AppComponent,
    BreakOutComponent,
    GoogleRenderComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFireDatabase, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }


