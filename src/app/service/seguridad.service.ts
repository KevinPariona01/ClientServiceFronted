import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  public url: String = '';
  public credentials: any;
  public basic: any;


  constructor(public _http: HttpClient) {
      this.url =  environment.url;
  }

  login(dataLogin: any): Observable<any> {
      let json = JSON.stringify(dataLogin);
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json'
      });
      reqHeader.append('Accept', 'application/json');
      reqHeader.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      reqHeader.append('Access-Control-Allow-Origin', '*');
      reqHeader.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
      return this._http.post(this.url + 'seguridad/login', dataLogin, { headers: reqHeader });
  } 

   get(request:any,token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      console.log(request)
      return this._http.post(this.url + 'seguridad/get', request, { headers: reqHeader });
  }

  getUserSinAsignacion(request:any,token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      console.log(request)
      return this._http.post(this.url + 'seguridad/getUserSinAsignacion', request, { headers: reqHeader });
  }

  getrole(request:any,token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/getrole', request, { headers: reqHeader });
  }

  getRolUser(request:any,token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/getRolUser', request, { headers: reqHeader });
  }
  

  resetarclave(data:any, token:any): Observable<any> {
      console.log("Reseteando")
      console.log(data);
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/resetearclave', data, { headers: reqHeader });
  } 

  validarDatos(token:any): Observable<any> {        
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/validarDatos',{ headers: reqHeader });
  }

  saveUser(data:any, token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      console.log(data)
      return this._http.post(this.url + 'seguridad/saveUser', data, { headers: reqHeader });
  }

  saveRol(data:any, token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      console.log(data)
      return this._http.post(this.url + 'seguridad/saveRol', data, { headers: reqHeader });
  }

  estadoUser(data:any): Observable<any> {
      console.log(data)
      return this._http.post(this.url + 'seguridad/estadoUser', data);
  }
  

  delete(data:any): Observable<any> {
      console.log(data)
      return this._http.post(this.url + 'seguridad/delete_usuario', data);
  }

  deleteRol(data:any): Observable<any> {
      console.log(data)
      return this._http.post(this.url + 'seguridad/deleteRol', data);
  }

  getProyectos(token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/getProyectos', { headers: reqHeader });
  }

  getUserPro(data:any, token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/getUserPro', data, { headers: reqHeader });
  }

  saveUserPro(data:any, token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      
      return this._http.post(this.url + 'seguridad/saveUserPro', data, { headers: reqHeader });
  }

  resetUserPro(data:any, token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/resetUserPro', data, { headers: reqHeader });
  }

  getPantallaRol(request:any,token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/getPantallaRol', request, { headers: reqHeader });
  }

  getPantalla(data:any, token:any): Observable<any> {
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/getPantalla', data, { headers: reqHeader });
  }

  updatePantallaRol(data:any, token:any): Observable<any> {
      console.log(data);        
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/updatePantallaRol', data, { headers: reqHeader });
  }

  getDataUserPro(data:any, token:any): Observable<any> {     
      console.log(data);
      var reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      });
      return this._http.post(this.url + 'seguridad/getDataUserPro', data, { headers: reqHeader });
  }
}
