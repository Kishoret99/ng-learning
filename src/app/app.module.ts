import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { BreakOutComponent } from './break-out/break-out.component';
import { GoogleRenderComponent } from './google-render/google-render.component';

@NgModule({
  declarations: [
    AppComponent,
    BreakOutComponent,
    GoogleRenderComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


