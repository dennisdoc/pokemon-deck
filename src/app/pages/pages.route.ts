import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
    {path: '',loadChildren: () =>
    import('./home/home-routing.module').then(
      ({ HomeRoutingModule }) => HomeRoutingModule
    )},
    {path: 'add',loadChildren: () =>
    import('./deck-form/deck-form-routing.module').then(
      ({ DeckFormRoutingModule }) => DeckFormRoutingModule
    )},
];
