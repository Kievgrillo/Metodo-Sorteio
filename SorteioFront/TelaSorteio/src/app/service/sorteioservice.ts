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

  getParticipante() : Observable<sorteiomodel[]> {
    return this.http.get<sorteiomodel[]>(this.baseURL)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
