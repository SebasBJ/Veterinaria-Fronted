import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { PropietariosComponent } from './propietarios/propietarios.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'propietarios',
    component: PropietariosComponent
  },
  {
    path: 'mascotas',
    component: MascotasComponent
  },
  {
    path: 'pacientes',
    component: PacientesComponent
  },
  {
    path: '**',
    component: MenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
