import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './seguridad/login/login.component';
import { RolComponent } from './seguridad/rol/rol.component';
import { MenuComponent } from './general/menu/menu.component';
import { UsuarioComponent } from './seguridad/usuario/usuario.component';
import { DataUsuarioComponent } from './seguridad/data-usuario/data-usuario.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path:'rol',component:RolComponent},
  {path:'usuario',component:UsuarioComponent},
  {path:'data_usuario_pro',component:DataUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
