import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/component/base/base.component';
import { AppSettings } from 'src/app/common/appsettings';
import { ConfirmComponent } from 'src/app/component/general/confirm/confirm.component';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { UsuarioEditarComponent } from '../usuario-editar/usuario-editar.component';
import { ResetearClaveComponent } from 'src/app/component/generico/resetear-clave/resetear-clave.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE USUARIOS";
  pantallaRol= [];
  permisoEdit: boolean = false;
  roles:any= [];
  idroles = 0;
  textfilter = '';

  colorPro!: string;
  displayedColumns: string[] = ['editar', 'username', 'c_nombreApellido','c_dni', 'c_rol','resetear', 'activo', 'eliminar'];
  public tablaUsuarios!: MatTableDataSource<any>;
  public confirmar!: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    public override snackBar: MatSnackBar,
    public override router: Router,
    public _seguridad_service: SeguridadService,
    //public _general_service: GeneralService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    super(snackBar, router);
  }

  override ngOnInit() {
    this.spinner.show();
    this.usuarioLog = this.getUser().data;
    
    this.getPantallaRol();
    this.getrole();
    this.getTablaUsuario();
  }

  selectRole(n_idseg_rol:any) {
    this.idroles = n_idseg_rol; 
      this.getTablaUsuario();
    
  }



  getTablaUsuario() {
    let request = {
      n_idseg_rol: this.idroles,
    }
    
    this._seguridad_service.get(request, this.getToken().token).subscribe(
      result => {        
        try {
          if (result.estado) {
            console.log("RESULTADO:",result.data);
            this.tablaUsuarios = new MatTableDataSource<any>(result.data);
            this.tablaUsuarios.sort = this.sort;
            this.tablaUsuarios.paginator = this.paginator;
            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.spinner.hide();
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
        }
      }, error => {
        this.spinner.hide();
        this.openSnackBar(error.error, 99);
      });
  }

  getrole() {
    let request = {
      n_idseg_rol: this.idroles      
    }
    this._seguridad_service.getrole(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.roles = resultado.data;
        } else {
          this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  /* getUserSinAsignacion(){

    let request = {
      n_idseg_rol: this.idroles,
    }
    
    this._seguridad_service.getUserSinAsignacion(request, this.getToken().token).subscribe(
      result => {        
        try {
          if (result.estado) {
            console.log(result);
            this.tablaUsuarios = new MatTableDataSource<any>(result.data);
            this.tablaUsuarios.sort = this.sort;
            this.tablaUsuarios.paginator = this.paginator;
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          //this.applyFilter(this.textfilter);//ERROR
        }
      }, error => {
        this.openSnackBar(error.error, 99);
      });

  } */

  applyFilter(filterValue: any) {
    console.log("data: ",filterValue );
    let event = filterValue.target.value
    this.tablaUsuarios.filter = event.trim().toLowerCase();
  }

  openDialog(usuario:any): void {
    const dialogRef = this.dialog.open(UsuarioEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { usuario: usuario, roles: this.roles }
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaUsuario();

      } catch (error) {
        console.log(error);
        this.getTablaUsuario();
      }
    });
  }

  openDialogClave(usuario:any): void {
    let data = {
      data: usuario,
      titulo: "Resetear Contraseña",
      esresetpassword: true
    };
    const dialogRefClave = this.dialog.open(ResetearClaveComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: data
    });
    dialogRefClave.afterClosed().subscribe(result => {
    });
  }

  estadoUser(item:any): void {
    console.log(item);
    
    let request = {
      n_idseg_userprofile: item.n_idseg_userprofile,
      b_activo: !item.b_activo,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    console.log(request);
    
    this._seguridad_service.estadoUser(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            //this.getTablaUsuario();//ACTUALIZA LOS ESTADOS
            if(item.b_activo){
              this.openSnackBar("Usuario Activado", 99);
            }else{
              this.openSnackBar("Usuario Desactivado", 99);
            }
            
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  eliminar(item:any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { titulo: "¿Desea eliminar el usuario " + item.c_username + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteUsuario(item);
      }
    });
  }

  deleteUsuario(item:any) {
    let request = {
      n_idseg_userprofile: item.n_idseg_userprofile,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile
    }
    this._seguridad_service.delete(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaUsuario();
            this.openSnackBar("Usuario eliminado", 200);
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  getPantallaRol() {
    let request = {
      n_idseg_userprofile: this.usuarioLog.n_idseg_userprofile
    }
    this._seguridad_service.getPantallaRol(request, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.pantallaRol = resultado.data;
          this.pantallaRol.forEach((element:any) => {            
            if(element.c_codigo === 'se-adusu'){              
              console.log(element.c_codigo);
              if(element.c_permiso === 'MO'){
                this.permisoEdit = true;
              }              
            }
          });
        } else {
          this.openSnackBar(resultado.mensaje, 99);
        }
      }, error => {
        try {
          this.openSnackBar(error.error.Detail, error.error.StatusCode);
        } catch (error) {
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        }
      });
  }

  download(){
    this.router.navigate(["/data_usuario_pro"]);
  }

}
