import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './seguridad/login/login.component';
import { RolComponent } from './seguridad/rol/rol.component';
import { MenuComponent } from './general/menu/menu.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path:'rol',component:RolComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
