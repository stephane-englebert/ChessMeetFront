import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GlobalConst } from '../../tools/globals/globals';
import { TournamentModel } from '../models/tournament';
import { TournamentDetailsModel } from '../models/tournamentDetails';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  tournaments!: TournamentModel[];
  tournamentsData: Subject<TournamentModel[]> = new Subject<TournamentModel[]>();

  constructor(
    private _http: HttpClient,
    private GBconst: GlobalConst
  ) { }

  getTournaments() : Observable<TournamentModel[]>{
    return this._http.get<TournamentModel[]>(this.GBconst.API_TOURNAMENT_INDEX);
  }

  getTournamentDetails(value:any){
    return this._http.get<TournamentDetailsModel>(this.GBconst.API_TOURNAMENT_DETAILS + value);
  }

  initTournaments(){
    //return this.tournamentsData.next();
  }

  addTournament(value:any){
    value.Categories = value.Categories.toString();
    return this._http.post<void>(this.GBconst.API_TOURNAMENTS_ADD,value);
  }

  registerToTournament(value:any){
    return this._http.post<void>(this.GBconst.API_REGISTRATIONS_ADD, value); 
  }

  DeleteRegisterToTournament(value:any){
    return this._http.delete<void>(this.GBconst.API_REGISTRATIONS_DELETE, {body:value}); 
  }

  deleteTournament(value:any){
    let httpParams = new HttpParams().set('g', value);
    let options = {params: httpParams};
    return this._http.delete(this.GBconst.API_TOURNAMENTS_DELETE, options); 
  }

}