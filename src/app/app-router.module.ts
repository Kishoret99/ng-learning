import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';
import { BreakOutComponent } from './break-out/break-out.component';

const appRoutes: Routes = [
    { path: 'break-out', component: BreakOutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule {

}
