import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { Roleditar } from 'src/app/interface/seguridad.interface';
import { SeguridadService } from 'src/app/service/seguridad.service';

@Component({
  selector: 'app-rol-permisos',
  templateUrl: './rol-permisos.component.html',
  styleUrls: ['./rol-permisos.component.css']
})
export class RolPermisosComponent extends BaseComponent implements OnInit {

  pantallas= [];
  tabla!: MatTableDataSource<any>;
  displayedColumns: string[] = ['c_codigo', 'c_nombre', 'permiso'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  permisos = [
    { id: "SA", nombre: "SA" },
    { id: "CO", nombre: "CO" },
    { id: "MO", nombre: "MO" }    
  ];

  constructor(
    public dialogAsigPro: MatDialogRef<RolPermisosComponent>,
    private _seguridad_service: SeguridadService,
    @Inject(MAT_DIALOG_DATA) public data: Roleditar,
    public _router: Router,
    public override snackBar: MatSnackBar
    ){
    super(snackBar, _router);
  }

  override ngOnInit() {
    this.usuarioLog = this.getUser().data;
    this.getPantalla();
  }

  getPantalla(){
    let request = {
      n_idseg_rol: this.data.rol.n_idseg_rol
    }
    console.log(request);
    
    this._seguridad_service.getPantalla(request,this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          console.log("Pantallas",resultado.data);
          this.tabla = new MatTableDataSource<any>(result.data);
          this.tabla.sort = this.sort;
          this.tabla.paginator = this.paginator;
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

  onSelectChange(item:any) {
    console.log("item: ", item);
    
    try {      
      if(item.n_idseg_rol == null){
        item.n_idseg_rol = this.data.rol.n_idseg_rol
      }
      item.n_id_usermodi = this.usuarioLog.n_idseg_userprofile
      console.log(item);
      //SE CAMBIO getProyecto a getToken
      this._seguridad_service.updatePantallaRol(item,this.getToken().token).subscribe(
        result => {
          if (result.estado) {

          } else {
            this.openSnackBar(result.mensaje, 99);
          }
        }, error => {
          this.openSnackBar(<any>error, 99);

        });
    } catch (error) {
      console.log("ERROR");
      
      this.openSnackBar(AppSettings.SERVICE_NO_CONECT_SERVER, 99);
    }
  }

}
