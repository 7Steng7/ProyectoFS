import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { GuiaComponent } from './components/guia/guia.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ArtistasComponent } from './components/artistas/artistas.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path:'inicio', component: HomepageComponent},
  {path:'juegos', component: JuegosComponent},
  {path:'guia', component: GuiaComponent},
  {path:'noticias', component: NoticiasComponent},
  {path:'artistas', component: ArtistasComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
