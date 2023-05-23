import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/seguridad/login/login.component';
import { RolComponent } from './component/seguridad/rol/rol.component';
import { MenuComponent } from './component/general/menu/menu.component';
import { UsuarioComponent } from './component/seguridad/usuario/usuario.component';
import { DataUsuarioComponent } from './component/seguridad/data-usuario/data-usuario.component';

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
