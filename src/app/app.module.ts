import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './seguridad/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//MATERIAL
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs'
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';

//COMPONENTS

import { BaseComponent } from './base/base.component';
import { SnackComponent } from './generico/snack/snack.component';
import { RolComponent } from './seguridad/rol/rol.component';
import { ConfirmComponent } from './general/confirm/confirm.component';
import { RolEditarComponent } from './seguridad/rol-editar/rol-editar.component';
import { RolPermisosComponent } from './seguridad/rol-permisos/rol-permisos.component';
import { MenuComponent } from './general/menu/menu.component';
import { UsuarioComponent } from './seguridad/usuario/usuario.component';
import { UsuarioEditarComponent } from './seguridad/usuario-editar/usuario-editar.component';
import { ResetearClaveComponent } from './generico/resetear-clave/resetear-clave.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseComponent,
    SnackComponent,
    RolComponent,
    ConfirmComponent,
    RolEditarComponent,
    RolPermisosComponent,
    MenuComponent,
    UsuarioComponent,
    UsuarioEditarComponent,
    ResetearClaveComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatButtonModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
