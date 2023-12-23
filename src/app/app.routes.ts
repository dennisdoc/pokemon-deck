import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: '', component : AppComponent, children: [
        {path:'',redirectTo:'deck',pathMatch: 'full'},
        {path: 'deck', loadChildren: () =>
        import('./pages/template/template-routing.module').then(
          ({ TemplateRoutingModule }) => TemplateRoutingModule
        )}
    ]}
];
