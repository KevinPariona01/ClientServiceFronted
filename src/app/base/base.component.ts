import { Component, OnInit } from '@angular/core';
import { SnackComponent } from '../generico/snack/snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackInterface } from '../interface/snack.interface';
import { Router } from '@angular/router';
import { SeguridadService } from '../service/seguridad.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {

  bLogin: boolean = true;
  proyecto:any;
  usuarioLog:any;

  objsnack: SnackInterface = {
    mensaje: "",
    tipo: 0
  };

  pagin: string[] = ['25', '50', '100', '150'];

  constructor(
    public snackBar: MatSnackBar, public router: Router
  ) {
    this.isLogin();
  }

  ngOnInit() {
    
  }

  public isLogin() {

    if (this.getToken() == null) {
      this.router.navigate(['/login']);
      this.bLogin = false;
    } else {
      this.bLogin = true;
    }
    console.log(this.bLogin)
  }

  public getToken(): any {
    var currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    return currentUser;
  }

  public getUser(): any {
    var currentUser = JSON.parse(localStorage.getItem('currentUser')!);    
    return currentUser;
  }

  public setToken(obj:any) {
    localStorage.setItem('currentUser', JSON.stringify(obj));
  }

  public openSnackBar(mensaje: String, tipo: number) {
    if (mensaje == 'Token inválido!.') {
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      this.objsnack.mensaje = mensaje;
      this.objsnack.tipo = tipo;
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2500,
        data: this.objsnack
      });
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  decimalOnly(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    console.log('dato ingresado: ' + inputChar);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  decimalOnly2(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      if (event.keyCode != 45) {
        event.preventDefault();
      }
    }
  }

}
