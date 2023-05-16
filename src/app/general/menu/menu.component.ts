import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { AppSettings } from 'src/app/common/appsettings';
import { ResultadoApi } from 'src/app/interface/common.interface';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { SocketService } from 'src/app/service/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {

  @Input() titulo!: String;
  

  public usuario: any;
  public username: string = "Logearse";
  public role: any;
  public menu: any;
  public rol!: string;

  public se_adusu: boolean = false;
  public se_adrol: boolean = false;
  public ma_adlin: boolean = false;
  public ma_adtil: boolean = false;
  public ma_adzon: boolean = false;
  public ma_adpro: boolean = false;
  public ma_ademp: boolean = false;
  public ma_adtfo: boolean = false;
  public ma_adtie: boolean = false;
  public ma_adtel: boolean = false;
  public ma_adtmo: boolean = false;
  public ma_advag: boolean = false;
  public ma_adele: boolean = false;
  public ma_adarm: boolean = false;
  public ma_admet: boolean = false;
  public as_adgru: boolean = false;
  public as_adarc: boolean = false;
  public imp_imppl: boolean = false;
  public imp_impli: boolean = false;
  public imp_impsu: boolean = false;
  public imp_impmo: boolean = false;
  public mo_mapge: boolean = false;
  public mo_datos: boolean = false;
  public al_adalm: boolean = false;
  public ma_mapli: boolean = false;
  public ma_adper: boolean = false;
  public re_repor: boolean = false; 
  public ma_adpmo: boolean = false;
  public ve_adver: boolean = false;

  colorPro!: string;
  pantallaRol!: [];
  date!: Date;
  urlImagen!: string;

  idPanel: number = 0;
  iditem: number = 0;
  iduserEdit = false;
  notif = "";
  detalleArr = [];
  detalleArrMon = [];
  Arr = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result:any) => result.matches)
    );

  constructor(
    private socketWebService: SocketService,
    public _seguridad_service: SeguridadService,
    private breakpointObserver: BreakpointObserver,
    //public _confiGeneral_service: confGeneralService,    
    public override router: Router,
    public override snackBar: MatSnackBar,
    public dialog: MatDialog,
    /*public mapaService: MapaService*/) {
    super(snackBar, router);
    this.socketWebService.outEven.subscribe(res => {
      if(res != null){
        //this.getNotificacion()
      }
    })
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  override ngOnInit() {    
    /* this.colorPro = this.proyecto.c_color    */ 
    /* this.urlImagen = environment.urlArchivo + this.proyecto.c_rutalogo; */
    if (this.bLogin) {
      this.username = this.getToken().data.c_username;
      this.usuario = this.getToken().data;
      console.log('Usuario Menu');
      this.getPantallaRol();
      this.getRolUser();
      this.idPanel = parseInt(localStorage.getItem('panelMenu')!);
      this.iditem = parseInt(localStorage.getItem('itemMenu')!);   
      if (this.usuario.n_idseg_userprofile == 101) {
        this.iduserEdit = true
      }
      //this.getNotificacion()
    }
    
  }
  /* getNotificacion(){
    this.detalleArr = [];
    this.detalleArrMon = [];
    this.Arr = [];
    var request = {
      n_idseg_userprofile: this.usuario.n_idseg_userprofile,   
      n_idpro_proyecto: this.proyecto.n_idpro_proyecto
    }
    
    this._confiGeneral_service.getNotificacion(request, this.getToken().token).subscribe(
      result => {
          if (result.estado) {
            let n = 0;
            result.data.forEach(element => {
              if (!element.b_estado) {
                n++;
              } 
              this.detalleArr = result.data;
            });           
            if (n <= 0) {
              this.notif = "";  
            }else{
              this.notif = n.toString();
            }
            
            this._confiGeneral_service.getNotificacionDetalle(request, this.getToken().token).subscribe(
              result => {
                  if (result.estado) {
                    this.detalleArrMon = result.data                    
                    this.detalleArr.forEach(element => {
                      let arrAux = []
                      this.detalleArrMon.forEach(e => {
                        if (element.n_idg_notificacion == e.n_idg_notificacion) {
                          arrAux.push(e.c_codigo_mon)
                        }
                      });
                      let item = {
                        n_idg_notificacion: element.n_idg_notificacion,
                        n_idseg_userprofile: element.n_idseg_userprofile,
                        c_detalle: element.c_detalle,
                        b_estado: element.b_estado,
                        b_almacen: element.b_almacen,
                        options: arrAux,
                      }
                      this.Arr.push(item)
                    });
                  } else {
                    this.openSnackBar(result.mensaje, 99);
                  }
              }, error => {
                this.openSnackBar(error.error, 99);
              });
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  } */

  /* showNotificacion(item){
    console.log(item);
    let request = {
      n_idg_notificacion: item.n_idg_notificacion,     
    }
    if (item.b_almacen) {      
      this._confiGeneral_service.showNotificacion(request, this.getToken().token).subscribe(
        result => {
            if (result.estado) {
              this.getNotificacion()
              const dialogRef = this.dialog.open(DatosAlmacenPopupComponent, {
                width: '750px', 
                data: { n_idg_notificacion: item.n_idg_notificacion}
              });
              dialogRef.afterClosed().subscribe(result => {
              });
            } else {
              this.openSnackBar(result.mensaje, 99);
            }
        }, error => {
          this.openSnackBar(error.error, 99);
        });
      
    }else{      
      this._confiGeneral_service.showNotificacion(request, this.getToken().token).subscribe(
        result => {
            if (result.estado) {
              this.getNotificacion()
              const dialogRef = this.dialog.open(DatosMonitoreoPopupComponent, {
                width: '950px', 
                data: { n_idg_notificacion: item.n_idg_notificacion}
              });
              dialogRef.afterClosed().subscribe(result => {
              });
            } else {
              this.openSnackBar(result.mensaje, 99);
            }
        }, error => {
          this.openSnackBar(error.error, 99);
        });
    }
  } */

  getRolUser() {
    let request = {
      n_idseg_userprofile: this.usuario.n_idseg_userprofile      
    }
     
    this._seguridad_service.getRolUser(request,this.getToken().token).subscribe(
      result => {        
        if (result.estado) {
          console.log(result.data);
          let arr =  result.data;
          arr.forEach((element:any) => {
            this.rol = element.c_nombre
          });
        } else {
          this.openSnackBar(result.mensaje, 99);
        }        
      }, error => {
        this.openSnackBar(error.error, 99);
      });
  }

  getPantallaRol() {
    let request = {
      n_idseg_userprofile: this.usuario.n_idseg_userprofile
    }
    this._seguridad_service.getPantallaRol(request, this.getToken().token).subscribe(
      result => {
        let resultado = <ResultadoApi>result;
        if (resultado.estado) {
          this.pantallaRol = resultado.data;
          resultado.data.forEach((element:any) => {
            if(element.c_permiso == "MO" || element.c_permiso == "CO"){             
              switch (element.c_codigo) {
                case 'se-adusu':
                  this.se_adusu = true;
                  break;
                case 'se-adrol':
                  this.se_adrol = true;                      
                  break;
                case 'ma-adlin':
                  this.ma_adlin = true;
                  break;
                case 'ma-adtil':
                  this.ma_adtil = true;
                  break;
                case 'ma-adzon':
                  this.ma_adzon = true;
                  break;
                case 'ma-adpro':
                  this.ma_adpro = true;
                  break;
                case 'ma-ademp':
                  this.ma_ademp = true;
                  break;
                case 'ma-adtfo':
                  this.ma_adtfo = true;
                  break;
                case 'ma-adtie':
                  this.ma_adtie = true;
                  break;
                case 'ma-adtel':
                  this.ma_adtel = true;
                  break;
                case 'ma-adtmo':
                  this.ma_adtmo = true;
                  break;
                case 'ma-advag':
                  this.ma_advag = true;
                  break;
                case 'ma-adele':
                  this.ma_adele = true;
                  break;
                case 'ma-adarm':
                  this.ma_adarm = true;
                  break;
                case 'ma-admet':
                  this.ma_admet = true;
                  break;
                case 'as-adgru':
                  this.as_adgru = true;
                  break;
                case 'as-adarc':
                  this.as_adarc = true;
                  break;
                case 'imp-imppl':
                  this.imp_imppl = true;
                  break;
                case 'imp-impli':
                  this.imp_impli = true;
                  break;
                case 'imp-impsu':
                  this.imp_impsu = true;
                  break;
                case 'imp-impmo':
                  this.imp_impmo = true;
                  break;
                case 'mo-mapge':
                  this.mo_mapge = true;
                  break;
                case 'mo-datos':
                  this.mo_datos = true;
                  break;
                case 'al-adalm':
                  this.al_adalm = true;
                  break;
                case 'ma-mapli':
                  this.ma_mapli = true;
                  break;
                case 'ma-adper':
                  this.ma_adper = true;
                  break;
                case 're-repor':
                  this.re_repor = true;
                  break; 
                case 'ma-adpmo':
                  this.ma_adpmo = true;
                  break;
                case 've-adver':
                  this.ve_adver = true;
                  break;
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
  seguridad: boolean = false;
  maestros: boolean = false;
  asignacion: boolean = false;
  documentos: boolean = false;
  importacion: boolean = false;
  mapa: boolean = false;
  almacen: boolean = false;
  reporte: boolean = false;
   
  panel(panel:any, item:any){
    localStorage.setItem('panelMenu',panel);
    localStorage.setItem('itemMenu',item);
  }

  /*setearMenu(b_seguridad, b_maestros, b_asignacion, b_documentos, b_importacion, b_mapa, b_almacen, b_reporte) {
    this.seguridad = b_seguridad;
    this.maestros = b_maestros;
    this.asignacion = b_asignacion;
    this.documentos = b_documentos;
    this.importacion = b_importacion;
    this.mapa = b_mapa;
    this.almacen = b_almacen;
    this.reporte = b_reporte;
  }*/

  logoff() {
    localStorage.clear();
    this.isLogin();
    this.router.navigate(['/login']);

  }

  /* openDialogClave(): void {
    console.log(this.usuario)
    let data = {
      data: this.usuario,
      titulo: "Cambiar Contraseña",
      esresetpassword: false
    };

    const dialogRefClave = this.dialog.open(ResetearclaveComponent, {
      width: '750px',
      data: data
    });
    dialogRefClave.afterClosed().subscribe(result => {

    });
  } */



  descargarManual = () => {
    /*  this.mapaService.download("DGER_HSP_Guia_Usuario_HSP.pdf").subscribe(
        result => {
          saveAs(result, "DGER_HSP_Guia_Usuario_HSP.pdf");
        }, error => {
          this.openSnackBar(<any>error, 99);
        });*/
  }

  step!: number;

  setStep(index:any) {
    this.step = index;
  }

}
