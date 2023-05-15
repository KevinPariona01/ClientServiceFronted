import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { AppSettings } from 'src/app/common/appsettings';
import { ResetarClave } from 'src/app/interface/seguridad.interface';
import { SeguridadService } from 'src/app/service/seguridad.service';

@Component({
  selector: 'app-resetear-clave',
  templateUrl: './resetear-clave.component.html',
  styleUrls: ['./resetear-clave.component.css']
})
export class ResetearClaveComponent extends BaseComponent {

  public titulo: String;
  public usuario: any;

  constructor(
    public dialogRef: MatDialogRef<ResetearClaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResetarClave,
    public _seguridad_service: SeguridadService,
    public override snackBar: MatSnackBar,
     public override router: Router) {
    super(snackBar, router);
    this.titulo = data.titulo;
    this.usuario = {
      username: "",
      oldpassword: "",
      password: "",
      confirmpassword: "",
      esreset:true
    };
    console.log(this.data)
    this.usuario.username = data.data.c_username;
    this.usuario.esreset=this.data.esresetpassword;
    console.log(this.usuario.username)
    console.log(this.data);

  }

  public onOkClick(usuario:any): void {

      this._seguridad_service.resetarclave(this.usuario, this.getToken().token).subscribe(
        result => {
          console.log(result);
              
    console.log(this.data);
          try {
            if (result.estado) {
              this.dialogRef.close();
              if (!this.data.esresetpassword) {
                this.router.navigate(['/login']);
              }
            } else {
              this.openSnackBar(result.mensaje, 999);
            }
          } catch (error) {
            this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 999);
          }
        }, error => {
          console.log(<any>error);
          try {
            this.openSnackBar(error.error.Detail, error.error.StatusCode);
          } catch (error) {
            this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 999);
          }
        });
    
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
