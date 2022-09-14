import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConst } from '../../tools/globals/globals';
import { TournamentModel } from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  tournaments!: TournamentModel[];

  constructor(
    private _http: HttpClient,
    private GBconst: GlobalConst
  ) { }

  getTournaments() : Observable<TournamentModel[]>{
    return this._http.get<TournamentModel[]>(this.GBconst.API_TOURNAMENT_INDEX);
  }
}
