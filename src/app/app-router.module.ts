import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { BreakOutComponent } from './break-out/break-out.component';
import { GoogleRenderComponent } from './google-render/google-render.component';

const appRoutes: Routes = [
    { path: 'break-out', component: BreakOutComponent },
    { path: 'google-render',  component: GoogleRenderComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule {

}
