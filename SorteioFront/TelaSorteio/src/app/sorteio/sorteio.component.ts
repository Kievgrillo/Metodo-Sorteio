import { SorteioService } from './../service/sorteioservice';
import { sorteiomodel } from './../models/sorteiomodel';
import { OnInit, Component, Inject } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


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
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getParticipante();

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
      height: '250px',
      width: '400px',
      data: this.sorteios[this.gerarRandomSorteio(0,this.sorteios.length)].Nome
    });
    this.spinner.hide();
    return 0;
  }

  gerarRandomSorteio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getParticipante(): void {
    this.sorteioService.getParticipante().subscribe({
      next: p => {
        p.forEach(element => {

          var lista = {
            Id: element['id'],
            Nome: element['nome'],
            Telefone: element['telefone'],
            Email: element['email'],
            Cpf: element['cpf'],
          };
          this.spinner.hide();
          this.sorteios.push(lista);
        });
      },
      error: err => console.log('Error', err)
    });
  }
}





