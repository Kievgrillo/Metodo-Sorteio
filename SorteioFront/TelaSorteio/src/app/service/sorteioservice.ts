import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { sorteiomodel } from '../models/sorteiomodel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SorteioService {

  baseURL='https://localhost:5001/sorteio';

  constructor(private http: HttpClient) {  }

   GetParticipante() : Observable<sorteiomodel[]> {
    return this.http.get<sorteiomodel[]>(this.baseURL)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

    GetFilterParticipantes(search) : Observable<sorteiomodel[]> {
      var busca = this.baseURL + '/GetFilter' + '/' + search;
      return this.http.get<sorteiomodel[]>(busca)
        .pipe(
          map(res => {
            return res;
          })
        );
  }

  SaveGanhadoresSorteio(nome, idPart) : Observable<any> {
    var url = this.baseURL;
    const parametros = {
      nome: nome,
      id: idPart
    }
    return this.http.post<any>(url, parametros)
      .pipe(
        map(res => {
          return res;
        })
      );
   }
}
