import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar-connect',
  templateUrl: './navbar-connect.component.html',
  styleUrls: ['./navbar-connect.component.scss']
})
export class NavbarConnectComponent implements OnInit {
  formGroupLogin! : FormGroup;
  userName : string = "";
  password : string = "";
  userToken: string = "";
  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.formGroupLogin = this._formBuilder.group({
      UserName: [null, [Validators.required, Validators.maxLength(30)]],
      Password: [null, [Validators.required, Validators.maxLength(30)]]
    })
  }

  submit(){
    if(this.formGroupLogin.invalid){
      // prévoir toast
      return;
    }
    this._loginService.loginUser(this.formGroupLogin.value);
  }
}
