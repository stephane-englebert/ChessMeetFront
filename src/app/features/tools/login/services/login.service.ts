import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user';
import { LoggedUserModel } from '../models/loggedUser';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

export interface memberInfos{
  pseudo: string | null;
  isAdmin: boolean;
  isLogged: boolean;
  gender: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Observable
    isLogged: Subject<boolean> = new Subject<boolean>();
    isAdmin: Subject<boolean> = new Subject<boolean>();
    whichPseudo: Subject<string> = new Subject<string>(); 
    whichGender: Subject<string> = new Subject<string>();
    userMenu: Subject<MenuItem[]> = new Subject<MenuItem[]>();
    userInfos: Subject<memberInfos> = new Subject<memberInfos>();
  // local variable
    loggedUser!: LoggedUserModel;
    isConnected!: boolean | undefined;
    isUserAdmin!: boolean | undefined;
    userPseudo!: string | null;
    userGender!: string | null;
    items!: MenuItem[];
    userData!: memberInfos;

  constructor(
    private _http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  private isTokenExpired(token: string) {
    //const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    console.log(token.split('.'));    
    //return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  loginUser(user: UserModel){
    this._http.post<LoggedUserModel>('http://localhost:5009/api/Token',user).subscribe({
      next: (response) => {
        this.loggedUser = response;
        localStorage.setItem('token',this.loggedUser.token);
        // isLogged
          localStorage.setItem('isLogged','true');
          this.isConnected = true;
          this.isLogged.next(this.isConnected);
        // isAdmin
          localStorage.setItem('isAdmin',(this.loggedUser.loggedMember.role == "admin").toString());
          this.isUserAdmin = (this.loggedUser.loggedMember.role == "admin");
          this.isAdmin.next(this.isUserAdmin);
        // pseudo
          localStorage.setItem('pseudo',this.loggedUser.loggedMember.pseudo);
          this.userPseudo = this.loggedUser.loggedMember.pseudo;
          this.whichPseudo.next(this.userPseudo);
        // Gender
          localStorage.setItem('gender',this.loggedUser.loggedMember.gender);
          this.userGender = this.loggedUser.loggedMember.gender;
          this.whichGender.next(this.userGender);
        // userMenu
          this.userMenu.next(this.getUserMenu());
      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error("Connexion au serveur impossible"); 
      },
      complete: () => {
      }
    });
  }

  initUserInfos(){
    console.log(localStorage.getItem('token'));
    console.log("=======================");
    console.log(this.loggedUser);
    console.log("=======================");
    let crtToken = (localStorage.getItem('token') != null) ? localStorage.getItem('token') : "no token";
    //console.log(this.isTokenExpired(crtToken));
    console.log("=======================");
    this.getUserMenu();
    this.getUserInfos();
  }

  getUserInfos(){
    this.userPseudo = localStorage.getItem('pseudo');
    this.isUserAdmin = (localStorage.getItem('isAdmin') == "true");
    this.isConnected = (localStorage.getItem('isLogged') == "true");
    this.userGender = localStorage.getItem('gender');
    this.userData = {pseudo: this.userPseudo, isAdmin: this.isUserAdmin, isLogged: this.isConnected, gender: this.userGender};
    return this.userInfos.next(this.userData);
  }

  getUserMenu(){
    this.isUserAdmin = (localStorage.getItem('isAdmin') == "true");
    this.isConnected = (localStorage.getItem('isLogged') == "true");
    this.items = [
        {
          label: 'ChessMeet', routerLink: '/home'
        },
        {
            label: 'Tournois',
            icon: 'pi pi-list',
            items: [
                {label: 'Index', icon: 'pi pi-list', routerLink: '/tournaments/index'},
                {label: 'Nouveau', icon: 'pi pi-plus-circle', routerLink: '/tournaments/add', visible: this.isUserAdmin==true}
            ]
        },
        {
            label: 'Membres',
            icon: 'pi pi-user',
            items: [
                {label: 'Liste', icon: 'pi pi-list', routerLink: '/members/list'},
                {label: 'Ajouter', icon: 'pi pi-user-plus', routerLink: '/members/add'}
            ],
            visible: this.isConnected == true
        }
    ];
    return this.items;
  }

  logoutUser(){
    localStorage.clear();
    // isLogged
      localStorage.setItem('isLogged','false');
      this.isConnected = false;
      this.isLogged.next(this.isConnected);
    // isAdmin
      localStorage.setItem('isAdmin', 'false');
      this.isUserAdmin = false;
      this.isAdmin.next(this.isUserAdmin);
    // pseudo
      localStorage.setItem('pseudo', '');
      this.userPseudo = '';
      this.whichPseudo.next(this.userPseudo);
    this.userMenu.next(this.getUserMenu());
    this.router.navigateByUrl("/home");
  }
}
