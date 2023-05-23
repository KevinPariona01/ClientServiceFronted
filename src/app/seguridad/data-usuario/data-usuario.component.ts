import { Component, OnInit } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/service/seguridad.service';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-data-usuario',
  templateUrl: './data-usuario.component.html',
  styleUrls: ['./data-usuario.component.css']
})
export class DataUsuarioComponent extends BaseComponent implements OnInit {

  dataUser = [];
  nombreProyecto = '';
  constructor(
    public override snackBar: MatSnackBar,
    public override router: Router,
    public _seguridad_service: SeguridadService,    
    
  ) {
    super(snackBar, router);
  }

  override ngOnInit() {
    this.download();
  }

  download(){
    let request = {
      //n_idpro_proyecto: this.proyecto.n_idpro_proyecto,     
    }    
    this._seguridad_service.getDataUser(request, this.getToken().token).subscribe(
      result => {        
        this.dataUser = result.data;
        this.downloadPlantillaLinea(this.dataUser);
      }, error => {
        this.openSnackBar(error.error, 99);
      });
    
  }

  setdatogeneral(worksheet:any, cell:any, value:any, fontsize:any, bolt:any, fg_color = 'FFFFFF', bg_color = '000000') {
    const titleRow = worksheet.getCell(cell)
    titleRow.value = value;
    titleRow.font = { name: 'ARIAL', family: 4, size: fontsize, bold: bolt };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: fg_color },
      color: { argb: bg_color }
    };
  }

  downloadPlantillaLinea(data: any[]): void{        

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('DATA USUARIOS');

    let row = 1;

    worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'A' + row, 'NOMBRES', 10, true, '002060');
    worksheet.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    
    worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'B' + row, 'APELLIDO PATERNO', 10, true, '002060');
    worksheet.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('B' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'C' + row, 'APELLIDO MATERNO', 10, true, '002060');
    worksheet.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('C' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'D' + row, 'DNI', 10, true, '002060');
    worksheet.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('D' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'E' + row, 'ROL', 10, true, '002060');
    worksheet.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('E' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };

    worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
    this.setdatogeneral(worksheet, 'F' + row, 'ESTADO', 10, true, '002060');
    worksheet.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
    worksheet.getCell('F' + row).border = {
        right: { style: 'thin' },
        bottom: { style: 'thin' },
    };    
    data.forEach(element => {
      
        row += 1;
        var estado = 'NO ACTIVO'
        if (element.b_activo) {
          estado = 'ACTIVO'
        }
        worksheet.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'A' + row, element.c_nombre1 + " " +element.c_nombre2 , 10, false);
        worksheet.getCell('A' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'B' + row, element.c_appaterno, 10, false);
        worksheet.getCell('B' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'C' + row, element.c_apmaterno, 10, false);
        worksheet.getCell('C' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'D' + row, element.c_dni, 10, false);
        worksheet.getCell('D' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'E' + row, element.c_nombre, 10, false);
        worksheet.getCell('E' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        worksheet.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(worksheet, 'F' + row, estado, 10, false);
        worksheet.getCell('F' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
    });   

    worksheet.getColumn(1).width = 40;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;

    worksheet.getRow(1).height = 20;
    //worksheet.getRow(2).height = 20;

    //worksheet.mergeCells(`B1:I1`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'DataUsuario.xlsx');
    });

    this.router.navigate(["/usuario"]);
  } 



}



