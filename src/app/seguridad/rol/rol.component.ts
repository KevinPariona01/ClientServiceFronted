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
import { RolEditarComponent } from '../rol-editar/rol-editar.component';
import { RolPermisosComponent } from '../rol-permisos/rol-permisos.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent extends BaseComponent implements OnInit {

  tit: String = "SEGURIDAD > GESTOR DE ROLES";

  pantallaRol= [];
  permisoEdit: boolean = false; 

  
  
  roles!:any [];
  idroles = 0;
  textfilter = '';

  displayedColumns: string[] = ['editar','c_nombre', 'permisos', 'eliminar'];
  public tablaRoles!: MatTableDataSource<any>;
  public confirmar!: Confirmar;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor(
    public override snackBar: MatSnackBar,
    public override router: Router,
    public _seguridad_service: SeguridadService,
    public dialog: MatDialog,
    /* private spinner: NgxSpinnerService */
  ) { 
    super(snackBar, router);
  }

  override ngOnInit() {
    /* this.spinner.show(); */
    this.usuarioLog = this.getUser().data;
    this.getPantallaRol();
    this.getrole();    
    this.getTablaRol();
  }
  
  selectRole(n_idseg_rol:any) {
    this.idroles = n_idseg_rol;
    this.getTablaRol();
  }
  getTablaRol() {
    let request = {
      n_idseg_rol: this.idroles      
    }
    console.log("Roles: ", request);
    
    this._seguridad_service.getrole(request,this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            console.log(result);
            this.tablaRoles = new MatTableDataSource<any>(result.data);
            this.tablaRoles.sort = this.sort;
            this.tablaRoles.paginator = this.paginator;
            /* this.spinner.hide(); */
          } else {
            /* this.spinner.hide(); */
            this.openSnackBar(result.mensaje, 99);
          }
        } catch (error) {
          /* this.spinner.hide(); */
          this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
        } finally {
          //this.applyFilter(this.textfilter);
        }
      }, error => {
        /* this.spinner.hide(); */
        this.openSnackBar(error.error, 99);
      });
  }

  getrole() {
    let request = {
      n_idseg_rol: this.idroles
    }
    this._seguridad_service.getrole(request, this.getToken().token).subscribe(
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

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tablaRoles.filter = dato.trim().toLowerCase();
  }

  openDialog(rol:any): void {
    const dialogRef = this.dialog.open(RolEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { rol: rol}
    });
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.getTablaRol();

      } catch (error) {
        console.log(error);
        this.getTablaRol();
      }
    });
  }

  eliminar(item:any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el rol " + item.c_nombre + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteRol(item);
      }
    });
  }

  deleteRol(item:any) {
    let request = {
      n_idseg_rol: item.n_idseg_rol,
      n_id_usermodi: this.usuarioLog.n_idseg_userprofile,
      c_nombre: item.c_nombre
    }
    this._seguridad_service.deleteRol(request, this.getToken().token).subscribe(
      result => {
        try {
          if (result.estado) {
            this.getTablaRol();
            this.openSnackBar(result.mensaje, 200);
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

  openDialogPermisos(rol:any): void {
    let data = {
      rol: rol,
      titulo: "Asignar Permisos"
    };
    const dialogAsigPro = this.dialog.open(RolPermisosComponent, {
      width: '750px',
      data: data
    });
    dialogAsigPro.afterClosed().subscribe(result => {
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
            if(element.c_codigo === 'se-adrol'){
              console.log(element);
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


}
