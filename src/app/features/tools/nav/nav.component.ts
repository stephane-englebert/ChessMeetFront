import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api'
import { LoginService, memberInfos } from '../login/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items: MenuItem[] = [];
  isLogged!: Boolean;
  isAdmin!: Boolean;
  pseudo!: string | null;

  constructor(
    private _loginService: LoginService
  ) {}
  
  ngOnInit() {
    this._loginService.userInfos.subscribe({
      next : (data:memberInfos) => {
        this.isAdmin = data.isAdmin;
        this.isLogged = data.isLogged;
        this.pseudo = data.pseudo;
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
    this.items = this._loginService.getUserMenu();
    this._loginService.userMenu.subscribe({
      next : (data: MenuItem[]) => this.items = data 
    });
    this._loginService.initUserInfos();
  }

  logout(){
    this._loginService.logoutUser();
  }
}
