import { SorteioService } from './../service/sorteioservice';
import { sorteiomodel } from './../models/sorteiomodel';
import { OnInit, Component, Inject } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sorteio',
  templateUrl: './sorteio.component.html',
  styleUrls: ['./sorteio.component.scss']
})

export class SorteioComponent implements OnInit {

  sorteios: sorteiomodel[] = [];
  public filtroSorteio: any = [];

  title = 'codegenerator';
  date = new Date();
  codeGenerated = '';
  evtMsg: any;


  constructor(
    private sorteioService: SorteioService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.GetParticipante();
  }

  randomString() {
    const chars = '';
    const stringLength = 10;
    let randomstring = '';
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    this.codeGenerated = randomstring;
    let dialogvar = this.dialog.open(DialogComponent, {
      height: '430px',
      width: '470px',
      data: this.sorteios[this.gerarRandomSorteio(0,this.sorteios.length)]
    });
    return 0;
  }

  gerarRandomSorteio(min, max) {
    this.spinner.show();
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  GetParticipante(): void {
    this.sorteioService.GetParticipante().subscribe({
      next: p => {
        p.forEach(element => {

          var lista = {
            Id: element['id'],
            Nome: element['nome'],
            Telefone: element['telefone'],
            Email: element['email'],
            Cpf: element['cpf'],
          };
          this.sorteios.push(lista);
        });
      },
      error: err => console.log('Error', err)
    });
  }

  getFiltroParticipante(search): void {
    this.sorteioService.GetFilterParticipantes(search).subscribe({
      next: p => {
        this.sorteios = [];
        p.forEach(element => {

          var lista = {
            Id: element['id'],
            Nome: element['nome'],
            Telefone: element['telefone'],
            Email: element['email'],
            Cpf: element['cpf'],
          };
          this.sorteios.push(lista);
        });
      },
      error: err => console.log('Error', err)
    });
  }

  getpaginator(): void {}

}





