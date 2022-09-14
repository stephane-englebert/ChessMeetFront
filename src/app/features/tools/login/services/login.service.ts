import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user';
import { LoggedUserModel } from '../models/loggedUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedUser!: LoggedUserModel;
  constructor(
    private _http: HttpClient
  ) { }

  loginUser(user: UserModel){
    this._http.post<LoggedUserModel>('http://localhost:5009/api/Token',user).subscribe({
      next: (response) => {
        this.loggedUser = response;
        localStorage.setItem('token',this.loggedUser.token);
        localStorage.setItem('isLogged','true');
        localStorage.setItem('isAdmin',(this.loggedUser.loggedMember.role == "admin").toString());
        localStorage.setItem('pseudo',this.loggedUser.loggedMember.pseudo);
        // Id - Role - Email - Birthdate - Gender - Elo
      },
      error: (err) => {
        console.log(err.error);
      },
      complete: () => {
        location.reload();
      }
    });
  }

  logoutUser(){
    localStorage.clear();
  }
}
