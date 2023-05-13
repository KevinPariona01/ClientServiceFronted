import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { AppSettings } from 'src/app/common/appsettings';
import { Role, Roleditar } from 'src/app/interface/seguridad.interface';
import { SeguridadService } from 'src/app/service/seguridad.service';

@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css']
})
export class RolEditarComponent extends BaseComponent implements OnInit {

  rol!: Role;
  editar!: boolean;
  //roles: Roleditar;
  constructor(
    public dialogRef: MatDialogRef<RolEditarComponent>,
    private _seguridadservice: SeguridadService,
    @Inject(MAT_DIALOG_DATA) public data: Roleditar,
    public _router: Router,
    public override snackBar: MatSnackBar
  ) { 
    super(snackBar, _router);
  }

  override ngOnInit() {
    this.usuarioLog = this.getUser().data;
    if (this.data.rol == null) {
      this.editar = false;
      this.rol = {
        n_idseg_rol:0,
        c_nombre:'',
        n_nivel:'',
        n_id_usermodi: this.usuarioLog.n_idseg_userprofile        
      };      
    } else {
      this.editar = true;
      this.rol = this.data.rol;      
    }    
    console.log('Contenido de usuario');
    console.log(this.rol);
  }

  guardar(newForm:any) {
    this.rol.n_id_usermodi = this.usuarioLog.n_idseg_userprofile;
    this._seguridadservice.saveRol(this.rol, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.dialogRef.close({ flag: true, data: this.rol });
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        console.error(error);
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

}
