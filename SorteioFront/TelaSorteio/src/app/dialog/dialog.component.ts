import { Observable } from 'rxjs/internal/Observable';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sorteiomodel } from '../models/sorteiomodel';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  date = new Date();

  teste: any;

  checkspinner: boolean;

  sorteado: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogComponent) { }

    ngOnInit(): void {
    console.log(this.data);
    this.checkspinner = true;
    this.getData();
    this.teste = setInterval(() => {
    this.checkspinner = false;
    console.log(this.checkspinner);
    }, 3000);
    this.checkspinner = true;
    console.log(this.checkspinner);
  }


  getData(): any {
     this.sorteado = this.data;
  }
}

