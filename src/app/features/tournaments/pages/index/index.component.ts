import { Component, OnInit } from '@angular/core';
import { LoginService, memberInfos } from 'src/app/features/tools/login/services/login.service';
import { TournamentModel } from '../../models/tournament';
import { TournamentService } from '../../services/tournament.service';
import { MenuItem } from 'primeng/api';
import { formatDate } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentDetailsModel } from '../../models/tournamentDetails';
import { MemberModel } from 'src/app/features/members/models/member';

@Component({
  providers : [TournamentService],
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  items: MenuItem[] = [];
  isLogged!: Boolean;
  isAdmin!: Boolean;
  pseudo!: string | null;
  isAMan!: Boolean;
  tournaments: TournamentModel[] = [];
  today: Date = new Date();
  formGroupRegTourn!: FormGroup;
  displayModal: boolean = false;
  tournamentModal!: TournamentDetailsModel;
  tournamentInfos: TournamentDetailsModel[] = [];
  registeredPlayers: MemberModel[] = [];

  constructor(
    private _tournamentService: TournamentService,
    private _loginService: LoginService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.formGroupRegTourn = this._formBuilder.group({
      TournamentGuid: [null]
    });
    this._loginService.userInfos.subscribe({
      next : (data:memberInfos) => {
        this.isAdmin = data.isAdmin;
        this.isLogged = data.isLogged;
        this.pseudo = data.pseudo;
        this.isAMan = (data.gender == "male");
      }
    });
    this._loginService.isLogged.subscribe({
      next : (data:boolean) => this.isLogged = data
    });
    this._loginService.isAdmin.subscribe({
      next : (data:boolean) => this.isAdmin = data
    });
    this._loginService.whichPseudo.subscribe({
      next : (data: string) => this.pseudo = data
    });
    this._loginService.whichGender.subscribe({
      next : (data: string) => this.isAMan = (data == "male")
    });
    this._loginService.userMenu.subscribe({
      next : (data: MenuItem[]) => this.items = data 
    });
    this._loginService.initUserInfos();
    //=======
    this._tournamentService.tournamentsData.subscribe({
      next : (data:TournamentModel[]) => {
        this.tournaments = data;
      }
    });
    //this._tournamentService.initTournaments();
    this._tournamentService.getTournaments().subscribe(tourn => this.tournaments = tourn);
    this.tournamentModal = {
      guid: '',
      name: 'modal tournoi',
      place: 'modal lieu',
      playersMin: 2,
      playersMax: 16,
      eloMin: 1000,
      eloMax: 1500,
      categories: ['junior','senior'],
      status: 'waitingForPlayers',
      currentRound: 0,
      womenOnly: false,
      endRegistration: this.today,
      playersDetails: []
    };
  }

  checkEndRegistration(endDate: string){
    let aujourdhui = parseInt(formatDate(this.today,'yyyyMMdd','en_US'));
    let finReg = parseInt(formatDate(endDate,'yyyyMMdd','en_US'));
    let diff = finReg - aujourdhui;
    return diff >= 0;
  }

  registrationTournament(guid: string){
    this.formGroupRegTourn.reset({TournamentGuid: guid});
    this._tournamentService.registerToTournament(this.formGroupRegTourn.value).subscribe({
      next: (res) => {
        this.toastr.success("Inscription effectuée!");
        this._tournamentService.getTournaments().subscribe(tourn => this.tournaments = tourn);
      },
      error: (err) => {
        this.toastr.error(err.error);
      }
    });
  }

  DeleteRegistrationTournament(guid: string){
    this.formGroupRegTourn.reset({TournamentGuid: guid});
    this._tournamentService.DeleteRegisterToTournament(this.formGroupRegTourn.value).subscribe({
      next: (res) => {
        this.toastr.success("Vous êtes désinscrit(e) du tournoi!");
        this._tournamentService.getTournaments().subscribe(tourn => this.tournaments = tourn);
      },
      error: (err) => {
        this.toastr.error(err.error);
      }
    });
  }

  deleteTourn(g: string){
    this._tournamentService.deleteTournament(g).subscribe({
      next : (response) => {
        this._tournamentService.getTournaments().subscribe(tourn => this.tournaments = tourn);
        this.toastr.success("Le tournoi a été supprimé!");
      }
    })
  }

  showModalDialog(guid: string){
    this._tournamentService.getTournamentDetails(guid).subscribe({
      next: (response) => {
        this.tournamentModal = response;
        this.tournamentInfos = [this.tournamentModal];
        this.registeredPlayers = response.playersDetails;
        console.log(response);
        this.displayModal = true;
      },
      error: (err) => {
        this.toastr.error(err.error);
      }
    });
  }
}
