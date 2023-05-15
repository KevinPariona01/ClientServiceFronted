import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { AppSettings } from 'src/app/common/appsettings';
import { ConfirmComponent } from 'src/app/general/confirm/confirm.component';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Confirmar } from 'src/app/interface/confirmar.interface';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { UsuarioEditarComponent } from '../usuario-editar/usuario-editar.component';
import { ResetearClaveComponent } from 'src/app/generico/resetear-clave/resetear-clave.component';

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
  idAsignPro = 0;

  userProAsign = [
    { id: 1, name: "Asignado" },
    { id: 2, name: "Sin asignar"}
  ]
  colorPro!: string;
  displayedColumns: string[] = ['editar', 'username', 'c_nombreApellido','c_dni', 'c_rol', 'asigProyecto','resetear', 'activo'];
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
    //private spinner: NgxSpinnerService
  ) {
    super(snackBar, router);
  }

  override ngOnInit() {
    //this.spinner.show();
    //this.colorPro = this.proyecto.c_color    
    this.usuarioLog = this.getUser().data;
    //console.log(this.usuarioLog);
    
    this.getPantallaRol();
    this.getrole();
    this.getTablaUsuario();
  }

  selectRole(n_idseg_rol:any) {
    console.log("idAsignPro: "+this.idAsignPro);
    this.idroles = n_idseg_rol;
    if (this.idAsignPro == 2) {
      this.getUserSinAsignacion();
    } else {      
      this.getTablaUsuario();
    }
    
  }

  selectEstadoAsignacion(id:any){
    this.idAsignPro = id;
    if(id == 2){
      this.getUserSinAsignacion();
    }else{
      this.getTablaUsuario();
    }
  }

  getTablaUsuario() {
    let request = {
      n_idseg_rol: this.idroles,
      n_idpro_proyecto: 5//this.proyecto.n_idpro_proyecto
    }
    
    this._seguridad_service.get(request, this.getToken().token).subscribe(
      result => {        
        try {
          if (result.estado) {
            console.log("RESULTADO:",result.data);
            this.tablaUsuarios = new MatTableDataSource<any>(result.data);
            this.tablaUsuarios.sort = this.sort;
            this.tablaUsuarios.paginator = this.paginator;
            //this.spinner.hide();
          } else {
            //this.spinner.hide();
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          //this.spinner.hide();
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          //this.applyFilter(this.textfilter);
        }
      }, error => {
        //this.spinner.hide();
        
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

  getUserSinAsignacion(){

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

  }

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

  openDialogProyecto(usuario:any): void {
    /* let data = {
      usuario: usuario,
      titulo: "Asignar Proyecto"
    };
    const dialogAsigPro = this.dialog.open(UsuarioproyectoComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: data
    });
    dialogAsigPro.afterClosed().subscribe(result => {
    }); */
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
    
    this._seguridad_service.estadoUser(request, this.getToken()).subscribe(
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
      width: '500px',
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
    this._seguridad_service.delete(request).subscribe(
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
