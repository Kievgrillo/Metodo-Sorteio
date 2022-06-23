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

  sorteios: sorteiomodel[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogComponent) { }



  ngOnInit(): void {
    this.getData();
  }


  getData(): any {
    this.sorteios = this.sorteios.length[0];
  }
}

