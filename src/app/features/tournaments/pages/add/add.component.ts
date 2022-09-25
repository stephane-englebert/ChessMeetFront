import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  formGroupAddTournament!: FormGroup;
  womenOptions: any[];
  categoriesOptions: any[];

  constructor(
    private _formBuilder: FormBuilder,
    private _tournamentService : TournamentService,
    private toastr: ToastrService
  ) {
    this.womenOptions = [
      {label: "Oui", value: true},
      {label: "Non", value: false}
    ];
    this.categoriesOptions = [
      {label: "Junior", value: "junior"},
      {label: "Senior", value: "senior"},
      {label: "Vétéran", value: "veteran"}
    ];
   }

  ngOnInit(): void {
    this.formGroupAddTournament = this._formBuilder.group({
      Name: [null, [Validators.required]],
      Place: [null, [Validators.required]],
      PlayersMin: [null, [Validators.required]],
      PlayersMax: [null, [Validators.required]],
      EloMin: [null, [Validators.required]],
      EloMax: [null, [Validators.required]],
      Categories: [null, [Validators.required]],
      WomenOnly: [null, [Validators.required]],
      EndRegistration: [null, [Validators.required]]
    })
  }

  submit(){
    if(this.formGroupAddTournament.invalid){
      // prévoir toast
      return;
    }
    this._tournamentService.addTournament(this.formGroupAddTournament.value).subscribe({
      next: (res) => {
        this.toastr.success("Le tournoi a été créé!");
      },
      error: (err) => {
        this.toastr.error(err.error);
      }
    });
  }

}
