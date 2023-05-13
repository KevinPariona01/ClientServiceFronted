import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  constructor(
  ) {
    super({
      url: environment.urlSocket,
      options: {
        query: {
          nameRoom: "sala1"
        },
      }      
    })
    this.listen();
  }

  listen = () => {
    this.ioSocket.on('evento', (res:any) => this.outEven.emit(res));   
  }
  emitEvent = (payload:any ) => {
    this.ioSocket.emit('evento', payload)

  }

}
