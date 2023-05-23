import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base/base.component';
import { SeguridadService } from 'src/app/service/seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {

  public typepassword:String="password";
  public iconpassword:String ="visibility_off";
  ruta_img_login: String;
  flag=false;
  dataLogin = {
    c_username: "",
    c_clave: ""
  };
  resultado = {
    expiration: "",
    token: "",
    cMensaje: "",
    flag:false
  };
  isActive:boolean= true;

  constructor(
    public _login_service: SeguridadService, 
    public override router: Router, 
    public override snackBar: MatSnackBar, 
    public dialog: MatDialog
    ) 
  { 
    super(snackBar,router);
    this.ruta_img_login = "assets/images/fondologin3.jpg";
    
  }

  override ngOnInit() {
        
  }

  login(form:any) {
    console.log(this.dataLogin);
    this._login_service.login(this.dataLogin).subscribe(
      result => {
        console.log(result)
        if (result.estado) {
          this.setToken(result);
          console.log("TODO CORRECTO");
          
          this.router.navigate(['/menu']);
          this.isLogin();
        } else {
          this.openSnackBar(result.mensaje, 99);
          this.isLogin();
        }
        form.reset();

      }, error => {
        console.log(error);
        this.openSnackBar(error.error.Detail, error.error.StatusCode);
        form.reset();
        this.isLogin();
      });
  }
  changetipepassword(){
    if(this.typepassword=="password"){
      this.typepassword="text";
      this.iconpassword="visibility";
    }else{
      this.typepassword="password";
      this.iconpassword="visibility_off";
    }
  }

 /*  openDialog(): void {
    const dialogRef = this.dialog.open(VersionesComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
      } catch (error) {
        console.log(error);
      }
    });
  } */

}
