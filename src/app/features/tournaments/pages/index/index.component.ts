import { Component, OnInit } from '@angular/core';
import { TournamentModel } from '../../models/tournament';
import { TournamentService } from '../../services/tournament.service';

@Component({
  providers : [TournamentService],
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tournaments: TournamentModel[] = [];
  isLogged = (localStorage.getItem('isLogged') == "true");
  isAdmin = (localStorage.getItem('isAdmin') == "true");

  constructor(
    private _tournamentService: TournamentService
  ) {}
  
  ngOnInit(): void {
    this._tournamentService.getTournaments().subscribe(tourn => this.tournaments = tourn);
  }
}
