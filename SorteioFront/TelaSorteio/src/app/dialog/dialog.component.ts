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
    this.checkspinner = true;
    this.getData();
    this.teste = setInterval(() => {
    this.checkspinner = false;
    }, 10000);
    this.checkspinner = true;
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

