import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SorteioService } from '../service/sorteioservice';

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
  closeBtnName: string;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogComponent,
    private sorteioService: SorteioService,
    private router: Router) {}

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
    console.log(this.sorteado.Nome, this.sorteado.Id)
    this.GanhadorSorteio();
  }

  GanhadorSorteio(): void {
    this.sorteioService.SaveGanhadoresSorteio(this.sorteado.Nome, this.sorteado.Id).subscribe({
      next: p => {
      },
      error: err => console.log('Error', err)
    });
  }

  getData(): any {
     this.sorteado = this.data;
  }

  public resetForm(): void {
    this.form.reset();
    this.router.navigateByUrl('/menu');
  }
}

