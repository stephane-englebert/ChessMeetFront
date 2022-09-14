import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembersService } from '../../services/members.service';

interface Gender {
  label: string,
  value: string
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  formGroupAddMember!: FormGroup;
  genders: Gender[]
  selectedGender: string = '';

  constructor(
    private _membersService: MembersService,
    private _formBuilder: FormBuilder
  ) {
    this.genders = [
      {label: 'Homme', value: 'male'},
      {label: 'Femme', value: 'female'},
      {label: 'Autre', value: 'other'}
    ];
   }

  ngOnInit(): void {
    this.formGroupAddMember = this._formBuilder.group({
      Pseudo: [null, [Validators.required, Validators.maxLength(50)]],
      Email: [null, [Validators.required, Validators.maxLength(150)]],
      Birthdate: [null, [Validators.required]],
      Gender: [null, [Validators.required, Validators.maxLength(10)]],
      Elo: [null, [Validators.required]]
    })
    //this._membersService.addMember();
  }

  submit(){
    if(this.formGroupAddMember.invalid){
      // prévoir toast
      return;
    }
    this._membersService.addMember(this.formGroupAddMember.value).subscribe(
      () => console.log("Inscription faite!")
    );
  }

}
